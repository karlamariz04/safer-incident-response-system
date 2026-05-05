import { useState, useEffect } from 'react';
import { Eye, Sun, Moon, Type, Mic } from 'lucide-react';

interface AccessibilityControlsProps {
  onVoiceToggle: (enabled: boolean) => void;
  onContrastToggle: (enabled: boolean) => void;
  onTextSizeToggle: (enabled: boolean) => void;
}

export function AccessibilityControls({
  onVoiceToggle,
  onContrastToggle,
  onTextSizeToggle,
}: AccessibilityControlsProps) {
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleVoiceToggle = () => {
    const newState = !voiceEnabled;
    setVoiceEnabled(newState);
    onVoiceToggle(newState);
  };

  const handleContrastToggle = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    onContrastToggle(newState);
  };

  const handleTextSizeToggle = () => {
    const newState = !largeText;
    setLargeText(newState);
    onTextSizeToggle(newState);
  };

  return (
    <div className="fixed top-2 right-2 sm:top-4 sm:right-4 flex gap-1.5 sm:gap-2 z-50">
      <button
        onClick={handleVoiceToggle}
        className={`p-2 sm:p-3 rounded-lg transition-colors shadow-lg ${
          voiceEnabled
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
        }`}
        aria-label="Toggle voice commands"
        title="Voice Commands"
      >
        <Mic className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleContrastToggle}
        className={`p-2 sm:p-3 rounded-lg transition-colors shadow-lg ${
          highContrast
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
        }`}
        aria-label="Toggle high contrast"
        title="High Contrast"
      >
        <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleTextSizeToggle}
        className={`p-2 sm:p-3 rounded-lg transition-colors shadow-lg ${
          largeText
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
        }`}
        aria-label="Toggle large text"
        title="Large Text"
      >
        <Type className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 sm:p-3 rounded-lg bg-secondary text-secondary-foreground transition-colors shadow-lg"
        aria-label="Toggle dark mode"
        title="Dark Mode"
      >
        {darkMode ? <Sun className="w-5 h-5 sm:w-6 sm:h-6" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>
    </div>
  );
}
