'use client'

import { Bell, Search, Sun, Moon } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [darkMode, setDarkMode] = useState(true)

  return (
    <header className="h-16 bg-slate-900/30 backdrop-blur-xl border-b border-slate-800 flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          placeholder="Search beaches, campaigns, tasks..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
        />
        <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-slate-700 rounded text-xs text-slate-400">
          ⌘K
        </kbd>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <button className="relative p-2.5 rounded-xl bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700 transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Quick Actions */}
        <button className="ml-2 btn-primary text-sm py-2">
          + New Campaign
        </button>
      </div>
    </header>
  )
}

