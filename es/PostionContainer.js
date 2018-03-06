'use strict';
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
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import Tab from './Tab';
import TabCon from './TabCon';
import classSet from './util/classSet';
import { Table, } from 'antd';
var PostionContainer = /** @class */ (function (_super) {
    __extends(PostionContainer, _super);
    function PostionContainer(props) {
        var _this = _super.call(this, props) || this;
        _this.highlight = function (data) {
            var matchQ = _this.props.matchQ;
            var name = data.name, firstOfAll = data.firstOfAll, totalPY = data.totalPY;
            matchQ = matchQ.toLocaleLowerCase();
            if (name.indexOf(matchQ) >= 0) {
                return _this.highlightReplace(name, matchQ);
            }
            if (totalPY.indexOf(matchQ) >= 0) {
                return React.createElement("span", null,
                    data.name,
                    "\uFF08",
                    _this.highlightReplace(totalPY, matchQ),
                    "\uFF09");
            }
            if (firstOfAll.indexOf(matchQ) >= 0) {
                return React.createElement("span", null,
                    data.name,
                    "( ",
                    _this.highlightReplace(firstOfAll.toUpperCase(), matchQ.toUpperCase()),
                    " )");
            }
            return data.name;
        };
        _this.columns = function () {
            return [
                {
                    key: 'city',
                    render: function (text, record) {
                        var arr = [];
                        for (var key in record) {
                            var data = record[key];
                            arr.push(React.createElement("span", { key: data.value },
                                _this.highlight(data),
                                " "));
                        }
                        return React.createElement("div", null, arr.map(function (value, index) {
                            return React.createElement("span", { key: index },
                                value,
                                index < arr.length - 1 ? '，' : '');
                        }));
                    },
                },
            ];
        };
        _this.tableProps = function () {
            var _a = _this.props, loading = _a.loading, searchDataSource = _a.searchDataSource, setInputValue = _a.setInputValue, selectVal = _a.selectVal;
            var props = {
                size: 'small',
                rowKey: function (record) {
                    var key = '';
                    for (var i in record) {
                        key += record[i].value;
                    }
                    return key;
                },
                columns: _this.columns(),
                showHeader: false,
                locale: {
                    emptyText: '找不到你要的结果，换个试试',
                },
                pagination: {
                    size: 'small',
                    defaultPageSize: 8,
                    showQuickJumper: true,
                    showTotal: function (total, range) { return range[0] + "-" + range[1] + " of " + total; },
                },
                loading: loading,
                dataSource: searchDataSource,
                onRow: function (record) {
                    return {
                        onClick: function () {
                            var selectVal = [];
                            var selectName = [];
                            for (var key in record) {
                                var data = record[key];
                                selectVal.push(data.value);
                                selectName.push(data.name);
                            }
                            setInputValue(selectVal, selectName);
                        },
                    };
                },
                rowClassName: function (record) {
                    if (selectVal.length <= 0) {
                        return '';
                    }
                    var rowId = [];
                    for (var key in record) {
                        var data = record[key];
                        rowId.push(data.value);
                    }
                    var className = 'active';
                    for (var i = 0, l = selectVal.length; i < l; i++) {
                        if (selectVal[i] !== rowId[i]) {
                            className = '';
                            break;
                        }
                    }
                    return className;
                }
            };
            return props;
        };
        _this.tabConProps = function () {
            var _a = _this.props, index = _a.index, selectVal = _a.selectVal, valIndex = _a.valIndex, params = _a.params, addressMap = _a.addressMap, changeState = _a.changeState;
            return {
                index: index,
                selectVal: selectVal,
                valIndex: valIndex,
                params: params,
                addressMap: addressMap,
                changeState: changeState,
            };
        };
        _this._container = document.createElement('div');
        return _this;
    }
    PostionContainer.prototype.componentDidMount = function () {
        document.body.appendChild(this._container);
    };
    PostionContainer.prototype.componentWillUnmount = function () {
        // Remove the element from the DOM when we unmount
        document.body.removeChild(this._container);
    };
    PostionContainer.prototype.highlightReplace = function (data, matchQ) {
        var newData = data.replace(matchQ, "*&*" + matchQ + "*&*");
        return newData.split('*&*').map(function (value) {
            if (value === matchQ) {
                return React.createElement("span", { style: { color: '#ff6600' }, key: value }, value);
            }
            return value;
        });
    };
    PostionContainer.prototype.handClick = function (e) {
        /* 阻止冒泡 */
        e.nativeEvent.stopImmediatePropagation();
    };
    PostionContainer.prototype.render = function () {
        var _this = this;
        var _a = this.props, input = _a.input, show = _a.show, searching = _a.searching, params = _a.params;
        /* className */
        var className = classSet({
            'show': show,
            'postion-container': true
        });
        /* 定位坐标 */
        var style = __assign({ left: input.left, top: input.top, width: input.width }, params.popupStyle);
        return ReactDOM.createPortal(React.createElement("div", { className: className, style: style, onClick: function (e) { return _this.handClick(e); } }, searching ?
            React.createElement(Table, __assign({}, this.tableProps()))
            :
                React.createElement("div", null,
                    React.createElement(Tab, __assign({}, this.props)),
                    React.createElement(TabCon, __assign({}, this.tabConProps())))), this._container);
    };
    return PostionContainer;
}(Component));
export default PostionContainer;
