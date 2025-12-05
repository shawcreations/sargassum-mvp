'use client'

import KPICard from '@/components/KPICard'
import DataTable from '@/components/DataTable'
import { 
  MapPin, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp,
  Calendar
} from 'lucide-react'

const kpiData = [
  {
    title: 'Monitored Beaches',
    value: '24',
    change: '+3 this week',
    trend: 'up' as const,
    icon: MapPin,
    color: 'ocean' as const,
  },
  {
    title: 'Active Campaigns',
    value: '7',
    change: '2 starting soon',
    trend: 'up' as const,
    icon: Calendar,
    color: 'primary' as const,
  },
  {
    title: 'Volunteers',
    value: '156',
    change: '+12 this month',
    trend: 'up' as const,
    icon: Users,
    color: 'sand' as const,
  },
  {
    title: 'High Risk Areas',
    value: '4',
    change: '-2 from last week',
    trend: 'down' as const,
    icon: AlertTriangle,
    color: 'danger' as const,
  },
]

const recentCampaigns = [
  { id: 1, name: 'Kingstown Beach Cleanup', status: 'active', volunteers: 23, beach: 'Kingstown Beach', date: '2024-01-15' },
  { id: 2, name: 'Villa Coast Survey', status: 'planned', volunteers: 12, beach: 'Villa Beach', date: '2024-01-18' },
  { id: 3, name: 'Calliaqua Monitoring', status: 'completed', volunteers: 18, beach: 'Calliaqua Bay', date: '2024-01-10' },
  { id: 4, name: 'Bequia Emergency Response', status: 'active', volunteers: 31, beach: 'Princess Margaret Beach', date: '2024-01-14' },
]

const columns = [
  { key: 'name', label: 'Campaign Name' },
  { key: 'beach', label: 'Location' },
  { key: 'volunteers', label: 'Volunteers' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Monitor sargassum levels and campaign progress</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns Table */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-semibold text-white">Recent Campaigns</h2>
            <a href="/campaigns" className="text-primary-400 hover:text-primary-300 text-sm font-medium">
              View all →
            </a>
          </div>
          <DataTable columns={columns} data={recentCampaigns} />
        </div>

        {/* Quick Stats */}
        <div className="glass-card p-6">
          <h2 className="text-xl font-display font-semibold text-white mb-6">Quick Stats</h2>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Tasks Completed</p>
                  <p className="text-lg font-semibold text-white">48 / 62</p>
                </div>
              </div>
              <span className="text-green-400 text-sm font-medium">77%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-ocean-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-ocean-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Sargassum Collected</p>
                  <p className="text-lg font-semibold text-white">12.4 tons</p>
                </div>
              </div>
              <span className="text-ocean-400 text-sm font-medium">+18%</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sand-500/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-sand-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Beaches Cleaned</p>
                  <p className="text-lg font-semibold text-white">18</p>
                </div>
              </div>
              <span className="text-sand-400 text-sm font-medium">This month</span>
            </div>
          </div>

          {/* Risk Level Distribution */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-medium text-slate-400 mb-4">Beach Risk Levels</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Low Risk</span>
                  <span className="text-green-400">14 beaches</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[58%] bg-gradient-to-r from-green-500 to-green-400 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">Medium Risk</span>
                  <span className="text-yellow-400">6 beaches</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[25%] bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-300">High Risk</span>
                  <span className="text-red-400">4 beaches</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full w-[17%] bg-gradient-to-r from-red-500 to-red-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

