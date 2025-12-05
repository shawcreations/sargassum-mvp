import { useEffect, useState } from 'react';
import { fetchBeaches } from '../lib/api';

const kpiData = [
  { label: 'Total Beaches', value: '24', icon: '🏖️', color: 'bg-blue-500/20 text-blue-400' },
  { label: 'Active Campaigns', value: '3', icon: '📋', color: 'bg-emerald-500/20 text-emerald-400' },
  { label: 'Pending Tasks', value: '12', icon: '✅', color: 'bg-yellow-500/20 text-yellow-400' },
  { label: 'Tons Collected', value: '45.2', icon: '♻️', color: 'bg-purple-500/20 text-purple-400' },
];

export default function Dashboard() {
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBeaches();
        setBeaches(data);
      } catch (error) {
        console.error('Failed to fetch beaches:', error);
        // Use sample data if API fails
        setBeaches([
          { id: 1, name: 'Kingstown Beach', island: 'St. Vincent', tourism_importance: 4 },
          { id: 2, name: 'Villa Beach', island: 'St. Vincent', tourism_importance: 5 },
          { id: 3, name: 'Indian Bay', island: 'St. Vincent', tourism_importance: 4 },
          { id: 4, name: 'Princess Margaret Beach', island: 'Bequia', tourism_importance: 5 },
        ]);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Overview of sargassum management operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <div key={index} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">{kpi.label}</p>
                <p className="text-3xl font-bold text-white mt-1">{kpi.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${kpi.color}`}>
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Priority Beaches Table */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Priority Beaches</h2>
          <a href="/map" className="text-emerald-400 hover:text-emerald-300 text-sm">
            View on Map →
          </a>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Beach Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Island</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Tourism Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                </tr>
              </thead>
              <tbody>
                {beaches.slice(0, 5).map((beach) => (
                  <tr key={beach.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3 px-4 text-white">{beach.name}</td>
                    <td className="py-3 px-4 text-slate-300">{beach.island || 'St. Vincent'}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < beach.tourism_importance ? 'text-yellow-400' : 'text-slate-600'}>
                            ★
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 text-xs rounded-full bg-emerald-500/20 text-emerald-400">
                        Monitored
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { action: 'Campaign started', detail: 'Kingstown Beach Cleanup', time: '2 hours ago', icon: '🚀' },
              { action: 'Task completed', detail: 'Villa Beach survey', time: '5 hours ago', icon: '✅' },
              { action: 'Beach added', detail: 'Lower Bay, Bequia', time: '1 day ago', icon: '🏖️' },
              { action: 'Report generated', detail: 'Weekly sargassum report', time: '2 days ago', icon: '📊' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4">
                <span className="text-xl">{activity.icon}</span>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-slate-400 text-xs">{activity.detail}</p>
                </div>
                <span className="text-xs text-slate-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Upcoming Tasks</h2>
          <div className="space-y-3">
            {[
              { task: 'Survey Indian Bay', date: 'Tomorrow', priority: 'high' },
              { task: 'Cleanup Villa Beach', date: 'Jan 20', priority: 'medium' },
              { task: 'Equipment maintenance', date: 'Jan 22', priority: 'low' },
              { task: 'Team briefing', date: 'Jan 25', priority: 'medium' },
            ].map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <div>
                  <p className="text-white text-sm">{task.task}</p>
                  <p className="text-slate-400 text-xs">{task.date}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-500/20 text-slate-400'
                }`}>
                  {task.priority}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

