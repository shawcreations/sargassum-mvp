'use client'

import { useState } from 'react'
import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react'

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'data', label: 'Data & Privacy', icon: Database },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'language', label: 'Language & Region', icon: Globe },
]

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-white">Settings</h1>
        <p className="text-slate-400 mt-1">Manage your account and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Settings Navigation */}
        <div className="w-64 shrink-0">
          <div className="glass-card p-4">
            <nav className="space-y-1">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    activeSection === section.id
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <section.icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 glass-card p-8">
          {activeSection === 'profile' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>
                
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-primary-500 to-ocean-500 flex items-center justify-center text-3xl font-bold text-white">
                    JS
                  </div>
                  <div>
                    <button className="btn-secondary text-sm">Change Avatar</button>
                    <p className="text-xs text-slate-500 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">First Name</label>
                    <input type="text" defaultValue="John" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Last Name</label>
                    <input type="text" defaultValue="Smith" className="input-field" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <input type="email" defaultValue="john.smith@example.com" className="input-field" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-slate-300 mb-2">Bio</label>
                    <textarea 
                      rows={4} 
                      className="input-field resize-none"
                      defaultValue="Environmental coordinator focused on Caribbean beach conservation."
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-700">
                  <button className="btn-secondary">Cancel</button>
                  <button className="btn-primary">Save Changes</button>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Notification Preferences</h2>
              
              {[
                { label: 'Campaign updates', description: 'Get notified about campaign status changes' },
                { label: 'Task assignments', description: 'Receive alerts when tasks are assigned to you' },
                { label: 'Volunteer registrations', description: 'Notify when new volunteers join campaigns' },
                { label: 'Sargassum alerts', description: 'High-risk area notifications' },
                { label: 'Weekly digest', description: 'Summary of activities and metrics' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between py-4 border-b border-slate-700/50">
                  <div>
                    <h3 className="font-medium text-white">{item.label}</h3>
                    <p className="text-sm text-slate-400">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={index < 3} className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'security' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-white mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Current Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Confirm New Password</label>
                      <input type="password" className="input-field" />
                    </div>
                    <button className="btn-primary">Update Password</button>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700">
                  <h3 className="font-medium text-white mb-4">Two-Factor Authentication</h3>
                  <p className="text-sm text-slate-400 mb-4">Add an extra layer of security to your account</p>
                  <button className="btn-secondary">Enable 2FA</button>
                </div>
              </div>
            </div>
          )}

          {activeSection !== 'profile' && activeSection !== 'notifications' && activeSection !== 'security' && (
            <div className="flex items-center justify-center h-64">
              <p className="text-slate-400">Settings section coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

