import {apiClient} from "../http/api-client"
import type {LatLngTuple} from "leaflet"
import {useRidesStore} from "./rides-store.ts"
import {mapEstimateToRoute, mapActiveRouteToRoute} from "./route-mapper.ts"
import type {RideActiveResponse, RideEstimateResponse} from "./dto/rides.ts"


class RidesService {

    async initialize(): Promise<void> {
        const active: RideActiveResponse | null = await apiClient.get<RideActiveResponse | null>("/rides/active")

        if (!active) {
            useRidesStore.getState().clear()
            return
        }

        useRidesStore.getState().setRide(active.ride)
        useRidesStore.getState().setRoute(mapActiveRouteToRoute(active.route, active.ride))
    }

    async estimateRide(pickup: LatLngTuple, destination: LatLngTuple): Promise<RideEstimateResponse> {
        const estimate = await apiClient.post<RideEstimateResponse>(
            "/rides/estimate",
            {
                pickup_latitude: pickup[0],
                pickup_longitude: pickup[1],
                destination_latitude: destination[0],
                destination_longitude: destination[1],
            }
        )

        useRidesStore.getState().setRoute(mapEstimateToRoute(estimate))

        return estimate
    }

    async requestRide(pickup: LatLngTuple, destination: LatLngTuple): Promise<RideActiveResponse> {
        const active = await apiClient.post<RideActiveResponse>(
            "/rides",
            {
                pickup_latitude: pickup[0],
                pickup_longitude: pickup[1],
                destination_latitude: destination[0],
                destination_longitude: destination[1],
            }
        )

        useRidesStore.getState().setRide(active.ride)
        useRidesStore.getState().setRoute(mapActiveRouteToRoute(active.route, active.ride))

        return active
    }

    async cancelRide(rideId: number): Promise<void> {
        await apiClient.delete("/rides/cancel",
            {
                ride_id: rideId,
            }
        )

        useRidesStore.getState().clear()
    }
}

export const rideService = new RidesService()
