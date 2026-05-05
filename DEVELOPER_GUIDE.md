# 👨‍💻 Developer Guide - One-Tap Emergency Reporting System

## 📚 Quick Start for Developers

### Prerequisites
- Node.js 16+
- npm or pnpm
- Git
- Code editor (VS Code recommended)

### Setup
```bash
# Navigate to project
cd "c:\Users\Admin\Downloads\One-Tap Emergency Reporting"

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:5174
```

---

## 🏗️ Project Structure

```
src/
├── app/
│   ├── App.tsx                    # Main app with routing
│   ├── components/
│   │   ├── AccessibilityControls.tsx
│   │   ├── AnalyticsDashboard.tsx
│   │   ├── ConfirmationScreen.tsx      # ✅ ENHANCED
│   │   ├── EmergencyButton.tsx
│   │   ├── HelpPointsScreen.tsx        # 🆕 NEW
│   │   ├── HomeScreen.tsx               # ✅ ENHANCED
│   │   ├── IncidentHeatmap.tsx
│   │   ├── Logo.tsx
│   │   ├── MapPreview.tsx              # 🆕 NEW
│   │   ├── ReportScreen.tsx            # ✅ ENHANCED
│   │   ├── ResponderDashboard.tsx
│   │   ├── SimpleModeToggle.tsx
│   │   ├── SignLanguageSupport.tsx     # 🆕 NEW
│   │   ├── UserProfileSetup.tsx        # ✅ ENHANCED
│   │   ├── VoiceReporter.tsx           # ✅ ENHANCED
│   │   ├── WelcomeScreen.tsx
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   └── ui/
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── ... (50+ shadcn/ui components)
│   │       └── utils.ts
│   ├── utils/
│   │   └── aiDetection.ts          # AI keyword detection
│   └── styles/
│       ├── globals.css
│       ├── fonts.css
│       ├── theme.css
│       ├── tailwind.css
│       └── index.css
├── main.tsx
└── vite-env.d.ts

package.json
tailwind.config.js
postcss.config.mjs
vite.config.ts
tsconfig.json
```

---

## 🔑 Key Components Explained

### 1. App.tsx - Main Router
```typescript
type Screen = 'welcome' | 'profile' | 'home' | 'report' | 
              'confirmation' | 'dashboard' | 'editProfile' | 'help';

// Routes between screens
// Manages global state: profile, voice, contrast, text size
// Handles voice emergency detection
```

### 2. ReportScreen.tsx - Emergency Report Collection
```typescript
// ✅ ENHANCED Features:
- getSmartTips(type: string) -> string[]  // Context-aware tips
- detectEmergencyPriority()                 // AI detection
- MapPreview component                      // Location display
- Photo upload
- Message input
```

### 3. VoiceReporter.tsx - Voice Recognition
```typescript
// ✅ ENHANCED Features:
- Continuous listening mode
- Real-time transcription display
- 25+ keyword detection
- Error handling & auto-restart
- Popup showing current transcription
```

### 4. MapPreview.tsx - Location Display
```typescript
// 🆕 NEW Component
- Leaflet map with marker
- Coordinates popup
- GPS location display
- Mobile responsive (192px height)
- Graceful fallback
```

### 5. HelpPointsScreen.tsx - Help Directory
```typescript
// 🆕 NEW Component
- 5+ emergency service locations
- Color-coded by type
- Clickable phone numbers
- Emergency hotlines
- Mobile-optimized grid
```

### 6. SignLanguageSupport.tsx - Accessibility
```typescript
// 🆕 NEW Component
- 4 key emergency messages
- Visual emoji indicators
- Step-by-step instructions
- Only shows for auditory users
- Responsive layout
```

---

## 🎨 Styling System

### Tailwind CSS Classes Used
- **Colors**: Primary, secondary, destructive, muted, etc.
- **Spacing**: p-4 (mobile), sm:p-6 (tablet), responsive padding
- **Text**: text-sm, sm:text-base (responsive sizes)
- **Icons**: w-5 h-5 (mobile), sm:w-6 sm:h-6 (larger screens)
- **Responsive**: Mobile-first with sm: and lg: breakpoints

### Dark Mode
- Uses `dark:` prefix (e.g., `dark:bg-gray-800`)
- Applied via `classList.add('dark')`
- Works across all components

### Custom Theme
- See `src/styles/theme.css`
- CSS variables for consistent colors
- Accessible color palette

---

## 🎤 Voice Recognition Integration

### How It Works:
```typescript
// 1. User enables voice in accessibility controls
// 2. VoiceReporter component activates
// 3. Browser Web Speech API starts listening
// 4. Keywords detected trigger emergency type
// 5. User redirected to report screen
// 6. Voice transcription shown in real-time
```

### Adding New Keywords:
```typescript
// In VoiceReporter.tsx
const emergencyKeywords = {
  fire: ['fire', 'burning', 'smoke', 'flames', 'house on fire'],
  // Add more keywords here...
};
```

### Browser Compatibility:
- ✅ Chrome/Edge (webkit prefixed)
- ✅ Firefox (webkit prefixed)
- ✅ Safari (webkit prefixed)
- ❌ Not supported: IE11

---

## 🗺️ Map Integration

### Leaflet Setup:
```typescript
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default markers (required)
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '...',
  iconUrl: '...',
  shadowUrl: '...',
});
```

### Map Features:
```typescript
<MapContainer
  center={[location.lat, location.lng]}
  zoom={15}
  style={{ height: '100%', width: '100%' }}
  zoomControl={false}
  attributionControl={false}
>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  <Marker position={[location.lat, location.lng]}>
    <Popup>Coordinates popup</Popup>
  </Marker>
</MapContainer>
```

### Adding More Tile Providers:
- OpenStreetMap (current)
- Mapbox (requires API key)
- Stamen Terrain
- CartoDB Positron

---

## 👤 Medical Profile System

### Profile Data Structure:
```typescript
interface UserProfile {
  name: string;
  bloodType: string;
  allergies: string;
  disabilityType: string;
  emergencyContact: string;
  emergencyContactName: string;
}
```

### Profile States in App:
```typescript
// State management
const [userProfile, setUserProfile] = useState<any>(null);

// Update profile
const handleUpdateProfile = (profile: any) => {
  setUserProfile(profile);
  setCurrentScreen('home');
};

// Include in reports
reportData.userProfile = userProfile;
```

### Disability Type Options:
```typescript
'none' | 'visual' | 'auditory' | 'motor' | 'cognitive' | 'multiple'
```

### Using Profile Data:
```typescript
// Auto-fill in reports
<p>Emergency Contact: {userProfile?.emergencyContactName}</p>

// Show sign language for auditory users
{reportData.userProfile?.disabilityType === 'auditory' && (
  <SignLanguageSupport ... />
)}
```

---

## 🆘 Help Points Data

### Current Locations (Philippines):
```typescript
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
  // More locations...
];
```

### How to Add Locations:
1. Add to `helpPoints` array in `HelpPointsScreen.tsx`
2. Update distance calculation
3. Add appropriate icon (Police, Medical, Fire, etc.)
4. Use correct phone number format

### Color Coding:
- Police: `text-yellow-600`
- Medical: `text-blue-600`
- Fire: `text-red-600`
- Community: `text-green-600`

---

## 💡 Smart Tips System

### How Tips Work:
```typescript
// In ReportScreen.tsx
const getSmartTips = (type: string): string[] => {
  const tips = {
    medical: [
      "Stay calm and assess the situation safely",
      "If unconscious, check for breathing and pulse",
      // ...
    ],
    fire: [
      "Get out and stay out - do not go back inside",
      // ...
    ],
    // ...
  };
  return tips[type as keyof typeof tips] || tips.other;
};

// Display
{getSmartTips(emergencyType).slice(0, 4).map((tip, index) => (
  <li key={index} className="flex items-start gap-2">
    <span className="text-yellow-600 mt-1">•</span>
    <span>{tip}</span>
  </li>
))}
```

### Adding New Tips:
1. Edit `getSmartTips()` function in `ReportScreen.tsx`
2. Add emergency type with array of tips
3. Tips auto-display (up to 4 shown)
4. Mobile responsive automatically

---

## ♿ Accessibility Features

### Large Text Mode:
```typescript
// Passed throughout component tree
{largeText ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}
```

### High Contrast:
```typescript
// In App.tsx
<div className={`min-h-screen ${highContrast ? 'contrast-125' : ''}`}>
```

### Dark Mode:
```typescript
// In AccessibilityControls
if (darkMode) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
```

### Keyboard Navigation:
- Tab through interactive elements
- Enter to activate buttons
- Space for toggles

### Screen Reader Support:
```typescript
<button
  aria-label="Toggle voice commands"
  title="Voice Commands"
>
  <Mic className="w-5 h-5" />
</button>
```

---

## 🔄 State Management

### Global State (App.tsx):
```typescript
const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
const [emergencyType, setEmergencyType] = useState('');
const [reportData, setReportData] = useState<ReportData | null>(null);
const [voiceEnabled, setVoiceEnabled] = useState(false);
const [highContrast, setHighContrast] = useState(false);
const [largeText, setLargeText] = useState(false);
const [simpleMode, setSimpleMode] = useState(false);
const [userProfile, setUserProfile] = useState<any>(null);
```

### State Flow:
```
User selects emergency 
  → Sets emergencyType
  → Sets currentScreen to 'report'
  → ReportScreen reads emergencyType
  → User submits
  → Sets reportData
  → Sets currentScreen to 'confirmation'
```

---

## 🧪 Testing Recommendations

### Unit Tests:
- `aiDetection.ts` - Keyword detection
- `VoiceReporter.tsx` - Voice recognition
- `MapPreview.tsx` - Map rendering

### Integration Tests:
- Emergency flow (select → report → confirm)
- Voice to report conversion
- Profile creation and update
- Help points loading

### E2E Tests:
- Complete user journey
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility compliance

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All tests passing
- [ ] Build successful (`npm run build`)
- [ ] No console errors
- [ ] Map tiles loading from CDN
- [ ] Voice API working in target browsers
- [ ] Mobile responsive verified
- [ ] Accessibility tested with screen reader
- [ ] HTTPS configured
- [ ] API endpoints configured (if needed)
- [ ] Environment variables set
- [ ] Database migrations done (if applicable)

---

## 🔗 External APIs Used

### Web APIs:
- **Geolocation API**: Get user GPS location
- **Web Speech API**: Voice recognition
- **FileReader API**: Photo upload handling
- **localStorage**: Store app state (optional)

### Third-Party Libraries:
- **Leaflet**: Interactive maps
- **Radix UI**: Accessible components
- **Lucide**: 50+ icons

### CDN/External Services:
- **OpenStreetMap**: Map tiles (free)
- **Mapbox** (optional): Premium maps

---

## 📝 Common Tasks

### Add New Emergency Type:
1. Update `Screen` type in App.tsx
2. Add to emergency types on HomeScreen
3. Add tips in ReportScreen
4. Add keywords in VoiceReporter
5. Add help points if applicable

### Customize Colors:
1. Edit `src/styles/theme.css`
2. Update Tailwind colors in `tailwind.config.js`
3. Find/replace color classes in components
4. Test in dark mode

### Update Help Points:
1. Edit `helpPoints` array in `HelpPointsScreen.tsx`
2. Add/remove locations
3. Update distances if needed
4. Maintain color coding

### Modify Accessibility:
1. Edit `AccessibilityControls.tsx` for controls
2. Update components to respect `largeText` prop
3. Test with screen reader
4. Verify color contrast

---

## 🐛 Troubleshooting

### Map Not Showing
```typescript
// Check if markers are loading
// Fix: May need to reload marker icons
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
```

### Voice Not Working
```typescript
// Check browser support
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  // Supported
}
// Note: Doesn't work in IE11 or some older browsers
```

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Responsive Issues
- Check breakpoint: sm: (640px), lg: (1024px)
- Use `sm:` prefix for tablet+ screens
- Test on actual devices

---

## 📚 Documentation Links

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Leaflet Documentation](https://leafletjs.com)
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Radix UI Components](https://www.radix-ui.com/docs/primitives/overview/introduction)

---

## 💬 Support

For issues or questions:
1. Check IMPLEMENTATION_SUMMARY.md
2. Review QUICK_REFERENCE.md
3. Check component comments
4. Review git commit history

---

**Last Updated**: May 5, 2026
**Version**: 1.1.0
**Status**: ✅ Production Ready
