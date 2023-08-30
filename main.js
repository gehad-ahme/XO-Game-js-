var isInGame=false;  //default the game is false(is flag value)
var playXscore=0;   //x is 2
var playOscore=0;   //o is 1
var currentPlayer=1;

var imgs=[ //index of imags by src 
    "./assets/abc_letter.png",//0
    "./assets/letter_o.png", //1
    "./assets/letter_x.png" //2
]

var boardCode=[0,0,0,0,0,0,0,0,0];

//catch html elements
var board=document.getElementById("board");
var statusP=document.getElementById("status");
console.log(board.children);
var playerX=document.getElementById("playerXscore");
var playerO=document.getElementById("playerOscore");

function playerTurn(){
    return "it is "+(currentPlayer==1? "O":"X")+" turn";
}

function playerWinner(){
    return "player "+(currentPlayer==1? "O":"X")+" has won.";
}

var statusValue=[ 
    "waiting to start new game",
    playerTurn,
    playerWinner,
    "Game ended in a draw",
];

function playerMove(e){
    console.log("clicked",e.target);  //print indext img
    var cellindex=e.target.getAttribute("data-cell-index");// element foe index img (cilked)
    if(isInGame){
        if(boardCode[cellindex]==0){
            boardCode[cellindex]=currentPlayer;
            e.target.src=imgs[currentPlayer];
            //check winner
            if(isAWinner()){
                isInGame=false;
                statusP.innerText=statusValue[2]();
                if(currentPlayer==1){
                    playerO.innerText=++playOscore;
                }
            else{
                playerX.innerText=++playXscore;
        
            }}
            else if(isADraw()){
                isInGame=false;
                statusP.innerText=statusValue[3];
            }
            
            else{
                console.log(boardCode);
                currentPlayer=currentPlayer==1 ? 2:1;
            statusP.innerText=statusValue[1]();
            
        
            }

        }    
    }
            //if game is end
            else{
                statusP.innerText=statusValue[0];
            }
   }
function newGame(){
    isInGame=true;
    statusP.innerText=statusValue[1]();
    boardCode=[0,0,0,0,0,0,0,0,0];
    for(var i=0;i<board.children.length;i++){
        board.children[i].children[0].src=imgs[0];
    }
}

for(let i=0;i<board.children.length;i++){
    board.children[i].addEventListener("click",playerMove);
}

var winCondations=[//احتمالات الفوز
    //row
    [0,1,2],
    [3,4,5],
    [6,7,8],
    //column
    [0,3,6],
    [1,4,7],
    [2,5,8],
    //cross axies
    [0,4,8],
    [2,4,6],
];

function isAWinner(){  // boardcode contain data board
    for(var i=0;i<winCondations.length;i++){
        var currentCondition=winCondations[i];
        var index1=currentCondition[0];
        var index2=currentCondition[1];
        var index3=currentCondition[2];
        if(boardCode[index1]===boardCode[index2]&&boardCode[index2]===boardCode[index3]&&boardCode[index2]!=0){
            return true;
        }
    }
    return false;

}
function isADraw(){  //في حاله التعادل
    for(var i=0;i<boardCode.length;i++){
        if(boardCode[i]==0){
            return false;
        }
    }return true;
}

