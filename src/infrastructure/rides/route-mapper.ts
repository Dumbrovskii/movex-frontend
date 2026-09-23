import type {LatLngTuple} from "leaflet"
import type {Route, RideEstimateResponse, Ride} from "./dto/rides.ts";

export interface RouteInfo {
    distanceMeters: number
    durationSeconds: number
    geometry: LatLngTuple[]
    price: string | number
    currency: string
}

export function mapEstimateToRoute(estimate: RideEstimateResponse): RouteInfo {
    return {
        distanceMeters: estimate.distance_meters,
        durationSeconds: estimate.duration_seconds,
        geometry: estimate.geometry.map(([longitude, latitude]) => [latitude, longitude]),
        price: estimate.price,
        currency: estimate.currency,
    }
}

export function mapActiveRouteToRoute(route: Route, ride: Ride): RouteInfo {
    return {
        distanceMeters: route.distance_meters,
        durationSeconds: route.duration_seconds,
        geometry: route.geometry.map((point) => [point.latitude, point.longitude]),
        price: ride.price,
        currency: ride.currency,
    }
}
