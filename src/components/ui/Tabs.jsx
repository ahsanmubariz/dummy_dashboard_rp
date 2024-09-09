import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue, className = '' }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);

    return (
        <div className={className}>
            {React.Children.map(children, child =>
                React.cloneElement(child, { activeTab, setActiveTab })
            )}
        </div>
    );
};

export const TabsList = ({ children, className = '' }) => (
    <div className={`flex border-b border-gray-200 ${className}`}>{children}</div>
);

export const TabsTrigger = ({ children, value, activeTab, setActiveTab, className = '' }) => (
    <button
        className={`px-4 py-2 font-medium ${activeTab === value ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700'} ${className}`}
        onClick={() => setActiveTab(value)}
    >
        {children}
    </button>
);

export const TabsContent = ({ children, value, activeTab, className = '' }) => (
    activeTab === value ? <div className={className}>{children}</div> : null
);