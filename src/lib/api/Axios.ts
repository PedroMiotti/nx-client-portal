import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { memoizedRefreshToken } from "./Auth";

let BASE_URL;
if (process.env.NEXT_PUBLIC_ENVIRONMENT === "dev")
  BASE_URL = "http://localhost:5000";
else BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface BaseResult<T> {
  Meta: {
    Message: string;
    Status: string;
  };
  Error: string | string[];
  Data: T;
}

export interface BasePaginatedResult<T> extends BaseResult<T> {
  Pagination: {
    TotalObjects: number;
    TotalPages: number;
    CurrentPage: number;
  };
}

export type BaseAxiosResponse<T> = Promise<AxiosResponse<BaseResult<T>>>;

export const Api = axios.create({
  baseURL: BASE_URL,
});

Api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    const token = Cookies.get("arc:access_token");

    if (token && !config?.headers?.Authorization)
      config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  async (error) => Promise.reject(error)
);

Api.interceptors.response.use(
  (response: AxiosResponse<any, any>) => response,
  async (error) => {
    const config = error.config;

    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();
      if (result?.AccessToken) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.AccessToken}`,
        };
      }

      return Api.request(config);
    }

    return Promise.reject(error);
  }
);
