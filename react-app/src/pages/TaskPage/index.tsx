import React, {useState} from 'react'
import styles from './style.module.css'
import Navbar from "../../components/Navbar"
import Tasks from '../../components/Tasks'
import AddTask from '../../components/Tasks/AddTask'
import TaskHeader from "../../components/Tasks/TaskHeader"
import axios from 'axios'

const TaskPage = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: '',
            completed: false,
            title: '',
            points: '',
            date: ''
        }
        // {
        //     id: 1,
        //     text: 'Doctors Appointment',
        //     day: 'Feb 5th at 2:30pm',
        //     //reminder: true,
        // },
        // {
        //     id: 2,
        //     text: 'Meeting at School',
        //     day: 'Feb 6th at 1:30pm',
        //     //reminder: true,
        // },
        // {
        //     id: 3,
        //     text: 'Food Shopping',
        //     day: 'Feb 5th at 2:30pm',
        //     //reminder: false,
        // }
    ])

    //add task
    const addTask = (task: any) => {
        // const id = Math.floor(Math.random() * 10000) + 1

        // const newTask = {id, ...task}
        // setTasks([...tasks, newTask])
        dispatchEvent({type: 'UPDATE_TASK', payload: tasks});
        axios.post('http://localhost:9001/tasks/add', tasks)
        .then((response) => {
            alert("Task added successfully")
        })
        .catch((error) => {
            console.log(error);
            alert("Task failed to add")
        });
        task.preventDefault();
    }

    //delete task
    const deleteTask = (id: any) => {
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return <div className={styles.background}>
        <Navbar/>
        <div className={styles.container}>
        <TaskHeader onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask}/> : 'No Tasks to Show'}
        </div>
        
    </div>
}

export default TaskPage