import React, {useState} from "react";
import './App.css';

import { Board } from "./components/Board"

function App() {
  const sizeBoard = {
    row:13,
    col:13
  }
  const [highlight,setHighLight] = useState({
    isHighLight: false,
    playerHighLight: 'X',
    typeHighLight : 'row', // row col main-diagol sub-diagol
    pointRow: [0,0,0,0,0],
    pointCol: [0,0,0,0,0]
  })
  // const testArray = [
  //   ["X","O","X","O","X","O","X","O","X","O","X","O","X"],
  //   ["X","O","X","O","X","O","X","O","X","O","X","O","X"],
  //   ["X","O","X","O","X","O","X","O","X","O","X","O","X"],
  //   ["X","O","X","O","X","O","X","O","X","O","X","O","X"],
  //   ["O","X","O","X","O","X","O","X","O","X","O","X","O"],
  //   ["O","X","O","X","O","X","O","X","O","X","O","X","O"],
  //   ["O","X","O","X","O","X","O","X","O","X","O","X","O"],
  //   ["O","X","O","X","O","X","O","X","O","X","O","X","O"],
  //   ["X","O","X","O","X","O","X","O","X","O","X","O","X"],
  //   ["X","O","X","O","X","O","X","O","X","O","X","O","X"],
  //   ["O","X","O","X","O","X","O","X","O","X","O","X","O"],
  //   ["O","X","O","X","O","X","O","X","O","X","O","X","O"],
  //   ["X","O","X","O","X","O","X","O","X","O","X","O",null],
  // ]
  const [board, setBoard] = useState(Array(sizeBoard.row).fill(Array(sizeBoard.col).fill(null)));
  // const [board,setBoard]=useState(testArray)
  const [xPlaying, setXPlaying] = useState(true);
  const [isLock,setLock] = useState(false);

  const handleBoxClick = (indexRow,indexCol) => {
    if(!isLock){
      let isChangePlayer = false;
      const updatedBoard = board.map((row,idxRow)=>{
        return row.map((value,idxCol)=>{
          if(idxRow===indexRow && idxCol===indexCol){
            if(value==null){
              isChangePlayer = true;
              return xPlaying === true ? "X" : "O";
            }
            else{
              return value;
            }
          }
          else{
            return value;
          }
        })
      })
      checkWin(updatedBoard)
      setBoard(updatedBoard);
      if(checkDraw(updatedBoard)){
        setHighLight({
          isHighLight: true,
          playerHighLight: "",
          typeHighLight : "draw", // row col main-diagol sub-diagol
          pointRow: [],
          pointCol: []
        })
      }

      if(isChangePlayer){
        setXPlaying(!xPlaying);
      }
    }
  }

  const handleWin=(idxRow,idxCol,type,player)=>{
    let pRow = [idxRow,idxRow,idxRow,idxRow,idxRow];
    let pCol = [idxCol,idxCol,idxCol,idxCol,idxCol];
    if(type==='row'){
      pCol = [idxCol,idxCol+1,idxCol+2,idxCol+3,idxCol+4]
    }
    else if(type==='col'){
      pRow = [idxRow,idxRow+1,idxRow+2,idxRow+3,idxRow+4];
    }
    else if(type==='main-diagol'){
      pRow = [idxRow,idxRow+1,idxRow+2,idxRow+3,idxRow+4];
      pCol = [idxCol,idxCol+1,idxCol+2,idxCol+3,idxCol+4]
    }
    else if(type==='sub-diagol'){
      pRow = [idxRow,idxRow+1,idxRow+2,idxRow+3,idxRow+4];
      pCol = [idxCol,idxCol-1,idxCol-2,idxCol-3,idxCol-4]
    }
    console.log(player+" thắng "+type);
    setLock(true);
    setHighLight({
      isHighLight: true,
      playerHighLight: player,
      typeHighLight : type, // row col main-diagol sub-diagol
      pointRow: pRow,
      pointCol: pCol
    })
  }

  const checkWin = (board) => {
    /// Hàng ngang
    for(let row=0;row<sizeBoard.row;row++){
      for(let col=0;col<sizeBoard.col-4;col++){
        if("XXXXX"===""+board[row][col]+board[row][col+1]+board[row][col+2]+board[row][col+3]+board[row][col+4]){
          handleWin(row,col,'row','X');
          return;
        }
        else if("OOOOO"===""+board[row][col]+board[row][col+1]+board[row][col+2]+board[row][col+3]+board[row][col+4]){
          handleWin(row,col,'row','O');
          return;
        }
      }
    }

    /// Hàng dọc
    for(let row=0;row<sizeBoard.row-4;row++){
      for(let col=0;col<sizeBoard.col;col++){
        if("XXXXX"===""+board[row][col]+board[row+1][col]+board[row+2][col]+board[row+3][col]+board[row+4][col]){
          handleWin(row,col,'col','X');
          return;
        }
        else if("OOOOO"===""+board[row][col]+board[row+1][col]+board[row+2][col]+board[row+3][col]+board[row+4][col]){
          handleWin(row,col,'col','O');
          return;
        }
      }
    }

    /// Hàng chéo chính
    for(let row=0;row<sizeBoard.row-4;row++){
      for(let col=0;col<sizeBoard.col-4;col++){
        if("XXXXX"===""+board[row][col]+board[row+1][col+1]+board[row+2][col+2]+board[row+3][col+3]+board[row+4][col+4]){
          handleWin(row,col,'main-diagol','X');
          return;
        }
        else if("OOOOO"===""+board[row][col]+board[row+1][col+1]+board[row+2][col+2]+board[row+3][col+3]+board[row+4][col+4]){
          handleWin(row,col,'main-diagol','O');
          return;
        }
      }
    }

    /// Hàng chéo phụ
    for(let row=0;row<sizeBoard.row-4;row++){
      for(let col=4;col<sizeBoard.col;col++){
        if("XXXXX"===""+board[row][col]+board[row+1][col-1]+board[row+2][col-2]+board[row+3][col-3]+board[row+4][col-4]){
          handleWin(row,col,'sub-diagol','X');
          return;
        }
        else if("OOOOO"===""+board[row][col]+board[row+1][col-1]+board[row+2][col-2]+board[row+3][col-3]+board[row+4][col-4]){
          handleWin(row,col,'sub-diagol','O');
          return;
        }
      }
    }

  }

  const checkDraw = (board)=>{
    for(let row=0;row<sizeBoard.row;row++){
      for(let col=0;col<sizeBoard.col;col++){
        if(board[row][col]!=="X"&&board[row][col]!=="O"){
          return false;
        }
      }
    }
    return true;
  }
  return (
    <div className="App">
      <Board board={board} onClick={handleBoxClick} highlight={highlight}/>
    </div>
  );
}

export default App;