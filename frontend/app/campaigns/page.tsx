'use client'

import { useState } from 'react'
import { Plus, Search, Calendar, MapPin, Users, MoreVertical } from 'lucide-react'

const campaigns = [
  { 
    id: 1, 
    name: 'Kingstown Beach Cleanup', 
    description: 'Weekly cleanup initiative for the main beach area',
    status: 'active', 
    volunteers: 23,
    volunteersNeeded: 30,
    beach: 'Kingstown Beach', 
    startDate: '2024-01-15',
    endDate: '2024-01-15',
  },
  { 
    id: 2, 
    name: 'Villa Coast Survey', 
    description: 'Comprehensive survey of sargassum levels along Villa coast',
    status: 'planned', 
    volunteers: 12,
    volunteersNeeded: 20,
    beach: 'Villa Beach', 
    startDate: '2024-01-18',
    endDate: '2024-01-20',
  },
  { 
    id: 3, 
    name: 'Calliaqua Bay Monitoring', 
    description: 'Monthly monitoring and data collection',
    status: 'completed', 
    volunteers: 18,
    volunteersNeeded: 15,
    beach: 'Calliaqua Bay', 
    startDate: '2024-01-10',
    endDate: '2024-01-10',
  },
  { 
    id: 4, 
    name: 'Bequia Emergency Response', 
    description: 'Emergency cleanup due to high sargassum influx',
    status: 'active', 
    volunteers: 31,
    volunteersNeeded: 40,
    beach: 'Princess Margaret Beach', 
    startDate: '2024-01-14',
    endDate: '2024-01-21',
  },
  { 
    id: 5, 
    name: 'Young Island Resort Support', 
    description: 'Supporting local resort with beach maintenance',
    status: 'planned', 
    volunteers: 8,
    volunteersNeeded: 15,
    beach: 'Young Island', 
    startDate: '2024-01-25',
    endDate: '2024-01-25',
  },
]

const statusColors = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  planned: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  completed: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export default function CampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.beach.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Campaigns</h1>
          <p className="text-slate-400 mt-1">Manage cleanup campaigns and volunteer coordination</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field pl-12"
          />
        </div>
        
        <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-1">
          {['all', 'active', 'planned', 'completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                statusFilter === status 
                  ? 'bg-primary-500 text-white' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id} className="glass-card p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[campaign.status as keyof typeof statusColors]}`}>
                {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
              </span>
              <button className="p-2 rounded-lg hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-all">
                <MoreVertical className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            
            <h3 className="text-lg font-semibold text-white mb-2">{campaign.name}</h3>
            <p className="text-sm text-slate-400 mb-4 line-clamp-2">{campaign.description}</p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-primary-400" />
                {campaign.beach}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Calendar className="w-4 h-4 text-ocean-400" />
                {campaign.startDate} {campaign.startDate !== campaign.endDate && `→ ${campaign.endDate}`}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Users className="w-4 h-4 text-sand-400" />
                {campaign.volunteers} / {campaign.volunteersNeeded} volunteers
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-slate-400">Volunteer Progress</span>
                <span className="text-primary-400">{Math.round((campaign.volunteers / campaign.volunteersNeeded) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-ocean-500 rounded-full transition-all"
                  style={{ width: `${Math.min((campaign.volunteers / campaign.volunteersNeeded) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

