import {MapContainer, TileLayer, Marker, useMapEvents} from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import {useState} from "react";
import 'leaflet/dist/leaflet.css';

function ClickCatcher({ onClick }: { onClick: (point: LatLngTuple) => void }) {
    useMapEvents({
        click: (e) => onClick([e.latlng.lat, e.latlng.lng]),
    });
    return null;
}

export function Map() {
    const center: LatLngTuple = [50.45, 30.52];
    const [origin, setOrigin] = useState<LatLngTuple | null>(null);

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <p>{origin}</p>
            <MapContainer center={center} zoom={12} attributionControl={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key="
                />
                <ClickCatcher onClick={setOrigin} />
                {origin && <Marker position={origin} />}
            </MapContainer>
        </div>
    );
}