import React from 'react'
import ToDoItem from '../ToDoItem'
import styles from './styles.module.css'

const ToDoList = ({todos, handleRemoveToDo}) => {
  return (
    <div className={styles.container}>
      <h2>To Do List</h2>
      {todos.map((todo) => (
        <ToDoItem 
          key={todo._id}
          todo={todo} 
          handleRemoveToDo={handleRemoveToDo}
        />
      ))}
    </div>
  )
}

export default ToDoList
