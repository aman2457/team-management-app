import React from 'react';

interface PillsProps {
    text: string;
}

const StatusPills: React.FC<PillsProps> = ({ text }) => {
    let displayText = '';
    let className = '';
    let filledCircleClassName = '';
    switch (text) {
        case 'Active':
            className = 'px-3 py-1 uppercase w-fit font-semibold text-xs rounded-full shadow-sm bg-green-100 text-green-900 p-2';
            displayText = 'Active';
            filledCircleClassName = `w-2 h-2 rounded-full bg-green-900 inline-block mr-2`;
            break;
        case 'Inactive':
            className = 'px-3 py-1 uppercase w-fit font-semibold text-xs rounded-full shadow-sm bg-red-100 text-red-900 p-2';
            displayText = 'Inactive';
            filledCircleClassName = `w-2 h-2 rounded-full bg-red-900 inline-block mr-2`;
            break;
        default:
            className = 'px-3 py-1 uppercase w-fit font-semibold text-xs rounded-full shadow-sm bg-gray-100 text-gray-900 p-2';
            displayText = 'Offline';
            filledCircleClassName = `w-2 h-2 rounded-full bg-gray-900 inline-block mr-2`;
            break;
    }


    return (
        <div className={className}>
            <div className={filledCircleClassName}></div> 
            {displayText}
        </div>

    );
};

export default StatusPills;