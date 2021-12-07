import React, { useState } from 'react'
import styles from '../style.module.css'

const AddTask = ({ onAdd }: any) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')

    const onSubmit = (e: any) => {
        e.preventDefault()

        if (!text) {
            alert('Please add task')
            return
        }

        onAdd({ text, day })
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
                <input type='text' placeholder='Add Day & Time' value={text} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className={styles.formControl}>
                <label>Task Value</label>
                <select>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" href="#">Action</a>
                    <a className="dropdown-item" href="#">Another action</a>
                    <a className="dropdown-item" href="#">Something else here</a>
                </div>
            </div>

            <input type='submit' value='Save Task' className={`${styles.btn} btn-block`} />
        </form>
    )
}

export default AddTask
