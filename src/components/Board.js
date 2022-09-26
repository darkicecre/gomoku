import React from "react";

import './Board.css'
import {Box} from './Box'

export const Board = ({board, onClick,highlight}) => {
    if(highlight.isHighLight){
        return(
            <div className="board">
                {board.map((row,indexRow)=>{
                    return row.map((value,indexCol)=>{
                        if(
                            (indexRow===highlight.pointRow[0]&&indexCol===highlight.pointCol[0])||
                            (indexRow===highlight.pointRow[1]&&indexCol===highlight.pointCol[1])||
                            (indexRow===highlight.pointRow[2]&&indexCol===highlight.pointCol[2])||
                            (indexRow===highlight.pointRow[3]&&indexCol===highlight.pointCol[3])||
                            (indexRow===highlight.pointRow[4]&&indexCol===highlight.pointCol[4])
                        ){
                            return (
                                <Box isHighLight={true} value={value} onClick={()=>onClick(indexRow,indexCol)} />
                            )
                        }
                        else{
                            return (
                                <Box value={value} onClick={()=>onClick(indexRow,indexCol)} />
                            )
                        }
                    })
                })}
            </div>
        )
    }
    else{
        return(
            <div className="board">
                {board.map((row,indexRow)=>{
                    return row.map((value,indexCol)=>{
                        return (
                            <Box value={value} onClick={()=>onClick(indexRow,indexCol)} />
                        )
                    })
                })}
            </div>
        )
    }
}


    
