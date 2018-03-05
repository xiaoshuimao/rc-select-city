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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var classSet_1 = require("./util/classSet");
var Tab = /** @class */ (function (_super) {
    __extends(Tab, _super);
    function Tab(props) {
        return _super.call(this, props) || this;
    }
    Tab.prototype.render = function () {
        return (React.createElement("div", { className: "tab" },
            React.createElement(TabBtns, __assign({}, this.props))));
    };
    return Tab;
}(React.Component));
var TabBtns = /** @class */ (function (_super) {
    __extends(TabBtns, _super);
    function TabBtns(props) {
        return _super.call(this, props) || this;
    }
    TabBtns.prototype.render = function () {
        var _this = this;
        var _a = this.props, params = _a.params, index = _a.index;
        /**
         * [max 最大联动的层级]
         */
        var deepMap = params.deepMap;
        var max = deepMap.length;
        /* index不能大于max */
        if (index >= max) {
            index--;
        }
        var btnList = [];
        deepMap.forEach(function (v, i) {
            var active = i === index ? true : false;
            btnList.push(React.createElement(OneTabBtn, __assign({ active: active, dataKey: i, key: i, name: v.name }, _this.props)));
        });
        return (React.createElement("ul", { className: "tab-btns" }, btnList));
    };
    return TabBtns;
}(React.Component));
var OneTabBtn = /** @class */ (function (_super) {
    __extends(OneTabBtn, _super);
    function OneTabBtn(props) {
        return _super.call(this, props) || this;
    }
    OneTabBtn.prototype.handleClick = function (e) {
        /* 阻止冒泡 */
        e.nativeEvent.stopImmediatePropagation();
        var _a = this.props, dataKey = _a.dataKey, changeState = _a.changeState;
        changeState({
            index: dataKey,
            valIndex: --dataKey
        });
    };
    OneTabBtn.prototype.render = function () {
        var _this = this;
        var _a = this.props, name = _a.name, active = _a.active, selectName = _a.selectName, dataKey = _a.dataKey;
        if (selectName[dataKey]) {
            // if(dataKey === 2) {
            //     name = `${selectName[dataKey]}`;
            // }
            // else {
            //     name = `${selectName[dataKey]}${name}`;
            // }
            name = "" + selectName[dataKey];
        }
        var className = classSet_1.default({
            'tab-btn': true,
            'active': active,
        });
        return (React.createElement("li", { onClick: function (e) { return _this.handleClick(e); }, className: className }, name));
    };
    return OneTabBtn;
}(React.Component));
exports.default = Tab;
