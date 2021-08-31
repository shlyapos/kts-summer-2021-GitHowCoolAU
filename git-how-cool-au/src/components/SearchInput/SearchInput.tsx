import "./SearchInput.css";

export type SearchInputProps = {
    disabled: boolean;
    placeholder: string;
};

const SearchInput: React.FC<SearchInputProps> = ({ disabled, placeholder }) => {
    return <input className="search-input" type="text" placeholder="Введите название организации"></input>;
};

export default SearchInput;