import { useState } from "react";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

function PhoneNumberComponent() {
    const [value, setValue] = useState('');

    return (
        <div style={{ maxWidth: '300px', margin: '20px' }}>
            <PhoneInput
                defaultCountry="ua" // Использует стандартный lowercase код
                value={value}
                onChange={(val) => setValue(val)} // Всегда возвращает только строку
            />
            <p>Saved value: <b>{value}</b></p>
        </div>
    );
}

export default PhoneNumberComponent;