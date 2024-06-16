// I have these many unqiue roles [ 'tech', 'marketing', 'rnd', 'design', 'qa', 'product' ] design a pill component that will show these roles as pills.

import React from 'react';

interface PillsProps {
    text: string;
}

const RolePills: React.FC<PillsProps> = ({ text }) => {
    let color = '';
    let displayText = '';
    switch (text) {
        case 'tech':
            color = 'cyan';
            displayText = 'Tech';
            break;
        case 'marketing':
            color= 'indigo';
            displayText = 'Marketing';
            break;
        case 'rnd':
            color = 'blue';
            displayText = 'R&D';
            break;
        case 'design':
            color = 'purple';
            displayText = 'Design';
            break;
        case 'qa':
            color = 'pink';
            displayText = 'QA';
            break;
        case 'product':
            color = 'sky';
            displayText = 'Product';
            break;
        default:
            color = 'gray';
            displayText = 'Unknown';
            break;
    }
    const className = `px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-${color}-100 text-${color}-900 p-2`;
    const filledCircleClassName = `w-2 h-2 rounded-full bg-${color}-900 inline-block mr-2`;

    return (
        <div className={className}>
            <div className={filledCircleClassName}></div>
            {displayText}
        </div>

    );
}

export default RolePills;
