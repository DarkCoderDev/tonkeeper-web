import React, {memo, PropsWithChildren, useEffect} from 'react';
import './modal.styles.css'
import toggleActiveClass from "../../helpers/toggle-active-class.helper";

interface ModalProps {
    isVisible: boolean;
    whenClose: () => void;
}

const Modal = memo<PropsWithChildren<ModalProps>>(({isVisible = false, whenClose, children}) => {
    useEffect(() => {
        document.body.style.overflow = isVisible ? "hidden" : "scroll";
    }, [isVisible]);

    return (
        <div className={toggleActiveClass(`modal-wrapper`, isVisible)} onClick={(e) => whenClose()}>
            <div className={toggleActiveClass(`modal`, isVisible)} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
})

export default Modal;