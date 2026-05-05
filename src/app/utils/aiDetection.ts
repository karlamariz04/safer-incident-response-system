export type PriorityLevel = 'high' | 'medium' | 'low';

interface DetectionResult {
  priority: PriorityLevel;
  detectedKeywords: string[];
  suggestedType: string;
}

export function detectEmergencyPriority(
  message: string,
  emergencyType: string
): DetectionResult {
  const lowerMessage = message.toLowerCase();

  const highPriorityKeywords = [
    'bleeding', 'blood', 'unconscious', 'not breathing', 'chest pain',
    'heart attack', 'stroke', 'seizure', 'burning', 'flames', 'smoke',
    'gunshot', 'stabbed', 'accident', 'crash', 'drowning', 'choking',
    'severe', 'critical', 'dying', 'help', 'emergency', 'urgent'
  ];

  const mediumPriorityKeywords = [
    'pain', 'injured', 'hurt', 'fever', 'broken', 'fracture',
    'dizzy', 'nausea', 'vomiting', 'fall', 'cut', 'wound'
  ];

  const detectedKeywords: string[] = [];
  let priority: PriorityLevel = 'low';

  // Check for high priority keywords
  for (const keyword of highPriorityKeywords) {
    if (lowerMessage.includes(keyword)) {
      detectedKeywords.push(keyword);
      priority = 'high';
    }
  }

  // Check for medium priority if not already high
  if (priority !== 'high') {
    for (const keyword of mediumPriorityKeywords) {
      if (lowerMessage.includes(keyword)) {
        detectedKeywords.push(keyword);
        priority = 'medium';
      }
    }
  }

  // Auto-detect emergency type based on keywords
  let suggestedType = emergencyType;
  if (lowerMessage.includes('fire') || lowerMessage.includes('burning') || lowerMessage.includes('smoke')) {
    suggestedType = 'fire';
    priority = 'high';
  } else if (lowerMessage.includes('ambulance') || lowerMessage.includes('medical') ||
             lowerMessage.includes('heart') || lowerMessage.includes('bleeding')) {
    suggestedType = 'medical';
    priority = 'high';
  } else if (lowerMessage.includes('police') || lowerMessage.includes('crime') ||
             lowerMessage.includes('theft') || lowerMessage.includes('assault')) {
    suggestedType = 'police';
  }

  // Fire and severe medical are always high priority
  if (emergencyType === 'fire' ||
      (emergencyType === 'medical' && detectedKeywords.length > 0)) {
    priority = 'high';
  }

  return {
    priority,
    detectedKeywords,
    suggestedType,
  };
}

export function generateNearestFacility(emergencyType: string): string {
  const facilities = {
    medical: [
      'Paluan Rural Health Unit',
      'Occidental Mindoro Provincial Hospital (32km)',
      'Barangay Health Station - Poblacion'
    ],
    fire: [
      'Paluan Fire Station',
      'MDRRMO Paluan',
      'Barangay Fire Brigade'
    ],
    police: [
      'Paluan Police Station',
      'Barangay Tanod - Poblacion',
      'PNP Municipal Station'
    ],
    other: [
      'MDRRMO Paluan',
      'Municipal Hall',
      'Barangay Hall - Poblacion'
    ]
  };

  const facilityList = facilities[emergencyType as keyof typeof facilities] || facilities.other;
  return facilityList[0];
}
