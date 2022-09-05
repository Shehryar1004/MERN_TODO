import React from 'react'
import styles from './style.module.css'

const ToDoItem = ({todo, handleRemoveToDo}) => {
    return (
        <div className={styles.container}>
            <div className={styles.textContainer}>
                <p>{todo.todo}</p>
            </div>
            <button onClick={() => handleRemoveToDo(todo._id)}>X</button>
        </div>
    )
}

export default ToDoItem