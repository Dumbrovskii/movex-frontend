import { useState, useMemo } from 'react';
import { PatternFormat } from 'react-number-format';
import { API_OPTIONS_POST, ROUTES } from '../../constants/api';

interface VerificationCodeFormProps {
    phone: string
    onJWTReceive: (jwt: string) => void;
}

function VerificationCodeForm({ phone, onJWTReceive }: VerificationCodeFormProps) {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, isError: boolean } | null>(null);

    const isValid = useMemo(() => {
        if (!code) return false;
        return code.length === 6;
    }, [code]);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(ROUTES.VERIFY_CODE, {
                ...API_OPTIONS_POST,
                body: JSON.stringify({ code, phone }),
            });

            if (!response.ok) {
                throw new Error("Failed to send code");
            }

            const data = await response.json();
            onJWTReceive(data.access_token);
            setMessage({ text: data.access_token, isError: false });
        }
        catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : 'Something went wrong',
                isError: true
            });
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-100">
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "320px", height: "180px" }}>
                <div className="mb-3 text-center">
                    <label htmlFor="code-field" className="form-label">
                        SMS Code:
                    </label>
                    <div className="d-flex justify-content-center">
                        <PatternFormat
                            id="code-field"
                            format="######"
                            mask="_"
                            onValueChange={(values) => setCode(values.value)}
                            className="form-control text-center"
                            style={{ width: "100px", height: "36px" }}
                            placeholder="______"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!isValid || loading}
                >
                    {loading ? "Verifying ..." : "Verify Code"}
                </button>

                {message && (
                    <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3 mb-0 text-center`}>
                        {message.text}
                    </div>
                )}

            </form>

        </div>
    )
}

export default VerificationCodeForm;