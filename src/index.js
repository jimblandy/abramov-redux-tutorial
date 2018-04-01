import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { todos } from './todos';

const render = () => {
  ReactDOM.render(
    <span>Good morning!</span>,
    document.getElementById('root')
  )
};

render();
