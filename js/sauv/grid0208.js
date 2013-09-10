window.onload = function () {
  init();
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
var offsetY = Math.floor( window.innerHeight/4);
/* Fonctions globales */




  window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          window.setTimeout(callback, 1000 / 30);
        };
      })();






  var mouseX = 999,
    mouseY = 999,

    isoTiles = new Array;
  modulesRoad = new Array;
  modulesWater = new Array;
  modulesRiver = new Array;
  directions = new Array;

  var tool = '2';

  var num = 100;
  var tileSizeX = 100;
  var tileSizeY = 50;
  var tileSizeXimg = 100;
  var tileSizeYimg = 65;
  var gridResolutionX =
    gridResolutionY = /*Math.floor( window.innerHeight/80)*/ 20;
  var debugMode = false;
  var isClick = false;
  var tiles = Create2DArray(gridResolutionX + 2);



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

    function init() {
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
            active: "0"
          }
          count = count + 1;
        }
        initTiles();
        for (var i = 0; i < modulesRoad.length; i++) {
                    preload('tilesets/tiles/' + modulesRoad[i] + '.png');
                    preload('tilesets/tiles/' + modulesWater[i] + '.png');
                    preload('tilesets/tiles/' + modulesRiver[i] + '.png');

        }
      }


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

    for (var i = 0; i < isoTiles.length; i++) {
      ctx.beginPath();
      ctx.moveTo(isoTiles[i].x - offsetX  + 50, isoTiles[i].y- offsetY  + 50 );
      ctx.lineTo(isoTiles[i].x + isoTiles[i].height - offsetX +50, isoTiles[i].y + isoTiles[i].width - offsetY  + 50);
      ctx.lineTo(isoTiles[i].x - offsetX +50, isoTiles[i].y + isoTiles[i].width * 2 - offsetY  + 50);
      ctx.lineTo(isoTiles[i].x - isoTiles[i].height - offsetX +50, isoTiles[i].y + isoTiles[i].width - offsetY  + 50);
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
      } else {
        isoTiles[i].mouse = false;
      }
      ctx.fill();
      ctx.stroke();
    }

  }

  function drawTiles() {
    additionnalTiles();
    for (var i = 0; i < isoTiles.length; i++) {
      var img = new Image();
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
         img.src = 'tilesets/tiles/' + modulesRoad[result] + '.png';
             

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


        if(east == '1' ) east = '0';
        if(south == '1') south = '0';
        if(west == '1') west = '0';
        if(north == '1') north = '0';
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


      if(result == '15' && result2 == '15' ) {
            img.src = 'tilesets/tiles/water.png';

      } else {
           img.src = 'tilesets/tiles/' + modulesWater[result] + '.png';

      }

            


      } else {
        img.src = 'tilesets/tiles/grass.png';
      }
      ctx.drawImage(img,
        canvas.width / 2 + (isoTiles[i].posX * tileSizeX / 2) - (isoTiles[i].posY * tileSizeX / 2) - offsetX,
        canvas.height / 5 + (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2) - offsetY,100,65);
    }
  }

  function additionnalTiles() {
    for (var i = 0; i < isoTiles.length; i++) {
      var img = new Image();
      img.src = 'tilesets/tiles/dirtHigh.png';
      ctx.drawImage(img,
        canvas.width / 2 + (isoTiles[i].posX * tileSizeX / 2) - (isoTiles[i].posY * tileSizeX / 2) - offsetX,
        canvas.height / 5 + (isoTiles[i].posY * tileSizeY / 2) + (isoTiles[i].posX * tileSizeY / 2) - offsetY+10);
    }
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
  $('.g').toggleClass('opacityhalf');
}

function paintTool(paint) {
  if(paint == 'road') {
       $('.r').removeClass('opacityhalf');
      $('.w').addClass('opacityhalf');
      tool = '1';
  } else if(paint == 'water') {
              tool = '2';
              $('.r').addClass('opacityhalf');
      $('.w').removeClass('opacityhalf');


  }
}













  /*Fonctions globales */





  function preload(images) {
    if (document.images) {
      var i = 0;
      var imageArray = new Array();
      imageArray = images.split(',');
      var imageObj = new Image();
      for (i = 0; i <= imageArray.length - 1; i++) {
        //document.write('<img src="' + imageArray[i] + '" />');// Write to page (uncomment to check images)
        imageObj.src = imageArray[i];
      }
                console.log('Loading...')

    }
  }

  function Create2DArray(rows) {
      var arr = [];
      for (var i = 0; i < rows; i++) {
        arr[i] = [];
      }
      return arr;
    }








