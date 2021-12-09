import PropTypes from 'prop-types'
import styles from '../style.module.css'
import React from 'react'

const Button = ({color, text, onClick}: any) => {
    return (
        <button onClick={onClick} style={{backgroundColor: color}} className={styles.btn}>{text}</button>
    )
}

Button.propTyoes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button
