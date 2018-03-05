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
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var classSet_1 = require("./util/classSet");
var TabCon = /** @class */ (function (_super) {
    __extends(TabCon, _super);
    function TabCon(props) {
        return _super.call(this, props) || this;
        // this.displayName = 'TabCon';
    }
    TabCon.prototype.getItems = function () {
        var _this = this;
        var _a = this.props, index = _a.index, selectVal = _a.selectVal, valIndex = _a.valIndex, params = _a.params, addressMap = _a.addressMap;
        /**
         * [max 最大联动的层级]
         */
        var deepMap = params.deepMap;
        var max = deepMap.length;
        /* index不能大于max */
        if (index >= max) {
            index = max - 1;
            valIndex = max - 2;
        }
        var id = selectVal[valIndex];
        var data = addressMap[index];
        var activeId = selectVal[index];
        var globalkey = 0;
        var cityItem = function (val) {
            var items = [];
            for (var key in val) {
                var active = false;
                var id_1 = parseInt(key, 10);
                if (activeId === id_1) {
                    active = true;
                }
                items.push(react_1.default.createElement(CityItem, __assign({ key: ++globalkey, id: id_1, val: val, active: active }, _this.props)));
            }
            return items;
        };
        /* 如果是第一级不同的处理 */
        if (index === 0) {
            var tempData = {};
            try {
                for (var _b = __values(data.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var val = _c.value;
                    for (var key in val) {
                        tempData[key] = val[key];
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            data = tempData;
        }
        else {
            data = data.get(id);
        }
        /* 城市容器 */
        var items = [];
        for (var key in data) {
            items.push(react_1.default.createElement("div", { className: "area-item-group", key: ++globalkey },
                (key !== '' && key !== 'null' && key !== 'undefined') && react_1.default.createElement("span", { className: "area-item" }, key),
                react_1.default.createElement("div", { className: "city-item-group" }, cityItem(data[key]))));
        }
        return (react_1.default.createElement("div", { className: "citys-wrap" }, items));
        var e_1, _d;
    };
    TabCon.prototype.render = function () {
        var items = this.getItems();
        return (react_1.default.createElement("div", null, items));
    };
    return TabCon;
}(react_1.Component));
var CityItem = /** @class */ (function (_super) {
    __extends(CityItem, _super);
    function CityItem(props) {
        return _super.call(this, props) || this;
        // this.displayName = 'CityItem';
    }
    CityItem.prototype.handleClick = function () {
        var _a = this.props, index = _a.index, changeState = _a.changeState, id = _a.id, selectVal = _a.selectVal, valIndex = _a.valIndex;
        /* 记录当前点击的索引，用来记录值得位置 */
        valIndex = index;
        /* 索引 + 1 */
        index++;
        /**
         * 如果点击的是第一个tabCon中的city,
         * 就清空初始化为空数组[],
         * 否则就拷贝props的selectVal
         */
        selectVal = valIndex === 0 ? [] : selectVal.concat();
        /**
         * 记录选中的id
         * 赋值对应的selectVal
         */
        selectVal[valIndex] = parseInt(id, 10);
        /* 更新state */
        changeState({
            index: index,
            valIndex: valIndex,
            selectVal: selectVal,
            trigger: true,
        });
    };
    CityItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, id = _a.id, val = _a.val, active = _a.active;
        var name = val[id].name;
        var className = classSet_1.default({
            'city-item': true,
            active: active
        });
        return (react_1.default.createElement("span", { className: className, "data-id": id, onClick: function (e) { return _this.handleClick(); } },
            " ",
            name,
            " "));
    };
    return CityItem;
}(react_1.Component));
exports.default = TabCon;
