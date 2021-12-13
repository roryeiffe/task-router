import React, { useEffect } from 'react'
import styles from '../style.module.css'
import { FaTimes } from 'react-icons/fa'



const Task = ({task, onDelete, onComplete}: any) => {

    useEffect(() => {
        if(task.date >= Date.now){
            <div className={styles.taskOverdue}>
                <Task />
            </div>
        }
    })

    return (
        <div className={styles.task}>
            <h3>{task.title} <FaTimes onClick={() => onDelete(task.id)}/> <button onClick={() => onComplete(task)}>Complete</button></h3>
            <p>{task.date}</p>
            <p>{task.points} points</p>
        </div>
    )
}

export default Task
