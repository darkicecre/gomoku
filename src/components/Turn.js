import React from 'react'

import './Turn.css'

export const Turn = ({isTurnX}) => {
    const value = (isTurnX===true) ? "X" : "O";
    return (
        <div className={value}> Turn: {value}</div>
    )
}