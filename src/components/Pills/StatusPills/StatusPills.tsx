import React from 'react';

interface PillsProps {
    text: string;
}

const StatusPills: React.FC<PillsProps> = ({ text }) => {
    let color = '';
    let displayText = '';
    switch (text) {
        case 'Active':
            color = 'green';
            displayText = 'Active';
            break;
        case 'Inactive':
            color = 'red';
            displayText = 'Inactive';
            break;
        default:
            color = 'yellow';
            displayText = 'Offline';
            break;
    }

    const className = `px-3 py-1 uppercase w-fit font-semibold text-xs rounded-full shadow-sm bg-${color}-100 text-${color}-900 p-2`;
    const filledCircleClassName = `w-2 h-2 rounded-full bg-${color}-900 inline-block mr-2`;

    return (
        <div className={className}>
            <div className={filledCircleClassName}></div> 
            {displayText}
        </div>

    );
};

export default StatusPills;