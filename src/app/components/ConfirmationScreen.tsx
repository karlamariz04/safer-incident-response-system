import { CheckCircle2, Clock, User, Home } from 'lucide-react';
import { ReportData } from './ReportScreen';
import { SignLanguageSupport } from './SignLanguageSupport';

interface ConfirmationScreenProps {
  reportData: ReportData;
  onBackToHome: () => void;
  largeText: boolean;
}

export function ConfirmationScreen({ reportData, onBackToHome, largeText }: ConfirmationScreenProps) {
  const getEmergencyColor = () => {
    switch (reportData.type) {
      case 'medical':
        return 'text-blue-600';
      case 'fire':
        return 'text-red-600';
      case 'police':
        return 'text-yellow-600';
      default:
        return 'text-orange-600';
    }
  };

  const estimatedTime = reportData.priority === 'high' ? '3-5 minutes' :
                       reportData.priority === 'medium' ? '8-12 minutes' : '15-20 minutes';
  const responderName = reportData.type === 'medical' ? 'MDRRMO Team Alpha' : 'Emergency Response Unit 1';

  // Simulate emergency contact notification
  const emergencyContactNotified = reportData.userProfile?.emergencyContactName || 'Family';

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-6 sm:mb-8">
          <CheckCircle2 className={`${getEmergencyColor()} mx-auto mb-4 ${largeText ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-20 h-20 sm:w-24 sm:h-24'}`} />
          <h1 className={`text-primary mb-4 ${largeText ? 'text-5xl sm:text-6xl' : 'text-3xl sm:text-4xl'}`}>
            Help is on the way!
          </h1>
          <p className={`text-muted-foreground ${largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>
            Your emergency report has been received and help is already being dispatched
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-8 space-y-4 sm:space-y-6">
          <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border">
            <div className={`${
              reportData.type === 'medical' ? 'bg-blue-100 dark:bg-blue-900/30' :
              reportData.type === 'fire' ? 'bg-red-100 dark:bg-red-900/30' :
              reportData.type === 'police' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
            } p-3 sm:p-4 rounded-full`}>
              <Clock className={`${getEmergencyColor()} ${largeText ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-6 h-6 sm:w-8 sm:h-8'}`} />
            </div>
            <div>
              <h3 className={`text-muted-foreground ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
                Estimated Arrival
              </h3>
              <p className={largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}>{estimatedTime}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-border">
            <div className={`${
              reportData.type === 'medical' ? 'bg-blue-100 dark:bg-blue-900/30' :
              reportData.type === 'fire' ? 'bg-red-100 dark:bg-red-900/30' :
              reportData.type === 'police' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
            } p-3 sm:p-4 rounded-full`}>
              <User className={`${getEmergencyColor()} ${largeText ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-6 h-6 sm:w-8 sm:h-8'}`} />
            </div>
            <div>
              <h3 className={`text-muted-foreground ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
                Assigned Responder
              </h3>
              <p className={largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}>{responderName}</p>
            </div>
          </div>

          <div className="bg-muted rounded-xl p-4 sm:p-6">
            <h3 className={`mb-3 ${largeText ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'}`}>Report Summary</h3>
            <div className="space-y-2">
              <p className={`text-muted-foreground ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
                <span>Type:</span> {reportData.type.charAt(0).toUpperCase() + reportData.type.slice(1)}
              </p>
              <p className={`text-muted-foreground ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
                <span>Priority:</span> <span className={`font-bold ${
                  reportData.priority === 'high' ? 'text-red-600' :
                  reportData.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                }`}>{reportData.priority.toUpperCase()}</span>
              </p>
              <p className={`text-muted-foreground ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
                <span>Facility:</span> {reportData.nearestFacility}
              </p>
              {reportData.location && (
                <p className={`text-muted-foreground ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
                  <span>Location:</span> {reportData.location.lat.toFixed(4)}, {reportData.location.lng.toFixed(4)}
                </p>
              )}
              {reportData.message && (
                <p className={`text-muted-foreground ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
                  <span>Details:</span> {reportData.message}
                </p>
              )}
            </div>
          </div>

          {reportData.userProfile?.disabilityType === 'auditory' && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-300 rounded-xl p-4 sm:p-6">
              <SignLanguageSupport
                disabilityType={reportData.userProfile.disabilityType}
                largeText={largeText}
              />
            </div>
          )}

          <div className="bg-green-50 dark:bg-green-950/20 border border-green-300 rounded-xl p-4">
            <p className={`text-green-800 dark:text-green-200 ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
              ✓ Emergency contact ({emergencyContactNotified}) has been notified via SMS
            </p>
          </div>
        </div>

        <button
          onClick={onBackToHome}
          className={`w-full mt-6 sm:mt-8 bg-primary text-primary-foreground rounded-xl sm:rounded-2xl p-5 sm:p-6 flex items-center justify-center gap-3 sm:gap-4 hover:bg-primary/90 transition ${
            largeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'
          }`}
        >
          <Home className={largeText ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-5 h-5 sm:w-6 sm:h-6'} />
          Back to Home
        </button>
      </div>
    </div>
  );
}
