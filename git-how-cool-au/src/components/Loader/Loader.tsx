import React from 'react';

import styles from './Loader.module.scss';

type LoaderProps = {
    children: React.ReactNode,
    classStyle?: string
};

const Loader: React.FC<LoaderProps> = ({ children, classStyle='' }) => {
    return (
        <div className={`${styles.loader} ${classStyle}`}>
            <div className={`${styles.loader_wrapper} ${classStyle}`}>
                {children}
            </div>
        </div>
    );
};

export default React.memo(Loader);