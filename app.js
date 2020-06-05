document.addEventListener('DOMContentLoaded', () => {
  // all javascript code goes inside this
  const width = 10;
  //will make grid mean class grid and squares mean an array of all the divs of class grid
  const grid = document.querySelector('.grid');
  let squares = Array.from(document.querySelectorAll('.grid div'));

  console.log(squares);



})
