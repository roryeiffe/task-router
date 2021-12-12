import React, { useState } from 'react'
import styles from '../style.module.css'

const AddTask = ({ onAdd }: any) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [points, setPoints] = useState(0)

    const onSubmit = (e: any) => {
        e.preventDefault()

        if (!text) {
            alert('Please add task')
            return
        }

        onAdd({ 'title': text, 'date': day, 'points': points })
        setText('')
        setDay('')
    }

    return (
        <form className={styles.addForm} onSubmit={onSubmit}>
            <div className={styles.formControl}>
                <label>Task</label>
                <input type='text' placeholder='Add Task' value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className={styles.formControl}>
                <label>Day & Time</label>
                <input type='text' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className={styles.formControl}>
                <label>Task Value</label>
                <div className={styles.dropdown}>
                    <button className={`${styles.btn} btn-block dropdown-toggle`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        Select Value
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" href="#">Cleaning - 5 points</a>
                        <a className="dropdown-item" href="#">Studying - 10 points</a>
                        <a className="dropdown-item" href="#">Coding = 15 points</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="#">New Option</a>
                    </div>
                </div>
            </div>

            <input type='submit' value='Save Task' className={`${styles.btn} btn-block`} />
        </form>
    )
}

export default AddTask
