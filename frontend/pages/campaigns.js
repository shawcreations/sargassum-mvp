import { useEffect, useState } from 'react';
import { fetchCampaigns } from '../lib/api';

const sampleCampaigns = [
  { id: 1, name: 'Kingstown Beach Cleanup', description: 'Weekly cleanup initiative', start_date: '2024-01-15', end_date: '2024-01-20', status: 'active' },
  { id: 2, name: 'Villa Coast Survey', description: 'Comprehensive survey of sargassum levels', start_date: '2024-01-18', end_date: '2024-01-25', status: 'planned' },
  { id: 3, name: 'Bequia Emergency Response', description: 'Emergency cleanup due to high influx', start_date: '2024-01-10', end_date: '2024-01-14', status: 'completed' },
  { id: 4, name: 'Young Island Monitoring', description: 'Monthly monitoring program', start_date: '2024-02-01', end_date: '2024-02-28', status: 'planned' },
];

const statusColors = {
  active: 'bg-emerald-500/20 text-emerald-400',
  planned: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-slate-500/20 text-slate-400',
};

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data.length > 0 ? data : sampleCampaigns);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        setCampaigns(sampleCampaigns);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Campaigns</h1>
          <p className="text-slate-400 mt-1">Manage cleanup campaigns and operations</p>
        </div>
        <button className="btn-primary">
          + New Campaign
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {['all', 'active', 'planned', 'completed'].map((status) => (
          <button
            key={status}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors capitalize"
          >
            {status}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Campaign Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Description</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Start Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">End Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-4 px-4">
                      <span className="text-white font-medium">{campaign.name}</span>
                    </td>
                    <td className="py-4 px-4 text-slate-300 max-w-xs truncate">
                      {campaign.description}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {campaign.start_date}
                    </td>
                    <td className="py-4 px-4 text-slate-300">
                      {campaign.end_date}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs rounded-full capitalize ${statusColors[campaign.status]}`}>
                        {campaign.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <button className="text-slate-400 hover:text-white text-sm">Edit</button>
                        <button className="text-red-400 hover:text-red-300 text-sm">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-2xl">
              🚀
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {campaigns.filter(c => c.status === 'active').length}
              </p>
              <p className="text-sm text-slate-400">Active Campaigns</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-2xl">
              📅
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {campaigns.filter(c => c.status === 'planned').length}
              </p>
              <p className="text-sm text-slate-400">Planned Campaigns</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-slate-500/20 flex items-center justify-center text-2xl">
              ✅
            </div>
            <div>
              <p className="text-2xl font-bold text-white">
                {campaigns.filter(c => c.status === 'completed').length}
              </p>
              <p className="text-sm text-slate-400">Completed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

