import Link from 'next/link';
import { useRouter } from 'next/router';

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌿</span>
            <div>
              <h1 className="text-xl font-bold text-white">Sargassum Management Platform</h1>
              <p className="text-sm text-slate-400">Vincy GreenRoots Inc.</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 border-r border-slate-700 p-4">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Stats */}
          <div className="mt-8 pt-6 border-t border-slate-700">
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
        <main className="flex-1 bg-slate-950 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

