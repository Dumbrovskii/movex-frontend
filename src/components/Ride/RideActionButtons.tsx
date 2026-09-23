interface RideActionButtonsProps {
    hasActiveRide: boolean
    disabled: boolean
    onOrder: () => void
    onCancel: () => void
}


function RideActionButtons({hasActiveRide, disabled, onOrder, onCancel}: RideActionButtonsProps) {
    if (hasActiveRide) {
        return (
            <button
                type="button"
                className="btn btn-dark w-100 py-2.5 rounded-3 fw-medium d-flex align-items-center justify-content-center"
                disabled={disabled}
                onClick={onCancel}
            >
                Cancel Ride
            </button>
        )
    }

    return (
        <button
            type="button"
            className="btn btn-dark w-100 py-2.5 rounded-3 fw-medium d-flex align-items-center justify-content-center"
            disabled={disabled}
            onClick={onOrder}
        >
            Order Ride
        </button>

    )
}

export default RideActionButtons
