document.addEventListener('DOMContentLoaded', () => {
  // all javascript code goes inside this
  const width = 10;
  //will make grid mean class grid and squares mean an array of all the divs of class grid
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));

  const ScoreDisplay = document.querySelector('#score');
  const StartButton = document.querySelector('#start-button');

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
  let current = piecesArray[0][0];
  
  //draw the first rotation of the current piece
  function draw(){
    current.forEach(index => {
      squares[currentPosition + index].classList.add('pieces');
    })
  }
  draw();
})
