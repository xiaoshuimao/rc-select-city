import 'whatwg-fetch';
export interface ResponeData {
    errcode: string | number;
    status: string | number;
    error?: string;
    msg?: string;
    errmsg?: string;
}
/**
 * fetchFn 对window.fetch的封装，方面统一管理
 * @param url {String<URL>} 请求地址
 * @param data {Object<JSON>} 请求参数
 * @param option {Object<JSON>} 额外的fetch可配置参数
 */
export declare const fetchFn: (url: string | undefined, data: {}, option?: RequestInit | undefined) => Promise<{}>;
