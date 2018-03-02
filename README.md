## example
```js


import React from 'react';
import ReactDOM from 'react-dom';
import SelectCity from 'rc-select-city';
import address from 'rc-select-city/address.json';

/**
 * 参数集合
 */
const params = {
    deepMap: [{ name: '省', value: 31, }, { name: '市', value: 383 }, { name: '区', value: 3234 }],
    popupStyle: {
        width: 350,
        zIndex: 99,
    }, /* 弹窗样式 */
    search: apiConfig.queryCityData, /* 模糊搜索api */
    address, /* json方式 方式城市基本数据，与addressApi选项2选1， 优先 address */
    //addressApi: apiConfig.getCityData, /* fetch api方式城市基本数据 */
    style: {
        width: 150,
    }, /* input 的样式 */
    onChange(selectVal, selectName, code) {  /* 选择到最后一层的回调 */
        console.log('change', selectVal, selectName, code)
    },
    onSelect(selectVal, selectName, code) { /* 每层选择的回调，除了， 除了最后一层调用onChange */
        console.log('select', selectVal, selectName, code)
    },
}
ReactDOM.render(<SelectCity params={params}/>, document.getElementById('root'));

```