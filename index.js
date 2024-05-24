const mainMenuSection = document.querySelector(".main-menu");
const playButton = document.querySelector(".play-button");
const categorySection = document.querySelector(".category");
const backButton = document.querySelector(".back-button");
const playArea = document.querySelector(".play-area");
const categoryOption = document.querySelectorAll(".category-option");
const movies = categoryOption[0];
const playAreaSection = document.querySelector(".play-area");
const menuIcon = document.querySelector(".menu-icon");
const inGameMenu = document.querySelector(".in-game-menu");
const inGameMenuOption = document.querySelectorAll(".in-game-menu-option");
const gameOverMenu = document.querySelector(".game-over-menu");
const resume = document.querySelector(".continue");
const newGame = document.querySelectorAll(".new-game");
const newCategory = document.querySelectorAll(".new-category");
const letters = document.querySelectorAll(".letters");
const hintRow1= document.querySelector(".hint-row1");
const hintRow2= document.querySelector(".hint-row2");
const playAreaTitle = document.querySelector(".play-area-title");



//fetching JSON file and the finishing part of this is at the of JS
document.addEventListener("DOMContentLoaded", function () {
    // Fetch data
    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => {
           
            let data= json;
            
        





playButton.addEventListener("click", function (){
    mainMenuSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
})

backButton.addEventListener("click", function (){
    categorySection.classList.add("hidden");
    mainMenuSection.classList.remove("hidden");
})

for(let i=0; i<categoryOption.length; i++){
categoryOption[i].addEventListener("click", function(){
    playAreaSection.classList.remove("hidden");
    categorySection.classList.add("hidden");
    if(i==0){
        let magicWordBefore = magicWordCreator("Movies");
        let magicWord = magicWordBefore.toUpperCase();
        console.log(magicWord +"WE're OK")
        letterClick(magicWord);
    } else if (i==1){
        let magicWordBefore = magicWordCreator("TV Shows");
        let magicWord = magicWordBefore.toUpperCase();
        console.log(magicWord +"WE're OK")
        letterClick(magicWord);
    } else if (i==2){
        let magicWordBefore = magicWordCreator("Countries");
        let magicWord = magicWordBefore.toUpperCase();
        console.log(magicWord +"WE're OK")
        letterClick(magicWord);
    } else if (i==3){
        let magicWordBefore =magicWordCreator("Capital Cities");
        let magicWord = magicWordBefore.toUpperCase();
        console.log(magicWord +"WE're OK")
        letterClick(magicWord);
    } else if (i==4){
        let magicWordBefore = magicWordCreator("Animals");
        let magicWord = magicWordBefore.toUpperCase();
        console.log(magicWord +"WE're OK")
        letterClick(magicWord);
    } else if (i==5){
        // magicWordCreator("Sports");
        let magicWordBefore =magicWordCreator("Sports");
        let magicWord = magicWordBefore.toUpperCase();
        console.log(magicWord +"WE're OK")
        letterClick(magicWord);
    }

})
}

menuIcon.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
})

resume.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
})

//checks and sees if menu icons are clicked in game menu and gameover menu
for (let i=0; i <newCategory.length; i++){
newGame[i].addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
    for (let i =0; i < letters.length; i++){
        letters[i].classList.add("letters")
        }
})

newCategory[i].addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
    playAreaSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
    for (let i =0; i < letters.length; i++){
    letters[i].classList.add("letters") // adds clicked buttons back into being clickable
    }
})
}


//checking to see if letters are in the magicWord
function letterClick(magicWord){
    let health =8;
    for (let i=0; i < letters.length; i++){
        letters[i].addEventListener("click", function(){
            const clickedLetter = letters[i].innerHTML;
            console.log(magicWord +"We're ok here too")
            console.log(typeof magicWord);
            console.log(typeof clickedLetter);
            console.log(magicWord.includes(clickedLetter));
            let numOfSpaces= 0;
            let spaceLocation = 0;
            for(let j = 0; j <magicWord.length; j++){
                if (magicWord[j]===" "){
                    console.log(j + "<--space");
                    numOfSpaces++;
                    spaceLocation = j;
                    }
            }
            if(magicWord.includes(clickedLetter)){
                for(let j=0; j< magicWord.length; j++){
                    if (clickedLetter.includes(magicWord[j])){
                        console.log(j +"Hooray!!!");
                        
                        const newLetter = document.querySelectorAll(".hint-letter");
                        if (j > spaceLocation){
                            newLetter[j-1].innerHTML = clickedLetter;
                        }else{
                        
                        newLetter[j].innerHTML = clickedLetter;
                        console.log(newLetter.length + "Are we good?")
                        }
                    }
                }
                console.log(clickedLetter);
                console.log("YOU GOT IT")
                letters[i].classList.remove("letters");

            } else{ //when letter isn't there
                console.log(clickedLetter);
                console.log("WRONG");
                console.log(letters[i])
                letters[i].classList.remove("letters");
                health--;
                console.log(health);
                if (health === 0){
                    gameOverMenu.classList.remove("hidden");
                }
            }
        })
    }
}


//function for choosing random word from each category
function magicWordCreator(category){
    const heading = category.toUpperCase() //choosing heading for each category
    playAreaTitle.innerHTML = heading;
    while(hintRow1.lastElementChild){ //this resets the hints to blank before a new hint is given
        hintRow1.removeChild(hintRow1.lastElementChild) 
    }
    while(hintRow2.lastElementChild){ 
        hintRow2.removeChild(hintRow2.lastElementChild) 
    }
    let magicNum = Math.floor(Math.random()*data["categories"][category].length) //choosing randomNUm
   let magicWord = data["categories"][category][magicNum]["name"]; //choosing the data based on randomNum
   console.log(magicWord);
   if(!magicWord.includes(" ")){  //single line if there's no space
    for(let j = 0; j <magicWord.length; j++){
        const newLetter= document.createElement("p");
       newLetter.classList.add("hint-letter");
       hintRow1.appendChild(newLetter);
       console.log("EASY ROUTE")
    }
   } else{
   let numOfSpaces= 0;
   let spaceLocation = 0;
   for(let j = 0; j <magicWord.length; j++){
    if (magicWord[j]===" "){
        console.log(j + "<--space");
        numOfSpaces++;
        spaceLocation = j;
    }
    }
    for(let j = 0; j <magicWord.length; j++){ //if there's space, we're adding everything after last space to a new line
        if (magicWord[j]===" "){
        const newSpace = document.createElement("p");
        newSpace.classList.add("hint-space");
        hintRow1.appendChild(newSpace);
    } else  {
        if(j < spaceLocation){
            console.log(spaceLocation + "and" + j)
            console.log(magicWord[j]);
            const newLetter= document.createElement("p");
            newLetter.classList.add("hint-letter");
            hintRow1.appendChild(newLetter);
        } else{
            const newLetter= document.createElement("p");
            newLetter.classList.add("hint-letter");
            hintRow2.appendChild(newLetter);
        }
    }
    
 
   }
   console.log(numOfSpaces + "numOfSpaces")
    console.log(spaceLocation + "Space Location")
    }
    return magicWord;
}














//ending of JSON file being pulled in
})
.catch((error) => {
    console.error('Error fetching the JSON file:', error);
});



});
