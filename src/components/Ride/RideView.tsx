import {useEffect, useState} from "react"
import type {LatLngTuple} from "leaflet"
import AddressForm from "./AddressForm.tsx"
import RideDetailView from "./RideDetailView.tsx"
import RideActionButtons from "./RideActionButtons"
import type {AddressKind} from "./AddressInput"
import {useAddressAutocomplete} from "../../hooks/useAddressAutocomplete.ts"
import {useReverseGeocode} from "../../hooks/useReverseGeocode"
import {rideService} from "../../infrastructure/rides/rides-service"
import {useRidesStore} from "../../infrastructure/rides/rides-store.ts"

interface RideView {
    pickupCoords: LatLngTuple | null
    destinationCoords: LatLngTuple | null
    setPickupCoords: (coords: LatLngTuple | null) => void
    setDestinationCoords: (coords: LatLngTuple | null) => void
    mapMode: AddressKind | null
    setMapMode: (mode: AddressKind | null) => void
}

const DEFAULT_ERROR = "Something went wrong. Please try again later."

function RideView({
                      pickupCoords,
                      destinationCoords,
                      setPickupCoords,
                      setDestinationCoords,
                      mapMode,
                      setMapMode
                  }: RideView) {
    const pickupAddress = useAddressAutocomplete()
    const destinationAddress = useAddressAutocomplete()

    useReverseGeocode(pickupCoords, pickupAddress.query, pickupAddress.setQuery)
    useReverseGeocode(destinationCoords, destinationAddress.query, destinationAddress.setQuery)

    const route = useRidesStore((state) => state.route)
    const ride = useRidesStore((state) => state.ride)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if (!pickupCoords || !destinationCoords) {
            return
        }

        let cancelled = false

        const estimate = async () => {
            try {
                setLoading(true)
                setError("")
                await rideService.estimateRide(pickupCoords, destinationCoords)
            } catch (err) {
                if (!cancelled) {
                    setError(err instanceof  Error ? err.message : DEFAULT_ERROR)
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        estimate()

        return () => {
            cancelled = true
        }

    }, [pickupCoords, destinationCoords])

    const handleOrder = async () => {
        if (!pickupCoords || !destinationCoords) {
            setError("Select an address from the list or pick on the map.")
            return
        }

        try {
            setLoading(true)
            setError("")
            await rideService.requestRide(pickupCoords, destinationCoords)
        } catch (err) {
            setError(err instanceof Error ? err.message : DEFAULT_ERROR)
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = async () => {
        if (!ride) {
            setError("Ride ID not found")
            return
        }

        try {
            setLoading(true)
            setError("")
            await rideService.cancelRide(ride.id)
        } catch (err) {
            setError(err instanceof Error ? err.message : DEFAULT_ERROR)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div
            className="position-fixed top-0 end-0 m-4 border-0 rounded-4 bg-white w-100"
            style={{maxWidth: "420px", zIndex: 9999, boxShadow: "0 15px 35px rgba(0,0,0,0.5)"}}
        >
            <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-4 text-dark">Where to go?</h5>

                <AddressForm
                    pickupAddress={pickupAddress}
                    destinationAddress={destinationAddress}
                    setPickupCoords={setPickupCoords}
                    setDestinationCoords={setDestinationCoords}
                    mapMode={mapMode}
                    setMapMode={setMapMode}
                />

                <RideDetailView
                    loading={loading}
                    error={error}
                    distanceMeters={route?.distanceMeters ?? null}
                    price={route?.price ?? null}
                    currency={route?.currency ?? null}
                />

                <RideActionButtons
                    hasActiveRide={ride != null}
                    disabled={loading || !route}
                    onOrder={handleOrder}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    );
}

export default RideView
