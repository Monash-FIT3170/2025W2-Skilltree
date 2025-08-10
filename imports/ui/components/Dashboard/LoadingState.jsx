import React from 'react';

export const DashboardLoadingState = () => {
    return (
        <div className="p-4 lg:p-6">
        <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-6"></div>
            <div className="space-y-8">
            {[1, 2].map(section => (
                <div key={section}>
                <div className="h-6 bg-gray-200 rounded w-48 mb-4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(item => (
                    <div
                        key={item}
                        className="bg-gray-200 rounded-xl h-48"
                    ></div>
                    ))}
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    );

}