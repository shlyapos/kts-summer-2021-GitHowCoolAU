export enum HTTPMethod {
    get = "GET",
    post = "POST",
    put = "PUT",
    delete = "DELETE"
};

export type RequestParams<ReqT> = {
    method: HTTPMethod;                 // Метод запроса GET или POST
    endpoint: string;                   // API-endpoint, на который делается запрос
    headers: Record<string, string>;    // Объект с передаваемыми HTTP-заголовками

    /**
     * Объект с данными запроса.
     * - Для GET-запроса данные превращаются в query-строку и добавляются в endpoint
     * - Для POST-запроса данные преобразуются к формату JSON и добавляются в тело запроса (необязательное требование)
     */
    data: ReqT;
};

// Статусы ответов
export enum StatusHTTP {
    success = 200,
    notFound = 404
};

// Ответ API
export type ApiResponse<SuccessT, ErrorT> =
    | {
        success: true;
        data: SuccessT;
        status: StatusHTTP;
    }
    | {
        success: false;
        data: ErrorT;
        status: StatusHTTP;
    };

export interface IApiStore {
    // Базовый url
    // TODO: в ApiStore указать url github)
    readonly baseUrl: string;

    // Метод с помощью которого выполняется запрос
    // TODO: реализовать в ApiStore
    request<SuccessT, ErrorT = any, ReqT = {}>(params: RequestParams<ReqT>): Promise<ApiResponse<SuccessT, ErrorT>>;
};