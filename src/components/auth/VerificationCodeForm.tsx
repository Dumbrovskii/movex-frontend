import { useState } from 'react'
import { PatternFormat } from 'react-number-format'
import {sessionService} from "../../application/session/session.service.ts"

interface VerificationCodeFormProps {
    phone: string
}

function VerificationCodeForm({ phone }: VerificationCodeFormProps) {
    const [code, setCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ text: string, isError: boolean } | null>(null)

    const isValid = code.length === 6

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!isValid) return

        setLoading(true)
        setMessage(null)

        try {
            await sessionService.login(phone, code)
        }
        catch (error) {
            setMessage({
                text: error instanceof Error ? error.message : 'Something went wrong',
                isError: true
            })
        }
        finally {
            setLoading(false)
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

export default VerificationCodeForm