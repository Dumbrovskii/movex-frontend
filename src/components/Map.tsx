import {MapContainer, TileLayer, Marker, useMapEvents, Polyline} from 'react-leaflet'
import {type LatLngTuple} from 'leaflet'
import {useEffect, useState} from "react"
import 'leaflet/dist/leaflet.css'
import RideView from "./Ride/RideView.tsx"
import {useRidesStore} from "../infrastructure/rides/rides-store.ts"
import {KYIV_CENTER, DEFAULT_ZOOM} from "../constants/geo.ts"


function ClickCatcher({
                          onClick,
                          enabled
                      }: {
    onClick: (point: LatLngTuple) => void,
    enabled: boolean
}) {
    useMapEvents({
        click: (e) => {
            if (enabled) {
                onClick([e.latlng.lat, e.latlng.lng])
            }
        },
    })
    return null
}

export function Map() {

    const [pickupCoords, setPickupCoords] = useState<LatLngTuple | null>(null)
    const [destinationCoords, setDestinationCoords] = useState<LatLngTuple | null>(null)
    const [mapMode, setMapMode] = useState<'pickup' | 'destination' | null>(null)

    const route = useRidesStore(state => state.route)
    const ride = useRidesStore(state => state.ride)

    const routeGeometry: LatLngTuple[] = route?.geometry ?? []


    useEffect(() => {
        if (!ride) {
            setPickupCoords(null)
            setDestinationCoords(null)
            return
        }

        setPickupCoords([
            ride.pickup_geo.latitude,
            ride.pickup_geo.longitude,
        ])

        setDestinationCoords([
            ride.destination_geo.latitude,
            ride.destination_geo.longitude,
        ])
    }, [ride])

    const handleMapClick = async (coords: LatLngTuple) => {
        if (!mapMode) return

        if (mapMode === 'pickup') {
            setPickupCoords(coords)
        } else {
            setDestinationCoords(coords)
        }

        setMapMode(null)
    }

    return (
        <div style={{height: '100vh', width: '100%', position: 'relative'}}>
            {/* Visual indicator for active map mode */}
            {mapMode && (
                <div
                    className="position-absolute top-0 start-50 translate-middle-x mt-3 bg-dark text-white px-3 py-2 rounded-5 text-center shadow"
                    style={{zIndex: 10000, fontSize: '0.9rem'}}
                >
                    📍 Click on the map to choose a {mapMode === 'pickup' ? 'pickup' : 'destination'} address
                </div>
            )}

            <MapContainer center={KYIV_CENTER} zoom={DEFAULT_ZOOM} attributionControl={false} style={{height: '100%', width: '100%'}}>
                <TileLayer
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key="
                />
                {/* ClickCatcher works only if mapMode is activated */}
                <ClickCatcher onClick={handleMapClick} enabled={mapMode !== null}/>

                {/* Render markers if coordinates exist */}
                {pickupCoords && <Marker position={pickupCoords}/>}
                {destinationCoords && <Marker position={destinationCoords}/>}

                {/* If route geometry exists, draw the Polyline */}
                {routeGeometry.length > 0 && (
                    <Polyline
                        positions={routeGeometry}
                        pathOptions={{
                            color: '#3d5afe',
                            weight: 5,
                            opacity: 0.8,
                            lineJoin: 'round'
                        }}
                    />
                )}
            </MapContainer>

            <RideView
                pickupCoords={pickupCoords}
                destinationCoords={destinationCoords}
                setPickupCoords={setPickupCoords}
                setDestinationCoords={setDestinationCoords}
                mapMode={mapMode}
                setMapMode={setMapMode}
            />
        </div>
    )
}