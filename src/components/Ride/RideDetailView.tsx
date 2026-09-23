interface RidedetailviewProps {
    loading: boolean
    error: string
    distanceMeters: number | null
    price: string | number | null
    currency: string | null
}

function formatDistance(meters: number): string {
    return (meters / 1000).toFixed(1) + " km"
}

function RideDetailView({loading, error, distanceMeters, price, currency}: RidedetailviewProps) {
    if (loading) {
        return (
            <div className="text-center py-2 mb-3">
                <span className="spinner-border spinner-border-sm text-secondary me-2" role="status"></span>
                <span className="text-secondary small">Calculating price...</span>
            </div>
        )
    }

    if (error) {
        return <p className="text-danger small mb-3">{error}</p>
    }

    if (distanceMeters == null || price == null) {
        return null
    }

    return (
        <div className="card bg-light border-0 rounded-3 p-3 mb-4 d-flex flex-row justify-content-between align-items-center">
            <div>
                <span className="text-muted d-block small text-uppercase fw-semibold" style={{fontSize: "0.75rem"}}>
                    Distance
                </span>
                <span className="fw-bold text-dark">{formatDistance(distanceMeters)}</span>
            </div>
            <div className="text-end">
                <span className="text-muted d-block small text-uppercase fw-semibold" style={{fontSize: "0.75rem"}}>
                    Price
                </span>
                <span className="fw-bold text-primary fs-5">
                    {price} {currency}
                </span>
            </div>
        </div>
    )
}

export default RideDetailView
