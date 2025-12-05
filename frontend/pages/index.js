import dynamic from 'next/dynamic';

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapView />
    </div>
  );
}
