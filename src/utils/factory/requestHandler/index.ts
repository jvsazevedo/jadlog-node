import axios, {AxiosInstance} from "axios";
import { Configs } from "../../config";
import { parseError } from "../errorHandler";

interface HandlerParams {
    token: string;
}

export class RequestHandler {
    _httpClient: AxiosInstance;

    constructor({ token }: HandlerParams) {
        this._httpClient = axios.create({
            baseURL: `${Configs.baseApiUrl}`,
            headers: {
                'Content-Type': 'application/json',
                'Authentication': `${Configs.grantType} ${token}`
            },
        });
    }

    async postAsync<Type>(params: any, endpoint: string) {
        try {
            const response = await this._httpClient.post<Type>(endpoint, params);

            return response.data;
        } catch (e) {
            throw parseError(e);
        }
    }
}