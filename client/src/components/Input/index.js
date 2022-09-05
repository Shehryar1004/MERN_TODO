import React, {memo, useState} from 'react'
import styles from './style.module.css'

const Input = ({handleAddToDo}) => {
    const [value, setValue] = useState('')
    const handleValueChange = (text) => {
        setValue(text)
    }
    const handleSubmit = (event) => {
        if (value === '')
            return
        if (event.key === 'Enter' || event.target.nodeName === 'BUTTON')
            handleAddToDo(value)
    }

    return(
        <div className={styles.container}>
            <input 
                type='text'
                placeholder='Enter todo'
                onChange={(event) => handleValueChange(event.target.value)}
                onKeyUp={handleSubmit}
            />
            <button onClick={handleSubmit}>
                +
            </button>
        </div>
    )
}

export default memo(Input)