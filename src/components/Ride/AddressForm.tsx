import type {LatLngTuple} from "leaflet"
import AddressInput, {type AddressKind, type AddressFieldState} from "./AddressInput.tsx"

interface AddressFormProps {
    pickupAddress: AddressFieldState
    destinationAddress: AddressFieldState
    setPickupCoords: (coords: LatLngTuple | null) => void
    setDestinationCoords: (coords: LatLngTuple | null) => void
    mapMode: AddressKind | null
    setMapMode: (mode: AddressKind | null) => void
}

function AddressForm({
                            pickupAddress,
                            destinationAddress,
                            setPickupCoords,
                            setDestinationCoords,
                            mapMode,
                            setMapMode,
                        }: AddressFormProps) {

    return (
        <form className="position-relative">
            <AddressInput
                kind="pickup"
                placeholder="Pcikup location"
                address={pickupAddress}
                setCoords={setPickupCoords}
                mapMode={mapMode}
                setMapMode={setMapMode}
            />

            <AddressInput
                kind="destination"
                placeholder="Drop-off location"
                address={destinationAddress}
                setCoords={setDestinationCoords}
                mapMode={mapMode}
                setMapMode={setMapMode}
            />
        </form>
    );
}

export default AddressForm
