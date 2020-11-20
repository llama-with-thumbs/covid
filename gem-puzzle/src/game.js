// import _ from 'lodash';
import './style.css';
import './website.css';
// import moveThisTile from './index.js';

// import moveThisTile from './utils/moveThisTile.js';
// import create from './utils/create.js';


let moves = 0;
let table; 
let rows; 
let columns;
let textMoves;
let arrayForBoard;

let timeSpan;
let timer;
let sec = 0;
let min = 0;

// const main = create('main', '',
//   [create('h1', 'title', 'Gem Puzzle'),
//     // create('h3', 'subtitle', 'RS-School 2020q3'),
//     // create('p', 'hint', 'Use <kbd>Alt</kbd> + <kbd>Ctrl</kbd> or button 𝛂 to switch the language. ru is default.'),
//     // create('p', 'hint', 'To hide the keyboard press ⭳. To return the keyboard start typing.')
// ]);

//
// const tile = document.querySelector('.tile');
// console.log(tile);
//

function setTheFilld() {

  const gameBoard = document.createElement('SECTION');
  gameBoard.id = 'content';

  const startNewGame = document.createElement('INPUT');
  startNewGame.type = 'button';
  startNewGame.id = 'newGame';
  startNewGame.value = 'Start New Game';

  // <div>Number Of Moves: <span id="moves">0</span></div>
  const numberOfMovesWrapper = document.createElement('DIV');
  const numberOfMovesText = document.createElement('SPAN');
  const numberOfMoves = document.createElement('SPAN');
  numberOfMoves.id = 'moves';
  numberOfMovesText.textContent = 'Number Of Moves: ';
  numberOfMoves.textContent = '0';
  numberOfMovesWrapper.appendChild(numberOfMovesText);
  numberOfMovesWrapper.appendChild(numberOfMoves);

  //<label>Columns <input type="text" name="columns" id="columns" value="4" size="2"></label>
  const columnLabel = document.createElement('LABEL');
  const column = document.createElement('INPUT');
  column.type = 'text';
  column.name = 'columns';
  column.value = '4';
  column.size = '2';
  column.id = 'columns';
  columnLabel.appendChild(column);

  //<label>Rows <input type="text" name="rows" id="rows" value="4" size="2"></label>
  const rowLabel = document.createElement('LABEL');
  const row = document.createElement('INPUT');
  row.type = 'text';
  row.name = 'rows';
  row.value = '4';
  row.size = '2';
  row.id = 'rows';
  rowLabel.appendChild(row);

  //time
  const timeWrapper = document.createElement('DIV');
  timeWrapper.id = 'time-wrapper'
  timeSpan = document.createElement('SPAN');
  timeSpan.id = 'time';
  timeSpan.innerText = '00:00';

  //sound
  const audioElement = document.createElement('AUDIO');
  audioElement.id = 'audio';



  //<table id="table"></table>
  const table = document.createElement('TABLE');
  table.id = 'table';

  gameBoard.appendChild(audioElement);
  gameBoard.appendChild(table);
  gameBoard.appendChild(rowLabel);
  gameBoard.appendChild(columnLabel);
  gameBoard.appendChild(startNewGame);
  gameBoard.appendChild(numberOfMovesWrapper);
  gameBoard.appendChild(timeWrapper);
  gameBoard.appendChild(timeSpan);

  document.body.appendChild(gameBoard);
}
function stopTimer(timeSpan) {
  clearInterval(timer);
  timer = 0;
  sec = 1;
  min = 0;
  timeSpan.innerText = '00:00';
}

function startTimer(timerSpan){
      // console.log('startTimer');
      timer = setInterval(function(){
        if(sec === 60) {
          sec = 0;
          min++;
        }
        if(min === 60) {
          sec = 0;
          min = 0;
        }
        // console.log('sec=', sec);
        timerSpan.innerText = (min >= 10 ? min : '0'+ min) + ':' + (sec >= 10 ? sec : '0' + sec);
        sec++;
      }, 1000);
  }


function start()
{ 
  setTheFilld();

  let button = document.getElementById("newGame");
  button.addEventListener( "click", startNewGame, false );
  textMoves = document.getElementById("moves");
  // console.log('textMoves: ', textMoves);//
  table = document.getElementById("table");
  rows = 4;
  columns = 4;

  // createBoard();//create board
  startNewGame();
}
// function createBoard() {
//   document.body.prepend(main);
// }

function startNewGame()
{ 
  // console.log('startNewGame, timer: ',timer, ', this: ', this);
  if(timer !== 0) {
    // console.log('run stopTimer');
    stopTimer(timeSpan);
    // console.log('timer = 0, but timer = ', timer, ', this: ', this);
  }
  stopTimer(timeSpan);
  let arrayOfNumbers = new Array();
  let arrayHasNumberBeenUsed;
  let randomNumber = 0;
  let count = 0;
  moves = 0;
  rows = document.getElementById("rows").value;
  columns = document.getElementById("columns").value;
  textMoves.innerHTML = moves;
  // Create the proper board size.
  arrayForBoard = new Array(rows);
  for (let i = 0; i < rows; i++)
  {
    arrayForBoard[i] = new Array(columns);
  }
  // Set up a temporary array for
  // allocating unique numbers.
  arrayHasNumberBeenUsed = new Array( rows * columns );
  for (let i = 0; i < rows * columns; i++)
  {
    arrayHasNumberBeenUsed[i] = 0;
  }
 
  // Assign random numbers to the board.
  for (let i = 0; i < rows * columns; i++)
  {
    randomNumber = Math.floor(Math.random()*rows * columns);
    // If our random numer is unique, add it to the board.
    if (arrayHasNumberBeenUsed[randomNumber] == 0) 
    {
      arrayHasNumberBeenUsed[randomNumber] = 1;
      arrayOfNumbers.push(randomNumber);
    }
    else // Our number is not unique. Try again.
    {
      i--;
    }
  }
  
  // Assign numbers to the game board.
  count = 0;
  for (let i = 0; i < rows; i++)
  {
    for (let j = 0; j < columns; j++)
    {
      arrayForBoard[i][j] = arrayOfNumbers[count];
      
      count++;
    }
  }
  showTable();
}

function showTable()
{ 
  table.innerText = '';//
  let outputString = "";
  for (let i = 0; i < rows; i++)
  {
    outputString += "<tr>";
    const tableRow = document.createElement('TR');//
    
    for (let j = 0; j < columns; j++)
    {
      if (arrayForBoard[i][j] == 0) {
        const blankFild = document.createElement('TD');//
        blankFild.classList.add('blank');//
        tableRow.appendChild(blankFild);//
	      outputString += "<td class=\"blank\"> </td>";
      } else {
        outputString += "<td class=\"tile\" data-line=" + i +" data-column=" + j + " onclick=\"moveThisTile(" + i + ", " + j + ")\">" + arrayForBoard[i][j] + "</td>";

        const regFild = document.createElement('TD');
        regFild.dataset.line = i;
        regFild.dataset.column = j;
        regFild.classList.add('tile');
        regFild.innerText = arrayForBoard[i][j];
        regFild.addEventListener('click', event => moveThisTile( +event.target.dataset.line, +event.target.dataset.column));

        tableRow.appendChild(regFild);//
      }
    } // end for (let j = 0; j < columns; j++)
    outputString += "</tr>";
    table.appendChild(tableRow);//
  } // end for (let i = 0; i < rows; i++)

  // table.innerHTML = outputString;
  
}

function testFunc(tableRow, tableColumn) {
  // console.log(tableRow, tableColumn);
}

function moveThisTile( tableRow, tableColumn)
{
  if (checkIfMoveable(tableRow, tableColumn, "up") ||
      checkIfMoveable(tableRow, tableColumn, "down") ||
      checkIfMoveable(tableRow, tableColumn, "left") ||
      checkIfMoveable(tableRow, tableColumn, "right") )
  {
    incrementMoves();
  }
  else
  {
    // alert("ERROR: Cannot move tile!\nTile must be next to a blank space.");
  }
    
  if (checkIfWinner())
  { 
    
    setTimeout(() => {
      stopTimer(timeSpan);//stop timer
      alert("Hooray! You solved this puzzle in " + moves + " moves.");
      startNewGame();
    }, 200);
  }
}

function checkIfMoveable(rowCoordinate, columnCoordinate, direction)
{
  // The following letiables an if else statements
  // make the function work for all directions.
  let rowOffset = 0;
  let columnOffset = 0;
  if (direction == "up")
  {
    rowOffset = -1;
  }
  else if (direction == "down")
  {
    rowOffset = 1;
  }
  else if (direction == "left")
  {
    columnOffset = -1;
  }
  else if (direction == "right")
  {
    columnOffset = 1;
  }  
  
  // Check if the tile can be moved to the spot.
  // If it can, move it and return true.
  if (rowCoordinate + rowOffset >= 0 && columnCoordinate + columnOffset >= 0 &&
    rowCoordinate + rowOffset < rows && columnCoordinate + columnOffset < columns
  )
  {
    if ( arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] == 0)
    {
      arrayForBoard[rowCoordinate + rowOffset][columnCoordinate + columnOffset] = arrayForBoard[rowCoordinate][columnCoordinate];
      arrayForBoard[rowCoordinate][columnCoordinate] = 0;
      showTable();
      return true;
    }
  }
  return false; 
}

function checkIfWinner()
{
  let count = 1;
  for (let i = 0; i < rows; i++)
  {
    for (let j = 0; j < columns; j++)
    {
      if (arrayForBoard[i][j] != count)
      {
	if ( !(count === rows * columns && arrayForBoard[i][j] === 0 ))
	{
	  return false;
	}
      }
      count++;
    }
  }
  
  return true;
}

function incrementMoves()
{
  moves++;
  if (moves == 1) startTimer(timeSpan);//start timer
  if (textMoves) 
  {
    textMoves.innerHTML = moves;
  }
}

//


// function component() {
  // const main = document.createElement('main');
  // const table = document.createElement('table');
  // const rows = document.createElement('label');
  // const coumns = document.createElement('label');
  // const newGame = document.createElement('button');
  // const numOfMoves = document.createElement('span');
  // addAtr(rows, [['type', 'text'], ['name', 'rows'], ['id', 'rows'], ['value', '4'], ['size', '2']]);
  // addAtr(coumns, [['type', 'text'], ['name', 'columns'], ['id', 'columns'], ['value', '4'], ['size', '2']]);
  // addAtr(newGame, [['type', 'button'], ['id', 'newGame'], ['value', 'Start New Game']]);
  // addAtr(numOfMoves, [['type', 'button'], ['id', 'newGame']]);

  // table.appendChild(rows);
  // table.appendChild(coumns);
  // table.appendChild(newGame);
  // table.appendChild(numOfMoves);
  // main.appendChild(table);
  // document.body.appendChild(main);
  
  // start();
// }

window.addEventListener( "load", start, false ); // This event listener makes the function start() execute when the window opens. 






