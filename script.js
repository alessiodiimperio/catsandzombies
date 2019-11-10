//Variable and array initialisation
let score, arrayRows, arrayCols, mapArray, playerX, PlayerY, player, zombies, zombieCount, cats, catCount, userName;
arrayRows = 7;
arrayCols = 7;
zombieCount = 1;
catCount = 1;
cats = [];
zombies = [];
hiscore = [];
totalCats = catCount;
score = 0;
gameLoad();
console.log(mapArray);
console.log(cats);
console.log(zombies);

//Execute game start function.
function startGame(){
    getGamerTag();
    changeScreenToGame();
    loadBackground();
}
//Remove /input and /button and insert /navigation bttns
function changeScreenToGame(){
    clearTop();
    clearBottom();
    insertNav();
}
function insertNav(){
    bottomwindow = document.getElementById('bottom-container')
    let buttonN = document.createElement("BUTTON");
    let buttonE = document.createElement("BUTTON");
    let buttonS = document.createElement("BUTTON");
    let buttonW = document.createElement("BUTTON");
    buttonN.id = 'button-north';
    buttonN.setAttribute('onclick','move(\'north\');');
    bottomwindow.appendChild(buttonN);
    buttonS.id = 'button-south';
    buttonS.setAttribute('onclick','move(\'south\');');
    bottomwindow.appendChild(buttonS);
    buttonE.id = 'button-east';
    buttonE.setAttribute('onclick','move(\'east\');');
    bottomwindow.appendChild(buttonE);
    buttonW.id = 'button-west';
    buttonW.setAttribute('onclick','move(\'west\');');
    bottomwindow.appendChild(buttonW);  
}
//functions to clear the top or bottom divs
function clearTop(){
    let topwindow = document.getElementById('top-container');
    topwindow.innerHTML = "";
}
function clearBottom(){
    let bottomwindow = document.getElementById('bottom-container');
    bottomwindow.innerHTML = "";
}
//Load game parameters // create map array, spawn cats and zombies
function gameLoad(){
    //create map with variable grid
    mapArray = create2DArray(arrayRows,arrayCols);
    //Spawn player on grid center
    playerX = Math.floor(arrayCols / 2);
    playerY = Math.floor(arrayRows / 2);
    player = {
        x: playerX,
        y: playerY,
        username: userName
    }  
    //Spawn zombies on grid at random
    spawnZombies(zombieCount);
    //Spawn cats on grid at random
    spawnCats(catCount);
    // Show closest cat


}
//get gamertag from input and save in player object.
function getGamerTag(){
    // fetch gamertag username if empty insert 'JohnDoe'
   
 let gamerTag = document.getElementById('gamertag').value;
    if (gamerTag == ""){
        player.userName = "JohnDoe";
    } else {
        player.userName = gamerTag;
    }

}
/**************************************** 
 * För varje steg spelaren gör anropas följande funktioner
 */
function onMove(){
    moveZombie();
    moveCats();
    loadBackground();
    checkStatus(cats, zombies);
    
    console.log('zombie'+zombies[0].y+','+zombies[0].x);
    console.log('cat'+cats[0].y+','+cats[0].x);
    console.log('player'+player.y + ',' + player.x);
    
    
    
}
/**********************************************
 * Create 2D array with given array size
 */
function create2DArray(cols, rows){  
    mapArray = [];
    let arr = new Array(cols);
    let indexNr = 0;
// Loop to insert arrays within each parent array index with amount of rows.
     for (let i = 0; i < arr.length; i++){
         arr[i] = new Array(rows); 
// Loop to insert input within array index.
         for (let j = 0; j < arr[i].length; j++){
             arr[i][j] = createBackground();
             
         }
     }
     return arr;
}
/****************************************
 * Zombies and cats spawn
 */
// Spawn zombies in variabl quanities. If zombie spawned on same xy as player re-spawn until different.
function spawnZombies(qty){
    for (i = 0; i < qty; i++){
        let y = randomYaxis();
        let x = randomXaxis();
        let avatar = randomRange(1,16);
        if (y === player.y && x === player.x){
           
            y = randomYaxis();
            x = randomXaxis();
        } else {
        zombies.push({y,x,avatar});
        }   
    }
}
// Spawn cats in variable quanities. If zombie spawned on same xy as player re-spawn until different.
function spawnCats(qty){
    for (i = 0; i < qty; i++){
        let y = randomYaxis();
        let x = randomXaxis();
        let avatar = randomRange(1,16);
        if (y === player.y && x === player.x){
            y = randomYaxis();
            x = randomXaxis();
        } else {
        cats.push({y,x,avatar});   
        }
    }
}

/***************************************** 
* Function to move zombie towards player 
*/
function moveZombie(){
    for (i = 0; i < zombies.length; i++){
        //only move 70% of the time
        if (Math.floor(Math.random()*10 +1) < 7){
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
        if (Math.floor(Math.random() * 10 + 1) < 5){
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
/*****************  Functions for player movement
Move takes input from html bttns on N,E,S,W and increments array value 
for N/S [i]++ and E/W [j]++
*/
function move(direction){
    if (direction === 'north'){
        if (player.y < 1) {
          //  console.log("cannot move north!"); // What to do if out of bounds
        } else {
//Insert what to do on movement
        
        player.y--; // = positionY;
        //console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
    }
    else if (direction === 'south') {
        if (player.y > mapArray.length -2){
            console.log("cannot move south!");
        } else {
//Insert what to do on movement
        
        player.y++;// = positionY;
        //console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
}
    else if (direction === 'west'){
        if (player.x < 1){
            console.log("cannot move west!");
        } else {
//Insert what to do on movement
        
        player.x--;// = positionX;
        //console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
}
    else if (direction === 'east'){
        if (player.x > mapArray[0].length -2){
            console.log("cannot move east!");
        } else {
//Insert what to do on movement
        
        player.x++;// = positionX;
        //console.log('y: ' + player.y + ', x: ' + player.x);
        onMove();
    }
}
}
//random XY axis'
function randomYaxis(){
    //Create random X coordinates for spawning objects on y axis
    return Math.floor(Math.random() * mapArray.length);    
}
function randomXaxis(){
    //Create random coordinate for spawning objects on x axis
    return Math.floor(Math.random() * mapArray[0].length);    
}
//skapa random nr mellan min och max
function randomRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 //Find nearest cat
let catIndex = nearestCat(cats);
function nearestCat(arr){   
    let catY = player.y - arr[0].y;
    let catX = player.x - arr[0].x;
    let hyp = Math.abs(Math.sqrt(catX*catX + catY*catY));    
    index = 0;
    for (i=1; i < arr.length; i++){
        catY = player.y - arr[i].y;
        catX = player.x - arr[i].x;
        let newHyp = Math.abs(Math.sqrt(catY*catY+catX*catX));
        if(newHyp < hyp){
            hyp = newHyp;
            index = i;
        }
    }
return index;
}
//Check XY of cats and zombies and player. Do X if collision.
function checkStatus(catarr, zarr){
    for (i = 0; i < catarr.length ; i++){
        for (j = 0 ; j < zarr.length; j++){
        if (player.y === catarr[i].y && player.x === catarr[i].x && player.y === zarr[j].y && player.x === zarr[j].x)
        { 
            gameOverCats();
        } else if (player.y !== catarr[i].y && player.x !== catarr[i].x && player.y === zarr[j].y && player.x === zarr[j].x){
            gameOver(zarr[j].avatar);
   
        } else if (player.y === catarr[i].y && player.x === catarr[i].x) {
            catFound(catarr[i].avatar);
        }
    }
} 
function gameOverCats(){
    clearTop();
    let topContainer = document.getElementById('top-container');
    let zombiecat = document.createElement("img");
    zombiecat.src = '/images/zombies/zombiecat.png'
    zombiecat.id = "zombies"
    topContainer.appendChild(zombiecat);
    //continueBttn(); 
}
function gameOver(zombieIndex){
    clearTop();
    let topContainer = document.getElementById('top-container');
    let zombie = document.createElement("img");
    zombie.src = 'images/zombies/zombie'+zombieIndex+'.png';
    zombie.id = "zombies"
    topContainer.appendChild(zombie);
    //continueBttn(); 
}
function catFound(catIndex){
    clearTop();
    let topContainer = document.getElementById('top-container');
    let cat = document.createElement("img");
    cat.src = 'images/cats/cat'+catIndex+'.png';
    cat.id = "cats"
    topContainer.appendChild(cat);

}
}
//Create random numbers within range to represent what to show on screen.
function createBackground(){
    let tempArray = [];
    //#1 push Background image nr
    tempArray.push(randomRange(1,5));
    //#2 push trees image nr
    tempArray.push(randomRange(1,6));
    //#3 push cabin image nr else no cabin
    if (Math.floor(Math.random() * 10 + 1) < 2){
    tempArray.push(randomRange(1,3));
    } else {
        tempArray.push(0);
    }
    //#4 push spiderweb image nr else no spiderweb
    if(Math.floor(Math.random() * 10 + 1) < 4){
        tempArray.push(randomRange(1,2));
        } else {
            tempArray.push(0);
        }
    //#5 push bats image
    if(Math.floor(Math.random() * 10 + 1) < 4){
        tempArray.push(randomRange(1,2));
        } else {
            tempArray.push(0);
        }
            
    return tempArray;
}
//funktion för att ladda bakgrunden där spelaren är
function loadBackground(){
    for(y = 0; y < mapArray.length; y++){
        for(x = 0; x < mapArray[y].length; x++){
                clearTop();
                setBackgroundimg();
                setTreesimg();
                setCabinimg();
                setSpiderimg();
                setBatsimg();
            }
    }
}
//funktion som bestämmer bakgrundsbild med månen i olika ställen
function setBackgroundimg(){
    if (mapArray[player.y][player.x][0] == 1){
       createBG('bg1.png');
    } else if (mapArray[player.y][player.x][0] == 2){
        createBG('bg2.png');
    } else if (mapArray[player.y][player.x][0] == 3){
        createBG('bg3.png');
    } else {
        createBG('bg4.png');
    }
}
//funktion som bestämmer vilka träd som ska visas
function setTreesimg(){
    if (mapArray[player.y][player.x][1] == 1){
        createTrees('trees1.png');
    } else if (mapArray[player.y][player.x][1] == 2){
        createTrees('trees2.png');
    } else if (mapArray[player.y][player.x][1] == 3){
        createTrees('trees3.png');
    }else if (mapArray[player.y][player.x][1] == 4){
        createTrees('trees4.png');
    }else if (mapArray[player.y][player.x][1] == 5){
        createTrees('trees5.png');
    } else {
        createTrees('trees6.png');
        }
}
//Function to choose cabin image to show.
function setCabinimg(){
    if (mapArray[player.y][player.x][2] == 1){
        createCabin('cabin1.png');
    } else if (mapArray[player.y][player.x][2] == 2){
        createCabin('cabin2.png');
    } else if (mapArray[player.y][player.x][2] == 3) {
        createCabin('cabin3.png');
    }
}
// function to select spiderweb image
function setSpiderimg(){
    if (mapArray[player.y][player.x][3] == 1){
        createSpiderweb('spider1.png');
    } else if (mapArray[player.y][player.x][3] == 2){
        createSpiderweb('spider2.png');
    }
}
// function to select bats image.
function setBatsimg(){
    if (mapArray[player.y][player.x][4] == 1){
        createBats('bats1.png');
    } else if (mapArray[player.y][player.x][4] == 2){
        createBats('bats2.png');
    }
}
//skapar bild med angiven filnamn och append till DOM
function createBG(filename){
  let topContainer = document.getElementById('top-container');
  let background = document.createElement("img");
  background.src = 'images/background/'+filename;
  background.id = 'bg-images';
  topContainer.appendChild(background);    
}
function createTrees(filename){
    let topContainer = document.getElementById('top-container');
    let trees = document.createElement("img");
    trees.src = 'images/background/'+filename;
    trees.id = 'tree-images';
    topContainer.appendChild(trees);    
  } 
function createCabin(filename){
    let topContainer = document.getElementById('top-container');
    let cabin = document.createElement("img");
    cabin.src = 'images/background/'+filename;
    cabin.id = "cabin-images"
    topContainer.appendChild(cabin);    
  } 
  function createSpiderweb(filename){
    let topContainer = document.getElementById('top-container');
    let spiderweb = document.createElement("img");
    spiderweb.src = 'images/background/'+filename;
    spiderweb.id = "spider-images"
    topContainer.appendChild(spiderweb);    
  } 
  function createBats(filename){
    let topContainer = document.getElementById('top-container');
    let bats = document.createElement("img");
    bats.src = 'images/background/'+filename;
    bats.id = "bats-images"
    topContainer.appendChild(bats);    
  } 
  