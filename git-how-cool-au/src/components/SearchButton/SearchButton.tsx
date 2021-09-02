import React from "react";
import "./SearchButton.css";

export type SearchButtonProps = {
    isDisabled: boolean,
    children: React.ReactNode,
    onClick: (e: React.MouseEvent) => void
};

const SearchButton: React.FC<SearchButtonProps> = ({ isDisabled, children, onClick }) => {
    return (
        <button className="search-button" disabled={isDisabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default SearchButton;