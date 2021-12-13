import React from 'react'
import Task from '../Tasks/Task'
import styles from './style.module.css'

const Tasks = ({tasks, onDelete, onComplete}: any) => {

    return (
    <div>
        <div className = {styles.taskComponent}>
            {tasks.map((task: any) => (<Task key={task.id} task={task} onDelete={onDelete} onComplete = {onComplete}/>))}
        </div>
        
    </div>
    )
}

export default Tasks
