export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Configure application settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Configuration */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">API Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Backend API URL
              </label>
              <input
                type="text"
                className="input-field"
                placeholder="http://localhost:8000"
                disabled
              />
              <p className="text-xs text-slate-500 mt-1">
                Set via NEXT_PUBLIC_API_BASE_URL environment variable
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                OpenAI API Key
              </label>
              <input
                type="password"
                className="input-field"
                placeholder="sk-..."
                disabled
              />
              <p className="text-xs text-slate-500 mt-1">
                Configure in backend .env file
              </p>
            </div>
          </div>
        </div>

        {/* Map Settings */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Map Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Default Map Center
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Latitude"
                  defaultValue="13.15"
                  disabled
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Longitude"
                  defaultValue="-61.20"
                  disabled
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Satellite Layer
              </label>
              <select className="input-field" disabled>
                <option>OpenStreetMap (Dark)</option>
                <option>Satellite Imagery</option>
                <option>Terrain</option>
              </select>
              <p className="text-xs text-slate-500 mt-1">
                Additional satellite layers coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Notifications</h2>
          <div className="space-y-4">
            {[
              { label: 'Campaign updates', description: 'Get notified when campaigns change status' },
              { label: 'Task assignments', description: 'Alerts when tasks are assigned to crews' },
              { label: 'High sargassum alerts', description: 'Notifications for high-risk beach conditions' },
              { label: 'Weekly digest', description: 'Summary of weekly operations' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">{item.label}</p>
                  <p className="text-xs text-slate-500">{item.description}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={index < 2} className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Data Management */}
        <div className="card">
          <h2 className="text-lg font-semibold text-white mb-4">Data Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Export Data</p>
                <p className="text-xs text-slate-500">Download all beaches, campaigns, and tasks</p>
              </div>
              <button className="btn-secondary text-sm">Export</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Import Data</p>
                <p className="text-xs text-slate-500">Upload data from CSV or JSON file</p>
              </div>
              <button className="btn-secondary text-sm">Import</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-900/20 rounded-lg border border-red-800/50">
              <div>
                <p className="text-sm font-medium text-red-400">Clear All Data</p>
                <p className="text-xs text-red-400/70">This action cannot be undone</p>
              </div>
              <button className="bg-red-600 hover:bg-red-500 text-white text-sm py-2 px-4 rounded-lg transition-colors">
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Notice */}
      <div className="card bg-slate-800/50 border-slate-600">
        <div className="flex items-start gap-4">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="text-white font-medium">Configuration Note</h3>
            <p className="text-sm text-slate-400 mt-1">
              Most settings are configured through environment variables and the backend configuration.
              This page will be expanded in future updates to support dynamic configuration changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

