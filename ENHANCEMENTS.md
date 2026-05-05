# 🚨 One-Tap Emergency Reporting System - Enhanced Version

## ✨ New Features Added

### 1. **Smart Tips for Each Emergency Type**
- Context-specific safety guidance for:
  - **Medical emergencies**: CPR, bleeding control, unconscious person care
  - **Fire emergencies**: Evacuation procedures, smoke safety, clothing fire response
  - **Police emergencies**: Suspect descriptions, personal safety, evidence preservation
  - **Other emergencies**: General emergency protocols
- Tips display on the report screen to guide users during critical moments

### 2. **Interactive Map Preview with Leaflet.js**
- Real-time location display on an interactive map
- Shows user's GPS coordinates visually
- Works seamlessly with mobile and desktop views
- Map appears on the Report Screen for location confirmation
- Uses OpenStreetMap tiles for reliable coverage

### 3. **Enhanced Voice Recognition System**
- **Improved accuracy**: Better keyword detection for emergency types
- **Continuous listening mode**: Automatically restarts recognition when idle
- **Real-time transcription display**: Shows what the system is hearing
- **Multi-keyword support**: 
  - Fire: "fire", "burning", "smoke", "flames", "house on fire"
  - Medical: "ambulance", "help", "hurt", "injured", "heart attack", "stroke"
  - Police: "police", "crime", "theft", "assault", "robbery"
- **Transcription feedback**: Visual indicator showing recognized text

### 4. **Sign Language Support for Auditory Disabilities**
- Dedicated component with visual sign language guides
- Includes 4 key emergency messages:
  - 🤝 "Help is Coming" - reassure the user
  - 🧘‍♀️ "Stay Calm" - guidance during crisis
  - 🙋 "Help" - signal for assistance
  - 🚨 "Emergency" - alert others to urgency
- Step-by-step visual instructions for each sign
- Displays on confirmation screen for users with auditory disabilities
- Supports both responders and users with hearing impairments

### 5. **Medical Profile Management**
- **Profile creation**: Set up during initial setup or anytime
- **Profile editing**: Edit medical info from home screen (user icon in top-right)
- **Key information**:
  - Full name
  - Blood type (O+, O-, A+, A-, B+, B-, AB+, AB-)
  - Allergies and medical conditions
  - Disability type
  - Emergency contact details
- **Disability types supported**:
  - No disability
  - Visual impairment
  - Auditory impairment
  - Motor disability
  - Cognitive disability
  - Multiple disabilities
- **Integrated into reports**: Medical info automatically includes profile data

### 6. **Help Points Directory**
- Find nearby emergency services and help centers
- Includes 5+ locations with:
  - **Name and type** (Police, Medical, Fire, Community)
  - **Distance from location**
  - **Phone number** (clickable to call)
  - **Address**
  - **Operating hours**
  - **Color-coded categories** for quick identification
- **Emergency hotlines section**:
  - Police: 117
  - Ambulance/Medical: 911, 1162
  - Fire: 114
  - All Emergency: 911
- Accessible from home screen with purple "Help Points" button
- Mobile-optimized layout with larger touch targets
- Fully responsive design for all screen sizes

### 7. **Mobile-Optimized Design**
- **Responsive breakpoints**:
  - Small screens (mobile): Optimized touch targets
  - Medium screens (tablets): Balanced layout
  - Large screens (desktop): Full feature display
- **Touch-friendly UI**:
  - Large buttons (min 48px × 48px)
  - Proper spacing between elements
  - Vertical scrolling on smaller screens
  - Reduced padding on mobile, expanded on desktop
- **Text scaling**:
  - Large text mode for accessibility
  - Proportional sizing across all components
  - Readable fonts for all ages

## 🎤 Voice System Features

### Voice Recognition Accuracy
- Multi-keyword detection system
- Language set to English (US) for better accuracy
- Interim and final transcription support
- Error handling and recovery
- Continuous listening with auto-restart

### Supported Voice Commands
```
Fire Emergency:
  "fire", "burning", "smoke", "flames", "house on fire"

Medical Emergency:
  "ambulance", "medical", "help", "hurt", "injured", "sick", 
  "pain", "bleeding", "unconscious", "heart attack", "stroke"

Police Emergency:
  "police", "crime", "theft", "assault", "attack", "stolen", 
  "burglary", "robbery", "danger", "threat"

General Help:
  "help", "emergency", "accident", "problem"
```

## ♿ Accessibility Features

### For Users with Visual Impairments
- High contrast mode
- Large text option (1.5x scaling)
- Dark mode support
- Proper ARIA labels on all buttons
- Semantic HTML structure

### For Users with Auditory Impairments
- Sign language support component
- Visual indicators for all sounds/alerts
- Text-based emergency information
- Video placeholders for sign language guides

### For Users with Motor Disabilities
- Large touch targets (minimum 48×48px)
- Keyboard navigation support
- Simple mode with reduced content
- One-tap emergency buttons

### For Users with Cognitive Disabilities
- Simple mode with clear instructions
- High contrast option
- Large text option
- Guided step-by-step process
- Clear visual hierarchy

## 🏠 Home Screen Features

### Emergency Type Selection
- 4 main emergency categories with clear icons:
  - 🚑 Medical (Blue)
  - 🔥 Fire (Red)
  - 👮 Police (Yellow)
  - ⚠️ Other (Orange)
  - 🆘 Help Points (Purple) - NEW!

### Quick Access
- Voice command instructions
- Simple mode toggle
- Profile management button
- Accessibility controls (top-right corner)

## 📊 Report Screen Enhancements

### Information Collected
- Emergency type with color coding
- AI-detected priority level with keywords
- Nearest facility recommendation
- **Smart tips** specific to emergency type
- **Location map** showing user's position
- Additional details/message
- Optional photo upload

### AI Detection System
Analyzes messages for:
- **High-priority keywords**: Bleeding, unconscious, chest pain, burning, gunshot, etc.
- **Medium-priority keywords**: Pain, injured, fever, broken bone, dizzy, vomiting
- **Emergency type suggestion**: Auto-detects from content
- **Priority classification**: High, Medium, Low

## ✅ Confirmation Screen Features

### Real-time Information
- Help confirmation with visual feedback
- Estimated arrival time (3-5 min for high priority)
- Assigned responder details
- Complete report summary
- Emergency contact notification status
- **Sign language support** (for auditory disabilities)

### Integration
- Medical profile information display
- Disability accommodations shown
- Location and facility information
- Priority level with color coding

## 🛠️ Technology Stack

### Frontend Framework
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool and dev server

### Maps & Location
- **Leaflet 1.9.x** - Interactive maps
- **React-Leaflet 4.2.1** - React integration
- **OpenStreetMap** - Map tiles

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Tailwind CSS 4.1.12** - Styling

### Speech Recognition
- **Web Speech API** - Browser-native speech recognition
- Multi-language support
- Continuous recognition mode

## 📱 Responsive Breakpoints

```
Mobile (< 640px):
- Single column layout
- Reduced padding (4px - 16px)
- Smaller text and icons
- Touch-optimized buttons

Tablet (640px - 1024px):
- Balanced spacing
- Medium text sizes
- Two-column grids where applicable

Desktop (> 1024px):
- Full-width layouts
- Generous padding (32px+)
- Larger text and icons
```

## 🚀 Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

Server runs at: `http://localhost:5173` or `http://localhost:5174`

### Build
```bash
npm run build
```

## 🎯 User Flows

### Emergency Reporting Flow
1. Select emergency type or use voice command
2. View auto-populated smart tips
3. Confirm location on map
4. Add details and optional photo
5. Review and submit report
6. Receive confirmation with help arrival estimate
7. See sign language support (if applicable)

### Profile Management Flow
1. Create profile during initial setup
2. Edit anytime from home screen (user icon)
3. Update medical information
4. Confirm disability type for accommodations

### Help Points Flow
1. Tap "Help Points" button on home screen
2. View nearby emergency services
3. See distance, phone, hours, address
4. Call directly from the app
5. View emergency hotline numbers

## 🎨 Design Features

### Color Scheme
- Medical: Blue (#3B82F6)
- Fire: Red (#DC2626)
- Police: Yellow (#CA8A04)
- Other: Orange (#EA580C)
- Help Points: Purple (#A855F7)

### Typography
- Large text: 1.5x scaling available
- High contrast: Enhanced visibility option
- Dark mode: Full dark theme support

## ✨ Smart Features

### AI-Powered Keyword Detection
- Analyzes user input for emergency severity
- Suggests appropriate facility type
- Calculates priority level
- Shows detected keywords to user

### Context-Aware Guidance
- Different tips for each emergency type
- Mobile-first design approach
- Accessibility-first development
- Progressive enhancement

## 📞 Emergency Hotlines (Philippines)
- Police: 117
- Ambulance: 911 / 1162
- Fire: 114
- All Emergencies: 911

## 🔐 Privacy & Security
- GPS location only sent with explicit report
- No tracking between sessions
- Medical data stored locally
- Emergency data for responders only

## 🌍 Multi-language Ready
- Currently English (US)
- Easy to add new languages
- Sign language is universal

## 📈 Future Enhancements
- Multiple language support
- Video call integration with responders
- Real-time responder tracking
- Offline mode support
- Integration with local emergency services APIs
- Advanced AI with image analysis
- Community safety features
- Incident history and analytics

## 🤝 Contributing
This is an open-source emergency reporting system designed to save lives and improve emergency response times.

## 📄 License
See ATTRIBUTIONS.md for credits and licenses
