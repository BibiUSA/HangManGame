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
const resume = inGameMenuOption[0];
const newGame = inGameMenuOption[1];
const newCategory = inGameMenuOption[2];
const letters = document.querySelectorAll(".letters p");
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
        magicWordCreator("Movies");
    } else if (i==1){
        magicWordCreator("TV Shows");
    } else if (i==2){
        magicWordCreator("Countries");
    } else if (i==3){
        magicWordCreator("Capital Cities");
    } else if (i==4){
        magicWordCreator("Animals");
    } else if (i==5){
        magicWordCreator("Sports");
    }

})
}

menuIcon.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
})

resume.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
})

newGame.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
})

newCategory.addEventListener("click", function(){
    inGameMenu.classList.toggle("hidden");
    playAreaSection.classList.add("hidden");
    categorySection.classList.remove("hidden");
})

for (let i=0; i < letters.length; i++){
    letters[i].addEventListener("click", function(){
        console.log(letters[i].innerHTML);
    })
}


//function for choosing random word from each category
function magicWordCreator(category){
    const heading = category.toUpperCase() //choosing heading for each category
    playAreaTitle.innerHTML = heading;
    while(hintRow1.lastElementChild){ //this resets the hints to blank before a new hint is given
        hintRow1.removeChild(hintRow1.lastElementChild)
    }
    let magicNum = Math.floor(Math.random()*data["categories"][category].length) //choosing randomNUm
   let magicWord = data["categories"][category][magicNum]["name"]; //choosing the data based on randomNum
   console.log(magicWord);
   if(!magicWord.includes(" ")){
    for(let j = 0; j <magicWord.length; j++){
        const newLetter= document.createElement("p");
       newLetter.classList.add("hint-letter");
       hintRow1.appendChild(newLetter);
    }
   } else{
   let numOfSpaces= 0;
   let spaceLocation = 0;
   for(let j = 0; j <magicWord.length; j++){
    if (magicWord[j]===" "){
        console.log(j + "<--space");
        numOfSpaces++;
        spaceLocation = j;
        const newSpace = document.createElement("div");
        newSpace.classList.add("hint-space");
        hintRow1.appendChild(newSpace);
    } else {
        console.log(magicWord[j]);
       const newLetter= document.createElement("p");
       newLetter.classList.add("hint-letter");
       hintRow1.appendChild(newLetter);
    }
    
   }
   console.log(numOfSpaces + "numOfSpaces")
    console.log(spaceLocation + "Space Location")
    }
}














//ending of JSON file being pulled in
})
.catch((error) => {
    console.error('Error fetching the JSON file:', error);
});



});
