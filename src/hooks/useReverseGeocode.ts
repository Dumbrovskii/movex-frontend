import {useEffect} from "react"
import type {LatLngTuple} from "leaflet"
import {geocodingService} from "../infrastructure/geocoding/geocoding-service.ts"

// Fills in the address text when coordinates were picked on the map
// (query is still empty). Runs once per coords change, and ignores its
// result if the coords change again before it resolves.
export function useReverseGeocode(
    coords: LatLngTuple | null,
    query: string,
    setQuery: (value: string) => void,
) {
    useEffect(() => {
        if (!coords || query) {
            return
        }

        let cancelled = false

        geocodingService
            .reverseGeocode(coords[0], coords[1])
            .then((label) => {
                if (!cancelled) {
                    setQuery(label ?? formatCoords(coords))
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setQuery(formatCoords(coords))
                }
            })

        return () => {
            cancelled = true
        }
    }, [])
}

function formatCoords([latitude, longitude]: LatLngTuple): string {
    return `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
}
