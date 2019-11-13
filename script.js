//Variable and array initialisation
let score, arrayRows, arrayCols, mapArray, playerX, PlayerY, player, zombies, zombieCount, cats, catCount, userName, catIndex;
arrayRows = 7;
arrayCols = 7;
zombieCount = 2;
catCount = 2;
cats = [];
zombies = [];
hiscore = [];
savedCats = 0;
score = 0;
lvl=1;
gameObjLoad();
console.log(mapArray);
console.log(cats);
console.log(zombies);

//Execute game start function.
function gameRestart(){
lvl = 1;
arrayRows = 7;
arrayCols = 7;
zombieCount = 2;
catCount = 2;
cats = [];
zombies = [];
hiscore = [];
totalCats = catCount;
savedCats = 0;
score = 0;
gameObjLoad();
changeScreenToGame();
loadBackground();
showLVL();
catIndex = nearestCat(cats); 
checkRadar(catIndex);
}
//Startgame first run
function startGame(){
    getGamerTag();
    changeScreenToGame();
    loadBackground();
    showLVL();
    checkStatus(cats, zombies);
    warning();
    catIndex = nearestCat(cats); 
    checkRadar(catIndex);   
    ambience('play');
   
} 
//Remove /input and /button and insert /navigation bttns
function changeScreenToGame(){
    clearTop();
    clearBottom();
    insertNav();
}
//Lägga in knappar till navigering
function insertNav(){
    bottomwindow = document.getElementById('bottom-container')
    let bgimage = document.createElement('img');
    let buttonN = document.createElement("BUTTON");
    let buttonE = document.createElement("BUTTON");
    let buttonS = document.createElement("BUTTON");
    let buttonW = document.createElement("BUTTON");
    bgimage.id = 'controls';
    bgimage.src = 'images/controls.png';
    bottomwindow.appendChild(bgimage);
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
// Insert hud for score, zombiecount, catcount etc.
function insertHUD(){
    let topContainer = document.getElementById('top-container');
    let playerscore = document.createElement("p");
    playerscore.innerText = 'Score: ' + score;
    playerscore.id = "gamescore";
    topContainer.appendChild(playerscore);
    let zombietotal = document.createElement("p");
    zombietotal.innerText = "Zombies: "+ zombieCount;
    zombietotal.id = "zombie-count";
    topContainer.appendChild(zombietotal);
    let cattotal = document.createElement("p");
    cattotal.innerText = "Cats: "+savedCats+"/"+catCount;
    cattotal.id = "cat-count";
    topContainer.appendChild(cattotal);
    let radar = document.createElement("div");
    radar.id = "radar";
    topContainer.appendChild(radar);
    createDivs(arrayRows*arrayCols);
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
function gameObjLoad(){
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
    spawnCats(catCount, cats);
    // Show closest cat
    console.log(cats);

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
    //moveCats(); // Om man vill ha katterna ska röra på sig.
    loadBackground();
    checkStatus(cats, zombies);
    warning();
    catIndex = nearestCat(cats); 
    checkRadar(catIndex);
    console.log(player.y+','+player.x);
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
        if (Math.floor(Math.random()*10 +1) < 6){
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
          console.log("cannot move north!"); // What to do if out of bounds
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
/******
 * use nearest cat function to identify cat nearest to player. and display heading on screen
 */
function checkRadar(c){
if        (cats[c].y < player.y && cats[c].x === player.x){
        //console.log('closest cat is straight north of you!');    
            let topContainer = document.getElementById('top-container');
            let radar = document.createElement('img');
            radar.src = 'images/catradar/north.png'
            radar.className = 'cat-radar';
            topContainer.appendChild(radar);
} else if (cats[c].y < player.y && cats[c].x > player.x){
        //console.log('closest cat is northeast of you!')
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/northeast.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
} else if (cats[c].y === player.y && cats[c].x > player.x){
        //console.log('closest cat is straight east of you!')
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/east.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
} else if (cats[c].y > player.y && cats[c].x > player.x){
        //console.log('closest cat is southeast of you!')
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/southeast.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
} else if (cats[c].y > player.y && cats[c].x === player.x){
        //console.log('closest cat is straight south of you!');
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/south.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
} else if (cats[c].y > player.y && cats[c].x < player.x){
        //console.log('closest cat is southwest of you!')
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/southwest.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
} else if (cats[c].y === player.y && cats[c].x < player.x){
        //console.log('closest cat is straight west of you!');
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/west.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
} else {
        //console.log('closest cat is northwest of you!')
        let topContainer = document.getElementById('top-container');
        let radar = document.createElement('img');
        radar.src = 'images/catradar/northwest.png'
        radar.className = 'cat-radar';
        topContainer.appendChild(radar);
}
}
//warning display onscreen if zombie is in adjascent index
function warning(){
    let randomZombie;
    for (z = 0; z < zombies.length; z++){
        randomZombie = randomRange(1,3);
        //console.log(randomZombie);
        if(zombies[z].x === player.x + 1 && zombies[z].y === player.y){
            let topContainer = document.getElementById('top-container');
            let danger = document.createElement("img");
            danger.src = 'images/danger/dangereast'+randomZombie+'.png';
            danger.className = "danger"
            topContainer.appendChild(danger);  
            brains();  
        } else if (zombies[z].x === player.x - 1 && zombies[z].y === player.y){
            let topContainer = document.getElementById('top-container');
            let danger = document.createElement("img");
            danger.src = 'images/danger/dangerwest'+randomZombie+'.png';
            danger.className = "danger"
            topContainer.appendChild(danger);    
            brains();
        } else if (zombies[z].y === player.y - 1 && zombies[z].x === player.x){
            let topContainer = document.getElementById('top-container');
            let danger = document.createElement("img");
            danger.src = 'images/danger/dangernorth'+randomZombie+'.png';
            danger.className = "danger"
            topContainer.appendChild(danger);  
            brains();  
        } else if (zombies[z].y === player.y + 1 && zombies[z].x === player.x){
            let topContainer = document.getElementById('top-container');
            let danger = document.createElement("img");
            danger.src = 'images/danger/dangersouth'+randomZombie+'.png';
            danger.className = "danger"
            topContainer.appendChild(danger); 
            brains();   
        } else {
            
        }
    }
}
//Check XY of cats and zombies and player. Do X if collision.
function checkStatus(arr, zarr){
    let zombiecheck = false;
    let catcheck = false;
    let zindex, cindex
    //console.log('checkstatus started');
    
    for (let c = 0; c < arr.length; c++){
        if (player.y === arr[c].y && player.x === arr[c].x){
            catcheck = true;
            cindex = c;
            console.log('looping cats array'+c);
        }
    }
    //console.log(catcheck,cindex);
    
    for (let z = 0; z < zarr.length; z++){
        if(player.y === zarr[z].y && player.x === zarr[z].x){
            zombiecheck = true;
            zindex = z;
           // console.log('looping zombie array');         
        }
    }
    //console.log(zombiecheck, zindex);
    
    if (catcheck == true && zombiecheck == true){
        console.log('gameovercats');
        gameOverCats();
    } else if (zombiecheck == true && catcheck == false){
        console.log('gameover');
        gameOver(zarr[zindex].avatar);
    } else if (zombiecheck == false && catcheck == true){
        console.log('cat found');   
        catFound(cindex, cats[cindex].avatar);
    }
}
// Gameover with specific image if zombie, cat and player are on same indexs
function gameOverCats(){
    clearTop();
    clearBottom();
    let topContainer = document.getElementById('top-container');
    let zombiecat = document.createElement("img");
    zombiecat.src = '/images/zombies/zombiecat.png'
    zombiecat.id = "zombies"
    topContainer.appendChild(zombiecat);
    let bottomContainer = document.getElementById('bottom-container');
    let button = document.createElement("button");
    button.id = 'nextlvl';
    button.innerText = "Restart"
    button.setAttribute('onclick','gameRestart();');
    bottomContainer.appendChild(button);
    ulose();

}
//Standard game over function with inser of restart bttn.
function gameOver(zombieIndex){
    clearTop();
    clearBottom();
    let topContainer = document.getElementById('top-container');
    let zombie = document.createElement("img");
    zombie.src = 'images/zombies/zombie'+zombieIndex+'.png';
    zombie.id = "zombies"
    topContainer.appendChild(zombie);
    let bottomContainer = document.getElementById('bottom-container');
    let button = document.createElement("button");
    button.id = 'nextlvl';
    button.innerText = "Restart"
    button.setAttribute('onclick','gameRestart();');
    bottomContainer.appendChild(button);
    ulose();
    
}
//Cat found function, display cat, increment points, and check if all cats are saved. if so level up.
function catFound(catIndex, avatarIndex){  
    clearTop();
    let topContainer = document.getElementById('top-container');
    let cat = document.createElement("img");
    cat.src = 'images/cats/cat'+avatarIndex+'.png';
    cat.id = "cats"
    topContainer.appendChild(cat);
    score += 100;   
    savedCats++;
    let title = document.createElement("p");
    title.innerText = "CAT SAVED";
    title.id = "cat-saved";
    topContainer.appendChild(title);
    let points = document.createElement("p");
    points.innerText = "100 POINTS";
    points.id = "points";
    topContainer.appendChild(points); 
    checkLVL(); 
    cats.splice(catIndex, 1);
    meow();
    
}
// check if all cats are found if so lvl up!
function checkLVL(){
    if (savedCats >= catCount){
        clearBottom();
        let bottomContainer = document.getElementById('bottom-container');
        let button = document.createElement("BUTTON");
        button.id = "nextlvl";
        button.innerText = "Next Level";
        button.setAttribute('onclick',"lvlUP();");
        bottomContainer.appendChild(button);
    }
}
// Move to next level, more space, more zombies more cats
function lvlUP(){
    lvl++
    arrayRows++
    arrayCols++
    zombieCount++;
    cats = [];
    zombies = [];
    catCount++
    savedCats = 0;
    gameObjLoad();
    console.log('cats ',cats);
    console.log('zombies: ',zombies);
    changeScreenToGame();
    insertHUD();
    loadBackground();    
    showLVL();
    catIndex = nearestCat(cats); 
    checkRadar(catIndex);
    
}
/*
//fade in and out
function fadeOut(id){
let fadeObject = document.getElementById(id);
let faded = setInterval(fade,10);
function fade(){
    if(fadeObject.style.opactiy == 0){
        clearInterval(faded);
    } else {
        fadeObject.style.opacity - 0.01;
    }
}

}
function wait(time){

}
*/
//show current level
function showLVL(){
    let topContainer = document.getElementById('top-container');
    let level = document.createElement("p");
    level.innerText = 'Level: '+lvl;
    level.id = "level"
    topContainer.appendChild(level);
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
    insertHUD();
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
//skapar objekter med angiven filnamn och append till DOM
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
  //  Create divs and alter the player div to different css style
  function createDivs(qty){
    let radarDiv = document.getElementById("radar");
    radarDiv.innerHTML = "";
    radarDiv.style.gridTemplateColumns = 'repeat('+arrayCols+', 1fr)';
    radarDiv.style.gridTemplateRows = 'repeat('+arrayRows+', 1fr)';
    //calc which div is the player
    let userDiv = (player.y * arrayCols) + player.x;
    
    //insert divs with resp class    
    for (i = 0; i < qty; i++){  
        if (i === userDiv){
            let radarInnerDiv = document.createElement('div');
            radarInnerDiv.className = 'radar-player';
            radarDiv.appendChild(radarInnerDiv);
        } else {
        let radarInnerDiv = document.createElement("div");
        radarInnerDiv.className = "radar-divs";
        radarDiv.appendChild(radarInnerDiv);
    }
  }
        
}
function ambience(toggle){
    let ambience = new Audio();
    ambience.src = "audio/ambience.mp3"
    if (toggle === 'play'){
    ambience.loop = true;
    ambience.volume = 0.07;
    ambience.play();
} else {
    ambience.pause();
}
}
function ulose(){
    let ulose = new Audio();
    ulose.src = "audio/ulose.mp3";
    ulose.play();
}
function meow(){
    let mjau = new Audio();
    mjau.src = "audio/meow.mp3"
    mjau.play();
}
function brains(){
    let brains = new Audio();
    brains.src = "audio/brains.mp3"
    brains.play();
    brains.volume = 0.5
}
for (let t = 0; t < cats.length; t++){
    console.log(cats[t]);
}
