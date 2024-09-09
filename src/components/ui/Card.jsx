import React from 'react';

export const Card = ({ children, className = '' }) => (
    <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = '' }) => (
    <div className={`px-4 py-5 border-b border-gray-200 ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-lg font-medium leading-6 text-gray-900 ${className}`}>{children}</h3>
);

export const CardContent = ({ children, className = '' }) => (
    <div className={`px-4 py-5 ${className}`}>{children}</div>
);