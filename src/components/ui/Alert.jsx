import React from 'react';

export const Alert = ({ children, className = '' }) => (
    <div className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 ${className}`}>{children}</div>
);

export const AlertTitle = ({ children, className = '' }) => (
    <h3 className={`text-sm font-medium text-yellow-800 ${className}`}>{children}</h3>
);

export const AlertDescription = ({ children, className = '' }) => (
    <div className={`mt-2 text-sm text-yellow-700 ${className}`}>{children}</div>
);