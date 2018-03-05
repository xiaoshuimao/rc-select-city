/**
 * [parseAddress 分解json地址]
 * @param  {} data [description]
 * @return {[type]}      [description]
 */
export declare const parseAddress: (data: Object, max: number) => {
    addressMap: Map<any, any>[];
    addressMapSearch: any[];
};
/**
 * 模糊匹配结果
 * @param q {string} 搜索关键字
 * @param source {Array} source 数据集
 */
export declare type searchSourceData = {
    firstOfAll: string;
    name: string;
    totalPY: string;
    value: number;
    parentIds: any[];
};
export declare type searchResultArr = Pick<searchSourceData, 'firstOfAll' | 'name' | 'totalPY' | 'value'>;
export declare const matchSearch: (q: string, searchSource: searchSourceData[], addressMap: any[], deepMap: any[]) => Pick<searchSourceData, "value" | "name" | "firstOfAll" | "totalPY">[];
/**
 * parseAddressName 按照id解析中文地址
 * @param  {Array} data 对应的id
 * @param  {Map} map  对照的Map
 * @return {Array}      中文地址
 */
export declare const parseAddressName: (data: any[], map: Array<Map<any, any>>) => string[];
export declare const throttle: (fn: any, delay: number) => () => void;
