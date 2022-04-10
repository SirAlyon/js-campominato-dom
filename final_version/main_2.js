//Seleziono il contenitore delle celle e creo un ciclo per generare le celle singole
const cells = document.querySelector('.cells')
let cell
let cellsNumber 
let bombArray 
let userAttempt = 0

document.getElementById('start').addEventListener('click', function(){
    
    
    
    const difficulty = document.getElementById('difficulty').value
    cells.innerHTML = ''


    if (difficulty === '1'){
        cellsNumber = 100
        console.log(cellsNumber);
        cell = cellGenerator(cellsNumber, 'cell_w_1')
        bombArray = bombGenerator(1, 100)
    } else if (difficulty === '2'){
        cellsNumber = 81
        console.log(cellsNumber);
        cell = cellGenerator(cellsNumber, 'cell_w_2')
        bombArray = bombGenerator(1, 81)
    } else if (difficulty === '3'){
        cellsNumber = 49
        console.log(cellsNumber);
        cell = cellGenerator(cellsNumber, 'cell_w_3')
        bombArray = bombGenerator(1, 49)
    }
    
})

//Genero le celle con un numero incrementale come innerHTML, aggiungo addEventListener per active click
function cellGenerator(maxCells, cellWidth){
    for ( let i=0; i < maxCells; i++){
        const cell = document.createElement('div')
        cell.classList.add('cell', cellWidth)
        cells.append(cell)
        console.log(cell);
        cell.innerHTML = i + 1
        console.log(cell.innerHTML);
        cell.addEventListener('click', cellBombClick)
    }
}


//Genero 16 numeri casuali tra quelli compresi nelle cell, creo le bombe e rendo rosso al click
function bombGenerator(min, max) {
   const bombArray = [] 
   while (bombArray.length < 16){
    let randomNumber = getRandomNumber(min, max)
        if (!bombArray.includes(randomNumber)){
            bombArray.push(randomNumber)
        }
        console.log(randomNumber);
    }
    console.log(bombArray);
    return bombArray
   
}

//Funzione per cambio sfondo sulle cell
function cellBombClick() {
    let maxAttemps = cellsNumber - bombArray.length
    if (bombArray.includes(Number(this.innerHTML))){
        console.log(bombArray);
        console.log(this.innerHTML);
        this.classList.add('active_bomb')
        endGame()

    } else {
        console.log(bombArray);
        console.log(this.innerHTML);
        this.classList.add('active')
        userAttempt++
        console.log(userAttempt);
        if (userAttempt == maxAttemps){
            alert(`Hai vinto! Hai totalizzato ${userAttempt} punti!`)
        }
    }
}




function endGame() {
    const cells = document.querySelectorAll('.cell')
    let maxAttemps = cellsNumber - bombArray.length
    console.log(maxAttemps);
    for (let i=0; i < cells.length; i++){
        const cell = cells[i]
        console.log(cell.innerHTML);
        cell.removeEventListener('click', cellBombClick)
        if (bombArray.includes(Number(cell.innerHTML))){
            cell.classList.add('active_bomb')
            cell.innerHTML = '💣'
        }
    }
    
    alert(`Hai perso! Punti totalizzati: ${userAttempt} / ${maxAttemps}`)
    userAttempt = 0
}


//Genero numeri casuali tra min e max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); 
}