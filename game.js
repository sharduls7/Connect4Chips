let player1 = prompt('Enter player 1 name (you will be blue)');
let player1Color = 'rgb(86, 151, 255)';
let player2 = prompt('Enter player 2 name (you will be red)');
let player2Color = 'rgb(237, 45, 73)';

let game_on = true;
let table = $('table tr');

//for debugging
function reportWin(rowNum, colNum){
    console.log('You won starting at this row,col');
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex,colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function returnColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

function checkBottom(colIndex){
    let colorReport = returnColor(5,colIndex);
    for(let row=5; row >= 0 ; row--){
        colorReport = returnColor(row, colIndex);
        if(colorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }
}

function colorMatchCheck(one,two,three,four){
    return (one === two && one === three && one === four && one !== 'rgb(128, 128, 128)' && one !== undefined)
}

// Check for horizontal wins
function horizontalWinCheck(){
    //later add check from bottom ie 5 to 0 rows
    for(let row=0; row<6 ; row++){
        for(let col=0; col < 4 ; col ++){
            if(colorMatchCheck(returnColor(row, col), returnColor(row, col+1), returnColor(row, col+2), returnColor(row, col+3))){
                console.log('Horizontal Win!');
                reportWin(row,col);
                return true;
            } else{
                continue;
            }
        }
    }
}

// Check for vertical wins
function verticalWinCheck(){
    for(let col=0; col < 7 ; col ++){
        for(let row=0; row < 3; row ++ ){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                console.log('Vertical Win!');
                reportWin(row,col);
                return true;
            } else{
                continue;
            }
        }
    }
}

//check for diagonal wins
function diagonalWinCheck(){
    for(let col=0; col<5; col++){
        for(let row=0; row<7; row++){
            if(colorMatchCheck(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2), returnColor(row+3,col+3))){
                console.log('Diagonal Win!');
                reportWin(row,col);
                return true;
            }else if(colorMatchCheck(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2), returnColor(row-3,col+3))){
                console.log('Diagonal Win!');
                reportWin(row,col);
                return true;
            }else{
                continue;
            }
        }
    }
}

let currentPlayer = 1;
let currentName = player1;
let currentColor = player1Color;

$('h3').text(player1+" it's your turn, pick column to drop in");
$('.board button').on('click', function(){
    let col = $(this).closest('td').index();
    let bottomAvail = checkBottom(col);
    changeColor(bottomAvail, col, currentColor);

    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()){
        $('h1').text(currentName+" you have won");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
    }else{
        currentPlayer = currentPlayer * -1;
        if(currentPlayer === 1){
            currentName = player1;
            currentColor = player1Color;
            $('h3').text(currentName+" it is your turn");
        }else{
            currentName = player2;
            currentColor = player2Color;
            $('h3').text(currentName+" it is your turn")
        }
    }
});