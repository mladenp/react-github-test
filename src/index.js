import React from 'react';
import ReactDOM from 'react-dom';
import Detail from './pages/Details.js';

ReactDOM.render(
    <Detail message="Msg from props updated" />,
    document.getElementById('app')
);

console.log('React is up and running!');

module.hot.accept();