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
/**
 * [parseAddress 分解json地址]
 * @param  {} data [description]
 * @return {[type]}      [description]
 */
export var parseAddress = function (data, max) {
    console.time('selectCity: parseAddress run times');
    var addressMap = [];
    var index = 0;
    var addressMapSearch = [];
    var parentIds = [];
    var fn = function (data, value) {
        data.forEach(function (v, i) {
            var area = v.area;
            var list = v.list;
            var parentId;
            if (value !== undefined) {
                parentId = value;
            }
            if (list) {
                list.forEach(function (v, i) {
                    var name = v.name;
                    var value = parseInt(v.value, 10);
                    var totalPY = v.totalPY, firstOfAll = v.firstOfAll;
                    /* 创建对应的哈希表 */
                    if (addressMap[index] === undefined) {
                        addressMap.push(new Map());
                    }
                    /* 如果是第一级 */
                    if (index === 0) {
                        /**
                         * 设置Map对象，格式如下
                         * {
                         * 'A-D':
                         *    {
                         *     'A-D': {
                         *        1: "浙江"
                         *        }
                         *     }
                         *  }
                         */
                        var obj = addressMap[index].get(area) || {};
                        if (obj[area]) {
                            obj[area][value] = { name: name, totalPY: totalPY, firstOfAll: firstOfAll };
                        }
                        else {
                            obj[area] = {};
                            obj[area][value] = { name: name, totalPY: totalPY, firstOfAll: firstOfAll };
                        }
                        addressMap[index].set(area, obj);
                    }
                    else {
                        /**
                         * 设置Map对象，格式如下
                         * 1对象上一级的id，类似parentId
                         * {
                         *   1: {
                         *    'A-D': {
                         *        2: "杭州"
                         *     }
                         *   }
                         * }
                         */
                        var obj = addressMap[index].get(parentId) || {};
                        if (obj[area]) {
                            obj[area][value] = { name: name, totalPY: totalPY, firstOfAll: firstOfAll };
                        }
                        else {
                            obj[area] = {};
                            obj[area][value] = { name: name, totalPY: totalPY, firstOfAll: firstOfAll };
                        }
                        addressMap[index].set(parentId, obj);
                    }
                    /* 递归children */
                    var children = v.children;
                    var newParentIds = [];
                    parentIds.forEach(function (value) {
                        newParentIds.push(value);
                    });
                    if (index <= max) {
                        addressMapSearch.push({
                            name: name,
                            totalPY: totalPY,
                            firstOfAll: firstOfAll,
                            parentIds: newParentIds,
                            value: value,
                        });
                    }
                    // addressMapSearch.push(`${name}|${totalPY}|${firstOfAll}|${parentIds.length > 0 ? `${parentIds.join('|')}|`:''}${value}`);
                    if (children && children.length > 0) {
                        parentIds.push({ area: area, value: value });
                        index++;
                        fn(children, value);
                    }
                });
            }
        });
        index--;
        parentIds.pop();
    };
    fn(data);
    console.timeEnd('selectCity: parseAddress run times');
    return {
        addressMap: addressMap,
        addressMapSearch: addressMapSearch,
    };
};
export var matchSearch = function (q, searchSource, addressMap, deepMap) {
    var searchResult = {
        length: 0
    };
    /**
     * 小写
     */
    q = q.toLocaleLowerCase();
    console.time('mathQ');
    searchSource.forEach(function (data) {
        var firstOfAll = data.firstOfAll, name = data.name, totalPY = data.totalPY;
        /**
         * 匹配首字母，
         * 简拼，
         * 全拼
         */
        if (firstOfAll.startsWith(q) || name.startsWith(q) || totalPY.startsWith(q)) {
            var newData = getMatchData(data, addressMap, deepMap);
            newData.forEach(function (element) {
                var key = [];
                var newElement = {};
                element.forEach(function (data, index) {
                    key.push(data.value);
                    newElement[index] = data;
                });
                if (!Object.prototype.hasOwnProperty.call(searchResult, key)) {
                    searchResult[key.join('|')] = newElement;
                    searchResult.length++;
                }
            });
        }
    });
    console.timeEnd('mathQ');
    console.log(searchResult);
    if (searchResult.length === 0) {
        return [];
    }
    ;
    var searchResultArr = [];
    for (var key in searchResult) {
        if (key !== 'length') {
            searchResultArr.push(searchResult[key]);
        }
    }
    return searchResultArr;
};
var getMatchData = function (data, addressMap, deepMap) {
    var parentIds = data.parentIds;
    var selfValue = data.value;
    var index = parentIds.length;
    var arr = [];
    var deepGetMatchData = function (id, initArr) {
        if (initArr === void 0) { initArr = []; }
        index++;
        if (index > 2) {
            arr.push(initArr.slice(0, initArr.length));
            initArr.pop();
            return index--;
        }
        var children = addressMap[index].get(id);
        for (var key in children) {
            var tempData = children[key];
            if (Object.prototype.toString.call(tempData) === '[object Object]') {
                for (var key2 in tempData) {
                    initArr.push(__assign({}, tempData[key2], { value: parseInt(key2, 10) }));
                    deepGetMatchData(parseInt(key2, 10), initArr);
                }
            }
        }
        initArr.pop();
        index--;
        return;
    };
    switch (index) {
        //一级
        case 0: {
            var parent_1 = __assign({}, data);
            delete parent_1.parentIds;
            deepGetMatchData(selfValue, [parent_1]);
            break;
        }
        //二级
        case 1: {
            var _a = parentIds[0], area = _a.area, value = _a.value;
            var parent_2 = __assign({}, addressMap[0].get(area)[area][value], { value: value });
            var parent2 = __assign({}, data);
            delete parent2.parentIds;
            deepGetMatchData(selfValue, [parent_2, parent2]);
            break;
        }
        //三级
        case 2: {
            var _b = parentIds[0], area = _b.area, value = _b.value;
            var parent_3 = __assign({}, addressMap[0].get(area)[area][value], { value: value });
            var area2 = parentIds[1].area;
            var value2 = parentIds[1].value;
            var parent2 = __assign({}, addressMap[1].get(value)[area2][value2], { value: value2 });
            var newData = __assign({}, data);
            delete newData.parentIds;
            arr.push([parent_3, parent2, newData]);
            break;
        }
        default: {
            throw new Error('invalid index of parentIds at function getMatchData');
        }
    }
    return arr;
};
/**
 * parseAddressName 按照id解析中文地址
 * @param  {Array} data 对应的id
 * @param  {Map} map  对照的Map
 * @return {Array}      中文地址
 */
export var parseAddressName = function (data, map) {
    if (data.length <= 0)
        return [];
    var arr = data.map(function (v, i) {
        if (i === 0) {
            try {
                for (var _a = __values(map[i].values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var val = _b.value;
                    for (var key in val) {
                        var obj = val[key];
                        if (obj[v]) {
                            return obj[v].name;
                        }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        else {
            var id = data[i - 1];
            var obj = map[i].get(id);
            for (var key in obj) {
                var obj2 = obj[key];
                if (obj2[v]) {
                    return obj2[v].name;
                }
            }
        }
        var e_1, _c;
    });
    return arr;
};
var throttleTimer;
export var throttle = function (fn, delay) {
    return function () {
        clearTimeout(throttleTimer);
        throttleTimer = setTimeout(function () {
            fn();
        }, delay);
    };
};
