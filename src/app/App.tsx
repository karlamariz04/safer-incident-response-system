import { useState } from 'react';
import { HelpCircle, User, CheckCircle2 } from 'lucide-react';
import { AccessibilityControls } from './components/AccessibilityControls';
import { WelcomeScreen } from './components/WelcomeScreen';
import { UserProfileSetup } from './components/UserProfileSetup';
import { HomeScreen } from './components/HomeScreen';
import { ReportScreen, ReportData } from './components/ReportScreen';
import { VoiceReporter } from './components/VoiceReporter';
import { ResponderDashboard } from './components/ResponderDashboard';
import { SimpleModeToggle } from './components/SimpleModeToggle';
import { HelpPointsScreen } from './components/HelpPointsScreen';

type Screen = 'welcome' | 'profile' | 'home' | 'report' | 'confirmation' | 'dashboard' | 'editProfile' | 'help';

interface Incident {
  id: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  location: string;
  time: string;
  pwdType: string;
  status: 'pending' | 'responding' | 'resolved';
  details: string;
  reportData: ReportData;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [emergencyType, setEmergencyType] = useState('');
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: '001',
      type: 'Medical',
      priority: 'high',
      location: '14.5995° N, 120.9842° E',
      time: '2 minutes ago',
      pwdType: 'Visual Impairment',
      status: 'pending',
      details: 'Patient is unconscious with severe bleeding and requires immediate attention.',
      reportData: {} as ReportData,
    },
    {
      id: '002',
      type: 'Fire',
      priority: 'high',
      location: '14.6091° N, 121.0223° E',
      time: '5 minutes ago',
      pwdType: 'Motor Disability',
      status: 'responding',
      details: 'Small house fire reported in barangay center; possible trapped occupants.',
      reportData: {} as ReportData,
    },
    {
      id: '003',
      type: 'Police',
      priority: 'medium',
      location: '14.5547° N, 121.0244° E',
      time: '12 minutes ago',
      pwdType: 'Auditory Impairment',
      status: 'responding',
      details: 'Reported disturbance and potential break-in near the market.',
      reportData: {} as ReportData,
    },
  ]);
  const [showReportModal, setShowReportModal] = useState(false);

  const handleSelectEmergency = (type: string) => {
    if (type === 'help') {
      setCurrentScreen('help');
    } else {
      setEmergencyType(type);
      setCurrentScreen('report');
    }
  };

  const handleSubmitReport = (data: ReportData) => {
    setReportData(data);

    // Add to incidents for admin dashboard
    const newIncident: Incident = {
      id: `INC-${Date.now()}`,
      type: data.type.charAt(0).toUpperCase() + data.type.slice(1),
      priority: data.priority,
      location: data.location ? `${data.location.lat.toFixed(4)}° N, ${data.location.lng.toFixed(4)}° E` : 'Location not provided',
      time: 'Just now',
      pwdType: data.userProfile?.disabilityType === 'none' ? 'None' : (data.userProfile?.disabilityType || 'Unknown'),
      status: 'pending',
      details: data.message || 'Emergency report submitted',
      reportData: data,
    };

    setIncidents(prev => [newIncident, ...prev]);
    setShowReportModal(true);

    // Auto-hide modal then redirect to the emergency reporting home page
    setTimeout(() => {
      setShowReportModal(false);
      setCurrentScreen('home');
      setEmergencyType('');
      setReportData(null);
    }, 8000);
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
    setEmergencyType('');
    setReportData(null);
  };

  const handleVoiceEmergency = (type: string) => {
    setEmergencyType(type);
    setCurrentScreen('report');
  };

  const handleOpenProfile = () => {
    setCurrentScreen('editProfile');
  };

  const handleUpdateProfile = (profile: any) => {
    setUserProfile(profile);
    setCurrentScreen('home');
  };

  return (
    <div className={`min-h-screen ${highContrast ? 'contrast-125' : ''}`}>
      {currentScreen !== 'dashboard' && currentScreen !== 'welcome' && currentScreen !== 'profile' && currentScreen !== 'help' && (
        <>
          <div className="fixed top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-2 sm:gap-3 z-50">
            <SimpleModeToggle isSimpleMode={simpleMode} onToggle={setSimpleMode} />
            <button
              onClick={() => setCurrentScreen('help')}
              className="p-2 sm:p-3 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition-colors"
              aria-label="Help Points"
              title="Help Points"
            >
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleOpenProfile}
              className="p-2 sm:p-3 bg-secondary text-secondary-foreground rounded-lg shadow-lg hover:bg-secondary/80 transition-colors"
              aria-label="Medical Profile"
              title="Medical Profile"
            >
              <User className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
          <AccessibilityControls
            onVoiceToggle={setVoiceEnabled}
            onContrastToggle={setHighContrast}
            onTextSizeToggle={setLargeText}
          />

          <VoiceReporter enabled={voiceEnabled} onEmergencyDetected={handleVoiceEmergency} />
        </>
      )}

      {currentScreen === 'welcome' && (
        <WelcomeScreen onGetStarted={() => setCurrentScreen('home')} />
      )}

      {currentScreen === 'profile' && (
        <UserProfileSetup
          onComplete={(profile) => {
            setUserProfile(profile);
            setCurrentScreen('home');
          }}
          onSkip={() => setCurrentScreen('home')}
          onBack={() => setCurrentScreen('welcome')}
        />
      )}

      {currentScreen === 'home' && (
        <HomeScreen onSelectEmergency={handleSelectEmergency} largeText={largeText} simpleMode={simpleMode} onOpenProfile={handleOpenProfile} />
      )}

      {currentScreen === 'report' && (
        <ReportScreen
          emergencyType={emergencyType}
          onSubmit={handleSubmitReport}
          onBack={handleBackToHome}
          largeText={largeText}
          userProfile={userProfile}
        />
      )}

      {currentScreen === 'editProfile' && (
        <UserProfileSetup
          onComplete={handleUpdateProfile}
          onSkip={() => setCurrentScreen('home')}
          onBack={() => setCurrentScreen('home')}
          initialProfile={userProfile}
        />
      )}

      {currentScreen === 'help' && (
        <HelpPointsScreen
          location={null}
          largeText={largeText}
          onBack={() => setCurrentScreen('home')}
        />
      )}

      {currentScreen === 'dashboard' && <ResponderDashboard incidents={incidents} onUpdateIncident={setIncidents} largeText={largeText} />}

      {currentScreen !== 'welcome' && (
        <button
          onClick={() =>
            setCurrentScreen(currentScreen === 'dashboard' ? 'home' : 'dashboard')
          }
          className="fixed bottom-2 left-2 sm:bottom-4 sm:left-4 px-4 sm:px-6 py-2 sm:py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition shadow-lg text-sm sm:text-base z-40"
        >
          {currentScreen === 'dashboard' ? 'User View' : 'Admin Dashboard'}
        </button>
      )}

      {showReportModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/95 pointer-events-auto backdrop-blur-sm">
          <div className="w-full max-w-3xl bg-white dark:bg-slate-900 border border-border rounded-[36px] shadow-[0_30px_60px_rgba(0,0,0,0.30)] p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-700 shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">Report Submitted</p>
                  <p className="text-base sm:text-lg text-muted-foreground">Your emergency report has been successfully sent.</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-700 p-6 sm:p-8">
              <p className="text-lg sm:text-xl font-medium mb-3">Help is on the way.</p>
              <p className="text-base sm:text-lg text-muted-foreground leading-7">
                Please stay calm and keep your phone nearby. Emergency responders are already receiving your information and will reach you shortly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}