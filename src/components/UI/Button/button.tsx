import React, {FC} from 'react';
import './button.styles.css';

interface ButtonProps {
    type?: "submit" | "button";
    whenClick?: () => void;
}

const Button: FC<ButtonProps> = ({whenClick, type = "button", children, ...props}) => {
    return (
        <button {...props} type={type} className={"Button"} onClick={whenClick}>{children}</button>
    );
}

export default Button;