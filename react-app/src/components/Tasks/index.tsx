import React from 'react'
import Task from '../Tasks/Task'
import styles from './style.module.css'

const Tasks = ({tasks, onDelete}: any) => {

    return (
        <div className = {styles.taskComponent}>
            {tasks.map((task: any) => (<Task key={task.id} task={task} onDelete={onDelete}/>))}
        </div>
    )
}

export default Tasks
