import { useEffect, useState } from 'react';
import { fetchTasks } from '../lib/api';

const sampleTasks = [
  { id: 1, beach_id: 1, campaign_id: 1, scheduled_date: '2024-01-16', status: 'in_progress', assigned_crew: 'Team Alpha', estimated_volume_tons: 2.5, actual_volume_tons: null, notes: 'Morning shift' },
  { id: 2, beach_id: 2, campaign_id: 1, scheduled_date: '2024-01-17', status: 'planned', assigned_crew: 'Team Beta', estimated_volume_tons: 1.8, actual_volume_tons: null, notes: 'Afternoon shift' },
  { id: 3, beach_id: 3, campaign_id: 2, scheduled_date: '2024-01-18', status: 'planned', assigned_crew: 'Team Alpha', estimated_volume_tons: 3.0, actual_volume_tons: null, notes: 'Survey and cleanup' },
  { id: 4, beach_id: 1, campaign_id: 1, scheduled_date: '2024-01-14', status: 'completed', assigned_crew: 'Team Beta', estimated_volume_tons: 2.0, actual_volume_tons: 2.3, notes: 'Completed ahead' },
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Tasks</h1>
          <p className="page-subtitle">Track cleanup tasks</p>
        </div>
        <button className="btn-primary w-full sm:w-auto">
          + New Task
        </button>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        {['all', 'planned', 'in_progress', 'completed'].map((status) => (
          <button
            key={status}
            className="px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors capitalize whitespace-nowrap"
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Tasks */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Mobile: Card view */}
          <div className="md:hidden space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="card">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-xs text-slate-500">#{task.id}</p>
                    <p className="font-medium text-white text-sm">{task.assigned_crew}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full capitalize ${statusColors[task.status]}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div>
                    <p className="text-slate-500">Date</p>
                    <p className="text-slate-300">{task.scheduled_date}</p>
                  </div>
                  <div>
                    <p className="text-slate-500">Est. Volume</p>
                    <p className="text-slate-300">{task.estimated_volume_tons} tons</p>
                  </div>
                </div>
                {task.notes && (
                  <p className="text-xs text-slate-400 truncate">{task.notes}</p>
                )}
                <div className="flex justify-end gap-3 mt-3 pt-3 border-t border-slate-700">
                  <button className="text-xs text-slate-400 hover:text-white">Edit</button>
                  <button className="text-xs text-red-400 hover:text-red-300">Delete</button>
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
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Crew</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Est. Vol</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actual</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr key={task.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                      <td className="py-4 px-4 text-slate-300">#{task.id}</td>
                      <td className="py-4 px-4 text-white">{task.scheduled_date}</td>
                      <td className="py-4 px-4 text-slate-300">{task.assigned_crew}</td>
                      <td className="py-4 px-4 text-slate-300">{task.estimated_volume_tons}t</td>
                      <td className="py-4 px-4 text-slate-300">{task.actual_volume_tons || '—'}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 text-xs rounded-full capitalize ${statusColors[task.status]}`}>
                          {task.status.replace('_', ' ')}
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

      {/* Task Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-white">{tasks.length}</p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Total</p>
        </div>
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-yellow-400">
            {tasks.filter(t => t.status === 'in_progress').length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-emerald-400">
            {tasks.filter(t => t.status === 'completed').length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Completed</p>
        </div>
        <div className="card text-center">
          <p className="text-xl md:text-2xl font-bold text-purple-400">
            {tasks.reduce((sum, t) => sum + (parseFloat(t.actual_volume_tons) || 0), 0).toFixed(1)}t
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Collected</p>
        </div>
      </div>
    </div>
  );
}
