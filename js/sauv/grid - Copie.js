
$(document).ready(function() {
var canvas,ctx,mouseX = 999, mouseY = 999,isoTiles = new Array; modules = new Array;
var num = 100;


    var tileSizeX = 100;
    var tileSizeY = 50;
    var tileSizeXimg = 100;
    var tileSizeYimg = 65;

    var gridResolutionX = 8,
        gridResolutionY = 8;

    var drawGrid = true;
    var debugMode = false;
var decallage = 150;







   var tiles = Create2DArray(gridResolutionX);



function init(){


    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth-100; canvas.height = window.innerHeight-100;

    
   var count = 0;

        for (var gridY = 0; gridY < gridResolutionY; gridY++) {

          for (var gridX = 0; gridX < gridResolutionX; gridX++) {

       isoTiles[count] = {
        x: decallage*4 + (gridX*tileSizeX/2)-(gridY*tileSizeX/2),
        y :  decallage + (gridX*tileSizeY/2)+(gridY*1)*(tileSizeY) - (gridY*tileSizeY/2),
        height :tileSizeX/2,
        width : tileSizeY/2 ,
        mouse: false,
        posX : gridX,
        posY : gridY,
        active : "0"
        }

      count = count+1;


        }

      initTiles();




         for (var i = 0; i < modules.length; i++) {
            modules[i] = loadImage(nf(i, 2) + ".png");
        }




}

  
    drawCanvas();
    canvas.addEventListener('mousemove',updateCanvas,false);
    canvas.addEventListener('click',popBubble,false);
    
    
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




 function initTiles() {

        for (var gridY = 0; gridY < gridResolutionY; gridY++) {
            for (var gridX = 0; gridX < gridResolutionX; gridX++) {
                tiles[gridX][gridY] = '0';
            }
        }
    }




function popBubble(){
    
    for (var i = 0; i < isoTiles.length; i++) {
        if(isoTiles[i].mouse == true){
        
         console.log(isoTiles[i].posX + ',' + isoTiles[i].posY);

           tiles[isoTiles[i].posX][isoTiles[i].posY] = '1';
isoTiles[i].active = "1";
          //  isoTiles.splice(i,1);
           break;
            
        }
    }
    
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawCanvas();
}




   


function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}




init();



function drawCanvas() {
   
    drawTiles();

    for(var i = 0; i < isoTiles.length; i++){
        

        ctx.beginPath();
        ctx.fillStyle = 'red';

           ctx.beginPath();
                                ctx.moveTo(isoTiles[i].x,isoTiles[i].y);
                                ctx.lineTo(isoTiles[i].x+isoTiles[i].height,isoTiles[i].y+isoTiles[i].width);
                                ctx.lineTo(isoTiles[i].x, isoTiles[i].y+isoTiles[i].width*2);
                                ctx.lineTo(isoTiles[i].x-isoTiles[i].height,isoTiles[i].y+isoTiles[i].width);
                                 
                                //Define the style of the shape
                                ctx.lineWidth = 1;
                                ctx.fillStyle = "rgba(255,255,255,0)";
                                ctx.strokeStyle = "rgba(50,50,50,.4)";
                                 
                                //Close the path
                                ctx.closePath();
                                 
                             



       // ctx.arc(isoTiles[i].x,isoTiles[i].y,10,0,Math.PI*2,false);
        if(ctx.isPointInPath(mouseX,mouseY)){
            ctx.fillStyle = "rgba(255,255,255,.2)";
           isoTiles[i].mouse = true;     
        } else {
           isoTiles[i].mouse = false;
        }
        
        ctx.fill();
           ctx.stroke();

    }



}




function drawTiles() {


    for(var i = 0; i < isoTiles.length; i++){


          var img = new Image();

      if(isoTiles[i].active == '1') {

        img.src = 'tilesets/tiles/beach.png';

      } else {

          img.src = 'tilesets/tiles/grass.png';

    }




             ctx.drawImage(img, 
            decallage*4 + (isoTiles[i].posX*50)-(isoTiles[i].posY*50) -50 ,
            decallage +  (isoTiles[i].posY*25)+(isoTiles[i].posX*25) );









}



}





 });