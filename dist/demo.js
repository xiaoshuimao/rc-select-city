import React from 'react';
import ReactDOM from 'react-dom';
import SelectCity from './index';
var address = require('./address.json');
var params = {
    address: address,
    deepMap: [{ name: '省', }, { name: '市', }, { name: '区', }],
    search: true,
    onChange: function (data) {
        console.log(data);
    }
};
ReactDOM.render(React.createElement(SelectCity, { params: params }), document.getElementById('root'));
