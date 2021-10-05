import { ApiResponse, IApiStore, RequestParams, StatusHTTP } from "./types";

export default class ApiStore implements IApiStore {
  readonly baseUrl: string = "";

  constructor(url: string) {
    this.baseUrl = url;
  }

  async request<SuccessT, ErrorT = any, ReqT = {}>(
    params: RequestParams<ReqT>
  ): Promise<ApiResponse<SuccessT, ErrorT>> {
    try {
      const response = await fetch(`${this.baseUrl}${params.endpoint}`, params);
      const data = await response.json();

      if (data.message !== "Not Found")
        return {
          success: true,
          data: data,
          status: StatusHTTP.success,
        };
      else
        return {
          success: false,
          data: data,
          status: StatusHTTP.notFound,
        };
    } catch (error: any) {
      return {
        success: false,
        data: error,
        status: StatusHTTP.notFound,
      };
    }
  }
}
