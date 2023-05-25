import './App.css';
import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from "react-redux";
import { createStore } from "redux";

function Banner() {
  return (
    <h1>Todo Example with React REDUX</h1>
  )
}
function addTodo(text) {
  return { type: "ADD_TODO", text: text, id: Math.random() };
}
function removeTodo(id) {
  return { type: "REMOVE_TODO", id: id };
}

// Redux Reducer
function todosReducer(state = { todos: [] }, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return { // returning a copy of orignal state 
        ...state, //copying the original state
        todos: [...state.todos, { text: action.text, id: action.id }] //new todos array 
      }
    case 'REMOVE_TODO':
      const newTodos = state.todos.filter(todo => todo.id !== action.id);
      return {
        ...state,
        todos: newTodos
      }
    default: return state;
  }
}

function ToDoFormAndList() {
  const [itemText, setItemText] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector(state => state.todos);

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(itemText)
    // use redux to store a new todo
    dispatch(addTodo(itemText))
    // modify newItem text to ""
    setItemText("")
  }

  const removeItem = (id) => {
    // use redux
    dispatch(removeTodo(id))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
        <input type='submit' value='Add' />
      </form>
      <ul>
        {todos.map(item => (
          <li key={item.id}>
            {item.text + " "} <span onClick={() => removeItem(item.id)}> x </span>
          </li>
        ))}
      </ul>
    </div>
  )
}


function App() {
  const store = createStore(todosReducer)
  return (
    <Provider store={store}>
      <Banner />
      <ToDoFormAndList />
    </Provider>
  );
}

export default App;
