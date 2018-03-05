/// <reference types="react" />
import React, { Component } from 'react';
export interface PostionContainerProps {
    matchQ: string;
    loading: boolean;
    searchDataSource: any[];
    setInputValue: (selectVal: number[], selectName: string[]) => void;
    index: number;
    selectVal: number[];
    valIndex: number;
    params: any;
    addressMap: Map<any, any>[];
    changeState: (params: any) => void;
    input: {
        left: number;
        top: number;
        width: number | string;
    };
    show: boolean;
    searching: boolean;
}
declare class PostionContainer extends Component<PostionContainerProps, {}> {
    constructor(props: PostionContainerProps);
    zhReg: RegExp;
    enReg: RegExp;
    highlightReplace(data: string, matchQ: string): any[];
    highlight: (data: Pick<{
        firstOfAll: string;
        name: string;
        totalPY: string;
        value: number;
        parentIds: any[];
    }, "value" | "name" | "firstOfAll" | "totalPY">) => string | any[] | JSX.Element;
    columns: () => {
        key: string;
        render: (text: {}, record: {}) => JSX.Element;
    }[];
    handClick(e: React.SyntheticEvent<HTMLDivElement>): void;
    tableProps: () => any;
    tabConProps: () => {
        index: number;
        selectVal: number[];
        valIndex: number;
        params: any;
        addressMap: Map<any, any>[];
        changeState: (params: any) => void;
    };
    render(): JSX.Element;
}
export default PostionContainer;
