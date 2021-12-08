import React from 'react'
import Task from '../Tasks/Task'

const Tasks = ({tasks, onDelete}: any) => {

    return (
        <div>
            {tasks.map((task: any) => (<Task key={task.id} task={task} onDelete={onDelete}/>))}
        </div>
    )
}

export default Tasks
