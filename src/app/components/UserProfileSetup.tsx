import { useState } from 'react';
import { ArrowLeft, User, Heart, AlertTriangle, Phone, ArrowRight, Camera, MapPin, Mail, ClipboardCheck, Accessibility, Eye, Brain, Sparkles } from 'lucide-react';

interface UserProfile {
  name: string;
  dob: string;
  gender: string;
  photo: string | null;
  homeAddress: string;
  barangay: string;
  mobileNumber: string;
  email: string;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhone: string;
  disabilityType: string;
  disabilitySeverity: string;
  specialNeeds: string;
  bloodType: string;
  allergies: string;
}

interface UserProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  onSkip: () => void;
  onBack?: () => void;
  initialProfile?: UserProfile | null;
}

export function UserProfileSetup({ onComplete, onSkip, onBack, initialProfile }: UserProfileSetupProps) {
  const [profile, setProfile] = useState<UserProfile>(initialProfile || {
    name: '',
    dob: '',
    gender: '',
    photo: null,
    homeAddress: '',
    barangay: '',
    mobileNumber: '',
    email: '',
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    disabilityType: 'none',
    disabilitySeverity: 'Mild',
    specialNeeds: '',
    bloodType: 'O+',
    allergies: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-4 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        )}
        <div className="text-center mb-6 sm:mb-8">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">USER PROFILE</h1>
          <p className="text-base sm:text-lg text-muted-foreground">BEST INFORMATION SET for faster and safer emergency response</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <ClipboardCheck className="w-6 h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold">Basic Information</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">Purpose: Identification during emergencies</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Full Name</span>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  placeholder="Juan Dela Cruz"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Age / Date of Birth</span>
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Gender</span>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </label>

              <label className="space-y-2 col-span-1 sm:col-span-2">
                <span className="text-sm font-medium">Profile Photo (optional)</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="w-full" />
                {profile.photo && (
                  <img src={profile.photo} alt="Profile" className="mt-3 w-32 h-32 rounded-xl object-cover" />
                )}
              </label>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold">Location Information</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">Important for: Faster response & dispatch</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Home Address</span>
                <input
                  type="text"
                  value={profile.homeAddress}
                  onChange={(e) => setProfile({ ...profile, homeAddress: e.target.value })}
                  placeholder="123 Barangay Road"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Barangay</span>
                <input
                  type="text"
                  value={profile.barangay}
                  onChange={(e) => setProfile({ ...profile, barangay: e.target.value })}
                  placeholder="Barangay Poblacion"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">GPS will be auto-detected during report submission.</p>
          </section>

          <section className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Phone className="w-6 h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold">Contact Information</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">Used when: User cannot communicate</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Mobile Number</span>
                <input
                  type="tel"
                  value={profile.mobileNumber}
                  onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })}
                  placeholder="+63 912 345 6789"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Email (optional)</span>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  placeholder="example@mail.com"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Emergency Contact Person</span>
                <input
                  type="text"
                  value={profile.emergencyContactName}
                  onChange={(e) => setProfile({ ...profile, emergencyContactName: e.target.value })}
                  placeholder="Maria Dela Cruz"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Relationship</span>
                <input
                  type="text"
                  value={profile.emergencyContactRelationship}
                  onChange={(e) => setProfile({ ...profile, emergencyContactRelationship: e.target.value })}
                  placeholder="Mother, Sister, Friend"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium">Phone Number</span>
                <input
                  type="tel"
                  value={profile.emergencyContactPhone}
                  onChange={(e) => setProfile({ ...profile, emergencyContactPhone: e.target.value })}
                  placeholder="+63 917 654 3210"
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                  required
                />
              </label>
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Accessibility className="w-6 h-6 text-primary" />
              <h2 className="text-xl sm:text-2xl font-semibold">Disability Information</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">This is your SYSTEM’S CORE FEATURE</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium">Type of Disability</span>
                <select
                  value={profile.disabilityType}
                  onChange={(e) => setProfile({ ...profile, disabilityType: e.target.value })}
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                >
                  <option value="none">None</option>
                  <option value="visual">Visual 👁️</option>
                  <option value="auditory">Auditory 👂</option>
                  <option value="motor">Motor 🖐️</option>
                  <option value="cognitive">Cognitive 🧠</option>
                  <option value="multiple">Multiple</option>
                </select>
              </label>

              <label className="space-y-2">
                <span className="text-sm font-medium">Severity (optional)</span>
                <select
                  value={profile.disabilitySeverity}
                  onChange={(e) => setProfile({ ...profile, disabilitySeverity: e.target.value })}
                  className="w-full bg-input-background border border-border rounded-lg p-3"
                >
                  <option>Mild</option>
                  <option>Moderate</option>
                  <option>Severe</option>
                </select>
              </label>
            </div>

            <label className="space-y-2 mt-4">
              <span className="text-sm font-medium">Special Needs</span>
              <textarea
                value={profile.specialNeeds}
                onChange={(e) => setProfile({ ...profile, specialNeeds: e.target.value })}
                placeholder="Needs wheelchair, Cannot speak, Needs assistance walking"
                className="w-full bg-input-background border border-border rounded-lg p-3 min-h-[100px]"
              />
            </label>
          </section>


          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground rounded-xl p-4 sm:p-5 flex items-center justify-center gap-3 hover:bg-primary/90 transition text-lg sm:text-xl"
            >
              {initialProfile ? 'Update Profile' : 'Save Profile'}
              <ArrowRight className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={onSkip}
              className="sm:w-auto px-6 bg-secondary text-secondary-foreground rounded-xl p-4 sm:p-5 hover:bg-secondary/80 transition text-lg sm:text-xl"
            >
              Skip for Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
