import React from 'react'
import styles from '../style.module.css'
import Button from '../TaskButton'

const Header = ({onAdd, showAdd}: any) => {
    return (
        <header className={styles.header}>
            <h1>Tasks</h1>
            <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd}/>
        </header>
    )
}

export default Header
