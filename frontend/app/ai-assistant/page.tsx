'use client'

import ChatInterface from '@/components/ChatInterface'
import { Sparkles, BookOpen, TrendingUp, AlertTriangle } from 'lucide-react'

const quickActions = [
  { icon: TrendingUp, label: 'Check current status', prompt: 'What is the current sargassum status?' },
  { icon: AlertTriangle, label: 'High risk beaches', prompt: 'Which beaches are at high risk?' },
  { icon: BookOpen, label: 'Best practices', prompt: 'What are the best practices for sargassum cleanup?' },
]

export default function AIAssistantPage() {
  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col glass-card overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-primary-500 to-ocean-500 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-white">AI Assistant</h1>
              <p className="text-sm text-slate-400">Powered by AI to help you manage sargassum</p>
            </div>
          </div>
        </div>
        
        <ChatInterface />
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-6">
        {/* Quick Actions */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 transition-all text-left group"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/30 transition-all">
                  <action.icon className="w-5 h-5 text-primary-400" />
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-all">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">What I Can Help With</h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span>Monitor sargassum levels and predict influx patterns</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span>Coordinate cleanup campaigns and volunteer efforts</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span>Analyze trends and generate reports</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span>Provide best practices for sargassum management</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2"></div>
              <span>Answer questions about beach conditions</span>
            </li>
          </ul>
        </div>

        {/* Recent Topics */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Recent Topics</h2>
          <div className="space-y-2">
            {['Beach cleanup strategies', 'Volunteer coordination', 'Sargassum forecasting'].map((topic, index) => (
              <button
                key={index}
                className="w-full text-left text-sm text-slate-400 hover:text-white py-2 px-3 rounded-lg hover:bg-slate-800/50 transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

