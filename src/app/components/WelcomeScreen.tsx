import { ArrowRight, Accessibility, Zap, Users, MapPin } from 'lucide-react';
import { Logo } from './Logo';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12">
          <Logo size="large" showTagline={true} />
          <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto px-4">
            Smart Accessible Fast Emergency Response System
          </p>
          <p className="mt-2 text-base sm:text-lg text-muted-foreground">
            For Persons with Disabilities in Paluan, Occidental Mindoro
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition">
            <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h3 className="text-base sm:text-lg mb-2">Fast Response</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Report emergencies in under 10 seconds
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition">
            <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Accessibility className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h3 className="text-base sm:text-lg mb-2">Fully Accessible</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Voice commands, large text, high contrast
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition">
            <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h3 className="text-base sm:text-lg mb-2">Auto Location</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              GPS-based location detection
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 text-center hover:shadow-lg transition">
            <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600" />
            </div>
            <h3 className="text-base sm:text-lg mb-2">Smart Priority</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              PWD needs prioritized automatically
            </p>
          </div>
        </div>

        <div className="bg-card border-2 border-primary/20 rounded-2xl p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 mx-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 text-center">
            Designed for All Disabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl">👁️</div>
              <div>
                <h4 className="text-base sm:text-lg mb-1">Visual Impairment</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Voice commands, screen reader support, high contrast mode
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl">👂</div>
              <div>
                <h4 className="text-base sm:text-lg mb-1">Auditory Impairment</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Visual alerts, text-based reporting, image upload
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl">🖐️</div>
              <div>
                <h4 className="text-base sm:text-lg mb-1">Motor Disability</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Large buttons, one-tap reporting, minimal scrolling
                </p>
              </div>
            </div>

            <div className="flex gap-3 sm:gap-4">
              <div className="text-3xl sm:text-4xl">🧠</div>
              <div>
                <h4 className="text-base sm:text-lg mb-1">Cognitive Disability</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Step-by-step guidance, icon-based interface, simple words
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center px-4">
          <button
            onClick={onGetStarted}
            className="bg-primary text-primary-foreground px-8 sm:px-12 py-4 sm:py-6 rounded-2xl text-xl sm:text-2xl md:text-3xl inline-flex items-center gap-3 sm:gap-4 hover:bg-primary/90 transition shadow-2xl hover:scale-105 active:scale-95"
          >
            Get Started
            <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
        </div>

        <div className="mt-8 sm:mt-12 text-center text-xs sm:text-sm text-muted-foreground px-4">
          <p>Developed for MDRRMO, RHU, and Emergency Services</p>
          <p className="mt-1">Paluan, Occidental Mindoro</p>
        </div>
      </div>
    </div>
  );
}
