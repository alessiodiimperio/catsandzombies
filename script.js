let positionX, positionY;
let viewObject = {
    backgroundIMG: 'background.png'
}
 // Create array with input columns and rows.
let mapArray = create2DArray(7,7);
 function create2DArray(cols, rows){  
    let arr = new Array(cols);
// Loop to insert arrays within each parent array index with amount of rows.
     for (let i = 0; i <  arr.length; i++){
         arr[i] = new Array(rows); 
// Loop to insert input within array index.
         for (let j = 0; j < arr[i].length; j++){
             arr[i][j] = j; // Redigera "j" till önskad innehåll i cellen evt objekt.
         }
     }
     return arr;
}

positionX = 3;
positionY = 3;
// Move takes input from html bttns on N,E,S,W and increments array value 
// for N/S [i]++ and E/W [j]++
function move(direction){
    if (direction === 'north'){
        if (positionY < 1) {
            console.log("cannot move north!"); // What to do if out of bounds
        } else {
//Insert what to do on movement
        positionY--;  
        console.log(positionY + ',' + positionX);
    }
    }
    else if (direction === 'south') {
        if (positionY > mapArray.length -1){
            console.log("cannot move south!");
        } else {
//Insert what to do on movement
        positionY++;
        console.log(positionY + ',' + positionX);
    }
}
    else if (direction === 'west'){
        if (positionX < 1){
            console.log("cannot move west!");
        } else {
//Insert what to do on movement
        positionX--;
        console.log(positionY + ',' + positionX);
    }
}
    else {
        if (positionX > mapArray[positionY].length -1){
            console.log("cannot move east!");
        } else {
//Insert what to do on movement
        positionX++;
        console.log(positionY + ',' + positionX);
    }
}
}

function randomYaxis(){
    //Create random X coordinates for spawning objects
    let positionY = Math.floor(Math.random() * mapArray.length);    
}
function randomXaxis(){
    //Create random coordinate for spawning objects
    let positionX = Math.floor(Math.random() * mapArray[0].length);    
}


/*
let zombie1 = {
    positionX: ,
    positionY: ,
}

let zombie1 = {
    positionX: ,
    positionY: ,
}

let kitten1 = {
    positionX: 
    positionY: 
}
let kitten2 = {
    positionX: 
    positionY: 
}
let kitten3 = {
    positionX: 
    positionY: 
}

let hero = {
    positionX: ,
    positionY: ,
}

let map = [
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0],
];
*/
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  function setRandomColor() {
    $("#gameScreen").css("background-color", getRandomColor());
  }