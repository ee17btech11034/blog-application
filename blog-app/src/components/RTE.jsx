import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';


// we can use useRef to give the reference for this
// other way is "Controller"
const RTE = ({name, control, label, defaultValue=""}) => {
    // control is the one which takes all the values of its states from here to form
    return (
        <div>
            {label && <label> {label}</label>}
        
            <Controller
                name={name || "content"}
                control={control}
                render={({field: {onChange}})=>(
                    <Editor
                        onEditorChange={onChange}
                    />
                )} 
            />
        
        </div>
    );
}

export default RTE;

/*
<Editor/> // we can do it like this as well


<Editor
            initialValue='default value'
            init={
                {
                    branding: false,
                    height: 500,
                    menubar: true,
                    plugins:[
                        'print anchor', 'wordcount'
                    ],
                    toolbar:[

                    ]
                }
            }
        />
*/