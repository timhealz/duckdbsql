import React from 'react';
import * as ReactDOM from "react-dom";
import QueryEnvironment from './components/QueryEnvironment';
import reportWebVitals from './reportWebVitals';


const element = document.getElementById("root");
ReactDOM.render(
    <React.StrictMode>
        <QueryEnvironment />
    </React.StrictMode>,
    element
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
