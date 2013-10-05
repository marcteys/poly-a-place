
window.onload = function () {
  $('#content_loader').fadeOut('slow', function(){ $('#content_loader').remove(); });
// if(totalLoaded >= allTiles.length) init();
  init(getHash());
  console.log(getHash());

}


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var grid = true;
var leftclick = false;
var rightclick = false;
var middleclick = false;
var offsetX = Math.floor( window.innerHeight/11);
var offsetY = Math.floor( window.innerHeight/8);
/* Fonctions globales */
var currentStage = 0;
var racine = "http://marcteyssier.com/experiment/poly-a-place/";
racine = "";

  window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 30);
        };
      })();

function changeStage(sens) {
  if(sens == '+' ) currentStage++;
  if(sens == '-' && currentStage>='1') currentStage--;
}





  var mouseX = 999, 
    mouseY = 999,

    isoTiles = new Array;
  modulesRoad = new Array;
  modulesWater = new Array;
  modulesTerrain = new Array;
  modulesCascade = new Array;
  directions = new Array;
  var readImage = new Array;

  var tool = '1';


var zoom = 1;

  var num = 100;
  var tileSizeX = 100;
  var tileSizeY = 50;
  var tileSizeXimg = 100;
  var tileSizeYimg = 65;
  var gridResolutionX =
    gridResolutionY = /*Math.floor( window.innerHeight/80)*/ 15;
  var debugMode = false;
  var isClick = false;

  var totalLoaded = 0;
  var tiles = Create2DArray(gridResolutionX + 2);

        for (var i = 0; i < modulesRoad.length; i++) {

               /*   convertToBase64(modulesRoad[i]);*/
                  
                    preload(racine + 'tilesets/tiles/' + modulesRoad[i] + '.png');
                    preload(racine +'tilesets/tiles/' + modulesWater[i] + '.png');
                    preload(racine +'tilesets/tiles/' + modulesRiver[i] + '.png');
                    preload(racine +'tilesets/tiles/' + modulesTerrain[i] + '.png');
                    preload(racine +'tilesets/tiles/' + modulesCascade[i] + '.png');

        }


  var directions = [
    "north",
    "south",
    "east",
    "west",
    "ne",
    "nw",
    "se",
    "sw"
  ]     
  var modulesRoad = [
    "roadAlone",
    "endS",
    "endW",
    "roadSW",
    "endN",
    "roadNS",
    "roadNW",
    "crossroadNSW",
    "endE",
    "roadES",
    "roadEW",
    "crossroadESW",
    "roadNE",
    "crossroadNES",
    "crossroadNEW",
    "crossroad",
  ]         
  var modulesWater = [
    "wateralone",
    "riverEndS",
    "riverEndW",
    "riverSW",
    "riverEndN",
    "riverNS",
    "riverNW",
    "riverTW",
    "riverEndE",
    "riverES",
    "riverEW",
    "riverTS",
    "riverNE",
    "riverTE",
    "riverTN",
    "riverCross",
  ]   
  var modulesRiver = [
    "wateralone",
    "riverEndS",
    "riverEndW",
    "riverSW",
    "riverEndN",
    "riverNS",
    "riverNW",
    "riverTW",
    "riverEndE",
    "riverES",
    "riverEW",
    "riverTS",
    "riverNE",
    "riverTE",
    "riverTN",
    "riverCross",
  ]   
  var modulesTerrain = [
    "wateralone",
    "hillS",
    "hillW",
    "riverSW",
    "hillN",
    "riverNS",
    "riverNW",
    "riverTW",
    "hillE",
    "riverES",
    "riverEW",
    "riverTS",
    "riverNE",
    "riverTE",
    "riverTN",
    "riverCross",
  ]   
  var modulesCascade = [
    "dirtDouble",
    "waterfallS",
    "waterfallW",
    "waterfallSW",
    "dirtDouble",
    "waterfallS",
    "waterfallW",
    "waterfallSW",
    "dirtDouble",
    "waterfallS",
    "waterfallW",
    "waterfallSW",
    "dirtDouble",
    "waterfallS",
    "waterfallW",
    "waterfallSW",
  ]       


var modulesOther = [
  "grass"]





var allTiles = modulesRoad.concat(modulesWater,modulesRiver,modulesTerrain,modulesOther,modulesCascade);

for(var i=0; i<allTiles.length;i++) {
  console.log(CreateImg(allTiles[i]).src);
}



function CreateImg(imgLoadName){
    var name = imgLoadName;
      if ( this[name] == undefined ) {
          this[name] = new Image();
          this[name].onload = function() {
            totalLoaded++;
          };
          this[name].src = racine + 'tilesets/tiles/' + imgLoadName + '.png';
    } 

    return this[name];
   // 
}





    function init(randUrlHash) {

    if(randUrlHash == '') {
         var count = 0;
          for (var gridY = 0; gridY < gridResolutionY; gridY++) {
            for (var gridX = 0; gridX < gridResolutionX; gridX++) {
              isoTiles[count] = {
                x: canvas.width / 2 + (gridX * tileSizeX / 2) - (gridY * tileSizeX / 2),
                y: canvas.height / 5 + (gridX * tileSizeY / 2) + (gridY * 1) * (tileSizeY) - (gridY * tileSizeY / 2),
                height: tileSizeX / 2,
                width: tileSizeY / 2,
                mouse: false,
                posX: gridX + 1,
                posY: gridY + 1,
                active: "0",
                stage : 0
              }
              count = count + 1;
            }
         
          }

    } else if(randUrlHash != null) {

          $.post("scripts/select.php", {
            'randUrl': randUrlHash

          },function(texte){
                if(texte == '') texte = 'Aucun projet avec cette url';
                        $("#savedZone").empty();
                        $("#savedZone").append(texte);

          }); 

    }
 

 



   initTiles();

      

     drawCanvas();

             
    }




    function findOffset(obj) {
      var curX = curY = 0;
      if (obj.offsetParent) {
        do {
          curX += obj.offsetLeft;
          curY += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return {
          x: curX,
          y: curY
        };
      }
    }

    function updateCanvas(e) {
      var pos = findOffset(canvas);
      mouseX = e.pageX - pos.x;
      mouseY = e.pageY - pos.y;
    }

    function initTiles() {

        for (var gridY = 0; gridY < gridResolutionY+2; gridY++) {
            for (var gridX = 0; gridX < gridResolutionX+2; gridX++) {
                tiles[gridX][gridY] = '0';
                tiles[gridX][gridY] = '0';
            }
        }
       for (var i = 0; i < isoTiles.length; i++) {

          tiles[isoTiles[i].posX][isoTiles[i].posY] = '0';
          isoTiles[i].active = "0";
        
        }
      
    }





var dragTerrain = (function () {

  var startPosX;
  var startPosY;
  var newPosX;
  var newPosY;


  return {

    dragStart: function () {
        startPosX = mouseX+offsetX;
        startPosY = mouseY+offsetY;
     },

    dragUpdate: function () {
      offsetX =   startPosX - mouseX;
      offsetY =   startPosY - mouseY;
      document.body.style.cursor = "move";
    }


  };

})();




/* Actions tiles */



    function removeTile() {
      for (var i = 0; i < isoTiles.length; i++) {
        if (isoTiles[i].mouse == true) {
          // console.log(isoTiles[i].posX + ',' + isoTiles[i].posY);
          tiles[isoTiles[i].posX][isoTiles[i].posY] = '0';
                                isoTiles[i].stage = '0';

          isoTiles[i].active = "0";
          //  isoTiles.splice(i,1);
          //   isClick = true;
          //
          break;
        }
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function activateTile() {
        if(leftclick) {
          for (var i = 0; i < isoTiles.length; i++) {
            if (isoTiles[i].mouse == true) {

                      isoTiles[i].stage = currentStage;
                      tiles[isoTiles[i].posX][isoTiles[i].posY] = tool;
                      isoTiles[i].active = tool;

              break;
            }
          }
       }
       if(rightclick) {}

     ctx.clearRect(0, 0, canvas.width, canvas.height);

    }









/* dessin */


  function drawCanvas() {

    /*Interactions */
         if(leftclick) activateTile();
          if(middleclick) dragTerrain.dragUpdate();
         if(rightclick) removeTile();


       drawTiles();
      drawZone();


       requestAnimFrame(function() {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
          drawCanvas();
        });

  }


  function drawZone() {
var lineHeight = 15;
    for (var i = 0; i < isoTiles.length; i++) {

ctx.beginPath();
   ctx.moveTo(isoTiles[i].x - offsetX  + 50, isoTiles[i].y   + 50 - (currentStage * 15) );
      ctx.lineTo(isoTiles[i].x + isoTiles[i].height - offsetX +50, isoTiles[i].y + isoTiles[i].width - offsetY  + 50 - (currentStage * 15) );
ctx.closePath();


      ctx.beginPath();

      //           (isoTiles[i].posX * tileSizeX / 2 /zoom) - (isoTiles[i].posY * tileSizeX / 2/zoom) - offsetX/zoom,
      //       (isoTiles[i].posY * tileSizeY / 2/zoom) + (isoTiles[i].posX * tileSizeY / 2/zoom) -((j-1) * 15 /zoom) - offsetY/zoom,
      //      
      //   237 / 2
      //   
      //   
         
      ctx.moveTo(
    canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 )/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY - (currentStage * 15))/zoom
        );
      ctx.lineTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 + tileSizeX / 2)/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY +tileSizeY / 2- (currentStage * 15))/zoom
        );
      ctx.lineTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 )/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY + tileSizeY- (currentStage * 15) )/zoom
        );
      ctx.lineTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 - tileSizeX/2)/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY +tileSizeY/2 - (currentStage * 15))/zoom
        );


/*

    
      ctx.moveTo(isoTiles[i].x - (offsetX)  + 50,
       isoTiles[i].y - (offsetY)  + 50 - (currentStage * 15)
       );
      ctx.lineTo((isoTiles[i].x + isoTiles[i].height - offsetX +50)/zoom, (isoTiles[i].y + isoTiles[i].width - offsetY  + 50 - (currentStage * 15)) );
      ctx.lineTo((isoTiles[i].x - offsetX +50)/zoom, (isoTiles[i].y + isoTiles[i].width * 2 - offsetY  + 50 - (currentStage * 15))/zoom );
      ctx.lineTo((isoTiles[i].x - isoTiles[i].height - offsetX +50)/zoom, (isoTiles[i].y + isoTiles[i].width - offsetY  + 50 - (currentStage * 15))/zoom );

      
*/


   /*
  ctx.moveTo(
     canvas.width / 2 +  (isoTiles[i].x -offsetX)/ zoom ,
    canvas.width /5 + ( isoTiles[i].y -offsetY )/ zoom
        );
      ctx.lineTo(
      canvas.width / 2 + (isoTiles[i].x - isoTiles[i].height - offsetX )/ zoom,
    canvas.width /5 +(isoTiles[i].y + isoTiles[i].width -offsetY )/ zoom
        );

*/

//modification du zoom
//



   
      ctx.fillStyle = "rgba(255,255,255,0)";
      if (grid) ctx.strokeStyle = "rgba(50,50,50,.2)";
      else ctx.strokeStyle = "rgba(50,50,50,.0)";
      //Define the style of the shape
      ctx.lineWidth = 1;
      //Close the path
      ctx.closePath();
      // ctx.arc(isoTiles[i].x,isoTiles[i].y,10,0,Math.PI*2,false);
      if (ctx.isPointInPath(mouseX, mouseY)) {
        ctx.fillStyle = "rgba(255,255,255,.2)";
        isoTiles[i].mouse = true;
/*lignes */
if(currentStage == '0') ctx.strokeStyle = "rgba(50,50,50,.0)";
  else ctx.strokeStyle = "rgba(50,50,50,.2)";


      ctx.moveTo(
    canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 )/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)   - offsetY - (currentStage * 15))/zoom
        );
   ctx.lineTo(
    canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 )/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY - (currentStage * 15) + (lineHeight*currentStage) )/zoom
        );

      ctx.moveTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 + tileSizeX / 2)/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2) - offsetY +tileSizeY / 2- (currentStage * 15))/zoom
        );
      ctx.lineTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 + tileSizeX / 2)/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY +tileSizeY / 2- (currentStage * 15) + (lineHeight*currentStage))/zoom
        );


      ctx.moveTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 )/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2) - offsetY + tileSizeY- (currentStage * 15) )/zoom
        );
      ctx.lineTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 )/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY + tileSizeY- (currentStage * 15) + (lineHeight*currentStage) )/zoom
        );


      ctx.moveTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 - tileSizeX/2)/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)   - offsetY +tileSizeY/2 - (currentStage * 15))/zoom
        );
      ctx.lineTo(
      canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX + tileSizeX/2 - tileSizeX/2)/zoom,
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2)  - offsetY +tileSizeY/2 - (currentStage * 15) + (lineHeight*currentStage) )/zoom
        );








/*bas */

  //    ctx.moveTo((isoTiles[i].x - offsetX  + 50)/zoom,
   //     (isoTiles[i].y - offsetY  + 50 - (currentStage * 15)+ (lineHeight*currentStage))/zoom );
   //   ctx.lineTo(isoTiles[i].x + isoTiles[i].height - offsetX +50,
  //      isoTiles[i].y + isoTiles[i].width - offsetY  + 50 - (currentStage * 15) + (lineHeight*currentStage));
  //    ctx.lineTo(isoTiles[i].x - offsetX +50,
    //    isoTiles[i].y + isoTiles[i].width * 2 - offsetY  + 50 - (currentStage * 15) + (lineHeight*currentStage));
    //  ctx.lineTo(isoTiles[i].x - isoTiles[i].height - offsetX +50,
 //       isoTiles[i].y + isoTiles[i].width - offsetY  + 50 - (currentStage * 15) + (lineHeight*currentStage));

      } else {
        isoTiles[i].mouse = false;
      }
      ctx.fill();
      ctx.stroke();
    }

  }









  function drawTiles() {



    for (var i = 0; i < isoTiles.length; i++) {


      var imgTile = new Image();
      var activeImage;
      var activeImageGround;
      var east, sounth, west, north = '0';
      var ne, nw, se, sw = '0';

      if ( isoTiles[i].active  == '1') {
        // east = isoTiles[i]

        east = tiles[isoTiles[i].posX + 1][isoTiles[i].posY];
        south = tiles[isoTiles[i].posX][isoTiles[i].posY + 1];
        west = tiles[isoTiles[i].posX - 1][isoTiles[i].posY];
        north = tiles[isoTiles[i].posX][isoTiles[i].posY - 1];

        if(east > '1') east = '0';
        if(south > '1') south = '0';
        if(west > '1') west = '0';
        if(north > '1') north = '0';

        var result = parseInt(north + west + south + east, 2);

/* img.src =allImages[modulesRoad[result]];*/

     
         imgTile.src = racine + 'tilesets/tiles/' + modulesRoad[result] + '.png';
           activeImage =   modulesRoad[result];

      } else if(isoTiles[i].active  == '2') {

        east = tiles[isoTiles[i].posX + 1][isoTiles[i].posY];
        south = tiles[isoTiles[i].posX][isoTiles[i].posY + 1];
        west = tiles[isoTiles[i].posX - 1][isoTiles[i].posY];
        north = tiles[isoTiles[i].posX][isoTiles[i].posY - 1];

        ne = tiles[isoTiles[i].posX + 1][isoTiles[i].posY - 1];
        nw = tiles[isoTiles[i].posX - 1][isoTiles[i].posY - 1];
        se = tiles[isoTiles[i].posX + 1][isoTiles[i].posY + 1];
        sw = tiles[isoTiles[i].posX - 1][isoTiles[i].posY + 1];

/*

        for (var i = 0; i < directions.length; i++) {
          if(eval(directions[i]) == '1')  eval(directions[i]) = '0';
          if(eval(directions[i]) == '2')  eval(directions[i]) = '1';
        }*/


        if(east == '1' || east == '3' ) east = '0';
        if(south == '1' || south == '3') south = '0';
        if(west == '1' || west == '3') west = '0';
        if(north == '1' || north == '3') north = '0';
        if(nw == '1' ) nw = '0';
        if(ne == '1') ne = '0';
        if(se == '1') se = '0';
        if(sw == '1') sw = '0';

        if( east == '2' ) east = '1';
        if(south == '2') south = '1';
        if(west == '2') west = '1';
        if(north == '2') north = '1';
        if(nw == '2' ) nw = '1';
        if(ne == '2') ne = '1';
        if(se == '2') se = '1';
        if(sw == '2') sw = '1';

        var result = parseInt(north + west + south + east, 2);
        var result2 = parseInt(ne + nw + se + sw, 2);
        var result3 = parseInt(ne + nw + se + sw + north + west + south + east, 2);


              if(result == '15' && result2 == '16' ) {
                    imgTile.src = racine + 'tilesets/tiles/water.png';

              } else {
                  activeImage = modulesWater[result];

                   imgTile.src = racine + 'tilesets/tiles/' + modulesWater[result] + '.png';
              }

            

    } else if(isoTiles[i].active  == '3') {

        east = tiles[isoTiles[i].posX + 1][isoTiles[i].posY];
        south = tiles[isoTiles[i].posX][isoTiles[i].posY + 1];
        west = tiles[isoTiles[i].posX - 1][isoTiles[i].posY];
        north = tiles[isoTiles[i].posX][isoTiles[i].posY - 1];

        ne = tiles[isoTiles[i].posX + 1][isoTiles[i].posY - 1];
        nw = tiles[isoTiles[i].posX - 1][isoTiles[i].posY - 1];
        se = tiles[isoTiles[i].posX + 1][isoTiles[i].posY + 1];
        sw = tiles[isoTiles[i].posX - 1][isoTiles[i].posY + 1];

/*

        for (var i = 0; i < directions.length; i++) {
          if(eval(directions[i]) == '1')  eval(directions[i]) = '0';
          if(eval(directions[i]) == '2')  eval(directions[i]) = '1';
        }*/


        if(east == '1' || east == '2' ) east = '0';
        if(south == '1' || south == '2') south = '0';
        if(west == '1' || west == '2') west = '0';
        if(north == '1' || north == '2') north = '0';
        if(nw == '1' ) nw = '0';
        if(ne == '1') ne = '0';
        if(se == '1') se = '0';
        if(sw == '1') sw = '0';

        if( east == '3' ) east = '1';
        if(south == '3') south = '1';
        if(west == '3') west = '1';
        if(north == '3') north = '1';
        if(nw == '3' ) nw = '1';
        if(ne == '3') ne = '1';
        if(se == '3') se = '1';
        if(sw == '3') sw = '1';

        var result = parseInt(north + west + south + east, 2);
        var result2 = parseInt(ne + nw + se + sw, 2);
        var result3 = parseInt(ne + nw + se + sw + north + west + south + east, 2);

       imgTile.src = racine + 'tilesets/tiles/' + modulesTerrain[result] + '.png';
                  activeImage = modulesTerrain[result];

           

    }   else {
                        activeImage = "grass";

        imgTile.src = racine + 'tilesets/tiles/grass.png';
    }

/* tuiles sol */
       var imgGround = new Image();
       if(isoTiles[i].active  == '2' ) {
                       //   activeImageGround = modulesCascade[result];

              imgGround.src = racine + 'tilesets/tiles/' + modulesCascade[result] + '.png';
            } else {
                   //  activeImageGround = modulesCascade[0];

                            imgGround.src = racine + 'tilesets/tiles/' + modulesCascade[0] + '.png';

            }


/* dessin montée */
for(var j = 0; j <= isoTiles[i].stage; j++ ) {
      ctx.drawImage(imgGround,
            Math.floor(canvas.width / 2 + (isoTiles[i].posX * tileSizeX / 2/zoom) - (isoTiles[i].posY * tileSizeX / 2/zoom) - offsetX/zoom),
            canvas.height / 5 + (isoTiles[i].posY * tileSizeY / 2/zoom) + (isoTiles[i].posX * tileSizeY / 2/zoom) -((j-1) * 15 /zoom) - offsetY/zoom,
            100/zoom,
            65/zoom);
      
}


/* dessin des tuiles */


      ctx.drawImage(CreateImg(activeImage),
      Math.floor(canvas.width / 2 +  ( (isoTiles[i].posX * tileSizeX / 2)  - (isoTiles[i].posY * tileSizeX / 2 ) - offsetX)/zoom),
     canvas.height / 5 +   ( (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2) - (isoTiles[i].stage * 15)  - offsetY )/zoom,
        100/zoom,
        65/zoom
        );


    } /* fin boucle lenght */





  }









function exportCanvas() {
     window.open(canvas.toDataURL());
}





function save() {

  var coordsTiles = "";
    for (var i = 0; i < isoTiles.length; i++) {
      coordsTiles = coordsTiles +","+ isoTiles[i].active
    }
      coordsTiles = coordsTiles.substr(1);








  var user = document.getElementById("user").value;
  var terrainName = document.getElementById("terrainName").value;

var newRandName  = makeid();

 var canvasData = canvas.toDataURL( 'image/png' ); //add this

 /*
        ajax = new XMLHttpRequest();
    ajax.open( 'POST', 'scripts/saveImg.php', false );
    ajax.setRequestHeader( 'Content-Type', 'application/upload' );
    ajax.send( canvasData );
*/

            $.post("scripts/saveImg.php", {
              'canvasData': canvasData,
              'newRandName': newRandName 


            },function(texte){
                          $("#savedZone").empty();
                          $("#savedZone").append(texte);
               }); 



   if(getHash() == '') {


            $.post("scripts/add.php", {
              'user': user,
              'randUrl': newRandName ,
              'terrainName': terrainName,
              'terrainData': coordsTiles

            },function(texte){
                     //     $("#savedZone").empty();
                          $("#savedZone").append(texte);
                          window.location.hash = newRandName;
               }); 

            return false;



    } else {

              $.post("scripts/edit.php", {
              'terrainData': coordsTiles,
              'randUrl': getHash(),


            },function(texte){
                          //$("#savedZone").empty();
                          $("#savedZone").append(texte);
                         
               }); 


            return false;
    }

}




function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}








/*lancement du programme */




/*event listner */



      var left, right, middle;
      left = 0;
      middle = 1;
      right = 2;
     

      canvas.addEventListener('mousemove', updateCanvas, false);
      canvas.addEventListener('mousedown', function (e) {
        if (e.button === left) {
          leftclick = true;
          activateTile();
        } else if (e.button === middle) {
          middleclick = true; dragTerrain.dragStart();
        } else if (e.button === right) {
          

          rightclick = true;
        }
      }, false);

      canvas.addEventListener('mouseup', function (e) {
        if (e.button === left) {
          leftclick = false;
        } else if (e.button === middle) {
          middleclick = false;    document.body.style.cursor = "default";
        } else if (e.button === right) {
                  

          rightclick = false;
        }
      }, false);


      /* canvas.addEventListener('click',activateTile,false);*/
      //canvas.addEventListener('mousedown',clickDown,false);
      // canvas.addEventListener('mouseup',clickUp,false);
      //  if(isClick)  canvas.addEventListener('mousemove',activateTile,false);
        canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false); /*pour le texte */

      canvas.oncontextmenu = function () {
        return false;
      }





/* UI */


function displayGrid() {
  grid ^= true;
  $('.uigrid').toggleClass('off');
}

function paintTool(paint) {
 $( ".panel1" ).find( "li.uiitem.active" ).removeClass("active");

  if(paint == 'road') {
      tool = '1';
        $( ".uiroad" ).addClass("active");
  } else if(paint == 'water') {
       tool = '2';
        $( ".uiwater" ).addClass("active");


  } else if(paint == 'terrain') {
              tool = '3';
        $( ".uiterrain" ).addClass("active");



  }  else if(paint == 'grass') {
              tool = '0';
        $( ".uigrass" ).addClass("active");

  }  else if(paint == 'terrain') {
              tool = '4';
        $( ".uiterrain" ).addClass("active");

  }  else if(paint == 'tree') {
              tool = '5';
        $( ".uitree" ).addClass("active");

  }
}


















  /*Fonctions globales */
function getHash() {
  var hash = window.location.hash;
  return hash.substring(1); // remove #
}






  function preload(images) {
    if (document.images) {
      var i = 0;
      var imageArray = new Array();
      imageArray = images.split(',');
      var imageObj = new Image();
      for (i = 0; i <= imageArray.length - 1; i++) {
       // document.write('<img src="' + imageArray[i] + '" />');
        imageObj.src = imageArray[i];
      }

    }
  }



  var allImages = {}; 



function convertToBase64(nameimg) {
var file,encoded;

file = 'tilesets/tiles/' + nameimg + '.png';

    var img = new Image();
    img.src = file;
    img.onload = function () {


      var canvas2 = document.getElementById("canvas2");

      canvas2.width =this.width;
      canvas2.height =this.height;
      
      var ctx2 = canvas2.getContext("2d");

      ctx2.drawImage(this, 0, 0);


      var dataURL = canvas2.toDataURL("image/png");



  allImages[nameimg] = [dataURL];
  readImage.push(allImages);
/*
console.log(modulesWater[1]);*/
   }



/*
           file = 'tilesets/tiles/' + nameimg + '.png';
            fr = new fileReader();
            fr.readAsDataURL(file);
console.log(fr)
*/

/*
  readImage.push({nameimg,'url'});
  console.log(readImage[0][0]);*/

}




  function Create2DArray(rows) {
      var arr = [];
      for (var i = 0; i < rows; i++) {
        arr[i] = [];
      }
      return arr;
    }







function getBase64FromImageUrl(URL) {
   

}