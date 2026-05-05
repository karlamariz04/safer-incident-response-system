import { MapPin, TrendingUp } from 'lucide-react';

interface HotspotData {
  location: string;
  incidents: number;
  type: string;
}

const mockHotspots: HotspotData[] = [
  { location: 'Poblacion', incidents: 12, type: 'Medical' },
  { location: 'Harrison', incidents: 8, type: 'Fire' },
  { location: 'Marikit', incidents: 6, type: 'Other' },
  { location: 'Lumangbayan', incidents: 5, type: 'Medical' },
  { location: 'Silahis', incidents: 4, type: 'Police' },
];

export function IncidentHeatmap() {
  const maxIncidents = Math.max(...mockHotspots.map(h => h.incidents));

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
        <h2 className="text-xl sm:text-2xl">Incident Hotspots</h2>
      </div>

      <div className="space-y-4">
        {mockHotspots.map((hotspot, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                <span className="text-sm sm:text-base">{hotspot.location}</span>
                <span className="text-xs sm:text-sm text-muted-foreground">
                  ({hotspot.type})
                </span>
              </div>
              <span className="text-sm sm:text-base font-medium">{hotspot.incidents} incidents</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${
                  hotspot.incidents / maxIncidents > 0.7
                    ? 'bg-red-500'
                    : hotspot.incidents / maxIncidents > 0.4
                    ? 'bg-yellow-500'
                    : 'bg-green-500'
                }`}
                style={{ width: `${(hotspot.incidents / maxIncidents) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <p className="text-xs sm:text-sm text-muted-foreground">
          <strong>MDRRMO Insight:</strong> Poblacion area shows highest incident frequency.
          Consider deploying additional responders during peak hours.
        </p>
      </div>
    </div>
  );
}
