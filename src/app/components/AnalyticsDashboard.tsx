import { BarChart3, Clock, TrendingUp, CheckCircle } from 'lucide-react';

export function AnalyticsDashboard() {
  const stats = [
    { label: 'Total Incidents (30 days)', value: '47', icon: BarChart3, color: 'text-blue-600' },
    { label: 'Avg Response Time', value: '7.2 min', icon: Clock, color: 'text-green-600' },
    { label: 'Resolution Rate', value: '94%', icon: CheckCircle, color: 'text-purple-600' },
    { label: 'PWD Priority Cases', value: '23', icon: TrendingUp, color: 'text-orange-600' },
  ];

  const incidentTypes = [
    { type: 'Medical', count: 18, percentage: 38 },
    { type: 'Fire', count: 12, percentage: 26 },
    { type: 'Police', count: 10, percentage: 21 },
    { type: 'Other', count: 7, percentage: 15 },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.color}`} />
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
            </div>
            <p className="text-2xl sm:text-3xl font-medium">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl mb-4">Incident Breakdown</h3>
        <div className="space-y-3">
          {incidentTypes.map((item, index) => (
            <div key={index}>
              <div className="flex justify-between mb-1">
                <span className="text-sm sm:text-base">{item.type}</span>
                <span className="text-sm sm:text-base">{item.count} ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    item.type === 'Medical' ? 'bg-blue-500' :
                    item.type === 'Fire' ? 'bg-red-500' :
                    item.type === 'Police' ? 'bg-yellow-500' : 'bg-orange-500'
                  }`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
