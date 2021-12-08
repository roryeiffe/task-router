import React from 'react'
import styles from '../style.module.css'
import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete}: any) => {
    return (
        <div className={styles.task}>
            <h3>{task.text} <FaTimes onClick={() => onDelete(task.id)}/></h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
