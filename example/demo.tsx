import React from 'react';
import ReactDOM from 'react-dom';
import SelectCity from '../src/index';
import '../src/index.css';
const address = require('../address.json');
var params = {
    address,
    deepMap: [{name: '省',},{name: '市',},{name: '区',}],
    search: true,
    onChange:(data:any) => {
        console.log(data);
    }
}
ReactDOM.render(<SelectCity params={params}/>, document.getElementById('root'));