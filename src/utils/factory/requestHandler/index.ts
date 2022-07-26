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
                'Authorization': `${Configs.grantType} ${token}`
            },
        });
    }

    async postAsync<Type>(params: any, endpoint: string) {
        try {
            this.configureInterceptors();
            const response = await this._httpClient.post<Type>(endpoint, params);

            return response.data;
        } catch (e: any) {
            throw parseError(e);
        }
    }

    configureInterceptors() {
        axios.interceptors.request.use(function (config) {
            // Do something before request is sent
            console.log(config)
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        })
    }
}