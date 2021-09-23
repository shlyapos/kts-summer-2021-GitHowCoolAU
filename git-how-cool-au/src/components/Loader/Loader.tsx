import React from 'react';

import styles from './Loader.module.scss';

type LoaderProps = {
    children: React.ReactNode
};

const Loader: React.FC<LoaderProps> = ({ children }) => {
    return (
        <div className={styles.loader}>
            <div className={styles.loader_wrapper}>
                {children}
            </div>
        </div>
    );
};

export default React.memo(Loader);