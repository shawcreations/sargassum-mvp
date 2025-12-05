'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Layers, Filter, RefreshCw } from 'lucide-react'

const MapView = dynamic(() => import('@/components/MapView'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400">Loading map...</p>
      </div>
    </div>
  )
})

export default function MapPage() {
  const [selectedRisk, setSelectedRisk] = useState<string>('all')

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col gap-4">
      {/* Map Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-white">Sargassum Map</h1>
          <p className="text-slate-400 mt-1">Real-time monitoring of beach conditions</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800 rounded-xl p-1">
            {['all', 'low', 'medium', 'high'].map((risk) => (
              <button
                key={risk}
                onClick={() => setSelectedRisk(risk)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedRisk === risk 
                    ? 'bg-primary-500 text-white' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {risk.charAt(0).toUpperCase() + risk.slice(1)}
              </button>
            ))}
          </div>
          
          <button className="btn-secondary flex items-center gap-2">
            <Layers className="w-4 h-4" />
            Layers
          </button>
          
          <button className="btn-primary flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 glass-card overflow-hidden">
        <MapView filterRisk={selectedRisk} />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 py-3 glass-card">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-500"></div>
          <span className="text-sm text-slate-300">Low Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-slate-300">Medium Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-red-500"></div>
          <span className="text-sm text-slate-300">High Risk</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-purple-500"></div>
          <span className="text-sm text-slate-300">Critical</span>
        </div>
      </div>
    </div>
  )
}

