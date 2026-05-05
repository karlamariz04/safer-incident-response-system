import { AlertCircle, MapPin, Phone, Info, Shield } from 'lucide-react';

interface HelpPoint {
  id: string;
  name: string;
  type: 'police' | 'medical' | 'fire' | 'community';
  distance: string;
  phone: string;
  address: string;
  hours: string;
  icon: React.ReactNode;
}

interface HelpPointsScreenProps {
  location: { lat: number; lng: number } | null;
  largeText: boolean;
  onBack: () => void;
}

const helpPoints: HelpPoint[] = [
  {
    id: '1',
    name: 'Paluan Police Station',
    type: 'police',
    distance: '0.5 km',
    phone: '+63 (2) 1234 5678',
    address: 'Poblacion Street, Paluan',
    hours: '24/7',
    icon: <Shield className="w-6 h-6 text-yellow-600" />
  },
  {
    id: '2',
    name: 'Paluan Rural Health Unit',
    type: 'medical',
    distance: '1.2 km',
    phone: '+63 (2) 1234 5679',
    address: 'Barangay Health Center',
    hours: '08:00 - 18:00',
    icon: <AlertCircle className="w-6 h-6 text-blue-600" />
  },
  {
    id: '3',
    name: 'Paluan Fire Station',
    type: 'fire',
    distance: '1.8 km',
    phone: '+63 (2) 1234 5680',
    address: 'Municipal Fire Department',
    hours: '24/7',
    icon: <Info className="w-6 h-6 text-red-600" />
  },
  {
    id: '4',
    name: 'Barangay Tanod Office',
    type: 'community',
    distance: '0.3 km',
    phone: '+63 (2) 1234 5681',
    address: 'Barangay Hall, Poblacion',
    hours: '08:00 - 17:00',
    icon: <Shield className="w-6 h-6 text-green-600" />
  },
  {
    id: '5',
    name: 'MDRRMO Paluan',
    type: 'community',
    distance: '2.5 km',
    phone: '+63 (2) 1234 5682',
    address: 'Municipal Disaster Risk Reduction Office',
    hours: '08:00 - 17:00',
    icon: <Info className="w-6 h-6 text-orange-600" />
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'police':
      return 'bg-yellow-100 dark:bg-yellow-900/20 border-yellow-300';
    case 'medical':
      return 'bg-blue-100 dark:bg-blue-900/20 border-blue-300';
    case 'fire':
      return 'bg-red-100 dark:bg-red-900/20 border-red-300';
    case 'community':
      return 'bg-green-100 dark:bg-green-900/20 border-green-300';
    default:
      return 'bg-gray-100 dark:bg-gray-800 border-gray-300';
  }
};

export function HelpPointsScreen({ location, largeText, onBack }: HelpPointsScreenProps) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className={`mb-6 text-primary hover:text-primary/80 transition ${largeText ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}`}
        >
          ← Back
        </button>

        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl sm:rounded-2xl p-6 sm:p-8 mb-8">
          <h1 className={largeText ? 'text-5xl sm:text-6xl mb-2' : 'text-3xl sm:text-4xl mb-2'}>
            Nearby Help Points
          </h1>
          <p className={largeText ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'}>
            Find emergency services and help centers near you
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {helpPoints.map((point) => (
            <div
              key={point.id}
              className={`border-2 rounded-xl p-4 sm:p-6 ${getTypeColor(point.type)}`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">{point.icon}</div>
                <div className="flex-1">
                  <h2 className={`${largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'} font-bold mb-2`}>
                    {point.name}
                  </h2>
                  <div className={`space-y-2 ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{point.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>{point.distance} away</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                      <a href={`tel:${point.phone}`} className="hover:underline">
                        {point.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Hours: {point.hours}</span>
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${point.phone}`}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition font-semibold whitespace-nowrap"
                >
                  Call
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 bg-blue-50 dark:bg-blue-950/20 border-2 border-blue-300 rounded-xl p-4 sm:p-6">
          <h3 className={`text-blue-800 dark:text-blue-200 mb-3 ${largeText ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
            💡 Emergency Hotlines
          </h3>
          <div className={`space-y-2 text-blue-700 dark:text-blue-300 ${largeText ? 'text-xl sm:text-2xl' : 'text-sm sm:text-base'}`}>
            <p>🚨 Police Hotline: 117</p>
            <p>🚑 Ambulance/Medical: 911 / 1162</p>
            <p>🔥 Fire Emergency: 114</p>
            <p>📱 All Emergency: 911</p>
          </div>
        </div>
      </div>
    </div>
  );
}
