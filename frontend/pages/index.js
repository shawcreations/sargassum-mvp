import { useEffect, useState } from 'react';
import { fetchBeaches, fetchRiskSummary, fetchHighRiskBeaches, fetchAlerts, simulateRiskIngestion } from '../lib/api';

export default function Dashboard() {
  const [beaches, setBeaches] = useState([]);
  const [riskSummary, setRiskSummary] = useState(null);
  const [highRiskBeaches, setHighRiskBeaches] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [beachData, riskData, highRisk, alertData] = await Promise.all([
        fetchBeaches().catch(() => []),
        fetchRiskSummary().catch(() => null),
        fetchHighRiskBeaches(null, 2).catch(() => ({ beaches: [] })),
        fetchAlerts(10).catch(() => ({ alerts: [] }))
      ]);
      
      setBeaches(beachData.length > 0 ? beachData : sampleBeaches);
      setRiskSummary(riskData);
      setHighRiskBeaches(highRisk.beaches || []);
      setAlerts(alertData.alerts || []);
    } catch (error) {
      console.error('Failed to load data:', error);
      setBeaches(sampleBeaches);
    } finally {
      setLoading(false);
    }
  }

  async function handleSimulateData() {
    setSimulating(true);
    try {
      await simulateRiskIngestion(14);
      await loadData();
    } catch (error) {
      console.error('Failed to simulate data:', error);
    } finally {
      setSimulating(false);
    }
  }

  const sampleBeaches = [
    { id: 1, name: 'Kingstown Beach', island: 'St. Vincent', tourism_importance: 4 },
    { id: 2, name: 'Villa Beach', island: 'St. Vincent', tourism_importance: 5 },
  ];

  const getRiskLabel = (level) => {
    switch(level) {
      case 3: return { text: 'High', color: 'bg-red-500/20 text-red-400' };
      case 2: return { text: 'Medium', color: 'bg-yellow-500/20 text-yellow-400' };
      case 1: return { text: 'Low', color: 'bg-green-500/20 text-green-400' };
      default: return { text: 'None', color: 'bg-slate-500/20 text-slate-400' };
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Sargassum monitoring overview</p>
        </div>
        {(!riskSummary || riskSummary.total_beaches === 0) && (
          <button 
            onClick={handleSimulateData}
            disabled={simulating}
            className="btn-secondary text-sm"
          >
            {simulating ? 'Generating...' : '🔄 Generate Sample Data'}
          </button>
        )}
      </div>

      {/* Risk Overview KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">High Risk</p>
              <p className="text-2xl md:text-3xl font-bold text-red-400">
                {riskSummary?.high_risk || 0}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl md:text-2xl bg-red-500/20">
              🔴
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">Medium Risk</p>
              <p className="text-2xl md:text-3xl font-bold text-yellow-400">
                {riskSummary?.medium_risk || 0}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl md:text-2xl bg-yellow-500/20">
              🟠
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">Active Alerts</p>
              <p className="text-2xl md:text-3xl font-bold text-orange-400">
                {riskSummary?.active_alerts || 0}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl md:text-2xl bg-orange-500/20">
              ⚠️
            </div>
          </div>
        </div>
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-slate-400">Monitored</p>
              <p className="text-2xl md:text-3xl font-bold text-emerald-400">
                {riskSummary?.total_beaches || beaches.length}
              </p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center text-xl md:text-2xl bg-emerald-500/20">
              🏖️
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* High Risk Beaches */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-white">🚨 Priority Beaches</h2>
            <a href="/map" className="text-emerald-400 hover:text-emerald-300 text-xs md:text-sm">
              View Map →
            </a>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : highRiskBeaches.length > 0 ? (
            <div className="space-y-2">
              {highRiskBeaches.slice(0, 5).map((beach, index) => {
                const risk = getRiskLabel(beach.risk_level);
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{beach.beach_name}</p>
                      <p className="text-xs text-slate-400">{beach.source || 'N/A'}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${risk.color}`}>
                      {risk.text}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">No high-risk beaches detected</p>
              <p className="text-xs mt-1">Click "Generate Sample Data" to populate</p>
            </div>
          )}
        </div>

        {/* Active Alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold text-white">⚠️ Active Alerts</h2>
            <span className="text-xs text-slate-400">{alerts.length} total</span>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : alerts.length > 0 ? (
            <div className="space-y-2">
              {alerts.slice(0, 5).map((alert, index) => (
                <div key={index} className="p-3 bg-slate-700/30 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium">{alert.beach_name}</p>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{alert.message}</p>
                    </div>
                    <span className={`ml-2 px-2 py-0.5 text-xs rounded ${
                      alert.severity === 3 ? 'bg-red-500/20 text-red-400' :
                      alert.severity === 2 ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {alert.alert_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <p className="text-sm">No active alerts</p>
              <p className="text-xs mt-1">System is monitoring all beaches</p>
            </div>
          )}
        </div>
      </div>

      {/* Beach List */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base md:text-lg font-semibold text-white">📋 All Beaches</h2>
        </div>
        
        <div className="table-responsive">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-slate-400">Beach</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-slate-400 hidden sm:table-cell">Island</th>
                <th className="text-left py-3 px-3 md:px-4 text-xs md:text-sm font-medium text-slate-400">Priority</th>
              </tr>
            </thead>
            <tbody>
              {beaches.slice(0, 8).map((beach) => (
                <tr key={beach.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                  <td className="py-3 px-3 md:px-4 text-white text-sm">{beach.name}</td>
                  <td className="py-3 px-3 md:px-4 text-slate-300 text-sm hidden sm:table-cell">{beach.island || 'St. Vincent'}</td>
                  <td className="py-3 px-3 md:px-4">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-xs md:text-sm ${i < beach.tourism_importance ? 'text-yellow-400' : 'text-slate-600'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
