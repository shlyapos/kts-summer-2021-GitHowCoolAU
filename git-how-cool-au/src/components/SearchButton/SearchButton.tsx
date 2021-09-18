import React from "react";

import styles from "./SearchButton.module.scss";

export type SearchButtonProps = {
    isDisabled: boolean,
    children: React.ReactNode,
    onClick: (e: React.MouseEvent) => void
};

const SearchButton: React.FC<SearchButtonProps> = ({ isDisabled, children, onClick }) => {
    return (
        <button className={`${styles.search_button}`} disabled={isDisabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default React.memo(SearchButton);