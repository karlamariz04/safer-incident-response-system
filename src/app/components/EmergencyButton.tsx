import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface EmergencyButtonProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onClick: () => void;
  largeText?: boolean;
  simpleMode?: boolean;
}

export function EmergencyButton({
  icon: Icon,
  label,
  color,
  onClick,
  largeText = false,
  simpleMode = false,
}: EmergencyButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${color} text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 min-h-[140px] sm:min-h-[160px] flex flex-col items-center justify-center gap-3 sm:gap-4 transition-transform hover:scale-105 active:scale-95 shadow-lg w-full`}
      aria-label={label}
    >
      <Icon className={largeText ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-12 h-12 sm:w-16 sm:h-16'} strokeWidth={2} />
      {!simpleMode && (
        <span className={largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}>{label}</span>
      )}
    </button>
  );
}
