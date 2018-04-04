// -*- mode: js-jsx -*-

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import { todoApp } from './todos';

let nextTodoId = 0;
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
});

const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
});

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

const AddTodo = connect()(({ dispatch }) => {
  let input;
  return (
    <div>
      <input ref={node => { input = node; }} />
      <button onClick={() => {
          dispatch(addTodo(input.value));
          input.value = '';
      }}>
        Add Todo
      </button>
    </div>
  );
});

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
    onTodoClick: (id) => dispatch(toggleTodo(id))
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

const FilterLink = connect(
  (state, { filter }) => ({
    active: filter === state.visibilityFilter
  }),
  (dispatch, { filter } ) => ({
    onClick: () => {
      dispatch(setVisibilityFilter(filter));
    }
  })
)(Link);

const Footer = () => (
  <p>
    Show:
    {' '} <FilterLink filter='SHOW_ALL'>All</FilterLink>
    {' '} <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    {' '} <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
  </p>
);

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
