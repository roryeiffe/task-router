import React, { useEffect, useState } from 'react'
import styles from '../style.module.css'
import { FaTimes } from 'react-icons/fa'
import moment from 'moment'



const Task = ({ task, onDelete, onComplete }: any) => {

    //change status based on date
    const [status, setStatus] = useState(<div></div>)

    var options: any = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC', timeZoneName: 'short' };

    var dateTask = new Date(task.date)
    var dateString = dateTask.toLocaleTimeString('en-US', options)

    var date = Date.now();
    var d = new Date(date);
    //var d2 = d.toLocaleTimeString('en-US', options)
    

    //using moment

    //console.log("")

    //console.log(task.date)

    var dateMoment = moment.utc().format();

    var localMoment = moment.utc(dateMoment).local().format('YYYY-MM-DD HH:mm:ss');
    //console.log(localMoment, "- UTC now to local");

    var taskDateMoment = moment.utc(task.date).format('YYYY-MM-DD HH:mm:ss');
    //console.log(taskDateMoment, "- this is the task date")

    useEffect(() => {
        //console.log("useEffect works!")
        if (taskDateMoment < localMoment) { // if in the past
            //console.log("It works!")
            setStatus(
                <div className={`${styles.task} ${styles.taskOverdue}`}>

                </div>
            )
        }
        else if (taskDateMoment > localMoment) { // if in the future
            setStatus(
                <div className={`${styles.task} ${styles.taskPending}`}>

                </div>
            )
        }
        if (task.completed == true) {
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
            <h3>{task.title} <FaTimes onClick={() => onDelete(task.id)} /> </h3>
            <p>{dateString} </p>
            <p>{task.points} points {!task.completed && <button onClick={() => onCompleteHandler()}>Complete</button>}</p>
        </div>
    )
}

export default Task
