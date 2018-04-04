// -*- mode: js-jsx -*-

import PropTypes from 'prop-types';
import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { todoApp } from './todos';

const AddTodo = (props, { store }) => {
  let input;
  return (
    <div>
      <input ref={node => { input = node; }} />
      <button onClick={() => {
          store.dispatch({ type: 'ADD_TODO', id: nextTodoId++, text: input.value });
          input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
};
AddTodo.contextTypes = {
  store: PropTypes.object
};

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{ textDecoration: completed ? 'line-through' : 'none' }}>
    {text}
  </li>
);

const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
        onClick={() => onTodoClick(todo.id)}
        />
    ))}
  </ul>
);

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
  case 'SHOW_ALL':
    return todos;
  case 'SHOW_COMPLETED':
    return todos.filter(todo => todo.completed);
  case 'SHOW_ACTIVE':
    return todos.filter(todo => !todo.completed);
  default:
    console.log('unexpected visibility filter: ' + filter);
    return todos;
  }
};

const VisibleTodoList = connect(
  (state) => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }),
  (dispatch) => ({
    onTodoClick: (id) => dispatch({ type: 'TOGGLE_TODO', id })
  })
)(TodoList);

const Link = ({ active, onClick, children }) => {
  if (active)
    return <span>{children}</span>;

  return (
    <a href='#link'
       onClick={e => {
         e.preventDefault();
         onClick();
      }}>
      {children}
    </a>
  );
};

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.context;
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { props, context: { store } } = this;
    const state = store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: props.filter });
        }}>
        {props.children}
      </Link>
    );
  }
}
FilterLink.contextTypes = {
  store: PropTypes.object
};

const Footer = () => (
  <p>
    Show:
    {' '} <FilterLink filter='SHOW_ALL'>All</FilterLink>
    {' '} <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    {' '} <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
  </p>
);

let nextTodoId = 0;
const TodoApp = () => (
  <div>
    <AddTodo/>
    <VisibleTodoList/>
    <Footer/>
  </div>
);

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);
