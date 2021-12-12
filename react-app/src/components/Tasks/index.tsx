import React from 'react'
import Task from '../Tasks/Task'
import styles from './style.module.css'
import CatchingCorner from '../CatchingCorner'

const Tasks = ({tasks, onDelete}: any) => {

    return (
    <div>
        <div className = {styles.taskComponent}>
            {tasks.map((task: any) => (<Task key={task.id} task={task} onDelete={onDelete}/>))}
        </div>
        {CatchingCorner(151)}
    </div>
    )
}

export default Tasks
