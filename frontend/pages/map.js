import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchBeaches } from '../lib/api';

// Dynamic import to avoid SSR issues with Leaflet
const MapView = dynamic(() => import('../components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [beaches, setBeaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchBeaches();
        setBeaches(data);
      } catch (error) {
        console.error('Failed to fetch beaches:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Beach Map</h1>
          <p className="text-slate-400 mt-1">View all monitored beaches and their status</p>
        </div>
        <button className="btn-primary">
          + Add Beach
        </button>
      </div>

      {/* Legend */}
      <div className="card">
        <div className="flex items-center gap-8">
          <span className="text-sm text-slate-400">Tourism Priority:</span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm text-slate-300">Critical (5)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-sm text-slate-300">High (4)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm text-slate-300">Medium (3)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm text-slate-300">Low (1-2)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="card p-0 overflow-hidden" style={{ height: '600px' }}>
        <MapView beaches={beaches.length > 0 ? beaches : null} />
      </div>

      {/* Beach Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-3xl font-bold text-white">{beaches.length || 24}</p>
          <p className="text-sm text-slate-400 mt-1">Total Beaches</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-red-400">5</p>
          <p className="text-sm text-slate-400 mt-1">Critical Priority</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-yellow-400">8</p>
          <p className="text-sm text-slate-400 mt-1">Medium Priority</p>
        </div>
        <div className="card text-center">
          <p className="text-3xl font-bold text-emerald-400">11</p>
          <p className="text-sm text-slate-400 mt-1">Low Priority</p>
        </div>
      </div>
    </div>
  );
}

