import dynamic from 'next/dynamic';

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <MapView />
    </div>
  );
}
