import React, {useId} from 'react';

// const CustomInput = reactHooksModule.forwardRef(({props/children}, ref) => {})
const CustomInput = React.forwardRef((
    {
        label,
        type = "text",
        className='',
        ...props
    }, ref // ref will provide the reference
) => {
    const id - useId();
    return (
        <div>
            {label && <label className={`class1 class2 ${className}` htmlFor={id}}>
                {label}
                </label>
            }
            <input type={type} className={`c1, c2 ${className}`} ref={ref} 
                {...props} id={id}    
            />
        </div>
    );
})

export default CustomInput;
