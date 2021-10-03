import ApiStore, { ApiResponse, RequestParams } from "store/RootStore/ApiStore";

import QueryParamsStore from "./QueryParamsStore";

const BASE_URL_GITHUB = 'https://api.github.com/';

export default class RootStore {
    readonly query = new QueryParamsStore();
    private readonly apiStore = new ApiStore(BASE_URL_GITHUB);

    async apiRequest<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        return await this.apiStore.request(params);
    }
};