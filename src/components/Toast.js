import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', show, onClose, duration = 3000 }) => {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [show, onClose, duration]);

    if (!show) return null;

    return (
        <div className={`toast-container ${type}`}>
            <div className="toast-content">
                <span className="toast-icon">
                    {type === 'success' ? '✓' : '⚠'}
                </span>
                <span className="toast-message">{message}</span>
            </div>
            <button className="toast-close" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Toast;
