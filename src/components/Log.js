import React from 'react'

import './Log.css'

export const Log = ({list,sortIncrease}) => {
    let conditionBold = list.length-1
    if(sortIncrease){
        return(
            <div className='log'>
                {list.map((value,index)=>{
                    let isBold = (index === conditionBold) ? "log-item bold":"log-item"
                    return (
                        <div className={isBold}>
                            <div className='player'>{value.player} :</div>
                            <div >( {value.row} , {value.col} )</div>
                        </div>
                    )
                })}
            </div>
        )
    }
    else{
        conditionBold = 0
        return (
            <div className='log'>
                {list.slice(0).reverse().map((value,index)=>{
                    let isBold = (index === conditionBold) ? "log-item bold":"log-item"
                    return (
                        <div className={isBold}>
                            <div className='player'>{value.player} :</div>
                            <div >( {value.row} , {value.col} )</div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
