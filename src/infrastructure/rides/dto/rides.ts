
export type RideStatus =
    | "REQUESTED"
    | "ACCEPTED"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "CANCELED"

export interface RideEstimateResponse {
    distance_meters: number
    duration_seconds: number
    geometry: number[][]
    waypoints: number[][]
    price: string | number
    currency: string
}

export interface Ride {
    id: number
    passenger_id: number
    assigned_driver_id: number | null
    pickup_address: string
    pickup_geo: {
        latitude: number
        longitude: number
    }
    destination_address: string
    destination_geo: {
        latitude: number
        longitude: number
    }
    status: RideStatus
    distance_meters: number
    price: string
    currency: string
    created_at: string | null
    updated_at: string | null
}

export interface Route {
    distance_meters: number
    duration_seconds: number
    geometry: { latitude: number; longitude: number }[]
    waypoints: { latitude: number; longitude: number }[]
}

export interface RideActiveResponse {
    route: Route
    ride: Ride
}
