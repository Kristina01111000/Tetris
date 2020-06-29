document.addEventListener('DOMContentLoaded', () => {
  // all javascript code goes inside this
  const width = 10;
  //will make grid mean class grid and squares mean an array of all the divs of class grid
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  let nextRandom = 0;
  let timerId;
  let score = 0;
  const colors = [
    '#32CD32',
    '#FF69B4',
    '#FFFF00',
    '#FF0000',
    '#15F4EE'
  ];
  const ScoreDisplay = document.querySelector('#score');
  const StartButton = document.querySelector('#startButton');
  const ResetButton = document.querySelector('#resetButton');

  // making the tetris pieces
  const lPiece = [
    [1,width+1,width*2+1,2],
    [width,width+1,width+2,width*2+2],
    [1,width+1,width*2+1,width*2],
    [width, width*2,width*2+1,width*2+2]
   ];
  
  const zPiece = [
    [width*2,width+1,width*2+1,width+2],
    [0,width,width+1,width*2+1],
    [width*2,width+1,width*2+1,width+2],
    [0,width,width+1,width*2+1]
   ];

  const tPiece = [
    [1,width,width+1,width+2],
    [1,width+1,width+2,width*2+1],
    [width,width+1,width+2,width*2+1],
    [1,width,width+1,width*2+1]
   ];
  
  const oPiece = [
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1],
    [0,1,width,width+1]
   ];
  
  const iPiece = [
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3],
    [1,width+1,width*2+1,width*3+1],
    [width,width+1,width+2,width+3]
  ];
  
  const piecesArray = [lPiece,zPiece,tPiece,oPiece,iPiece];
  
  let currentPosition = 4;
  // select a random piece and its rotation and set to current
  let random = Math.floor(Math.random()*piecesArray.length);
  let currentRotation = 0;
  let current = piecesArray[random][currentRotation];
  
  //draw the first rotation of the current piece
  function draw(){
    // for each object in the pieces array at current position add the current piece
    current.forEach(index => {
      squares[currentPosition + index].classList.add('pieces');
      squares[currentPosition + index].style.backgroundColor = colors[random];
    })
  }
    
  // removes the piece from the board so it doesn't stay 
  // onscreen when the next position is drawn
  function unDraw(){
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('pieces');
        squares[currentPosition + index].style.backgroundColor = '';
      });    
  }
  
  // remove the current shape and draw a new one to
  // make the pieces go down the screen every second
  function moveDown(){
      unDraw();
      currentPosition += width;
      draw();
      freeze();
  }

    // freeze function, stops pieces from going off the screen
    // .some checks the array for atleast 1 true, if all false it doesnt work
    function freeze(){
      if (current.some(index => squares[currentPosition+index+width].classList.contains('taken'))){
        current.forEach(index => squares[currentPosition+index].classList.add('taken'));
        // select a new piece  
        random = nextRandom;
        nextRandom = Math.floor(Math.random()*piecesArray.length);
        current = piecesArray[random][currentRotation];
        currentPosition = 4;
        draw();
        displayShape();
        addScore();
        endGame();
        }
    }
  
      function moveLeft(){
        unDraw();
        const isAtLeftEdge = current.some(index => (currentPosition + index) % width == 0);
        if (!isAtLeftEdge){
          currentPosition -=1;
        }
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition +=1;
        }
        draw();
      }
  
    // move the piece right
    // stop the piece from wrapping around the screen
    function moveRight(){
      unDraw();
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === (width-1));
      if (!isAtRightEdge){
        currentPosition +=1;
      }

      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
          currentPosition -=1;
      }
      draw();
    }
  
    // rotate the pieces on up key down
    function rotate(){
      unDraw();
      currentRotation++;
      if(currentRotation === current.length){ // so it doesn't go higher that array
        currentRotation = 0;
      }
      current = piecesArray[random][currentRotation];
      draw();
    }
  
    // assign functions to keycodes(for movement)
    function control(e){
      if(e.keyCode === 37){
        moveLeft();
      } else if (e.keyCode === 38) {
        rotate();
      } else if(e.keyCode === 39){
        moveRight();
      } else if (e.keyCode === 40){
        moveDown();
      }
    }
    document.addEventListener('keyup',control);
  
    // show the next piece in minigrid
    const displaySquares = document.querySelectorAll('.minigrid div');
    const displayWidth = 4;
    let displayIndex = 0;

    // all pieces w/o rotations
    const upNextPiece = [
      [1,displayWidth+1,displayWidth*2+1,2],
      [0,displayWidth,displayWidth+1,displayWidth*2+1],
      [1,displayWidth,displayWidth+1,displayWidth+2],
      [0,1,displayWidth,displayWidth+1],
      [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1]
    ]
  
  //display nextup in minigrid
    function displayShape(){
      // removes previous next up from the minigrid
      displaySquares.forEach(square => {
        square.classList.remove('pieces');
        square.style.backgroundColor = '';
      })
      upNextPiece[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('pieces');
        displaySquares[displayIndex + index].style.backgroundColor = colors[nextRandom];
      })

    }

     // makes the button work
    StartButton.addEventListener('click', () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
      } else {
        draw();
        timerId = setInterval(moveDown, 1000);
        nextRandom = Math.floor(Math.random()* piecesArray.length);
        displayShape();
        
      }
    })

      // remove row when full, move other pieces down,
    //increase score
      function addScore(){
        for( let i = 0; i < 199; i += width){
          const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8,i+9]
          if (row.every(index => squares[index].classList.contains('taken'))){
            score += 10;
            ScoreDisplay.innerHTML = score;
            row.forEach ( index => {
              squares[index].classList.remove('taken');
              squares[index].classList.remove('pieces');
              squares[index].style.backgroundColor = '';
            })
            const squaresRemoved = squares.splice(i,width);
            squares = squaresRemoved.concat(squares);
            squares.forEach(cell => grid.appendChild(cell));
          }
        }
      }
  
      // end game if at top in initial position
      function endGame(){
        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
          // end the Game
            ScoreDisplay.innerHTML = ' End of Game';
            clearInterval(timerId);
        }
      }
    
})
