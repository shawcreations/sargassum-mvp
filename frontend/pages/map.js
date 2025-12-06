import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { fetchBeaches, fetchHighRiskBeaches, fetchBeachRiskHistory } from '../lib/api';

const MapView = dynamic(() => import('../components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapPage() {
  const [beaches, setBeaches] = useState([]);
  const [riskData, setRiskData] = useState({});
  const [selectedBeach, setSelectedBeach] = useState(null);
  const [riskHistory, setRiskHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      console.log('Loading beach data...');
      
      const [beachData, highRisk] = await Promise.all([
        fetchBeaches().catch(err => {
          console.error('Failed to fetch beaches:', err);
          return [];
        }),
        fetchHighRiskBeaches(null, 0).catch(err => {
          console.error('Failed to fetch risk data:', err);
          return { beaches: [] };
        })
      ]);
      
      console.log('Beach data:', beachData);
      console.log('High risk data:', highRisk);
      
      setBeaches(beachData || []);
      
      // Build risk lookup by beach_id
      const riskLookup = {};
      (highRisk.beaches || []).forEach(b => {
        riskLookup[b.beach_id] = b.risk_level;
      });
      console.log('Risk lookup:', riskLookup);
      setRiskData(riskLookup);
    } catch (error) {
      console.error('Failed to load data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleBeachSelect(beach) {
    setSelectedBeach(beach);
    try {
      const history = await fetchBeachRiskHistory(beach.id);
      setRiskHistory(history.data || []);
    } catch (error) {
      console.error('Failed to load risk history:', error);
      setRiskHistory([]);
    }
  }

  const getRiskColor = (level) => {
    switch(level) {
      case 3: return '#ef4444';
      case 2: return '#f59e0b';
      case 1: return '#22c55e';
      default: return '#6b7280';
    }
  };

  const getRiskLabel = (level) => {
    switch(level) {
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'None';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Beach Map</h1>
          <p className="page-subtitle">View beaches and current risk levels</p>
        </div>
        <button 
          onClick={loadData}
          className="btn-secondary text-sm"
        >
          🔄 Refresh Data
        </button>
      </div>

      {error && (
        <div className="card bg-red-900/20 border-red-800">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Legend */}
      <div className="card py-3">
        <div className="flex flex-wrap items-center gap-4 md:gap-8">
          <span className="text-sm text-slate-400">Risk Level:</span>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#ef4444' }}></div>
            <span className="text-sm text-slate-300">High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
            <span className="text-sm text-slate-300">Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
            <span className="text-sm text-slate-300">Low</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#6b7280' }}></div>
            <span className="text-sm text-slate-300">No Data</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Map */}
        <div className="lg:col-span-2 card p-0 overflow-hidden" style={{ height: '500px' }}>
          <MapView 
            beaches={beaches} 
            riskData={riskData}
            onBeachSelect={handleBeachSelect}
          />
        </div>

        {/* Beach Details Sidebar */}
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4">Beach Details</h3>
          
          {selectedBeach ? (
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium">{selectedBeach.name}</h4>
                <p className="text-sm text-slate-400">{selectedBeach.island || 'St. Vincent'}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Current Risk:</span>
                <span 
                  className="px-2 py-1 rounded text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getRiskColor(riskData[selectedBeach.id])}20`,
                    color: getRiskColor(riskData[selectedBeach.id])
                  }}
                >
                  {getRiskLabel(riskData[selectedBeach.id])}
                </span>
              </div>
              
              {/* Risk History Sparkline */}
              <div>
                <p className="text-sm text-slate-400 mb-2">14-Day Risk History</p>
                {riskHistory.length > 0 ? (
                  <div className="flex items-end gap-1 h-16">
                    {riskHistory.slice(-14).map((day, i) => (
                      <div 
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ 
                          height: `${(day.risk_level / 3) * 100}%`,
                          backgroundColor: getRiskColor(day.risk_level),
                          minHeight: '4px'
                        }}
                        title={`${day.date}: ${getRiskLabel(day.risk_level)}`}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500">No history available</p>
                )}
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Lat: {selectedBeach.latitude?.toFixed(4)}<br/>
                  Lng: {selectedBeach.longitude?.toFixed(4)}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">Click a beach on the map</p>
              <p className="text-xs mt-1">to view details and risk history</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="card text-center">
          <p className="text-2xl font-bold text-white">{beaches.length || '—'}</p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Total Beaches</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-red-400">
            {Object.values(riskData).filter(r => r === 3).length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">High Risk</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-yellow-400">
            {Object.values(riskData).filter(r => r === 2).length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Medium Risk</p>
        </div>
        <div className="card text-center">
          <p className="text-2xl font-bold text-emerald-400">
            {Object.values(riskData).filter(r => r <= 1).length}
          </p>
          <p className="text-xs md:text-sm text-slate-400 mt-1">Low/None</p>
        </div>
      </div>
    </div>
  );
}
