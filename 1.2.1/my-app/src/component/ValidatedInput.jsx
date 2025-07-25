// ValidatedInput.js
import React, { useState, useEffect } from 'react';

function ValidatedInput({ label, name, type = 'text', validationFn, errorMessage, onChange }) {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (value === '') {
            setError('');
            return;
        }

        if (validationFn(value)) {
            setError('');
        } else {
            setError(errorMessage);
        }
    }, [value, validationFn, errorMessage]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onChange(name, newValue);
    };

    return (
        <div className="mb-3">
            <label className="form-label">{label}</label>
            <input
                type={type}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                value={value}
                onChange={handleChange}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default ValidatedInput;
