import React, {useState} from "react";
import './App.css';

import { Board } from "./components/Board"
import { Log } from "./components/Log";
import { Turn } from "./components/Turn"

function App() {
  const rowOdd = ["X","O","X","O","X","O","X","O","X","O","X","O","X"];
  const rowEven = ["O","X","O","X","O","X","O","X","O","X","O","X","O"];
  const testArray = [
    rowOdd,rowOdd,rowOdd,rowOdd,rowEven,rowEven,rowEven,rowEven,rowOdd,rowOdd,rowEven,rowEven, 
    ["X","O","X","O","X","O","X","O","X","O","X","O",null]]
  const sizeBoard = { row:13, col:13 }
  const [board, setBoard] = useState(Array(sizeBoard.row).fill(Array(sizeBoard.col).fill(null)));
  const [highlight,setHighLight] = useState({
    isHighLight: false, playerHighLight: 'X',
    typeHighLight : 'row', // row col main-diagol sub-diagol
    pointRow: [0,0,0,0,0], pointCol: [0,0,0,0,0]})
  const [isSortIncrease,setReverse] = useState(true); 
  const [xPlaying, setXPlaying] = useState(true);
  const [isLock,setLock] = useState(false);
  const [listHistory,setListHistory] = useState([]);
  
  const handleBoxClick = (indexRow,indexCol) => {
    if(!isLock){
      let isChangePlayer = false;
      const updatedBoard = board.map((row,idxRow)=>{
        return row.map((value,idxCol)=>{
          if(idxRow===indexRow && idxCol===indexCol&&value==null){
            isChangePlayer = true; return xPlaying === true ? "X" : "O"; }
          return value;
        })
      })
      if(isChangePlayer){
        checkWin(updatedBoard)
        setBoard(updatedBoard);
        checkDraw(updatedBoard);
        const newHistory = { player: (xPlaying===true)? "X": "O", row:indexRow, col:indexCol }
        listHistory.push(newHistory)
        setListHistory(listHistory)
        setXPlaying(!xPlaying);
      }
    }
  }

  const handleWin=(idxRow,idxCol,type,player)=>{
    let pRow = [idxRow,idxRow,idxRow,idxRow,idxRow];
    let pCol = [idxCol,idxCol,idxCol,idxCol,idxCol];
    if(type==='row'){      pCol = [idxCol,idxCol+1,idxCol+2,idxCol+3,idxCol+4]  }
    else if(type==='col'){ pRow = [idxRow,idxRow+1,idxRow+2,idxRow+3,idxRow+4]; }
    else if(type==='main-diagol'){
      pRow = [idxRow,idxRow+1,idxRow+2,idxRow+3,idxRow+4];
      pCol = [idxCol,idxCol+1,idxCol+2,idxCol+3,idxCol+4]
    }
    else if(type==='sub-diagol'){
      pRow = [idxRow,idxRow+1,idxRow+2,idxRow+3,idxRow+4];
      pCol = [idxCol,idxCol-1,idxCol-2,idxCol-3,idxCol-4]
    }
    console.log(player+" thắng "+type); setLock(true);
    setHighLight({
      isHighLight: true, playerHighLight: player,
      typeHighLight : type, // row col main-diagol sub-diagol
      pointRow: pRow, pointCol: pCol
    })
  }

  const checkWin = (board) => {
    for(let row=0;row<sizeBoard.row;row++){  // Check Row
      for(let col=0;col<sizeBoard.col-4;col++){
        if("XXXXX"===""+board[row][col]+board[row][col+1]+board[row][col+2]+board[row][col+3]+board[row][col+4]){
          handleWin(row,col,'row','X'); return;
        }
        else if("OOOOO"===""+board[row][col]+board[row][col+1]+board[row][col+2]+board[row][col+3]+board[row][col+4]){
          handleWin(row,col,'row','O'); return;
        }
      }
    }

    for(let row=0;row<sizeBoard.row-4;row++){  // Check Col
      for(let col=0;col<sizeBoard.col;col++){
        if("XXXXX"===""+board[row][col]+board[row+1][col]+board[row+2][col]+board[row+3][col]+board[row+4][col]){
          handleWin(row,col,'col','X'); return;
        }
        else if("OOOOO"===""+board[row][col]+board[row+1][col]+board[row+2][col]+board[row+3][col]+board[row+4][col]){
          handleWin(row,col,'col','O'); return;
        }
      }
    }

    for(let row=0;row<sizeBoard.row-4;row++){   // Check main-dia
      for(let col=0;col<sizeBoard.col-4;col++){
        if("XXXXX"===""+board[row][col]+board[row+1][col+1]+board[row+2][col+2]+board[row+3][col+3]+board[row+4][col+4]){
          handleWin(row,col,'main-diagol','X'); return;
        }
        else if("OOOOO"===""+board[row][col]+board[row+1][col+1]+board[row+2][col+2]+board[row+3][col+3]+board[row+4][col+4]){
          handleWin(row,col,'main-diagol','O'); return;
        }
      }
    }

    for(let row=0;row<sizeBoard.row-4;row++){   // Check sub-dia
      for(let col=4;col<sizeBoard.col;col++){
        if("XXXXX"===""+board[row][col]+board[row+1][col-1]+board[row+2][col-2]+board[row+3][col-3]+board[row+4][col-4]){
          handleWin(row,col,'sub-diagol','X'); return;
        }
        else if("OOOOO"===""+board[row][col]+board[row+1][col-1]+board[row+2][col-2]+board[row+3][col-3]+board[row+4][col-4]){
          handleWin(row,col,'sub-diagol','O'); return;
        }
      }
    }
  }

  const checkDraw = (board)=>{
    for(let row=0;row<sizeBoard.row;row++){
      for(let col=0;col<sizeBoard.col;col++){
        if(board[row][col]!=="X"&&board[row][col]!=="O"){ return false; }
      }
    }
    setLock(true); alert("Trận đấu hòa"); console.log("Trận đấu hòa"); return true;
  }

  const refresh = ()=>{
    setBoard(Array(sizeBoard.row).fill(Array(sizeBoard.col).fill(null)))
    setHighLight({
      isHighLight: false, playerHighLight: 'X',
      typeHighLight : 'row', // row col main-diagol sub-diagol
      pointRow: [0,0,0,0,0], pointCol: [0,0,0,0,0]
    })
    setLock(false);  setListHistory([]); setXPlaying(true);
  }

  return (
    <div className="App">
      <div className="left">
        <Turn isTurnX={xPlaying}></Turn>
        <Log list={listHistory} sortIncrease={isSortIncrease}></Log>
        <div className="sortListComponent">
          <button className="sortList" onClick={()=>{setReverse(!isSortIncrease)}}>
            {(isSortIncrease===true)?"Click to Decrease ":"Click to Increase "}
          </button></div></div>
      <div className="center">
        <Board board={board} onClick={handleBoxClick} highlight={highlight}/></div>
      <div className="right">
        {(isLock===true)?(
          <button className="reset" onClick={()=>refresh()}> Reset trận đấu mới </button>
        ):(
          <button onClick={()=>{setBoard(testArray)}}> Test trận đấu hòa </button>)}</div></div>
  );
}

export default App;

