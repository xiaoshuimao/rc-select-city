"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_dom_1 = require("react-dom");
var PostionContainer_1 = require("./PostionContainer");
var util_1 = require("./util/util");
var antd_1 = require("antd");
var fetch_1 = require("./util/fetch");
var SelectCity = /** @class */ (function (_super) {
    __extends(SelectCity, _super);
    function SelectCity(props) {
        var _this = _super.call(this, props) || this;
        /**
         * 用户选中的缓存便于还原
         */
        _this._cache = {
            searchName: '',
            searchResult: {},
        };
        _this.getAddress = function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, addressApi, deepMap, onChange, addressFetchData, code, type, selectVal, data, _b, addressMap, addressMapSearch, selectValLength, tempSelectName;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props.params, addressApi = _a.addressApi, deepMap = _a.deepMap, onChange = _a.onChange, addressFetchData = _a.addressFetchData;
                        code = this.props.code;
                        type = addressFetchData.type;
                        selectVal = this.state.selectVal;
                        return [4 /*yield*/, fetch_1.fetchFn(addressApi, { type: type ? type : 1 })];
                    case 1:
                        data = _c.sent();
                        if (data.status === 0) {
                            _b = util_1.parseAddress(data.data, deepMap.length - 1), addressMap = _b.addressMap, addressMapSearch = _b.addressMapSearch;
                            selectValLength = selectVal.length;
                            tempSelectName = selectValLength > 0 ? /* 根据默认值解析中文名称 */ util_1.parseAddressName(selectVal, addressMap) : [];
                            this.setState({
                                addressLoading: false,
                                addressMap: addressMap,
                                addressMapSearch: addressMapSearch,
                                selectName: tempSelectName,
                            });
                            if (selectValLength === deepMap.length && typeof onChange === 'function') {
                                onChange(selectVal, tempSelectName, code);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        _this.hide = function () {
            _this.setState({
                show: false
            });
        };
        _this.input = function () {
            var params = _this.props.params;
            var input = _this.inputCity.input;
            var _a = params.popupStyle, popupStyle = _a === void 0 ? {
                width: 400,
            } : _a;
            var _b = _this.getOffsetRect(input), left = _b.left, top = _b.top;
            return {
                left: left,
                top: top + input.offsetHeight,
                width: popupStyle && popupStyle.width ? popupStyle.width : input.offsetWidth
            };
        };
        _this.postionContainerProps = function () {
            var _a = _this.state, addressMap = _a.addressMap, input = _a.input, show = _a.show, searching = _a.searching, loading = _a.loading, searchDataSource = _a.searchDataSource, selectName = _a.selectName, selectVal = _a.selectVal, index = _a.index, valIndex = _a.valIndex;
            var params = _this.props.params;
            return {
                setInputValue: _this.setInputValue,
                matchQ: _this._cache.searchName,
                changeState: function (params) { return _this.changeState(params); },
                addressMap: addressMap,
                params: params,
                input: input,
                show: show,
                searching: searching,
                searchDataSource: searchDataSource,
                selectName: selectName,
                selectVal: selectVal,
                index: index,
                valIndex: valIndex,
                loading: loading,
            };
        };
        _this.renderComponent = function () {
            react_dom_1.default.unstable_renderSubtreeIntoContainer(_this, react_1.default.createElement(PostionContainer_1.default, __assign({}, _this.postionContainerProps())), _this._container);
        };
        /**
         * 触发antd的form验证事件
         */
        _this.triggerChange = function (changedValue) {
            var onChange = _this.props.onChange;
            if (onChange) {
                onChange(changedValue);
            }
        };
        _this.autoSelect = function (params) {
            var index = params.index, selectVal = params.selectVal;
            var data = _this.state.addressMap[index].get(selectVal[index - 1]);
            var length = 0;
            var tempId;
            for (var area in data) {
                var tempData = data[area];
                for (var value in tempData) {
                    if (tempData[value]) {
                        length++;
                        tempId = parseInt(value);
                    }
                }
            }
            if (length === 1) {
                params.selectVal[index] = tempId;
                params.index++;
                params.valIndex++;
            }
        };
        _this.clear = function () {
            var _a = _this.props, code = _a.code, params = _a.params;
            var onChange = params.onChange;
            _this.setState({
                searching: false,
                searchName: '',
                selectVal: [],
                selectName: [],
                index: 0,
                valIndex: 0,
            });
            typeof onChange === 'function' && onChange([], [], code);
            _this.triggerChange({ selectVal: [], selectName: [] });
        };
        _this.setInputValue = function (selectVal, selectName) {
            var _a = _this.props, code = _a.code, params = _a.params;
            var onChange = params.onChange;
            _this.setState({
                selectVal: selectVal,
                selectName: selectName,
                searchName: selectName.join(' '),
                show: false,
            });
            typeof onChange === 'function' && onChange(selectVal, selectName, code);
        };
        _this.inputCityProps = function () {
            var _a = _this.state, searching = _a.searching, searchName = _a.searchName, selectName = _a.selectName;
            var _b = _this.props.params, style = _b.style, placeholder = _b.placeholder, search = _b.search;
            var props = {
                // className: "city-input",
                ref: function (node) { return _this.inputCity = node; },
                onClick: function (e) { return _this.show(e); },
                placeholder: placeholder || "支持中文/拼音/简拼",
                style: style,
            };
            /**
             * 是否开启模糊搜索
             */
            search === true ? props.onChange = function (e) { return _this.onChange(e); } : props.readOnly = true;
            searching ? props.value = searchName : props.value = selectName.join(' ');
            return props;
        };
        var code = _this.props.code;
        var params = _this.props.params;
        var deepMap = params.deepMap, onChange = params.onChange, address = params.address, addressApi = params.addressApi;
        var addressMap = [];
        var addressMapSearch = [];
        if (address) {
            var data = util_1.parseAddress(address, deepMap.length - 1);
            addressMap = data.addressMap;
            addressMapSearch = data.addressMapSearch;
        }
        /* 构建默认数据的选中值 */
        var selectVal = [];
        deepMap.forEach(function (v, i) {
            var value = v.value;
            if (value !== undefined) {
                selectVal.push(value);
            }
        });
        var selectValLength = selectVal.length;
        var state = {
            show: false,
            input: {
                left: -99999,
                top: -99999,
                width: '100%'
            },
            index: selectValLength > 0 ? selectValLength - 1 : 0,
            valIndex: selectValLength > 0 ? selectValLength - 2 : 0,
            selectVal: selectValLength > 0 ? /* selectVal默认值 */ selectVal : [],
            selectName: addressMap.length > 0 && selectValLength > 0 ? util_1.parseAddressName(selectVal, addressMap) : [],
            searching: false,
            searchName: '',
            searchDataSource: [],
            loading: true,
            addressMap: addressMap,
            addressMapSearch: addressMapSearch,
            addressLoading: !address || address.length <= 0,
        };
        _this.state = state;
        if ((!address || address.length <= 0) && addressApi) {
            _this.getAddress();
        }
        else {
            if (selectValLength === deepMap.length && typeof onChange === 'function') {
                onChange(selectVal, state.selectName, code);
            }
        }
        return _this;
    }
    SelectCity.prototype.fireEvent = function (element, event) {
        if (document.createEventObject) {
            // IE浏览器支持fireEvent方法
            var evt = document.createEventObject();
            return element.fireEvent('on' + event, evt);
        }
        else {
            // 其他标准浏览器使用dispatchEvent方法
            var evt = document.createEvent('HTMLEvents');
            // initEvent接受3个参数：
            // 事件类型，是否冒泡，是否阻止浏览器的默认行为
            evt.initEvent(event, true, true);
            element.dispatchEvent(evt);
        }
    };
    ;
    SelectCity.prototype.show = function (e) {
        /* 阻止冒泡 */
        e.nativeEvent.stopImmediatePropagation();
        this.fireEvent(document, 'click');
        this.setState({
            show: true,
            input: this.input(),
        });
    };
    SelectCity.prototype.getOffsetRect = function (node) {
        var box = node.getBoundingClientRect();
        var body = document.body;
        var docElem = document.documentElement;
        /**
         * 获取页面的scrollTop,scrollLeft(兼容性写法)
         */
        var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;
        var clientTop = docElem.clientTop || body.clientTop;
        var clientLeft = docElem.clientLeft || body.clientLeft;
        var top = box.top + scrollTop - clientTop;
        var left = box.left + scrollLeft - clientLeft;
        return {
            //Math.round 兼容火狐浏览器bug
            top: Math.round(top),
            left: Math.round(left)
        };
    };
    SelectCity.prototype.componentDidMount = function () {
        this._container = document.createElement('div');
        document.body.appendChild(this._container);
        /* 挂载document的hide */
        document.addEventListener('click', this.hide);
    };
    SelectCity.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (prevState.addressLoading === false) {
            this.renderComponent();
        }
    };
    SelectCity.prototype.componentWillUnmount = function () {
        /* 卸载document的hide */
        document.removeEventListener('click', this.hide);
        /**
         * 卸载_container
         */
        if (this._container) {
            var container = this._container;
            react_dom_1.default.unmountComponentAtNode(container);
            container.parentNode.removeChild(container);
            // this._container = null;
        }
    };
    SelectCity.prototype.changeState = function (params) {
        var props = this.props;
        var code = props.code;
        var _a = props.params, onChange = _a.onChange, onSelect = _a.onSelect, deepMap = _a.deepMap;
        /**
         * [max 最大联动的层级]
         */
        var max = deepMap.length;
        var index = params.index, selectVal = params.selectVal;
        /* index不能大于max */
        if (index >= max) {
            params.index = max - 1;
            params.valIndex = max - 2;
            this.hide();
        }
        if (selectVal) {
            this.autoSelect(params);
            params.selectName = util_1.parseAddressName(params.selectVal, this.state.addressMap);
        }
        var trigger = params.trigger;
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
        this.triggerChange({ selectVal: selectVal, selectName: params.selectName });
    };
    SelectCity.prototype.onChange = function (e) {
        var _this = this;
        var searchName = e.target.value.trim();
        if (this.state.searchDataSource.length <= 0) {
            this._cache.searchName = searchName;
        }
        this.setState({
            searching: searchName !== '',
            searchName: searchName,
            selectVal: [],
            selectName: [],
            index: 0,
            valIndex: 0,
            show: true,
        });
        /**
         * 节流阀
         */
        util_1.throttle(function () { return __awaiter(_this, void 0, void 0, function () {
            var searchResult;
            return __generator(this, function (_a) {
                if (searchName === '')
                    return [2 /*return*/];
                this.setState({
                    loading: true,
                });
                /**
                 * 检索缓存
                 */
                if (!Object.prototype.hasOwnProperty.call(this._cache, searchName)) {
                    searchResult = util_1.matchSearch(searchName, this.state.addressMapSearch, this.state.addressMap, this.props.params.deepMap);
                    this._cache[searchName] = searchResult;
                }
                this._cache.searchName = searchName;
                this.setState({
                    searchDataSource: this._cache[searchName],
                    loading: false,
                });
                return [2 /*return*/];
            });
        }); }, 300)();
    };
    SelectCity.prototype.getData = function () {
        return {
            ids: this.state.selectVal,
            names: this.state.selectName
        };
    };
    SelectCity.prototype.render = function () {
        var _this = this;
        var style = this.props.params.style || {};
        var addressLoading = this.state.addressLoading;
        return (react_1.default.createElement("div", { className: "select-city", style: __assign({ width: style.width || '100%', zIndex: 999 }, style) }, addressLoading ?
            react_1.default.createElement("div", { style: { width: style.width, display: 'inline-block' } },
                react_1.default.createElement(antd_1.Spin, { spinning: addressLoading },
                    react_1.default.createElement("div", { className: "input-city-wrap", style: { width: style.width || '100%' } },
                        react_1.default.createElement(antd_1.Input, __assign({}, this.inputCityProps())))))
            :
                react_1.default.createElement("div", null,
                    react_1.default.createElement("div", { className: "input-city-wrap", style: { width: style.width || '100%' } },
                        react_1.default.createElement(antd_1.Input, __assign({}, this.inputCityProps())),
                        react_1.default.createElement("span", { className: "allow-clear", onClick: function () { return _this.clear(); } }, "x")))));
    };
    return SelectCity;
}(react_1.default.Component));
exports.default = SelectCity;
