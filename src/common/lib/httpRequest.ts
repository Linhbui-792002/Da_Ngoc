import axios, { AxiosRequestConfig } from 'axios';

const request = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const get = async (path: string, req: AxiosRequestConfig<any> | undefined) => {
    const response = await request.get(path, req);
    return response;
};

export const post = async (path: string, req: any, headers: AxiosRequestConfig<any> | undefined) => {
    const response = await request.post(path, req, headers);
    return response;
};

export const put = async (path: string, req: any, headers: AxiosRequestConfig<any> | undefined) => {
    const response = await request.put(path, req, headers);
    return response;
};

export const patch = async (path: string, req: any, headers: AxiosRequestConfig<any> | undefined) => {
    const response = await request.patch(path, req, headers);
    return response;
};

export const remove = async (path: string) => {
    const response = await request.delete(path);
    return response;
};

export default request;
