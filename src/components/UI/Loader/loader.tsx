import React, {FC} from 'react';
import './loader.styles.css';
import toggleActiveClass from "../../../helpers/toggle-active-class.helper";

interface LoaderProps {
    hidden: boolean;
}

const Loader: FC<LoaderProps> = ({hidden}) => {
    return (
        <div className={toggleActiveClass(`loader`, hidden)}></div>
    );
};

export default Loader;