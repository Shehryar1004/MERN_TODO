import React, {useEffect, useState, useCallback} from 'react'
import Input from './components/Input'
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  const [todos, setToDos] = useState([])

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch('http://localhost:3001/todo')
      const todos = await   response.json()
      console.log(todos)
      if (todos.length > 0)
        setToDos(todos)
      else
        setToDos([])
    }
    getTodos()
  }, [])

  const handleAddToDo = useCallback(async (todo) => {
    const URL = 'http://localhost:3001/todo'
    const config = {
      method: 'POST',
      body: JSON.stringify({todo: todo}),
      headers: {
        'Content-type': 'application/json'
      }
    }
    const response = await fetch(URL,config)
    if (response.status === 200){
      const newTodo = await response.json()
      setToDos((prevTodos) => [...prevTodos, newTodo])
    } else {
      const error = await response.json()
      console.log(error)
    }
  }, [todos])

  const handleRemoveToDo = useCallback(async (id) => {
    const URL = `http://localhost:3001/todo/${id}`
    const config = { method: 'DELETE'}
    const response = await fetch(URL, config)
    if (response.status === 200){
      setToDos((prevTodos) => prevTodos.filter((todo, i) => todo._id !== id))
    } else {
      console.log('something went wrong')
    }
  }, [todos])

  return (
    <div className="App">
      <Input handleAddToDo={handleAddToDo}/>
      <ToDoList todos={todos} handleRemoveToDo={handleRemoveToDo}/>
    </div>
  );
}

export default App;
