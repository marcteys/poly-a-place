window.onload {

    var modules = null;

    var tileSizeX = 40;
    var tileSizeY = 30;
    var gridResolutionX = 15,
        gridResolutionY = 15;
  //  var tiles = [][];

    var drawGrid = true;
    var debugMode = false;
var decallage = 100;





//var canvas = $('#canvas');


    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var context = ctx;


    //setup 
  canvas.width = window.innerWidth-100; canvas.height = window.innerHeight-100;
//var mouse;
var tiles = Create2DArray(gridResolutionX);
var gameObjectArray = [];




/*
drawTestTiles();

*/



var canvas,ctx, mouseX = 999, mouseY = 999,circles = new Array;
var num = Math.floor(Math.random()*30-10)+10;  

var isClick = false;

function init(){
    
    for(var i=0; i < num; i++){
        gameObjectArray[i] = {
        x: Math.floor(Math.random()*canvas.width),
        y : Math.floor(Math.random()*canvas.height),
        r : Math.floor(Math.random()*60-10)+10,
        mouse : false
        }
    }
    drawCanvas();
    canvas.addEventListener('mousemove',updateCanvas,false);
    canvas.addEventListener('click',updateClick,false);
    
}


function findOffset(obj) {
    var curX = curY = 0;
    if (obj.offsetParent) {
        do {
            curX += obj.offsetLeft;
            curY += obj.offsetTop;
        } while (obj = obj.offsetParent);
    return {x:curX,y:curY};
    }
}

function updateCanvas(e){
    var pos = findOffset(canvas);
    
    mouseX = e.pageX - pos.x;
    mouseY = e.pageY - pos.y;
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCanvas();
}










function drawCanvas() {
    


var count = 1; 

        for (var gridY = 0; gridY < gridResolutionY; gridY++) {

          for (var gridX = 0; gridX < gridResolutionX; gridX++) {


            
            gameObjectArray[count] = 
            new gameObject(decallage*4+ (gridX*tileSizeX/2)-(gridY*tileSizeX/2),
                decallage + (gridX*tileSizeY/2)+(gridY*1)*(tileSizeY) - (gridY*tileSizeY/2),
                20,15,count);
      

             count = count+1;




        }

}





}



initTiles();
init();








function updateClick(){
    /*
    for (var i = 0; i < gameObjectArray.length; i++) {
      if( gameObjectArray[i].mouse == true){
        
            gameObjectArray.splice(i,1);
            break;
            
        }
    }
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCanvas();*/
}






function gameObject(x, y, width, height,id) {
  /*
   this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    */
    var sizex = width;
    var sizey = height;
/*

                                ctx.beginPath();
                                ctx.moveTo(x,y);
                                ctx.lineTo(x+sizex,y+sizey);
                                ctx.lineTo(x, y+sizey*2);
                                ctx.lineTo(x-sizex,y+sizey);
                                 
                                //Define the style of the shape
                                ctx.lineWidth = 1;
                                ctx.fillStyle = "rgba(202, 204, 0,50)";
                                ctx.strokeStyle = "rgb(0, 50, 200)";
                         
                                 
                                //Fill the path with ourline and color
                                ctx.stroke();

*/



   losange(x,y,width,height)

     if(ctx.isPointInPath(mouseX,mouseY)){

            ctx.fillStyle = 'red';

         gameObjectArray[id].mouse = true;    

        } else {
         gameObjectArray[id].mouse = false;
        }

          ctx.fill();

}







console.log(isClick);













  function writeMessage(canvas, message) {
        context.clearRect(0, 0, 300, 60);
        context.font = '18pt Calibri';
        context.fillStyle = 'black';
        context.fillText(message, 10, 25);
      }







  function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }




    canvas.addEventListener('mouseover', function(evt) {
        var mouse = getMousePos(canvas, evt);
        var message = 'Mouse position: ' + mouse.x + ',' + mouse.y;
        writeMessage(canvas, message);
      }, false);






function drawTestTiles() {

var count = 1; 
        for (var gridY = 0; gridY < gridResolutionY; gridY++) {

          for (var gridX = 0; gridX < gridResolutionX; gridX++) {


            
            gameObjectArray[count] = 
            new gameObject(decallage*4+ (gridX*tileSizeX/2)-(gridY*tileSizeX/2),
                decallage + (gridX*tileSizeY/2)+(gridY*1)*(tileSizeY) - (gridY*tileSizeY/2),
                20,15);
      

             count = count+1;
        }

}


}


    function initTiles() {
        for (var gridY = 0; gridY < gridResolutionY; gridY++) {
            for (var gridX = 0; gridX < gridResolutionX; gridX++) {
                tiles[gridX][gridY] = '0';
            }
        }
    }
















function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}



function losange(x,y,sizex,sizey){
      //Begin our drawing

                                ctx.beginPath();
                                ctx.moveTo(x,y);
                                ctx.lineTo(x+sizex,y+sizey);
                                ctx.lineTo(x, y+sizey*2);
                                ctx.lineTo(x-sizex,y+sizey);
                                 
                                //Define the style of the shape
                                ctx.lineWidth = 1;
                                ctx.fillStyle = "rgba(202, 204, 0,50)";
                                ctx.strokeStyle = "rgb(0, 50, 200)";
                                 
                                //Close the path
                                ctx.closePath();
                                 
                                //Fill the path with ourline and color
                                ctx.fill();
                                ctx.stroke();







 }


function squircle(ctx,x,y,size){
var hsize=size/2; // half size
  x-=hsize; // reposition in the middle
  y-=hsize;
  ctx.save();
  ctx.translate(x,y);
  ctx.beginPath();
  ctx.moveTo(hsize,0);
  ctx.bezierCurveTo(0,0,0,0,0,hsize);
  ctx.bezierCurveTo(0,size,0,size,hsize,size);
  ctx.bezierCurveTo(size,size,size,size,size,hsize);
  ctx.bezierCurveTo(size,0,size,0,hsize,0);
  ctx.closePath();
  ctx.restore();

 }

 }