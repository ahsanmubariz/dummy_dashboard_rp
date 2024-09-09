import React from 'react';

export const Input = ({ className = '', ...props }) => (
    <input
        className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md ${className}`}
        {...props}
    />
);