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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Campaigns</h1>
          <p className="page-subtitle">Manage cleanup campaigns</p>
        </div>
        <button className="btn-primary w-full sm:w-auto">
          + New Campaign
        </button>
      </div>

      {/* Status Filter - Scrollable on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {['all', 'active', 'planned', 'completed'].map((status) => (
          <button
            key={status}
            className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors capitalize whitespace-nowrap"
          >
            {status}
          </button>
        ))}
      </div>

      {/* Campaigns - Cards on mobile, Table on desktop */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Mobile: Card view */}
          <div className="md:hidden space-y-3">
            {campaigns.map((campaign) => (
              <div key={campaign.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-white text-sm">{campaign.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${statusColors[campaign.status]}`}>
                    {campaign.status}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-3 line-clamp-2">{campaign.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{campaign.start_date} → {campaign.end_date}</span>
                  <div className="flex gap-3">
                    <button className="text-slate-400 hover:text-white">Edit</button>
                    <button className="text-red-400 hover:text-red-300">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Table view */}
          <div className="hidden md:block card">
            <div className="table-responsive">
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
                      <td className="py-4 px-4 text-slate-300">{campaign.start_date}</td>
                      <td className="py-4 px-4 text-slate-300">{campaign.end_date}</td>
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
          </div>
        </>
      )}

      {/* Campaign Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-white">
            {campaigns.filter(c => c.status === 'active').length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Active</p>
        </div>
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-white">
            {campaigns.filter(c => c.status === 'planned').length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Planned</p>
        </div>
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-white">
            {campaigns.filter(c => c.status === 'completed').length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Completed</p>
        </div>
      </div>
    </div>
  );
}
