
window.onload = function() {




  
var canvas,ctx,mouseX = 999, mouseY = 999,isoTiles = new Array; modules = new Array;
var num = 100;


    var tileSizeX = 100;
    var tileSizeY = 50;
    var tileSizeXimg = 100;
    var tileSizeYimg = 65;

    var gridResolutionX = 
        gridResolutionY = Math.floor( window.innerHeight/80);

    var drawGrid = true;
    var debugMode = false;







   var tiles = Create2DArray(gridResolutionX+2);

var modules = [
"roadAlone",
"endS",
"endW",
"roadSW",
"endN",
"roadNS", 
"roadNW",
"crossroadNSW",
"roadEndEast",
"roadES",
"roadEW",
"crossroadESW",
"roadNE",
"crossroadNES",
"crossroadNEW",
"crossroad",
]






    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


 // canvas.width = window.innerWidth; canvas.height = window.innerHeight;




function init(){



}




init();
draw();














 function initTiles() {

        for (var gridY = 0; gridY < gridResolutionY+2; gridY++) {
            for (var gridX = 0; gridX < gridResolutionX+2; gridX++) {
                tiles[gridX][gridY] = '0';
            }
        }
    }









       function draw() {


var my_gradient = ctx.createLinearGradient(0, 0, 0, 225);
my_gradient.addColorStop(0, "black");
my_gradient.addColorStop(1, "white");
ctx.fillStyle = my_gradient;
ctx.fillRect(0, 0, 300, 225);




       }












}












function Create2DArray(rows) {
  var arr = [];

  for (var i=0;i<rows;i++) {
     arr[i] = [];
  }

  return arr;
}
