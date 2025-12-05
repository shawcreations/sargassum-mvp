import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/map', label: 'Map', icon: '🗺️' },
  { href: '/campaigns', label: 'Campaigns', icon: '📋' },
  { href: '/tasks', label: 'Tasks', icon: '✅' },
  { href: '/ai', label: 'AI Assistant', icon: '🤖' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function Layout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <span className="text-2xl">🌿</span>
            <div className="hidden sm:block">
              <h1 className="text-lg md:text-xl font-bold text-white">Sargassum Management</h1>
              <p className="text-xs md:text-sm text-slate-400">Vincy GreenRoots Inc.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <span className="text-xs md:text-sm text-slate-400 hidden sm:inline">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-64 bg-slate-900 border-r border-slate-700
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col pt-16 lg:pt-0
        `}>
          {/* Mobile close button */}
          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={closeSidebar}
              className="p-2 rounded-lg hover:bg-slate-800 text-slate-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const isActive = router.pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeSidebar}
                      className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                    >
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Quick Stats - hidden on mobile */}
          <div className="hidden lg:block p-4 border-t border-slate-700">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
              Quick Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Active Campaigns</span>
                <span className="text-emerald-400 font-medium">3</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Pending Tasks</span>
                <span className="text-yellow-400 font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Monitored Beaches</span>
                <span className="text-blue-400 font-medium">24</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-slate-950 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
