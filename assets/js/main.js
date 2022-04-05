const cells = document.querySelector('.cells')

document.getElementById('submit').addEventListener('click', function(){

    //Generare i numeri in base alla difficoltà scelta dall'utente
    const difficulty = document.getElementById('difficulty').value
    console.log(difficulty);

    //Azzero il contenuto di cells così mi cancella la griglia esistente prima di generarne un'altra
    const clear = document.getElementById('clear').innerHTML = ""; 
    
    const body = document.getElementById('site_main')
    body.classList.remove('body-c-height')
    //Verifico in base alla difficoltà scelta dall'utente quanti numeri generare
    if (difficulty === 'Easy'){
        generateCells(100, 'cell','cell-width-10', 'div')
        allCells('.cell')
        cellsContent('.cell', 1, 100)
    } else if (difficulty === 'Medium'){
        generateCells(81,'cell','cell-width-9', 'div')
        allCells('.cell')
        cellsContent('.cell', 1, 81)
    } else if (difficulty === 'Hard'){
        generateCells(49,'cell','cell-width-7', 'div')
        allCells('.cell')
        cellsContent('.cell', 1, 49)
    }


    cellsClick('.cell', 'active', 'bomb')

})


//Inserisco i numeri generati nelle celle
function cellsContent(select, min, max) {
    const cellsContent = allCells(select)
    for (let i=0; i < cellsContent.length; i++){
        const gridNumber = generateNumbers(min, max)
        cellsContent[i] = document.createElement('span')
        cellsContent[i].append(gridNumber[i])
    }
}

//Seleziono tutte le celle generate
function allCells(select) {
    const allCells = document.querySelectorAll(select)
    return allCells
}

//Funzione per generare la griglia
function generateCells(cellsWidth, className, className2, element) { //ClassName2 per dare la width corretta in base ai numeri generati
    const cellsElement = document.querySelector('.cells')
    for (let i=0; i < cellsWidth; i++){
        const cellItem = document.createElement(element)
        cellItem.classList.add(className, className2)
        cellsElement.append(cellItem)
    }
}

//Funzione per generare un numero compreso tra min e max e inserire ogni valore in un array
function generateNumbers(min, max) {
    const gridNumbers = []
    for (let i=1; i <= max; i++ ){
        const randomNumber = i
        gridNumbers.push(randomNumber)
    }
    return gridNumbers
}

/* //Funzione per rendere active al click l'elemento della griglia selezionato
 function cellsClick(select, className) {
    const cells = allCells(select)
    for (let i=0; i < cells.length; i++){
        const cell = cells[i]
        cell.addEventListener('click', function(){
            cell.classList.toggle(className)
        })
    }
} */

//Funzione per generare numeri casuali tra min e max
function getRandomNumbers(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}
  
//Devo inserire i numeri delle bombe generati in delle cell casuali, i numeri delle bombe non si possno ripetere
function generateBomb (min, max){
    let bombNumbersArray = []
    for (let i=1; i <= 16; i++){
        let bombNumber = getRandomNumbers(min, max)
        if (!bombNumbersArray.includes(bombNumber)){
            bombNumbersArray.push(bombNumber)
        } else {
            i = i -1
        }
        
        console.log(bombNumber);
    }
    console.log(bombNumbersArray);
    return bombNumbersArray
}



//Se un valore dell'array bombNumbersArray è cliccato sulla casella corrispondente allora scoppia la bomba
function cellsClick(select, className, classNameBomb) {
    const cells = allCells(select)
    let bombNumbersArray = generateBomb (1, 100)
    let userpoints = []
    console.log(bombNumbersArray);
    
    for (let i=0; i < cells.length; i++){
        const cell = cells[i]
        //console.log(cell.innerHTML);
        let cellNumber = Number(cell.innerHTML)
        //console.log(cellNumber);
           cell.addEventListener('click', function(){
            if (bombNumbersArray.includes(cellNumber)){
                cell.classList.add(classNameBomb)
                alert(`Hai perso! Hai fatto ${userpoints.length} punti!`)
                location.reload(); 
            } else {
                cell.classList.add(className)
                userpoints.push(cellNumber)
                console.log(userpoints);
            }
        })   
    }
}



/* console.log(cellsClick('.cell', 'active', 'bomb')); */

//Funzione per terminare la partita in caso di click sulla bomba
