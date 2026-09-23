import type {LatLngTuple} from "leaflet"
import type {Suggestion} from "../../hooks/useAddressAutocomplete.ts"

export type AddressKind = "pickup" | "destination"

export interface AddressFieldState {
    query: string
    suggestions: Suggestion[]
    onChange: (value: string) => void
    select: (s: Suggestion) => void
    setQuery: (value: string) => void
}

interface AddressInputProps {
    kind: AddressKind
    placeholder: string
    address: AddressFieldState
    setCoords: (coords: LatLngTuple | null) => void
    mapMode: AddressKind | null
    setMapMode: (mode: AddressKind | null) => void
}

function AddressInput({
                          kind,
                          placeholder,
                          address,
                          setCoords,
                          mapMode,
                          setMapMode
                      }: AddressInputProps) {
    const isMapModeActive = mapMode === kind

    const handleToggleMapMode = () => {
        address.setQuery("")
        setCoords(null)
        setMapMode(isMapModeActive ? null : kind)
    }

    const handleSelect = (s: Suggestion) => {
        address.select(s)
        setCoords([s.y, s.x])
        setMapMode(null)
    }

    return (
        <div className="input-group mb-3 bg-light rounded-3 border position-relative">
            <input
                type="text"
                name={kind}
                value={address.query}
                onChange={(e) => {
                    address.onChange(e.target.value)
                    setCoords(null)
                }}
                placeholder={placeholder}
                className="form-control bg-transparent border-0 py-2.5 shadow-none"
                style={{fontSize: '0.9rem'}}
                autoComplete="off"
                required
            />
            {/* Button extends the input, toggles "pick on map" mode */}
            <button
                type="button"
                className="btn border-0 border-start px-3 d-flex align-items-center justify-content-center transition-all"
                style={{
                    borderColor: '#dee2e6',
                    borderRadius: '0',
                    backgroundColor: isMapModeActive ? '#e9ecef' : 'transparent',
                    color: isMapModeActive ? '#dc3545' : '#6c757d',
                    width: '46px'
                }}
                onClick={handleToggleMapMode}
                title="Pick on the map"
                aria-pressed={isMapModeActive}
                aria-label={`Pick ${kind} location on the map`}
            >
                <i className="bi bi-geo-alt" style={{fontSize: '1.05rem'}}></i>
            </button>

            {address.suggestions.length > 0 && (
                <ul
                    className="list-group position-absolute w-100 top-100 start-0 shadow-lg"
                    style={{zIndex: 10000}}
                >
                    {address.suggestions.map((s, i) => (
                        <li
                            key={`${s.label}-${i}`}
                            className="list-group-item list-group-item-action"
                            style={{cursor: 'pointer', fontSize: '0.85rem'}}
                            onClick={() => handleSelect(s)}
                        >
                            {s.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AddressInput
