import React, {ChangeEventHandler, FC} from 'react';
import './textarea.styles.css';

interface TextAreaProps {
    value: string;
    whenChange: ChangeEventHandler<HTMLTextAreaElement>;
    required?: boolean;
    maxlength?: number;
    placeholder?: string;
    type?: "submit" | "button";
    rows?: number;
}

const Textarea: FC<TextAreaProps> = (
    {
        value,
        whenChange,
        type = "button",
        required = false,
        maxlength = 200,
        placeholder = '',
        rows = 10,
        ...props
    }
) => {
    return (
        <textarea
            {...props}
            placeholder={placeholder}
            maxLength={maxlength}
            rows={rows}
            required
            value={value}
            className="TextArea"
            onChange={whenChange}
        />
    );
}

export default Textarea;