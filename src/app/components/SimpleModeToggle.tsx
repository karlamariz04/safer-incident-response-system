import { Brain } from 'lucide-react';

interface SimpleModeToggleProps {
  isSimpleMode: boolean;
  onToggle: (enabled: boolean) => void;
}

export function SimpleModeToggle({ isSimpleMode, onToggle }: SimpleModeToggleProps) {
  return (
    <button
      onClick={() => onToggle(!isSimpleMode)}
      className={`fixed top-2 left-2 sm:top-4 sm:left-4 p-2 sm:p-3 rounded-lg transition-colors shadow-lg z-50 ${
        isSimpleMode
          ? 'bg-primary text-primary-foreground'
          : 'bg-secondary text-secondary-foreground'
      }`}
      aria-label="Toggle simple mode"
      title="Simple Mode (Icon-Only)"
    >
      <Brain className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
}
