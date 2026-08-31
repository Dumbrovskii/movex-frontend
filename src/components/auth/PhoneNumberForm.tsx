import { useState, useEffect } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {sessionService} from "../../application/session/session.service.ts";

interface PhoneNumberFormProps {
    value: string;
    setIsValid: (value: boolean) => void;
    onChange: (value: string) => void;
}

function PhoneNumberForm({ value, setIsValid, onChange }: PhoneNumberFormProps) {
    const [phone, setPhone] = useState(value || "");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ text: string, isError: boolean } | null>(null);

    const phoneNumber = parsePhoneNumberFromString(phone)
    const isValid = phoneNumber?.isValid() ?? false

    useEffect(() => {
        setIsValid(isValid);
    }, [isValid, setIsValid]);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isValid) return;

        setLoading(true);
        setMessage(null);

        try {
            await sessionService.requestCode(phone)
            setMessage({ text: "Code sent successfully!", isError: false });
        } catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : "Something went wrong",
                isError: true
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-100">
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: "320px", height: "180px" }}>
                <div className="mb-3">
                    <label htmlFor="phone-field" className="form-label">
                        Phone Number:
                    </label>
                    <div className="d-flex justify-content-center">
                        <PhoneInput
                            value={phone}
                            defaultCountry="ua"
                            onChange={(value) => {
                                onChange(value);
                                setPhone(value);
                            }}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={!isValid || loading}
                >
                    {loading ? "Sending..." : "Send Code"}
                </button>

                {message && (
                    <div className={`alert ${message.isError ? "alert-danger" : "alert-success"} mt-3 mb-0 text-center`}>
                        {message.text}
                    </div>
                )}

            </form>
        </div>
    );
}

export default PhoneNumberForm;
