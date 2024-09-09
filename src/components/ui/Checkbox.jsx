import React from 'react';

export const Checkbox = ({ id, label, className = '', ...props }) => (
    <div className="flex items-center">
        <input
            id={id}
            type="checkbox"
            className={`h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded ${className}`}
            {...props}
        />
        {label && (
            <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
                {label}
            </label>
        )}
    </div>
);