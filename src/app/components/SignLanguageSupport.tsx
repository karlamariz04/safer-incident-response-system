import { X } from 'lucide-react';

interface SignLanguageSupportProps {
  disabilityType?: string;
  largeText?: boolean;
}

const signLanguageMessages = [
  {
    id: 'help-coming',
    title: 'Help is Coming',
    description: 'Signal that emergency services are on the way',
    emoji: '🤝',
    instructions: 'Wave hand downward repeatedly from chest level'
  },
  {
    id: 'stay-calm',
    title: 'Stay Calm',
    description: 'Signal to remain calm and composed',
    emoji: '🧘‍♀️',
    instructions: 'Put both hands together at chest level, move down slowly'
  },
  {
    id: 'help',
    title: 'Help',
    description: 'Signal that you need assistance',
    emoji: '🙋',
    instructions: 'Raise one hand high with fingers spread'
  },
  {
    id: 'emergency',
    title: 'Emergency',
    description: 'Signal an urgent situation',
    emoji: '🚨',
    instructions: 'Make "X" shape with arms crossed'
  }
];

export function SignLanguageSupport({ disabilityType, largeText = false }: SignLanguageSupportProps) {
  if (disabilityType !== 'auditory') {
    return null;
  }

  return (
    <div className="w-full">
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl p-4 sm:p-6 mb-6">
        <h3 className={`${largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'} font-bold mb-2`}>
          🤟 Sign Language Support
        </h3>
        <p className={largeText ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'}>
          Visual communication guide for emergency situations
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {signLanguageMessages.map((message) => (
          <div
            key={message.id}
            className="bg-card border-2 border-blue-300 rounded-lg p-4 sm:p-6 hover:shadow-lg transition"
          >
            <div className={`text-6xl sm:text-7xl mb-3`}>{message.emoji}</div>
            <h4 className={`font-bold mb-1 ${largeText ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl'}`}>
              {message.title}
            </h4>
            <p className={`text-muted-foreground mb-3 ${largeText ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'}`}>
              {message.description}
            </p>
            <div className={`bg-blue-50 dark:bg-blue-900/20 border border-blue-300 rounded p-2 ${largeText ? 'text-base sm:text-lg' : 'text-sm'}`}>
              <p className="font-semibold text-blue-700 dark:text-blue-300">How to signal:</p>
              <p className="text-blue-600 dark:text-blue-400">{message.instructions}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
