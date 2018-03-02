var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import 'whatwg-fetch';
import { enCodeChar } from './encodechar';
import message from 'antd/lib/message/index';
/**
 * 带有timeout的_fetch
 * @param fetchPromise
 * @param timeout {number} 延迟时间
 */
var _fetch = function (fetchPromise, timeout) {
    var timeoutAction;
    var timerPromise = new Promise(function (resolve, reject) {
        timeoutAction = function () {
            reject('timeout');
        };
    });
    setTimeout(function () {
        timeoutAction();
    }, timeout);
    return Promise.race([fetchPromise, timerPromise]);
};
/**
 * fetchFn 对window.fetch的封装，方面统一管理
 * @param url {String<URL>} 请求地址
 * @param data {Object<JSON>} 请求参数
 * @param option {Object<JSON>} 额外的fetch可配置参数
 */
export var fetchFn = function (url, data, option) {
    if (url === void 0) { url = ''; }
    var json = {
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        timeout: 30000,
        body: enCodeChar(data),
        credentials: 'include',
    };
    if (option) {
        var headers = option.headers, method = option.method;
        if (headers && headers['Content-Type'] == 'application/json') {
            option.body = JSON.stringify(data);
            headers['dataType'] = 'json';
        }
        json = __assign({}, json, option);
        /**
         * 如果method为get,
         * get方式不允许body传参，
         * 只能url传参
         */
        if (method && method.toLocaleLowerCase() === 'get') {
            url = url + "?" + json.body;
            delete json.body;
        }
    }
    ;
    return new Promise(function (resolve, reject) {
        _fetch(fetch(url, json), json.timeout)
            .then(function (res) {
            return res.json();
        })
            .then(function (data) {
            if (Number(data.status) !== 0) {
                message.error(data.error || data.msg || data.errmsg || '请求失败');
            }
            resolve(data);
        })
            .catch(function (error) {
            var msg;
            switch (error.toString()) {
                case 'TypeError: Failed to fetch':
                    msg = '请求失败';
                    break;
                case 'timeout':
                    msg = '请求超时';
                    break;
                default:
                    msg = '请求失败';
            }
            message.error(msg);
            var data = { errcode: 1, status: 1, msg: msg, };
            resolve(data);
        });
    });
};
