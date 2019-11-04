/****************** Create 2D array with given array size
 * 
 */
let arrayRows = 10;
let arrayCols = 10;
let mapArray = create2DArray(arrayRows,arrayCols);
function create2DArray(cols, rows){  
    let arr = new Array(cols);
// Loop to insert arrays within each parent array index with amount of rows.
     for (let i = 0; i < arr.length; i++){
         arr[i] = new Array(rows); 
// Loop to insert input within array index.
         for (let j = 0; j < arr[i].length; j++){
             arr[i][j] = j; // Redigera "j" till önskad innehåll i cellen evt objekt.
         }
     }
     return arr;
}
//Declare player position in middle of mapArray
let playerX = Math.floor(arrayCols / 2);
let playerY = Math.floor(arrayRows / 2);
let player = {
    x: playerX,
    y: playerY
}
console.log(player.y +','+ player.x);

/****************************************
 * Zombies and cats arrays
 */
function spawnZombies(qty){
    for (i = 0; i < qty; i++){
        let y = randomYaxis();
        let x = randomYaxis();
        if (y === player.y && x === player.x){
           
            y = randomYaxis();
            x = randomXaxis();
        } else {
        zombies.push({y,x});
        }   
    }
}
function spawnCats(qty){
    for (i = 0; i < qty; i++){
        let y = randomYaxis();
        let x = randomYaxis();
        if (y === player.y && x === player.x){
            y = randomYaxis();
            x = randomXaxis();
        } else {
        cats.push({y,x});
        }   
    }
}

let zombies = [{y:10,x:0}]; 
spawnZombies(10);
console.log(zombies);

let cats = [{y:1, x:1}]; 

/***************************************** 
* Function to move zombie towards player 
*/
function moveZombie(){
    for (i = 0; i < zombies.length; i++){
        //only move 70% of the time
        if (Math.floor(Math.random()*10 +1) <= 7){
           //50% of the time move Y axis else X axis if on same axis as player
            if (Math.floor(Math.random() * 10 + 1) >= 5 ){
                //Förflyttar spelaren på Y axel förutom om spelaren är på samma axel isf X axel
                if (zombies[i].y === player.y){
                    if (zombies[i].x > player.x){
                        zombies[i].x--;
                        }
                        else {
                       zombies[i].x++
                        }
                } else if (zombies[i].y > player.y){
                        zombies[i].y--;
                }
            else {
            zombies[i].y++
            }
        } else {
            //Förflyttar zombie på X axeln förutom om spelaren är på samma axel isf Y axel
            if (zombies[i].x === player.x){
                if (zombies[i].y > player.y){
                    zombies[i].y--;
                } else {
                    zombies[i].y++;
                }
            } else if (zombies[i].x > player.x){
            zombies[i].x--;
            } else {
           zombies[i].x++
       }
    } 
} else {
    // Zombies gör inget. Else är till för log vid felsökning. 
    }
}
}
/****************************************
 * Move kittens
 */
function moveCats(){
    for (let i = 0; i < cats.length; i++){
        //Move cats 50% of the time
        if (Math.floor(Math.random() * 10 + 1) < 8){
            //move cat 25% of the time in different directions if at border move away from border.
            let catRandomDirection = Math.floor(Math.random() * 10 + 1)
            switch (true){
                //Try north
                case catRandomDirection < 2.5:
                    cats[i].y < 1 ? cats[i].y++ : cats[i].y--;
                    break;
                //Try south
                case catRandomDirection >= 2.5 && catRandomDirection < 5:
                    cats[i].y > mapArray.length -2 ? cats[i].y-- : cats[i].y++;
                    break;
                //Try west
                case catRandomDirection >= 5 && catRandomDirection < 7.5:
                    cats[i].x < 1 ? cats[i].x++ : cats[i].x--;
                    break;
                //Try east
                default: //catRandomDirection >= 7.5 && catRandomDirection <= 10:
                    cats[i].x > mapArray[0].length -2 ? cats[i].x-- : cats[i].x++;
                }
        } else {
        //Om katterna ska göra något annat ist för att röra sig lägg till här.
       } 
    }
}

/**************************************** 
 * För varje steg spelaren gör anropas följande funktioner
 */
function onMove(){
    //moveZombie();
    moveCats();
}
/*****************  Functions for movement
Move takes input from html bttns on N,E,S,W and increments array value 
for N/S [i]++ and E/W [j]++
*/
let positionX = player.x;
let positionY = player.y;
function move(direction){
    if (direction === 'north'){
        if (player.y < 1) {
            console.log("cannot move north!"); // What to do if out of bounds
        } else {
//Insert what to do on movement
        //positionY--;
        player.y--; // = positionY;
        console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
    }
    else if (direction === 'south') {
        if (player.y > mapArray.length -2){
            console.log("cannot move south!");
        } else {
//Insert what to do on movement
        //positionY++;
        player.y++;// = positionY;
        console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
}
    else if (direction === 'west'){
        if (player.x < 1){
            console.log("cannot move west!");
        } else {
//Insert what to do on movement
        //positionX--;
        player.x--;// = positionX;
        console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
}
    else {
        if (player.x > mapArray[0].length -2){
            console.log("cannot move east!");
        } else {
//Insert what to do on movement
        //positionX++;
        player.x++;// = positionX;
        console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
        
    }
}
}
/*****************  functions to create a random Y and X axis 
*/
function randomYaxis(){
    //Create random X coordinates for spawning objects on y axis
    return Math.floor(Math.random() * mapArray.length);    
}
function randomXaxis(){
    //Create random coordinate for spawning objects on x axis
    return Math.floor(Math.random() * mapArray[0].length);    
}
