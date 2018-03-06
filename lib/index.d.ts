/// <reference types="react" />
import React from 'react';
import { Input } from 'antd';
export interface SelectCityProps {
    code?: any;
    params: {
        deepMap: Array<{
            name: string;
            value?: number;
        }>;
        popupStyle?: {
            width: number;
            zIndex: number;
        };
        search?: boolean;
        address?: any;
        addressApi?: string;
        addressFetchData?: any;
        style?: {
            width: number;
        };
        onChange?: (selectVal: number[], selectName: string[], code: any) => void;
        onSelect?: (selectVal: number[], selectName: string[], code: any) => void;
        placeholder?: string;
    };
    onChange?: (value: any) => void;
}
export interface SelectCityState {
    show: boolean;
    input: {
        left: number;
        top: number;
        width: string | number;
    };
    index: number;
    valIndex: number;
    selectVal: number[];
    selectName: string[];
    searching: boolean;
    searchName: string;
    searchDataSource: Object[];
    loading: boolean;
    addressMap: Map<any, any>[];
    addressMapSearch: any[];
    addressLoading: boolean;
}
export default class SelectCity extends React.Component<SelectCityProps, SelectCityState> {
    /**
     * 用户选中的缓存便于还原
     */
    _cache: {
        searchName: string;
        searchResult: {};
    };
    constructor(props: SelectCityProps);
    getAddress: () => Promise<void>;
    fireEvent(element: any, event: any): any;
    show(e: React.SyntheticEvent<Input>): void;
    hide: () => void;
    getOffsetRect(node: HTMLInputElement): {
        top: number;
        left: number;
    };
    inputCity: Input;
    input: () => {
        left: number;
        top: number;
        width: number;
    };
    _container: HTMLElement;
    componentDidMount(): void;
    postionContainerProps: () => {
        setInputValue: (selectVal: number[], selectName: string[]) => void;
        matchQ: string;
        changeState: (params: any) => void;
        addressMap: Map<any, any>[];
        params: {
            deepMap: {
                name: string;
                value?: number | undefined;
            }[];
            popupStyle?: {
                width: number;
                zIndex: number;
            } | undefined;
            search?: boolean | undefined;
            address?: any;
            addressApi?: string | undefined;
            addressFetchData?: any;
            style?: {
                width: number;
            } | undefined;
            onChange?: ((selectVal: number[], selectName: string[], code: any) => void) | undefined;
            onSelect?: ((selectVal: number[], selectName: string[], code: any) => void) | undefined;
            placeholder?: string | undefined;
        };
        input: {
            left: number;
            top: number;
            width: string | number;
        };
        show: boolean;
        searching: boolean;
        searchDataSource: Object[];
        selectName: string[];
        selectVal: number[];
        index: number;
        valIndex: number;
        loading: boolean;
    };
    /**
     * 触发antd的form验证事件
     */
    triggerChange: (changedValue: any) => void;
    autoSelect: (params: any) => void;
    changeState(params: any): void;
    clear: () => void;
    onChange(e: React.ChangeEvent<HTMLInputElement>): void;
    setInputValue: (selectVal: number[], selectName: string[]) => void;
    getData(): {
        ids: number[];
        names: string[];
    };
    inputCityProps: () => any;
    render(): JSX.Element;
}
