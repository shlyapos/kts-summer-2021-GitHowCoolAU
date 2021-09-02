import React from "react";
import "./SearchInput.css";

export type SearchInputProps = {
    value: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

const SearchInput: React.FC<SearchInputProps> = ({ value, placeholder, onChange }) => {
    return <input className="search-input" type="text" placeholder={placeholder} onChange={onChange} value={value} />;
};

export default React.memo(SearchInput);