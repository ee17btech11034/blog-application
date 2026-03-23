import React from 'react';

function Select ({
    options,
    label,
    className='',
    ...attributesToProps,
}, ref) {
    return (
        <div>
            <select> // check first that options has some values
                {options?.map((option)=> (
                    <option key={option} value={option}> {option}</option>
                ))}
            </select>
        </div>
    );
}

export default React.forwardref(Select);

// select button 