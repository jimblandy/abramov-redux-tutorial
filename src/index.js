// -*- mode: js-jsx -*-

import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { todoApp } from './todos';

const Link = ({ active, onClick, children }) => {
  if (active)
    return <span>{children}</span>;

  return (
    <a href='#'
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
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
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

const Footer = () => (
  <p>
    Show:
    {' '} <FilterLink filter='SHOW_ALL'>All</FilterLink>
    {' '} <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>
    {' '} <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
  </p>
);

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

const AddTodo = ({ onAddClick }) => {
  let input;
  return (
    <div>
      <input ref={node => { input = node; }} />
      <button onClick={() => {
          onAddClick(input.value);
          input.value = '';
        }}>
        Add Todo
      </button>
    </div>
  );
};

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

let nextTodoId = 0;
const TodoApp = ({ todos, visibilityFilter }) => (
  <div>
    <AddTodo
      onAddClick={text => {
        store.dispatch({ type: 'ADD_TODO', text, id: nextTodoId++ });
      }}
      />
    <TodoList
      todos={getVisibleTodos(todos, visibilityFilter)}
      onTodoClick={id => {
        store.dispatch({ type: 'TOGGLE_TODO', id });
      }}
      />
    <Footer />
  </div>
);

const store = createStore(todoApp);

const render = () => {
  ReactDOM.render(
    <TodoApp
      {...store.getState()}
    />,
    document.getElementById('root')
  )
};

store.subscribe(render);
render();
