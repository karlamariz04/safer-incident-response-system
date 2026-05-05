import { useState } from 'react';
import { AlertCircle, MapPin, User, Clock, Eye, X, ChevronRight } from 'lucide-react';
import { Logo } from './Logo';
import { IncidentHeatmap } from './IncidentHeatmap';
import { AnalyticsDashboard } from './AnalyticsDashboard';

interface Incident {
  id: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  location: string;
  time: string;
  pwdType: string;
  status: 'pending' | 'responding' | 'resolved';
  details: string;
  reportData?: { photo?: string | null };
}

interface ResponderDashboardProps {
  incidents: Incident[];
  onUpdateIncident: (updatedIncidents: Incident[]) => void;
  largeText?: boolean;
}

const mockIncidents: Incident[] = [
  {
    id: '001',
    type: 'Medical',
    priority: 'high',
    location: '14.5995° N, 120.9842° E',
    time: '2 minutes ago',
    pwdType: 'Visual Impairment',
    status: 'pending',
    details: 'Patient is unconscious with severe bleeding and requires immediate attention.',
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
  },
];

export function ResponderDashboard({ incidents, onUpdateIncident, largeText = false }: ResponderDashboardProps) {
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [statusDraft, setStatusDraft] = useState<Incident['status']>('pending');
  const [showModal, setShowModal] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'responding':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const openDetails = (incident: Incident) => {
    setActiveIncident(incident);
    setStatusDraft(incident.status);
    setShowModal(true);
  };

  const closeDetails = () => {
    setShowModal(false);
    setActiveIncident(null);
  };

  const updateStatus = () => {
    if (!activeIncident) return;
    const updatedIncidents = incidents.map((item) =>
      item.id === activeIncident.id ? { ...item, status: statusDraft } : item
    );
    onUpdateIncident(updatedIncidents);
    setActiveIncident({ ...activeIncident, status: statusDraft });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <Logo size="small" showTagline={false} />
        </div>
        <div className="mb-6 sm:mb-8">
          <h1 className={largeText ? 'text-4xl sm:text-5xl mb-2' : 'text-3xl sm:text-4xl mb-2'}>Responder</h1>
          <p className={largeText ? 'text-xl sm:text-2xl text-muted-foreground' : 'text-lg sm:text-xl text-muted-foreground'}>
            Real-time incident monitoring and response coordination
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-card border-2 border-red-300 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={largeText ? 'text-base sm:text-lg text-muted-foreground mb-1' : 'text-sm sm:text-base text-muted-foreground mb-1'}>Active Emergencies</p>
                <p className={largeText ? 'text-4xl sm:text-5xl text-red-600' : 'text-3xl sm:text-4xl text-red-600'}>{incidents.filter((item) => item.status !== 'resolved').length}</p>
              </div>
              <AlertCircle className={largeText ? 'w-12 h-12 sm:w-14 sm:h-14 text-red-600' : 'w-10 h-10 sm:w-12 sm:h-12 text-red-600'} />
            </div>
          </div>

          <div className="bg-card border-2 border-blue-300 rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={largeText ? 'text-base sm:text-lg text-muted-foreground mb-1' : 'text-sm sm:text-base text-muted-foreground mb-1'}>In Response</p>
                <p className={largeText ? 'text-4xl sm:text-5xl text-blue-600' : 'text-3xl sm:text-4xl text-blue-600'}>{incidents.filter((item) => item.status === 'responding').length}</p>
              </div>
              <Eye className={largeText ? 'w-12 h-12 sm:w-14 sm:h-14 text-blue-600' : 'w-10 h-10 sm:w-12 sm:h-12 text-blue-600'} />
            </div>
          </div>

          <div className="bg-card border-2 border-green-300 rounded-xl p-4 sm:p-6 sm:col-span-2 md:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className={largeText ? 'text-base sm:text-lg text-muted-foreground mb-1' : 'text-sm sm:text-base text-muted-foreground mb-1'}>Avg Response Time</p>
                <p className={largeText ? 'text-4xl sm:text-5xl text-green-600' : 'text-3xl sm:text-4xl text-green-600'}>7m</p>
              </div>
              <Clock className={largeText ? 'w-12 h-12 sm:w-14 sm:h-14 text-green-600' : 'w-10 h-10 sm:w-12 sm:h-12 text-green-600'} />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-primary text-primary-foreground p-4 sm:p-6">
            <h2 className={largeText ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl'}>Live Incident Feed</h2>
          </div>

          <div className="divide-y divide-border">
            {incidents.map((incident) => (
              <div key={incident.id} className="p-4 sm:p-6 hover:bg-muted/50 transition">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4 mb-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                    <div
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${getPriorityColor(
                        incident.priority
                      )}`}
                    >
                      {incident.priority.toUpperCase()} PRIORITY
                    </div>
                    <div className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${getStatusColor(incident.status)}`}>
                      {incident.status.toUpperCase()}
                    </div>
                  </div>
                  <span className={largeText ? 'text-sm sm:text-base text-muted-foreground' : 'text-xs sm:text-sm text-muted-foreground'}>{incident.time}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className={largeText ? 'text-sm sm:text-base text-muted-foreground' : 'text-xs sm:text-sm text-muted-foreground'}>Incident Type</p>
                      <p className={largeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}>{incident.type}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className={largeText ? 'text-sm sm:text-base text-muted-foreground' : 'text-xs sm:text-sm text-muted-foreground'}>Location</p>
                      <p className={largeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}>{incident.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className={largeText ? 'text-sm sm:text-base text-muted-foreground' : 'text-xs sm:text-sm text-muted-foreground'}>User Needs</p>
                      <p className={largeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}>{incident.pwdType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3">
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className={largeText ? 'text-sm sm:text-base text-muted-foreground' : 'text-xs sm:text-sm text-muted-foreground'}>Incident ID</p>
                      <p className={largeText ? 'text-base sm:text-lg' : 'text-sm sm:text-base'}>#{incident.id}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => openDetails(incident)}
                    className={largeText ? 'px-6 sm:px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-base sm:text-lg flex items-center justify-center gap-2' : 'px-4 sm:px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition text-sm sm:text-base flex items-center justify-center gap-2'}
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => openDetails(incident)}
                    className={largeText ? 'px-6 sm:px-8 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition text-base sm:text-lg flex items-center justify-center gap-2' : 'px-4 sm:px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition text-sm sm:text-base flex items-center justify-center gap-2'}
                  >
                    <ChevronRight className="w-4 h-4" />
                    Update Status
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
          <AnalyticsDashboard />
          <IncidentHeatmap />
        </div>
      </div>

      {showModal && activeIncident && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-2xl bg-background border border-border rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border">
              <div>
                <h3 className={largeText ? 'text-2xl sm:text-3xl font-semibold' : 'text-xl sm:text-2xl font-semibold'}>Incident Details #{activeIncident.id}</h3>
                <p className={largeText ? 'text-base text-muted-foreground' : 'text-sm text-muted-foreground'}>{activeIncident.type} emergency • {activeIncident.location}</p>
              </div>
              <button onClick={closeDetails} className="p-2 rounded-full bg-muted hover:bg-muted/80">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-border p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Priority</p>
                  <p className="font-semibold text-base">{activeIncident.priority}</p>
                </div>
                <div className="rounded-xl border border-border p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-base">{activeIncident.status}</p>
                </div>
              </div>

              <div className="rounded-xl border border-border p-4 bg-slate-50 dark:bg-slate-900">
                <p className="text-sm text-muted-foreground mb-2">Reported Details</p>
                <p className="text-sm sm:text-base">{activeIncident.details}</p>
              </div>

              {activeIncident.reportData?.photo && (
                <div className="rounded-xl border border-border p-4 bg-white dark:bg-slate-950">
                  <p className="text-sm text-muted-foreground mb-2">Uploaded Photo</p>
                  <img
                    src={activeIncident.reportData.photo}
                    alt="Incident upload"
                    className="w-full h-auto max-h-72 object-contain rounded-xl"
                  />
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-medium">{activeIncident.location}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">Reported</p>
                  <p className="font-medium">{activeIncident.time}</p>
                </div>
                <div className="rounded-xl border border-border p-4">
                  <p className="text-sm text-muted-foreground">Needs</p>
                  <p className="font-medium">{activeIncident.pwdType}</p>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">Update Incident Status</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(['pending', 'responding', 'resolved'] as Incident['status'][]).map((statusOption) => (
                    <button
                      key={statusOption}
                      type="button"
                      onClick={() => setStatusDraft(statusOption)}
                      className={`rounded-xl border p-3 text-sm font-medium transition ${
                        statusDraft === statusOption
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-foreground'
                      }`}
                    >
                      {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-end mt-4">
                <button
                  type="button"
                  onClick={closeDetails}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-muted text-foreground hover:bg-muted/80 transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={updateStatus}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
