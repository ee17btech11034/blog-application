import React from 'react';

const CustomButton = ({
    children, 
    type = 'button',
    bgColor = 'tomatoe',
    textColor = 'white',
    className='', // generally we give empty class anmes
    ...props, // we take remaining inputs as well if user is giving any
}) => {
    return (
        <button className={`class1, class2, ${className}`} {...props}>
            {children}
        </button>
    );
}

export default CustomButton;
