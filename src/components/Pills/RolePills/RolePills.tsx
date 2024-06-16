// I have these many unqiue roles [ 'tech', 'marketing', 'rnd', 'design', 'qa', 'product' ] design a pill component that will show these roles as pills.

import React from 'react';

interface PillsProps {
    text: string;
}

const RolePills: React.FC<PillsProps> = ({ text }) => {
    let displayText = '';
    let className = '';
    switch (text) {
        case 'tech':
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-cyan-100 text-cyan-900 p-2';
            displayText = 'Tech';
            break;
        case 'marketing':
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-indigo-100 text-indigo-900 p-2';
            displayText = 'Marketing';
            break;
        case 'rnd':
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-blue-100 text-blue-900 p-2';
            displayText = 'R&D';
            break;
        case 'design':
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-purple-100 text-purple-900 p-2';
            displayText = 'Design';
            break;
        case 'qa':
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-pink-100 text-pink-900 p-2';
            displayText = 'QA';
            break;
        case 'product':
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-sky-100 text-sky-900 p-2';
            displayText = 'Product';
            break;
        default:
            className = 'px-3 py-1 w-fit font-semibold text-xs rounded-full shadow-sm bg-gray-100 text-gray-900 p-2';
            displayText = 'Unknown';
            break;
    }

    return (
        <div className={className}>
            {displayText}
        </div>

    );
}

export default RolePills;
