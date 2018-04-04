// -*- mode: js-jsx -*-

import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { todoApp } from './todos';

const AddTodo = ({ store }) => {
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

class VisibleTodoList extends Component {
  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const store = this.props.store;
    const state = store.getState();

    return (
      <TodoList
        todos={getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={ id => {
          store.dispatch({ type: 'TOGGLE_TODO', id });
        }}
      />
    );
  }
}

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
    this.unsubscribe = this.props.store.subscribe(() =>
      this.forceUpdate()
    );
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const store = props.store;
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

const Footer = ({ store }) => (
  <p>
    Show:
    {' '} <FilterLink filter='SHOW_ALL'       store={store}>All</FilterLink>
    {' '} <FilterLink filter='SHOW_ACTIVE'    store={store}>Active</FilterLink>
    {' '} <FilterLink filter='SHOW_COMPLETED' store={store}>Completed</FilterLink>
  </p>
);

let nextTodoId = 0;
const TodoApp = ({ store }) => (
  <div>
    <AddTodo         store={store}/>
    <VisibleTodoList store={store}/>
    <Footer          store={store}/>
  </div>
);

ReactDOM.render(
  <TodoApp store={createStore(todoApp)}/>,
  document.getElementById('root')
);
