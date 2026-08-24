import { useState } from "react";
import PhoneNumberForm from "./PhoneNumberForm";
import VerificationCodeForm from "./VerificationCodeForm";

interface AuthFormProps {
    onTokenReceive: (token: string) => void;
}

function AuthForm({ onTokenReceive }: AuthFormProps) {
    const [phone, setPhone] = useState('');
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [showCodeForm, setShowCodeForm] = useState(false);

    return (
        <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">
            <div className="card shadow-sm p-4" style={{ width: "100%", maxWidth: "450px" }}>
                <div className="card-body text-center">
                    <div className="btn-group w-100 mb-4" role="group">
                        <button
                            type="button"
                            className={`btn ${!showCodeForm ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setShowCodeForm(false)}
                        >
                            Enter Phone
                        </button>
                        <button
                            type="button"
                            className={`btn ${showCodeForm ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setShowCodeForm(true)}
                            disabled={!isPhoneValid}
                        >
                            Enter Code
                        </button>
                    </div>

                    {!showCodeForm ? (
                        <PhoneNumberForm value={phone} setIsValid={setIsPhoneValid} onChange={setPhone} />
                    ) : (
                        <VerificationCodeForm phone={phone} onJWTReceive={onTokenReceive} />
                    )}

                </div>
            </div>
        </div>
    );
}

export default AuthForm;