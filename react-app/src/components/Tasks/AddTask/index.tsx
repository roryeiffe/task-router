import React, { useState } from 'react'
import styles from '../style.module.css'
import { useSelector } from 'react-redux'

const AddTask = ({ onAdd }: any) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [points, setPoints] = useState(0);
    const [category, setCategory] = useState('Select');


    
  // get user from redux store and set it to state;
  const temp = useSelector((state: any) => state.user);
  const [user, ] = useState(temp);

//   const handleChange = (e:any) => {
//     setOption({ option: e.target.value });
//   }


    const onSubmit = (e: any) => {

        console.log(user);

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
                <input type='datetime-local' placeholder='Add Day & Time' value={day} onChange={(e) => setDay(e.target.value)} />
            </div>
            <div className={styles.formControl}>
                <label>Task Value</label>
                <div className={styles.dropdown}>
                    <button className={`${styles.btn} btn-block dropdown-toggle`} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        {category} - {points} points
                    </button>

                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <a className="dropdown-item" onClick = {() => {setPoints(5); setCategory('Cleaning')}}>Cleaning - 5 points</a>
                        <a className="dropdown-item" onClick = {() => {setPoints(10); setCategory('Studying')}}>Studying - 10 points</a>
                        <a className="dropdown-item" onClick = {() => {setPoints(15); setCategory('Coding')}}>Coding = 15 points</a>
                        <a className="dropdown-item" onClick = {() => {setPoints(500); setCategory('Cure Covid')}}>Coding = 500 points</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item">New Option</a>
                    </div>
                </div>
            </div>


            <input type='submit' value='Save Task' className={`${styles.btn} btn-block`} />
        </form>
    )
}

export default AddTask
