'use client'

import { useState } from 'react'
import { Plus, Search, CheckCircle2, Circle, Clock, AlertCircle, GripVertical } from 'lucide-react'

const tasks = [
  { id: 1, title: 'Prepare equipment for Kingstown cleanup', status: 'completed', priority: 'high', campaign: 'Kingstown Beach Cleanup', assignee: 'John Smith', dueDate: '2024-01-14' },
  { id: 2, title: 'Contact local volunteers', status: 'in_progress', priority: 'medium', campaign: 'Villa Coast Survey', assignee: 'Sarah Johnson', dueDate: '2024-01-16' },
  { id: 3, title: 'Arrange transportation', status: 'todo', priority: 'high', campaign: 'Bequia Emergency Response', assignee: 'Mike Brown', dueDate: '2024-01-13' },
  { id: 4, title: 'Document current sargassum levels', status: 'in_progress', priority: 'urgent', campaign: 'Calliaqua Bay Monitoring', assignee: 'Emily Davis', dueDate: '2024-01-15' },
  { id: 5, title: 'Coordinate with local authorities', status: 'todo', priority: 'medium', campaign: 'Bequia Emergency Response', assignee: 'John Smith', dueDate: '2024-01-15' },
  { id: 6, title: 'Prepare safety briefing materials', status: 'completed', priority: 'low', campaign: 'Villa Coast Survey', assignee: 'Sarah Johnson', dueDate: '2024-01-17' },
  { id: 7, title: 'Set up collection points', status: 'blocked', priority: 'high', campaign: 'Kingstown Beach Cleanup', assignee: 'Mike Brown', dueDate: '2024-01-14' },
  { id: 8, title: 'Organize volunteer shifts', status: 'todo', priority: 'medium', campaign: 'Kingstown Beach Cleanup', assignee: 'Emily Davis', dueDate: '2024-01-14' },
]

const statusConfig = {
  todo: { icon: Circle, color: 'text-slate-400', bg: 'bg-slate-500/20' },
  in_progress: { icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  completed: { icon: CheckCircle2, color: 'text-green-400', bg: 'bg-green-500/20' },
  blocked: { icon: AlertCircle, color: 'text-red-400', bg: 'bg-red-500/20' },
}

const priorityColors = {
  low: 'bg-slate-500/20 text-slate-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  high: 'bg-orange-500/20 text-orange-400',
  urgent: 'bg-red-500/20 text-red-400',
}

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.campaign.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const groupedTasks = {
    todo: filteredTasks.filter(t => t.status === 'todo'),
    in_progress: filteredTasks.filter(t => t.status === 'in_progress'),
    completed: filteredTasks.filter(t => t.status === 'completed'),
    blocked: filteredTasks.filter(t => t.status === 'blocked'),
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Tasks</h1>
          <p className="text-slate-400 mt-1">Track and manage campaign tasks</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(groupedTasks).map(([status, statusTasks]) => {
          const config = statusConfig[status as keyof typeof statusConfig]
          const StatusIcon = config.icon
          
          return (
            <div key={status} className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <StatusIcon className={`w-4 h-4 ${config.color}`} />
                </div>
                <h3 className="font-medium text-white capitalize">{status.replace('_', ' ')}</h3>
                <span className="text-sm text-slate-400">({statusTasks.length})</span>
              </div>
              
              <div className="flex-1 space-y-3">
                {statusTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="glass-card p-4 hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <button className="mt-1 opacity-0 group-hover:opacity-100 transition-all">
                        <GripVertical className="w-4 h-4 text-slate-500" />
                      </button>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-white text-sm mb-2">{task.title}</h4>
                        <p className="text-xs text-slate-400 mb-3 truncate">{task.campaign}</p>
                        
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-slate-500">{task.dueDate}</span>
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-slate-700/50">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-500 to-ocean-500 flex items-center justify-center text-xs font-medium">
                              {task.assignee.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-xs text-slate-400">{task.assignee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {statusTasks.length === 0 && (
                  <div className="glass-card p-8 text-center">
                    <p className="text-sm text-slate-500">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

