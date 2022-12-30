

var blockSize=25;
var rows=20;
var cols=20;
var board;
var context;

// snake head

var snakeX=blockSize*5;
var snakeY=blockSize*5;


 var valocityX=0;
 var valocityY=0;

 var snakeBody=[];

// food of snake
var foodX;
var foodY;

var gameOver=false;

window.onload= function(){
    board = document.getElementById("board");
    board.height= rows*blockSize;
    board.width=cols*blockSize;
    context=board.getContext("2d"); // drwing for the board
    
    placeFood();
    document.addEventListener("keyup",changeDirection);
    setInterval(update,3000/10);
}

function update(){

    if(gameOver)
    {
        return;
    }
    context.fillStyle="black";
    context.fillRect(0,0,board.width,board.height);
    
    context.fillStyle="red";
    context.fillRect(foodX,foodY,blockSize,blockSize);
    
    if(snakeX == foodX && snakeY ==  foodY)
    {
       snakeBody.push([foodX,foodY]); 
       placeFood();
    }

    for(let i=snakeBody.length-1 ; i>0; i--)
    {
        snakeBody[i]=snakeBody[i-1];
    }

    if(snakeBody.length){
        snakeBody[0] = [snakeX,snakeY];
    }

    context.fillStyle="lime";
    snakeX += valocityX * blockSize;
    snakeY += valocityY * blockSize;
    context.fillRect(snakeX,snakeY,blockSize,blockSize);
    
    for(let i=0; i<snakeBody.length; i++)
    {
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize,blockSize);
    }

    // game over conditions

    if(snakeX<0 || snakeX>cols*blockSize || snakeY<0 || snakeY>rows*blockSize)
    {
        gameOver=true;
        alert("GaMe OvEr....");
    }

    for(let i=0;i<snakeBody.length;i++)
    {
        if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1])
        {
            gameOver = true;
            alert("GaMe OvEr....");
            
        }
    }

}

function changeDirection(e){
   if (e.code == "ArrowUp" && valocityY !=1){
     valocityX=0;
     valocityY=-1;
   }

   else if (e.code == "ArrowDown" && valocityY !=-1){
    valocityX=0;
    valocityY=1;
  }

  else if (e.code == "ArrowLeft" && valocityX !=1){
    valocityX=-1;
    valocityY=0;
  }

  else if(e.code == "ArrowRight" && valocityX !=-1){
    valocityX=1;
    valocityY=0;
  }
}

function placeFood(){
    foodX=Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}