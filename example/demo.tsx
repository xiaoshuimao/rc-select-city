import React from 'react';
import ReactDOM from 'react-dom';
import SelectCity from "rc-select-city";
import "rc-select-city/assets/index.css"
import "antd/dist/antd.css";
const address = require("rc-select-city/address.json");
var params = {
    address,
    deepMap: [{name: '省',},{name: '市',},{name: '区',}],
    search: true,
    onChange:(data:any) => {
        console.log(data);
    }
}
ReactDOM.render(<SelectCity params={params}/>, document.getElementById('root'));