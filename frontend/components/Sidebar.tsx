'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Map, 
  Megaphone, 
  CheckSquare, 
  Sparkles, 
  Settings,
  Waves,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/ai-assistant', label: 'AI Assistant', icon: Sparkles },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-slate-900/50 backdrop-blur-xl border-r border-slate-800 flex flex-col transition-all duration-300`}>
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-ocean-500 flex items-center justify-center shrink-0">
          <Waves className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="font-display font-bold text-white text-lg whitespace-nowrap">Sargassum</h1>
            <p className="text-xs text-slate-500 whitespace-nowrap">MVP Dashboard</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${
                    isActive 
                      ? 'bg-primary-500/20 text-primary-400' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary-400' : 'text-slate-400 group-hover:text-white'}`} />
                  {!collapsed && (
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                  )}
                  {isActive && !collapsed && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400"></div>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* User Section */}
      {!collapsed && (
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-500 to-ocean-500 flex items-center justify-center text-sm font-bold text-white">
              JS
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-white truncate">John Smith</p>
              <p className="text-xs text-slate-500 truncate">Coordinator</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

