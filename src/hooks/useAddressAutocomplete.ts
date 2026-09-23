import {OpenStreetMapProvider} from "leaflet-geosearch"
import {useEffect, useRef, useState} from 'react'
import {KYIV_BBOX, SEARCH_LANGUAGE, SERVICE_COUNTRY_CODE} from "../constants/geo.ts"

const DEBOUNCE_MS = 400
const MIN_QUERY_LENGTH = 3
const MAX_SUGGESTIONS = 5

const provider = new OpenStreetMapProvider({
    params: {
        countrycodes: SERVICE_COUNTRY_CODE,
        viewbox: KYIV_BBOX,
        bounded: 1,
        'accept-language': SEARCH_LANGUAGE,
    },
})

export interface Suggestion {
    label: string
    x: number
    y: number
}

export function useAddressAutocomplete() {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
    // Counter of search request. Used to ignore a response if a newer
    // request was already sent (avoid race conditions).
    const requestId = useRef(0)

    // Clear the pending timeout on unmount so we don't call setState
    // on an unmounted component.
    useEffect(() => {
        return () => clearTimeout(timer.current)
    }, [])

    const onChange = (value: string) => {
        setQuery(value)
        clearTimeout(timer.current)

        if (value.length < MIN_QUERY_LENGTH) {
            setSuggestions([])
            return
        }

        const currentRequestId = ++requestId.current

        timer.current = setTimeout(async () => {
            try {
                const results = await provider.search({query: value})

                //This response belongs to an old request, skip it.
                if (currentRequestId !== requestId.current) {
                    return
                }

                setSuggestions(
                    results.slice(0, MAX_SUGGESTIONS).map((r) => ({
                        label: r.label,
                        x: r.x,
                        y: r.y,
                    }))
                )
            } catch (err) {
                if (currentRequestId === requestId.current) {
                    console.error("Address search failed", err)
                    setSuggestions([])
                }
            }
        }, DEBOUNCE_MS)
    }

    const select = (s: Suggestion) => {
        setQuery(s.label)
        setSuggestions([])
    }

    return {query, onChange, suggestions, select, setQuery}
}
