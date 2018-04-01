import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';
import { todos, todoApp } from './todos';

const F = deepFreeze;

test('add todo', () => {
  expect(
    todos(undefined, {})
  ).toEqual([]);

  expect(
    todos(F([]), F({ type: 'ADD_TODO', id: 0, text: 'Learn Redux' }))
  ).toEqual(
    [
      { id: 0, text: 'Learn Redux', completed: false }
    ]
  );
});

test('toggle todo', () => {
  expect(
    todos(F([{ id: 0, text: 'Learn Redux', completed: false },
             { id: 1, text: 'go shopping', completed: false }]),
          F({ type: 'TOGGLE_TODO', id: 1 }))
  ).toEqual([{ id: 0, text: 'Learn Redux', completed: false },
             { id: 1, text: 'go shopping', completed: true }]);

  expect(
    todos(F([{ id: 0, text: 'Learn Redux', completed: true },
             { id: 1, text: 'go shopping', completed: false }]),
          F({ type: 'TOGGLE_TODO', id: 0 }))
  ).toEqual([{ id: 0, text: 'Learn Redux', completed: false },
             { id: 1, text: 'go shopping', completed: false }]);
});

test('visibility', () => {
  expect(
    todoApp(undefined, {})
  ).toEqual({ todos: [], visibilityFilter: 'SHOW_ALL' });

  expect(
    todoApp(F({ todos: [], visibilityFilter: 'SHOW_ALL' }),
            F({ type: 'ADD_TODO', id: 0, text: "pat Cacao" }))
  ).toEqual({ todos: [{ id: 0, text: "pat Cacao", completed: false }],
              visibilityFilter: 'SHOW_ALL' });

  expect(
    todoApp(F({ todos: [{ id: 0, text: "pat Cacao", completed: false }],
                visibilityFilter: 'SHOW_ALL' }),
            F({ type: 'TOGGLE_TODO', id: 0, text: "pat Cacao" }))
  ).toEqual({ todos: [{ id: 0, text: "pat Cacao", completed: true }],
              visibilityFilter: 'SHOW_ALL' });

  expect(
    todoApp(F({ todos: [{ id: 0, text: "pat Cacao", completed: true }],
                visibilityFilter: 'SHOW_ALL' }),
            F({ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_COMPLETED' }))
  ).toEqual({ todos: [{ id: 0, text: "pat Cacao", completed: true }],
              visibilityFilter: 'SHOW_COMPLETED' });
});
