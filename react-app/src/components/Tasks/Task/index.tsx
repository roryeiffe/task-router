import React, { useEffect, useState } from 'react'
import styles from '../style.module.css'
import { FaTimes } from 'react-icons/fa'



const Task = ({task, onDelete, onComplete}: any) => {

    //change status based on date
    const [status, setStatus] = useState(<div></div>)

    var options:any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC', timeZoneName: 'short'};
    
    var dateTask = new Date(task.date)
    var dateString = dateTask.toLocaleTimeString('en-US', options)
    // console.log(date2)
    var date = Date.now();
    var d = new Date(date);
    console.log("Now: " + d)
    console.log("Task.date: " + task.date)
    console.log("dateTask: " + dateTask)
    console.log("\n")
    // var ds = d.toLocaleString();
    // console.log(ds)
    
    useEffect(() => {
        //console.log("useEffect works!")
        if(dateTask < d){ // if in the past
            //console.log("It works!")
            setStatus(
            <div className={`${styles.task} ${styles.taskOverdue}`}>
                
            </div>
            )
        }
        else if(dateTask > d){ // if in the future
            setStatus(
                <div className={`${styles.task} ${styles.taskPending}`}>

                </div>
            )
        } 
        if(task.completed == true){
            setStatus(
                <div className={`${styles.task} ${styles.taskCompleted}`}>
                
                </div>
            )
        }
    }, [])

    const onCompleteHandler = () => {
        console.log("I am being pressed")
        onComplete(task)
        setStatus(
            <div className={`${styles.task} ${styles.taskCompleted}`}>

            </div>
        )
    }
    
    //{!task.complete && <button>Complete</button>}
    
    return (
        <div className={styles.task}>
            {status}
            <h3>{task.title} <FaTimes onClick={() => onDelete(task.id)}/> </h3>
            <p>{dateString} </p>
            <p>{task.points} points {!task.completed && <button onClick={() => onCompleteHandler()}>Complete</button>}</p>
        </div>
    )
}

export default Task
