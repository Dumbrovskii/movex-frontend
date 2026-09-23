import type {RideStatus} from "./enums/ride-status.ts";
import type {GeoPoint} from "./value-objects/geo-point.ts";

export interface Ride {
    id: number
    passenger_id: number
    assigned_driver_id: number | null
    pickup_address: string
    pickup_geo: GeoPoint
    destination_address: string
    destination_geo: GeoPoint
    status: RideStatus
    created_at: string | null
    updated_at: string | null
}
