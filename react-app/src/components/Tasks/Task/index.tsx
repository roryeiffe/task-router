import React from 'react'
import styles from '../style.module.css'
import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete, onComplete}: any) => {
    return (
        <div className={styles.task}>
            <h3>{task.text} <FaTimes onClick={() => onDelete(task.id)}/> <input type="checkbox" onClick={onComplete}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
