import { useEffect, useState } from 'react';
import { fetchTasks } from '../lib/api';

const sampleTasks = [
  { id: 1, beach_id: 1, campaign_id: 1, scheduled_date: '2024-01-16', status: 'in_progress', assigned_crew: 'Team Alpha', estimated_volume_tons: 2.5, actual_volume_tons: null, notes: 'Morning shift' },
  { id: 2, beach_id: 2, campaign_id: 1, scheduled_date: '2024-01-17', status: 'planned', assigned_crew: 'Team Beta', estimated_volume_tons: 1.8, actual_volume_tons: null, notes: 'Afternoon shift' },
  { id: 3, beach_id: 3, campaign_id: 2, scheduled_date: '2024-01-18', status: 'planned', assigned_crew: 'Team Alpha', estimated_volume_tons: 3.0, actual_volume_tons: null, notes: 'Survey and cleanup' },
  { id: 4, beach_id: 1, campaign_id: 1, scheduled_date: '2024-01-14', status: 'completed', assigned_crew: 'Team Beta', estimated_volume_tons: 2.0, actual_volume_tons: 2.3, notes: 'Completed ahead of schedule' },
  { id: 5, beach_id: 4, campaign_id: 3, scheduled_date: '2024-01-12', status: 'completed', assigned_crew: 'Team Alpha', estimated_volume_tons: 4.5, actual_volume_tons: 5.1, notes: 'Emergency response' },
];

const statusColors = {
  planned: 'bg-blue-500/20 text-blue-400',
  in_progress: 'bg-yellow-500/20 text-yellow-400',
  completed: 'bg-emerald-500/20 text-emerald-400',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchTasks();
        setTasks(data.length > 0 ? data : sampleTasks);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
        setTasks(sampleTasks);
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
          <h1 className="text-2xl font-bold text-white">Tasks</h1>
          <p className="text-slate-400 mt-1">Track and manage cleanup tasks</p>
        </div>
        <button className="btn-primary">
          + New Task
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2">
        {['all', 'planned', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors capitalize"
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tasks Table */}
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Scheduled Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Assigned Crew</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Est. Volume (tons)</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actual Volume</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Notes</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-4 px-4 text-slate-300">#{task.id}</td>
                    <td className="py-4 px-4 text-white">{task.scheduled_date}</td>
                    <td className="py-4 px-4 text-slate-300">{task.assigned_crew}</td>
                    <td className="py-4 px-4 text-slate-300">{task.estimated_volume_tons}</td>
                    <td className="py-4 px-4 text-slate-300">
                      {task.actual_volume_tons || '—'}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 text-xs rounded-full capitalize ${statusColors[task.status]}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-400 max-w-xs truncate">
                      {task.notes}
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

      {/* Task Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-white">{tasks.length}</p>
          <p className="text-sm text-slate-400 mt-1">Total Tasks</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-yellow-400">
            {tasks.filter(t => t.status === 'in_progress').length}
          </p>
          <p className="text-sm text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-emerald-400">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
          <p className="text-sm text-slate-400 mt-1">Completed</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-purple-400">
            {tasks.reduce((sum, t) => sum + (parseFloat(t.actual_volume_tons) || 0), 0).toFixed(1)}
          </p>
          <p className="text-sm text-slate-400 mt-1">Tons Collected</p>
        </div>
      </div>
    </div>
  );
}

