"use strict";
/**
 * classset 根据传入的对象值来构造classes
 * @param {Object} params 传入的参数对象
 * @return {String} classes 构造好的classname
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (params) {
    if (typeof params !== 'object') {
        throw new Error('传入不是对象');
    }
    var classes = '';
    for (var key in params) {
        if ({}.hasOwnProperty.call(params, key)) {
            var val = params[key];
            var flag = !!val;
            if (flag) {
                classes += key + " ";
            }
        }
    }
    return classes;
};
