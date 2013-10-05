<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US"
xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">    <head>
        <title>Poly a place</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />

<meta property="og:image" content="http://marcteyssier.com/experiment/poly-a-place/icon.jpg"/>
<link href="http://marcteyssier.com/experiment/poly-a-place/icon.jpg" rel="image_src"  />
<link href='http://fonts.googleapis.com/css?family=Lato:300,400,700,900' rel='stylesheet' type='text/css'>

<style>

</style>

    </head>
    <body>


<!--
<div id="content_loader">
     <?php if(isset($_GET['randUrl'])) echo $_GET['randUrl']; ?> 
      <div id="loadingProgressG">
            <div id="loadingProgressG_1" class="loadingProgressG">
            </div>
      </div> 
</div>
-->

<header>
  <h1>Poly a place</h1>
  
</header>



<div class="panel panel1">
  <ul>
    <li class="uiitem uigrass"><a  onclick="paintTool('grass')" >a</a></li>
    <li class="uiitem uiroad active"><a onclick="paintTool('road')" >a</a></li>
    <li class="uiitem uiwater"><a  onclick="paintTool('water')" >a</a></li>
    <li class="uiitem uiterrain"><a  onclick="paintTool('terrain')" >a</a></li>
    <li class="uiitem uitree"><a  onclick="paintTool('tree')" >a</a></li>
  </ul>

</div>

<div class="panel panel2">
  <ul>
    <li class="uiitem uigrid active"><a  onclick="displayGrid()" ></a></li>
    <li class="uiitem uilevelplus active"><a  onclick="changeStage('+')"></a></li>
    <li class="uiitem uilevelmoins active"><a  onclick="changeStage('-')"></a></li>
  </ul>

</div>

<div class="panel panelzoom">
  <ul>
    <li class="zoomplus"><a  onclick="zoomFactor()" ></a></li>
    <li class="zoommoins"><a  onclick="zoomFactor('-')"></a></li>
  </ul>
</div>



<div class="panel panelinfo">
  <ul>
    <li class="moreinfo"><a  onclick="displayInfo()" ></a></li>
  </ul>
</div>

<div class="info display">
  <p> <strong>Poly a place</strong> is developed by <a href="http://marcteyssier.com" > Marc Teyssier</a>. You can take view the source in <a href="https://github.com/marcteys/poly-a-place/">GitHub</a>.</P>
    <p>
     <iframe src="http://ghbtns.com/github-btn.html?user=marcteys&repo=poly-a-place&type=watch"
  allowtransparency="true" frameborder="0" scrolling="0" width="62" height="20"></iframe>
        <a href="https://twitter.com/share" class="twitter-share-button" data-text="Poly A Place | Create your low poly landscape " data-via="marcteyssier" data-related="marcteyssier">Tweet</a>
  </p>
</div>

<div class="info info2 display">
  <p><img src="img/leftclick.png" >Add a new landscape</p>
  <p><img src="img/middleclick.png" >Move current view</p>
  <p><img src="img/rightclick.png" >Reset tile</p>
</div>


<!--
<div id="savedZone"></div>
<div id="panel" draggable="true">

<a  onclick="paintTool('road')" class=" r" ></a>
<a  onclick="paintTool('water')" class="w opacityhalf" ></a>
  <a  onclick="paintTool('grass')" class="gr  opacityhalf" >G</a>

<a  onclick="paintTool('terrain')" class="t opacityhalf" ></a>
<div class="sep"></div>
<a  onclick="changeStage('+')" class="a" >+</a>
<a  onclick="changeStage('-')" class="a" >-</a>

<a  onclick="displayGrid()" class="g" ></a>

<input type="text" placeholder="Nom Terrain" value="" id="terrainName"/>
<input type="text" placeholder="Pseudo"  value="" id="user"/>

<a  onclick="save();" class="i" >S</a>

<a  onclick="exportCanvas();" class="i" >E</a>

<a href="#" onclick="function f() {if(confirm('reset?')){initTiles();} } f();" class="i" >X</a>

</div>

-->
         <canvas id="canvas" ></canvas>


    <a href="http://www.chromeexperiments.com/" id="experiment" tabindex="-1" target="_blank">This is a Chrome Experiment</a>
        <script data-main="js/main" src="js/require.js"></script>

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>

<script type="text/javascript" src="js/grid.js"></script>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
<p style="display:none">

var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-26921492-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

 $(document).ready(function() {

 });</p>




    </body>
</html>