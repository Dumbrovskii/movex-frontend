import {SEARCH_LANGUAGE} from "../../constants/geo.ts"

const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse"

class GeocodingService {
    // Returns a human-readable address for a point, or null if the
    // provider has nothing for these coordinates.
    async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
        const url = `${NOMINATIM_REVERSE_URL}?format=json&lat=${latitude}&lon=${longitude}&accept-language=${SEARCH_LANGUAGE}`

        const response = await fetch(url)
        if (!response.ok) {
            return null
        }

        const data = await response.json()
        return data?.display_name ?? null
    }
}

export const geocodingService = new GeocodingService()
