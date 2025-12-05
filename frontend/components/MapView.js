import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

// Sample beaches data - will be replaced with API data
const sampleBeaches = [
  { id: 1, name: 'Kingstown Beach', latitude: 13.1561, longitude: -61.2278, island: 'St. Vincent', tourism_importance: 4 },
  { id: 2, name: 'Villa Beach', latitude: 13.1474, longitude: -61.1982, island: 'St. Vincent', tourism_importance: 5 },
  { id: 3, name: 'Indian Bay', latitude: 13.1444, longitude: -61.1936, island: 'St. Vincent', tourism_importance: 4 },
  { id: 4, name: 'Young Island', latitude: 13.1330, longitude: -61.1950, island: 'St. Vincent', tourism_importance: 5 },
  { id: 5, name: 'Brighton Beach', latitude: 13.1611, longitude: -61.2447, island: 'St. Vincent', tourism_importance: 3 },
  { id: 6, name: 'Questelles Beach', latitude: 13.1841, longitude: -61.2569, island: 'St. Vincent', tourism_importance: 2 },
  { id: 7, name: 'Layou Beach', latitude: 13.2089, longitude: -61.2636, island: 'St. Vincent', tourism_importance: 3 },
  { id: 8, name: 'Barrouallie Beach', latitude: 13.2366, longitude: -61.2656, island: 'St. Vincent', tourism_importance: 2 },
  { id: 9, name: 'Princess Margaret Beach', latitude: 13.0036, longitude: -61.2419, island: 'Bequia', tourism_importance: 5 },
  { id: 10, name: 'Lower Bay Beach', latitude: 13.0005, longitude: -61.2364, island: 'Bequia', tourism_importance: 4 },
];

function getColorByImportance(importance) {
  if (importance >= 5) return '#ef4444'; // red - critical
  if (importance >= 4) return '#f97316'; // orange - high
  if (importance >= 3) return '#eab308'; // yellow - medium
  return '#22c55e'; // green - low
}

export default function MapView({ beaches }) {
  const [data, setData] = useState(beaches || sampleBeaches);

  useEffect(() => {
    if (beaches) {
      setData(beaches);
    }
  }, [beaches]);

  return (
    <MapContainer
      center={[13.15, -61.20]}
      zoom={11}
      style={{ height: '100%', width: '100%', minHeight: '500px' }}
      className="rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {data.map((beach) => (
        <CircleMarker
          key={beach.id}
          center={[beach.latitude, beach.longitude]}
          radius={10}
          fillColor={getColorByImportance(beach.tourism_importance)}
          fillOpacity={0.8}
          color={getColorByImportance(beach.tourism_importance)}
          weight={2}
        >
          <Popup>
            <div className="min-w-[180px]">
              <h3 className="font-bold text-base mb-1">{beach.name}</h3>
              <p className="text-sm text-slate-300 mb-2">{beach.island}</p>
              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Tourism Priority:</span>
                  <span className="font-medium">{beach.tourism_importance}/5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lat:</span>
                  <span>{beach.latitude.toFixed(4)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Lng:</span>
                  <span>{beach.longitude.toFixed(4)}</span>
                </div>
              </div>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}

