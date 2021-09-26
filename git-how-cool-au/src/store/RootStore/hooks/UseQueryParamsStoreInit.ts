import { useHistory, useLocation } from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
    const history = useHistory();
    const location = useLocation();

    const {search} = useLocation();

    rootStore.query.setSearch(search);
    // rootStore.query.setHistory(history, location);
}