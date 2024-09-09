import React from 'react';

export const Button = ({ children, variant = 'default', className = '', ...props }) => {
    const variantClasses = {
        default: 'bg-blue-600 hover:bg-blue-700 text-white',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    };

    return (
        <button
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${variantClasses[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};