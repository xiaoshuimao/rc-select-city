/// <reference types="react" />
import { Component } from 'react';
export interface TabConProps {
    index: number;
    selectVal: any;
    params: any;
    addressMap: any;
    valIndex: number;
    changeState: (data: any) => void;
}
declare class TabCon extends Component<TabConProps, {}> {
    constructor(props: TabConProps);
    getItems(): JSX.Element;
    render(): JSX.Element;
}
export interface CityItemProps {
    index: number;
    changeState: (data: any) => void;
    id: any;
    selectVal: any;
    selectName?: any;
    valIndex: any;
    val: any;
    active: any;
}
export default TabCon;
