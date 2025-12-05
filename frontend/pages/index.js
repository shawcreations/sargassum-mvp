import dynamic from 'next/dynamic';

const MapView = dynamic(() => import("../components/MapView"), { ssr: false });

export default function Home() {
  return (
    <div className="w-full h-screen">
      <MapView />
    </div>
  );
}

