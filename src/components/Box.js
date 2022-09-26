import React from 'react'

import './Box.css'

export const Box = ({value,isHighLight,onClick}) => {
    let style = value === "X" ? "box x" : "box o";
    if(isHighLight){
        if(value==="X"){
            style = "box x highlightX";
        }
        else{
            style = "box o highlightO";
        }
    }
    return (
        <button className={style} onClick={onClick}>{value}</button>
    )
}