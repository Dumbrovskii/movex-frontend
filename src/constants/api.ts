export const API_URL = import.meta.env.VITE_API_URL;

export const ROUTES = {
    REQUEST_CODE: `${API_URL}/auth/request-code`,
    VERIFY_CODE: `${API_URL}/auth/verify-code`,
};

export const API_OPTIONS_POST = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};