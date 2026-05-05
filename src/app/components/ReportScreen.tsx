import { useState, useEffect, ChangeEvent } from 'react';
import { ArrowLeft, AlertCircle, Building2, Lightbulb, MapPin, MessageSquare, Camera, Send, Mic, MicOff } from 'lucide-react';
import { MapPreview } from './MapPreview';
import { detectEmergencyPriority, generateNearestFacility } from '../utils/aiDetection';

type PriorityLevel = 'low' | 'medium' | 'high' | 'critical';

interface ReportScreenProps {
  emergencyType: string;
  onSubmit: (data: ReportData) => void;
  onBack: () => void;
  largeText: boolean;
  userProfile: any;
}

export interface ReportData {
  type: string;
  location: { lat: number; lng: number } | null;
  message: string;
  photo: string | null;
  priority: PriorityLevel;
  detectedKeywords: string[];
  nearestFacility: string;
  userProfile: any;
}

export function ReportScreen({ emergencyType, onSubmit, onBack, largeText, userProfile }: ReportScreenProps) {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [message, setMessage] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [priority, setPriority] = useState<PriorityLevel>('medium');
  const [detectedKeywords, setDetectedKeywords] = useState<string[]>([]);
  const [nearestFacility, setNearestFacility] = useState('');  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const getSmartTips = (type: string): string[] => {
    const tips = {
      medical: [
        "Stay calm and assess the situation safely",
        "If unconscious, check for breathing and pulse",
        "For bleeding, apply pressure with clean cloth",
        "Keep the person warm and comfortable",
        "Do not give food/drink to unconscious person",
        "If possible, note any medications or allergies"
      ],
      fire: [
        "Get out and stay out - do not go back inside",
        "If clothes catch fire, STOP, DROP, and ROLL",
        "Crawl low under smoke to exit",
        "Feel doors for heat before opening",
        "Use wet cloth over mouth/nose if smoky",
        "Call from safe distance once outside"
      ],
      police: [
        "Stay in a safe location if possible",
        "Provide clear description of suspects/vehicles",
        "Note license plate numbers if applicable",
        "Do not confront suspects directly",
        "Lock doors and windows if inside",
        "Have identification ready for officers"
      ],
      other: [
        "Assess immediate danger to yourself and others",
        "Move to a safe location if possible",
        "Provide as many details as you can",
        "Stay on the line with emergency services",
        "Follow any instructions from responders",
        "Help others if it doesn't endanger you"
      ]
    };
    return tips[type as keyof typeof tips] || tips.other;
  };

  useEffect(() => {
    setNearestFacility(generateNearestFacility(emergencyType));
  }, [emergencyType]);

  useEffect(() => {
    if (message) {
      const detection = detectEmergencyPriority(message, emergencyType);
      setPriority(detection.priority);
      setDetectedKeywords(detection.detectedKeywords);
    }
  }, [message, emergencyType]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        () => {
          setIsLoadingLocation(false);
        }
      );
    } else {
      setIsLoadingLocation(false);
    }
  }, []);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SpeechRecognition();

    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.maxAlternatives = 1;

    rec.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setMessage(prev => prev + (prev ? ' ' : '') + transcript);
      setIsListening(false);
    };

    rec.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    rec.onend = () => {
      setIsListening(false);
    };

    setRecognition(rec);

    return () => {
      rec.stop();
    };
  }, []);

  const startVoiceInput = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const stopVoiceInput = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit({
      type: emergencyType,
      location,
      message,
      photo,
      priority,
      detectedKeywords,
      nearestFacility,
      userProfile,
    });
  };

  const getEmergencyColor = () => {
    switch (emergencyType) {
      case 'medical':
        return 'bg-blue-600';
      case 'fire':
        return 'bg-red-600';
      case 'police':
        return 'bg-yellow-600';
      default:
        return 'bg-orange-600';
    }
  };

  return (
    <div className={`min-h-screen bg-background p-4 sm:p-6 ${largeText ? 'text-xl' : 'text-base'}`}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={onBack}
          className="mb-4 sm:mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          <span className={largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}>Back</span>
        </button>

        <div className={`${getEmergencyColor()} text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-6 sm:mb-8`}>
          <h1 className={largeText ? 'text-4xl sm:text-5xl mb-2' : 'text-2xl sm:text-3xl mb-2'}>
            {emergencyType.charAt(0).toUpperCase() + emergencyType.slice(1)} Emergency
          </h1>
          <p className={largeText ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}>Please confirm your report details</p>
        </div>

        <div className="space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {detectedKeywords.length > 0 && (
            <div className={`border-2 rounded-xl p-4 sm:p-6 ${
              priority === 'high' ? 'bg-red-50 dark:bg-red-950/20 border-red-500' :
              priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-500' :
              'bg-green-50 dark:bg-green-950/20 border-green-500'
            }`}>
              <div className="flex items-center gap-3 mb-2">
                <AlertCircle className={`w-5 h-5 sm:w-6 sm:h-6 ${
                  priority === 'high' ? 'text-red-600' :
                  priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`} />
                <h3 className={largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}>
                  AI Detection: {priority.toUpperCase()} Priority
                </h3>
              </div>
              <p className={`text-muted-foreground ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
                Detected: {detectedKeywords.join(', ')}
              </p>
            </div>
          )}

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className={largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}>Nearest Facility</h3>
            </div>
            <p className={`${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
              {nearestFacility}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              <h3 className={largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}>Smart Tips for {emergencyType.charAt(0).toUpperCase() + emergencyType.slice(1)} Emergency</h3>
            </div>
            <ul className={`space-y-2 ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
              {getSmartTips(emergencyType).slice(0, 4).map((tip, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className={largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}>Your Location</h3>
            </div>
            {isLoadingLocation ? (
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <p className={`text-muted-foreground ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
                  Detecting your location...
                </p>
              </div>
            ) : (
              <MapPreview location={location} />
            )}
            {location && (
              <p className={`mt-2 text-muted-foreground ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
                Latitude: {location.lat.toFixed(6)}, Longitude: {location.lng.toFixed(6)}
              </p>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                <h3 className={largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}>Additional Details (Optional)</h3>
              </div>
              <button
                type="button"
                onClick={isListening ? stopVoiceInput : startVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-100 text-red-600 hover:bg-red-200'
                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                }`}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                title={isListening ? 'Stop voice input' : 'Start voice input'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the situation..."
              className={`w-full bg-input-background border border-border rounded-lg p-3 sm:p-4 min-h-[100px] sm:min-h-[120px] ${
                largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'
              }`}
              aria-label="Additional details"
            />
            {isListening && (
              <p className="mt-2 text-sm text-blue-600 flex items-center gap-2">
                <Mic className="w-4 h-4 animate-pulse" />
                Listening... speak clearly to add more details
              </p>
            )}
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-3">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              <h3 className={largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}>Photo (Optional)</h3>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className={`block w-full bg-secondary text-secondary-foreground rounded-lg p-3 sm:p-4 text-center cursor-pointer hover:bg-secondary/80 transition ${
                largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'
              }`}
            >
              {photo ? 'Photo uploaded ✓' : 'Upload Photo'}
            </label>
            {photo && (
              <img src={photo} alt="Uploaded" className="mt-4 rounded-lg max-h-40 sm:max-h-48 mx-auto" />
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className={`w-full mt-6 sm:mt-8 bg-destructive text-destructive-foreground rounded-xl sm:rounded-2xl p-6 sm:p-8 flex items-center justify-center gap-3 sm:gap-4 hover:bg-destructive/90 transition shadow-lg ${
            largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
          }`}
        >
          <Send className={largeText ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-6 h-6 sm:w-8 sm:h-8'} />
          SEND EMERGENCY REPORT NOW
        </button>
      </div>
    </div>
  );
}
