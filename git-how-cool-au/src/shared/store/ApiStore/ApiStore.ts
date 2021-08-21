import { ApiResponse, IApiStore, RequestParams, StatusHTTP } from "./types";

export default class ApiStore implements IApiStore {
    baseUrl: string = 'https://api.github.com/';

    async request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>> {
        try {
            const response = await fetch(`${this.baseUrl}${params.endpoint}`, params);
            const data = await response.json();

            return {
                success: true,
                data: data,
                status: StatusHTTP.success
            };
        } catch (error: any) {
            return {
                success: false,
                data: error,
                status: StatusHTTP.notFound
            };
        }
    }
};