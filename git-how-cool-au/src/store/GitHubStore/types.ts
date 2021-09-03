import { ApiResponse } from "src/shared/store/ApiStore/types";

/** Интерфейс класса для работы с GitHub API
 * названия getSomeData и postSomeData
 * (а также типов GetSomeDataParams и PostSomeDataPrams)
 * поменяйте в соответствии с выполняемым запросом.
 * Выберите любой запрос из публичного API GitHub.
 */
export interface IGitHubStore {
    getRepo(username: string): Promise<ApiResponse<any, any>>;
    getRepoBranches(username: string, reponame: string): Promise<ApiResponse<any, any>>;

    // Необязательный пункт, т.к. требует авторизации. Понадобится в будущем
    // postSomeData(params: PostSomeDataPrams): Promise<ApiResp<any>>;
}