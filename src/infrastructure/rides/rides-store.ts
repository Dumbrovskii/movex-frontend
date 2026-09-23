import { create } from "zustand"
import type {Ride} from "./dto/rides.ts"
import type {RouteInfo} from "./route-mapper.ts";

interface RidesState {
    route: RouteInfo | null
    ride: Ride | null
    setRoute: (route: RouteInfo | null) => void
    setRide: (ride: Ride | null) => void
    clear: () => void
}

export const useRidesStore = create<RidesState>((set) => ({
    route: null,
    ride: null,

    setRoute: (route) => set({route}),
    setRide: (ride) => set({ride}),

    clear: () => set({route: null, ride: null}),
}))
