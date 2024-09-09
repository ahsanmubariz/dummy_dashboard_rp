import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
    const variantClasses = {
        default: 'bg-blue-100 text-blue-800',
        outline: 'border border-gray-300 text-gray-600',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    );
};