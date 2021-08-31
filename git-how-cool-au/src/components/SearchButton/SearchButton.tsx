import "./SearchButton.css";

export type SearchButtonProps = {
    isDisabled: boolean;
    children: React.ReactNode;
};

const SearchButton: React.FC<SearchButtonProps> = ({ isDisabled, children }) => {
    return (
        <button className="search-button" disabled={isDisabled}>
            {children}
        </button>
    );
};

export default SearchButton;