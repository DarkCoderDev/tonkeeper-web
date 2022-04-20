import React, {ChangeEventHandler, FC} from 'react';
import './textfield.styles.css';

interface TextFieldProps {
    value: string
    whenChange: ChangeEventHandler<HTMLInputElement>;
    placeholder?: string;
}

const Textfield: FC<TextFieldProps> = ({placeholder, whenChange, value, ...props}) => {
    return (
        <input {...props} type="text" className={`Input`} placeholder={placeholder} value={value} onChange={whenChange}/>
    );
}

export default Textfield;