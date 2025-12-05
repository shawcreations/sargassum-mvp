import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";

export default function MapView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/sargassum/latest`)
      .then((res) => res.json())
      .then((json) => setData(json.data || []));
  }, []);

  return (
    <MapContainer 
      center={[13.15, -61.23]} 
      zoom={11} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((point, idx) => (
        <Marker key={idx} position={[point.lat, point.lng]}>
          <Popup>
            Density: {point.density}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

