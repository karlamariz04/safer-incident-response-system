import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceReporterProps {
  onEmergencyDetected: (type: string) => void;
  enabled: boolean;
}

export function VoiceReporter({ onEmergencyDetected, enabled }: VoiceReporterProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (!enabled || !('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();

    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = 'en-US'; // Set language for better accuracy
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      let finalTranscript = '';
      let interimTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript + interimTranscript);

      const fullTranscript = (finalTranscript + interimTranscript).toLowerCase();

      // Enhanced keyword detection with more comprehensive patterns
      const emergencyKeywords = {
        fire: ['fire', 'burning', 'smoke', 'flames', 'house on fire', 'building fire', 'fire emergency', 'fire help', 'fire report'],
        medical: ['medical', 'ambulance', 'help', 'emergency', 'hurt', 'injured', 'sick', 'pain', 'bleeding', 'unconscious', 'heart attack', 'stroke', 'medical emergency', 'need ambulance', 'medical help'],
        police: ['police', 'crime', 'theft', 'assault', 'attack', 'stolen', 'burglary', 'robbery', 'danger', 'threat', 'police emergency', 'police help', 'need police'],
        other: ['help', 'emergency', 'accident', 'problem', 'issue', 'other emergency']
      };

      let detectedType = '';
      let confidence = 0;

      for (const [type, keywords] of Object.entries(emergencyKeywords)) {
        for (const keyword of keywords) {
          if (fullTranscript.includes(keyword)) {
            detectedType = type;
            confidence = Math.max(confidence, keyword.length / fullTranscript.length);
            break;
          }
        }
        if (detectedType) break;
      }

      // Only trigger if confidence is high enough or it's a clear emergency
      if (detectedType && (confidence > 0.3 || fullTranscript.includes('emergency') || fullTranscript.includes('help'))) {
        onEmergencyDetected(detectedType);
        setTranscript(''); // Clear transcript after detection
      }
    };

    rec.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      if (isListening) {
        // Restart recognition for continuous listening
        rec.start();
      }
    };

    setRecognition(rec);

    return () => {
      rec.stop();
    };
  }, [enabled, onEmergencyDetected]);

  useEffect(() => {
    if (recognition) {
      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
      }
    }
  }, [isListening, recognition]);

  if (!enabled) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50">
      <button
        onClick={() => setIsListening(!isListening)}
        className={`p-4 sm:p-6 rounded-full shadow-2xl transition-all ${
          isListening
            ? 'bg-destructive text-destructive-foreground animate-pulse'
            : 'bg-primary text-primary-foreground'
        }`}
        aria-label={isListening ? 'Stop voice reporting' : 'Start voice reporting'}
      >
        {isListening ? (
          <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
        ) : (
          <MicOff className="w-6 h-6 sm:w-8 sm:h-8" />
        )}
        {isListening && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-destructive rounded-full animate-ping" />
        )}
      </button>
      {isListening && transcript && (
        <div className="absolute bottom-full right-0 mb-2 bg-background border border-border rounded-lg p-3 shadow-lg max-w-xs">
          <p className="text-sm text-muted-foreground mb-1">Listening...</p>
          <p className="text-sm">{transcript}</p>
        </div>
      )}
    </div>
  );
}
