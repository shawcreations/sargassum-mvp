'use client'

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import { useEffect, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface Beach {
  id: number
  name: string
  lat: number
  lng: number
  risk_level: string
  description?: string
}

interface MapViewProps {
  filterRisk?: string
}

const riskColors: Record<string, string> = {
  low: '#22c55e',
  medium: '#eab308',
  high: '#ef4444',
  critical: '#a855f7',
}

// Sample data - in production, this would come from the API
const sampleBeaches: Beach[] = [
  { id: 1, name: 'Kingstown Beach', lat: 13.1561, lng: -61.2278, risk_level: 'medium', description: 'Main beach near capital' },
  { id: 2, name: 'Villa Beach', lat: 13.1474, lng: -61.1982, risk_level: 'low', description: 'Popular tourist beach' },
  { id: 3, name: 'Calliaqua Bay', lat: 13.1304, lng: -61.1869, risk_level: 'high', description: 'High sargassum accumulation area' },
  { id: 4, name: 'Indian Bay', lat: 13.1444, lng: -61.1936, risk_level: 'low', description: 'Calm waters, minimal sargassum' },
  { id: 5, name: 'Brighton Beach', lat: 13.1611, lng: -61.2447, risk_level: 'medium', description: 'Moderate sargassum presence' },
  { id: 6, name: 'Questelles Beach', lat: 13.1841, lng: -61.2569, risk_level: 'critical', description: 'Emergency response needed' },
  { id: 7, name: 'Layou Beach', lat: 13.2089, lng: -61.2636, risk_level: 'high', description: 'Active cleanup in progress' },
  { id: 8, name: 'Barrouallie Beach', lat: 13.2366, lng: -61.2656, risk_level: 'medium', description: 'Weekly monitoring site' },
  { id: 9, name: 'Chateaubelair Bay', lat: 13.2861, lng: -61.2353, risk_level: 'low', description: 'Northern beach, low accumulation' },
  { id: 10, name: 'Cumberland Bay', lat: 13.2705, lng: -61.2486, risk_level: 'low', description: 'Protected bay area' },
]

export default function MapView({ filterRisk = 'all' }: MapViewProps) {
  const [beaches, setBeaches] = useState<Beach[]>(sampleBeaches)

  useEffect(() => {
    // In production, fetch from API
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/beaches`)
    //   .then(res => res.json())
    //   .then(data => setBeaches(data))
  }, [])

  const filteredBeaches = filterRisk === 'all' 
    ? beaches 
    : beaches.filter(b => b.risk_level === filterRisk)

  return (
    <MapContainer
      center={[13.18, -61.23]}
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      className="rounded-2xl"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {filteredBeaches.map((beach) => (
        <CircleMarker
          key={beach.id}
          center={[beach.lat, beach.lng]}
          radius={12}
          fillColor={riskColors[beach.risk_level]}
          fillOpacity={0.8}
          color={riskColors[beach.risk_level]}
          weight={2}
          opacity={1}
        >
          <Popup>
            <div className="min-w-[200px]">
              <h3 className="font-bold text-lg mb-1">{beach.name}</h3>
              <p className="text-sm text-slate-300 mb-2">{beach.description}</p>
              <div className="flex items-center gap-2">
                <span 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: `${riskColors[beach.risk_level]}33`,
                    color: riskColors[beach.risk_level]
                  }}
                >
                  {beach.risk_level.charAt(0).toUpperCase() + beach.risk_level.slice(1)} Risk
                </span>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-600">
                <p className="text-xs text-slate-400">
                  Coordinates: {beach.lat.toFixed(4)}, {beach.lng.toFixed(4)}
                </p>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  )
}

