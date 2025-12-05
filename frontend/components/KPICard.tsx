import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'

interface KPICardProps {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  color: 'primary' | 'ocean' | 'sand' | 'danger'
}

const colorClasses = {
  primary: {
    bg: 'bg-primary-500/20',
    icon: 'text-primary-400',
    gradient: 'from-primary-500/20 to-transparent',
  },
  ocean: {
    bg: 'bg-ocean-500/20',
    icon: 'text-ocean-400',
    gradient: 'from-ocean-500/20 to-transparent',
  },
  sand: {
    bg: 'bg-sand-500/20',
    icon: 'text-sand-400',
    gradient: 'from-sand-500/20 to-transparent',
  },
  danger: {
    bg: 'bg-red-500/20',
    icon: 'text-red-400',
    gradient: 'from-red-500/20 to-transparent',
  },
}

export default function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  const colors = colorClasses[color]
  
  return (
    <div className="glass-card p-6 relative overflow-hidden group hover:bg-white/10 transition-all">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-50`}></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg}`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        </div>
        
        <div>
          <h3 className="text-sm text-slate-400 mb-1">{title}</h3>
          <p className="text-3xl font-display font-bold text-white">{value}</p>
          <p className="text-sm text-slate-500 mt-1">{change}</p>
        </div>
      </div>
    </div>
  )
}

