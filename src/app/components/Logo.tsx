import { Shield } from 'lucide-react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showTagline?: boolean;
}

export function Logo({ size = 'medium', showTagline = false }: LogoProps) {
  const sizes = {
    small: {
      icon: 'w-8 h-8',
      text: 'text-2xl',
      tagline: 'text-sm',
      gap: 'gap-2',
    },
    medium: {
      icon: 'w-12 h-12',
      text: 'text-4xl',
      tagline: 'text-base',
      gap: 'gap-3',
    },
    large: {
      icon: 'w-20 h-20',
      text: 'text-6xl',
      tagline: 'text-xl',
      gap: 'gap-4',
    },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex flex-col items-center ${currentSize.gap}`}>
      <div className={`flex items-center ${currentSize.gap}`}>
        <div className="relative">
          <Shield className={`${currentSize.icon} text-primary`} fill="currentColor" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-primary-foreground font-bold ${size === 'small' ? 'text-xs' : size === 'medium' ? 'text-sm' : 'text-lg'}`}>
              +
            </span>
          </div>
        </div>
        <h1 className={currentSize.text}>
          <span className="text-primary">S.A.F.E.R.</span>
        </h1>
      </div>
      {showTagline && (
        <p className={`${currentSize.tagline} text-muted-foreground text-center`}>
          Fast Help. Accessible for All.
        </p>
      )}
    </div>
  );
}
