import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import styles from './style.module.css'
import Navbar from "../../components/Navbar"
import Tasks from '../../components/Tasks'
import AddTask from '../../components/Tasks/AddTask'
import TaskHeader from "../../components/Tasks/TaskHeader"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import CatchingCorner from '../../components/CatchingCorner'

const TaskPage = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        // {
        //     id: '',
        //     completed: false,
        //     title: '',
        //     points: '',
        //     date: ''
        // }
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
    const [catchPokemon, setCatchPokemon] = useState(<div></div>);

    
  // get user from redux store and set it to state;
  const temp = useSelector((state: any) => state.user);
  const [user, ] = useState(temp);

    useEffect(() => {
        axios.get('http://localhost:9001/tasks/get/' + user.id)
        .then(response => setTasks(response.data));
        // if(task.date >= Date.now){
        //     {tasks.map((task: any) => (<Task key={task.id} completed={styles.taskOverdue} />))}
        // }
    }, [tasks])
    

    const dispatch = useDispatch();

    //add task
    const addTask = (task: any) => {
        // const id = Math.floor(Math.random() * 10000) + 1

        const newTask = { completed: false, ...task}
        //setTasks([...tasks, newTask])
        dispatch({type: 'UPDATE_TASK', payload: tasks});
        axios.put('http://localhost:9001/tasks/add/'+ user.id, task)
        .then((response) => {
            alert("Task added successfully")
        })
        .catch((error) => {
            console.log(error);
            alert("Task failed to add")
        });
        // task.preventDefault();
    }

    //delete task
    const deleteTask = (id:any) => {
        // console.log(task.id);
        // setTasks(tasks.filter((task) => task.id !== id))
        dispatch({type: 'UPDATE_TASK', payload: tasks});
        axios.delete('http://localhost:9001/tasks/remove/'+ id)
        .then((response) => {
            alert("Task removed successfully")
        })
        .catch((error) => {
            console.log(error);
            alert("Task failed to remove")
        });
        // id.preventDefault();
    }

    //complete task
    const completeTask = (task: any) => {
        console.log('Got to complete task');
        dispatch({type: 'UPDATE_TASK', payload: tasks});
        axios.put('http://localhost:9001/tasks/complete/'+ task.id)
        .then((response) => {
            alert("Task updated successfully");
            user.points += task.points;
            dispatch({type: 'UPDATE_USER', payload: user});
            // TODO save this user to database
            setCatchPokemon(<CatchingCorner user={user} points = {task.points} setCatchPokemon = {setCatchPokemon}/>);
            // deleteTask(task.id); 
        })
        .catch((error) => {
            console.log(error);
            alert("Task failed to update")
        });
        // task.preventDefault();
    }

    // const changeStatus = (task: any) => {
    //     if(task.date >= Date.now){
    //         //setTasks(tasks.map((task: any) => task.id === id ? {...task, reminder: !task.reminder} : task))
    //         {tasks.map((task: any) => (<Task key={task.id} status: />))}
    //     }
    // }

    return <div className={styles.background}>
        <Navbar/>
        <div className={styles.container}>
        <TaskHeader onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask}/>}
        {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onComplete={completeTask}/> : 'No Tasks to Show'}
        {catchPokemon}
        </div>

        
        
    </div>
}

export default TaskPage