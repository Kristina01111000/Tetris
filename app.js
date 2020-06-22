document.addEventListener('DOMContentLoaded', () => {
  // all javascript code goes inside this
  const width = 10;
  //will make grid mean class grid and squares mean an array of all the divs of class grid
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));
  let nextRandom = 0;
  let timerId;
  
  const ScoreDisplay = document.querySelector('#score');
  const StartButton = document.querySelector('#startButton');

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
    })
  }
    
  // removes the piece from the board so it doesn't stay 
  // onscreen when the next position is drawn
  function unDraw(){
      current.forEach(index => {
        squares[currentPosition + index].classList.remove('pieces');
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
        square.classList.remove('pieces')
      })
      upNextPiece[nextRandom].forEach( index => {
        displaySquares[displayIndex + index].classList.add('pieces');
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

    
})
