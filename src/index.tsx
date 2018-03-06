import React from 'react';
import ReactDOM from 'react-dom';
import PostionContainer from './PostionContainer';
import {
    parseAddress,
    parseAddressName,
    throttle,
    matchSearch,
} from './util/util';
import {
    Input,
    Spin,
} from 'antd';
import {
    fetchFn,
} from './util/fetch';


export interface SelectCityProps {
    code?: any;
    params: {
        deepMap: Array<{name: string; value?: number}>;
        // deepMap: [{name: '省'},{name: '市'},{name: '区'}],
        popupStyle?: {
            width: number;
            zIndex: number;
        }; /* 弹窗样式 */
        search?: boolean; /* 搜索 */
        address?: any;/* json方式 方式城市基本数据，与addressApi选项2选1， 优先 address */
        addressApi?: string; /* fetch api方式城市基本数据 */
        addressFetchData?: any; /* fetch api方式城市请求参数 */
        /* input 的样式 */
        style?: {
            width: number;
        };
        onChange?: (selectVal:number[], selectName:string[], code:any) => void; /* 选择到最后一层的回调 */
        onSelect?: (selectVal:number[], selectName:string[], code:any) => void; /* 每层选择的回调，除了， 除了最后一层调用onChange */
        placeholder?: string;
    }
    onChange?: (value:any) => void;
}

export interface SelectCityState {
    show: boolean,
    input: {
        left: number;
        top: number;
        width: string | number;
    },
    index: number;
    valIndex: number;
    selectVal: number[];
    // selectName: l > 0 ? /* 根据默认值解析中文名称 */ parseAddressName(selectVal, this.addressMap) : [],
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
    _cache = {
        searchName: '',
        searchResult: {

        },
    }
    constructor(props:SelectCityProps) {
        super(props);
        const code = this.props.code;
        const params = this.props.params;
        const {
            deepMap,
            onChange,
            address,
            addressApi,
        } = params;
        let addressMap: Map<string, any>[] = [];
        let addressMapSearch: any[] = [];
        if (address) {
            const data = parseAddress(address, deepMap.length - 1);    
            addressMap = data.addressMap;
            addressMapSearch = data.addressMapSearch;
        }
        
        /* 构建默认数据的选中值 */
        let selectVal:Array<any> = [];

        deepMap.forEach((v, i) => {
            let value = v.value;
            if (value !== undefined) {
                selectVal.push(value);
            }
        });

        let selectValLength = selectVal.length;

        const state = {
            show: false,
            input: {
                left: -99999,
                top: -99999,
                width: '100%'
            },
            index: selectValLength > 0 ? selectValLength - 1 : 0,
            valIndex: selectValLength > 0 ? selectValLength - 2 : 0,
            selectVal: selectValLength > 0 ? /* selectVal默认值 */ selectVal : [],
            selectName: addressMap.length > 0 && selectValLength > 0 ? parseAddressName(selectVal, addressMap) : [],
            searching: false,
            searchName: '',
            searchDataSource: [],
            loading: true,
            addressMap,
            addressMapSearch,
            addressLoading: !address ||　address.length <= 0,
        }
        this.state = state;

        if ((!address || address.length <= 0) && addressApi) {
            this.getAddress();
        }
        else {
            if (selectValLength === deepMap.length && typeof onChange === 'function') {
                onChange(selectVal, state.selectName, code);
            }
        }
    }
    getAddress = async () => {
        const {
            addressApi,
            deepMap,
            onChange,
            addressFetchData,
        } = this.props.params;
        const code = this.props.code;
        const {
            type
        } = addressFetchData;
        const {
            selectVal,
        } = this.state;
        const data:any = await fetchFn(addressApi, { type: type ? type:1 });
        if (data.status === 0) {
            const {addressMap, addressMapSearch} = parseAddress(data.data, deepMap.length - 1); 
            const selectValLength = selectVal.length;
            let tempSelectName = selectValLength > 0 ? /* 根据默认值解析中文名称 */ parseAddressName(selectVal, addressMap) : [];
            this.setState({
                addressLoading: false,
                addressMap,
                addressMapSearch,
                selectName: tempSelectName,
            });
            if (selectValLength === deepMap.length && typeof onChange === 'function') {
                onChange(selectVal, tempSelectName, code);
            }

        }
    }
    fireEvent(element: any, event: any) {
        if ((document as any).createEventObject) {
            // IE浏览器支持fireEvent方法
            const evt = (document as any).createEventObject();
            return element.fireEvent('on' + event, evt)
        }
        else {
            // 其他标准浏览器使用dispatchEvent方法
            const evt = document.createEvent('HTMLEvents');
            // initEvent接受3个参数：
            // 事件类型，是否冒泡，是否阻止浏览器的默认行为
            evt.initEvent(event, true, true);
            element.dispatchEvent(evt);
        }
    };
    show(e:React.SyntheticEvent<Input>) {
        /* 阻止冒泡 */
        e.nativeEvent.stopImmediatePropagation();
        this.fireEvent(document, 'click');
        this.setState({
            show: true,
            input: this.input(),
        });
    }
    hide = () => {
        this.setState({
            show: false
        });
    }
    getOffsetRect(node:HTMLInputElement) {
        const box = node.getBoundingClientRect();
        const body = document.body;
        const docElem = document.documentElement;

        /**
         * 获取页面的scrollTop,scrollLeft(兼容性写法)
         */
        const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        const clientTop = docElem.clientTop || body.clientTop;
        const clientLeft = docElem.clientLeft || body.clientLeft;
        const top = box.top + scrollTop - clientTop;
        const left = box.left + scrollLeft - clientLeft;
        return {
            //Math.round 兼容火狐浏览器bug
            top: Math.round(top),
            left: Math.round(left)
        }
    }
    inputCity: Input;
    input = () => {
        let params = this.props.params;
        let input = this.inputCity.input;
        const {
            popupStyle  = {
                width: 400,
            }
        } = params;
        const {
            left,
            top,
        } = this.getOffsetRect(input);
        return {
            left,
            top: top + input.offsetHeight,
            width: popupStyle && popupStyle.width ? popupStyle.width : input.offsetWidth
        }
    }
    _container:HTMLElement;
    componentDidMount() {
        /* 挂载document的hide */
        document.addEventListener('click', this.hide);
    }
    postionContainerProps = () => {
        const {
            addressMap,
            input,
            show,
            searching,
            loading,
            searchDataSource,
            selectName,
            selectVal,
            index,
            valIndex,
        } = this.state;
        const {
            params,
        } = this.props;
        return {
            setInputValue:  this.setInputValue,
            matchQ: this._cache.searchName,
            changeState: (params:any) => this.changeState(params),
            addressMap,
            params,
            input,
            show,
            searching,
            searchDataSource,
            selectName,
            selectVal,
            index,
            valIndex,
            loading,
        }
    }
    
    /**
     * 触发antd的form验证事件
     */
    triggerChange = (changedValue: any) => {
        const {
            onChange,
        } = this.props;
        if (onChange) {
            onChange(changedValue);
        }
    }
    autoSelect = (params: any) => {
        const {
            index,
            selectVal,
        } =  params;
        const data = this.state.addressMap[index].get(selectVal[index - 1]);
        let length = 0;
        let tempId;
        for(let area in data) {
            const tempData = data[area];
            for(let value in tempData) {
                if(tempData[value]) {
                    length ++;
                    tempId = parseInt(value);
                }
            }
        }
        if(length === 1) {
            params.selectVal[index] = tempId;
            params.index ++;
            params.valIndex ++;
        }
    }
    changeState(params:any) {
        const props = this.props;
        const code = props.code;
        const {
            onChange,
            onSelect,
            deepMap,
        } = props.params;
        

        /**
         * [max 最大联动的层级]
         */
        let max = deepMap.length;


        let { index, selectVal } = params;


        /* index不能大于max */
        if (index >= max) {
            params.index = max - 1;
            params.valIndex = max - 2;
            this.hide();
        }
        if (selectVal) {
            this.autoSelect(params);
            params.selectName = parseAddressName(params.selectVal, this.state.addressMap);
            
        }

        const trigger = params.trigger;
        delete params.trigger;
    
        /* 更新state */
        this.setState(params);

        /* onSelect */
        if (trigger && index !== max && typeof onSelect === 'function') {
            onSelect(selectVal, params.selectName, code);
        }

        /* onChange */
        if (index === max && typeof onChange === 'function') {
            onChange(selectVal, params.selectName, code);
        }
        this.triggerChange({selectVal, selectName: params.selectName});
    }
    clear = () => {
        const { code, params } = this.props;
        const onChange = params.onChange;
        this.setState({
            searching: false,
            searchName: '',
            selectVal: [],
            selectName: [],
            index: 0,
            valIndex: 0,
        });
        typeof onChange === 'function' && onChange([], [], code);
        this.triggerChange({selectVal: [], selectName: []});
    }
    onChange(e:React.ChangeEvent<HTMLInputElement>) {
        const searchName = e.target.value.trim();
        
        if (this.state.searchDataSource.length <= 0) {
            this._cache.searchName = searchName;
        }
        this.setState({
            searching: searchName !== '',
            searchName,
            selectVal: [],
            selectName: [],
            index: 0,
            valIndex: 0,
            show: true,
        });


        /**
         * 节流阀
         */
        throttle(async () => {
            if (searchName === '') return;
            this.setState({
                loading: true,
            });
            /**
             * 检索缓存
             */
            if(!Object.prototype.hasOwnProperty.call(this._cache, searchName)) {
                const searchResult =  matchSearch(searchName, this.state.addressMapSearch, this.state.addressMap, this.props.params.deepMap);
                this._cache[searchName] = searchResult;
            }
            this._cache.searchName = searchName;
            this.setState({
                searchDataSource: this._cache[searchName],
                loading: false,
            })
        }, 300)();
    }
    setInputValue = (selectVal:number[], selectName:string[]) => {
        const { code, params } = this.props;
        const onChange = params.onChange;
        this.setState({
            selectVal,
            selectName,
            searchName: selectName.join(' '),
            show: false,
        });
        typeof onChange === 'function' && onChange(selectVal, selectName, code);

    }
    getData() {
        return {
            ids: this.state.selectVal,
            names: this.state.selectName
        }
    }
    inputCityProps = () => {
        const {
            searching,
            searchName,
            selectName,
        } = this.state;
        const {
            style,
            placeholder,
            search,
        } = this.props.params;
        let props:any = {
            // className: "city-input",
            ref: (node:Input) => this.inputCity = node,
            onClick: (e:React.SyntheticEvent<Input>) => this.show(e),
            placeholder: placeholder || "支持中文/拼音/简拼",
            style: style,
        }
        
        /**
         * 是否开启模糊搜索
         */
        search === true ? props.onChange = (e:React.ChangeEvent<HTMLInputElement>) => this.onChange(e) : props.readOnly = true;

        searching ? props.value = searchName : props.value = selectName.join(' ');

        return props;
    }
    render() {
        const style:any = this.props.params.style || {};
        const {
            addressLoading,
            show,
        } = this.state;
        return (
            <div className="select-city" style={{ width: style.width || '100%', zIndex: 999 ,...style,}}>
                {
                    addressLoading ?
                        <div style={{width: style.width, display: 'inline-block'}}>
                            <Spin spinning={addressLoading} >
                                <div className="input-city-wrap" style={{ width: style!.width || '100%' }}>
                                    <Input {...this.inputCityProps() }  />
                                </div>
                            </Spin>
                        </div>
                        :
                        <div>
                            <div className="input-city-wrap" style={{ width: style!.width || '100%' }}>
                                <Input {...this.inputCityProps() }  />
                               
                                <span className="allow-clear" onClick={() => this.clear()}>x</span>
                            </div>
                            {!addressLoading && this.state.show && <PostionContainer {...this.postionContainerProps()} />}
                        </div>
                }

            </div>
        )
    }
}





