import { Ambulance, Flame, Shield, AlertCircle, User, Phone, Heart, Zap } from 'lucide-react';
import { EmergencyButton } from './EmergencyButton';
import { Logo } from './Logo';

interface HomeScreenProps {
  onSelectEmergency: (type: string) => void;
  largeText: boolean;
  simpleMode: boolean;
  onOpenProfile?: () => void;
}

export function HomeScreen({ onSelectEmergency, largeText, simpleMode, onOpenProfile }: HomeScreenProps) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <Logo size={largeText ? 'medium' : 'small'} showTagline={true} />
        </div>
        {!simpleMode && (
          <>
            <h1 className={`text-center mb-4 sm:mb-8 ${largeText ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'}`}>
              Emergency Reporting
            </h1>
            <p className={`text-center text-muted-foreground mb-8 sm:mb-12 ${largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
              Select your emergency type
            </p>
          </>
        )}
        {simpleMode && (
          <div className="text-center mb-8 sm:mb-12 bg-primary/10 border-2 border-primary rounded-xl p-4">
            <p className={`${largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
              👇 Tap Emergency Type
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <EmergencyButton
            icon={Ambulance}
            label="Medical"
            color="bg-blue-600"
            onClick={() => onSelectEmergency('medical')}
            largeText={largeText}
            simpleMode={simpleMode}
          />

          <EmergencyButton
            icon={Flame}
            label="Fire"
            color="bg-red-600"
            onClick={() => onSelectEmergency('fire')}
            largeText={largeText}
            simpleMode={simpleMode}
          />

          <EmergencyButton
            icon={Shield}
            label="Police"
            color="bg-yellow-600"
            onClick={() => onSelectEmergency('police')}
            largeText={largeText}
            simpleMode={simpleMode}
          />

          <EmergencyButton
            icon={AlertCircle}
            label="Other"
            color="bg-orange-600"
            onClick={() => onSelectEmergency('other')}
            largeText={largeText}
            simpleMode={simpleMode}
          />
        </div>

        <div className="mt-8 sm:mt-12 text-center px-4 space-y-3">
          <p className={`text-muted-foreground ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
            🎤 Speak: "Report fire", "Need ambulance", "Need police", or "Need help"
          </p>
        </div>

        <div className="mt-6 sm:mt-8 px-4 sm:px-6">
          <h2 className={`text-center mb-6 sm:mb-8 ${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-semibold`}>
            Emergency Hotlines & Services
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 dark:bg-red-900/20 p-2 rounded-lg">
                  <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>Fire Department</h3>
                  <p className={`text-red-600 font-bold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>911</p>
                </div>
              </div>
              <p className={`text-muted-foreground ${largeText ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} leading-relaxed`}>
                House fires, vehicle fires, chemical fires, rescue operations, and fire prevention assistance.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded-lg">
                  <Ambulance className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>Medical Emergency</h3>
                  <p className={`text-blue-600 font-bold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>+63 917 123 4567</p>
                </div>
              </div>
              <p className={`text-muted-foreground ${largeText ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} leading-relaxed`}>
                Medical emergencies, accidents, heart attacks, strokes, severe injuries, and ambulance services.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded-lg">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>Police Department</h3>
                  <p className={`text-yellow-600 font-bold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>+63 918 123 4567</p>
                </div>
              </div>
              <p className={`text-muted-foreground ${largeText ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} leading-relaxed`}>
                Criminal activities, theft, assault, domestic violence, traffic accidents, and public safety concerns.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded-lg">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <div>
                  <h3 className={`font-semibold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>General Emergency</h3>
                  <p className={`text-green-600 font-bold ${largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}`}>911</p>
                </div>
              </div>
              <p className={`text-muted-foreground ${largeText ? 'text-sm sm:text-base' : 'text-xs sm:text-sm'} leading-relaxed`}>
                Any emergency situation requiring immediate assistance, when unsure which service to call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
