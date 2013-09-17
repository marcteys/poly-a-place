<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" dir="ltr" lang="en-US"
xmlns:og="http://ogp.me/ns#" xmlns:fb="http://www.facebook.com/2008/fbml">    <head>
        <title>Poly a place</title>
        <link rel="stylesheet" type="text/css" href="css/style.css" />
<link href='http://fonts.googleapis.com/css?family=Press+Start+2P' rel='stylesheet' type='text/css'>

<meta property="og:image" content="http://marcteyssier.com/experiment/poly-a-place/icon.jpg"/>
<link href="http://marcteyssier.com/experiment/poly-a-place/icon.jpg" rel="image_src"  />

<style>

</style>

    </head>
    <body >
      <?php
      include('scripts/config.php');
try {
  $sql = "SELECT id FROM polyaplacebdd WHERE randUrl = '$randUrl'";
  $req = $DB -> query($sql);

  ?>


<div id="content_loader">
   <!--       <?php if(isset($_GET['randUrl'])) echo $_GET['randUrl']; ?> -->

      <div id="loadingProgressG">
            <div id="loadingProgressG_1" class="loadingProgressG">
            </div>
      </div> 
</div>
    	    	<h1 class="savedZone"><img src="icon.png" alt="Poly-A-Place" >POLY-A-PLACE<span>0.2</span></h1>
    	    	<p><em>Left click</em> to paint the road</p>
    	    	<p style="top:18%"><em>Right click</em> to remove it
    	    		</p>
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
         <canvas id="canvas" ></canvas>

    <div class="share">
        <a href="https://twitter.com/share" class="twitter-share-button" data-text="CSS3 checkbox Experiment - mteys | " data-hashtags="css3,mteys" data-via="marcteyssier" data-related="marcteyssier">Tweet</a>
    </div>
      <!--  <a href="http://www.chromeexperiments.com/" id="experiment" tabindex="-1" target="_blank">This is a Chrome Experiment</a> -->

<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
<script type="text/javascript" src="js/dragDrop.js"></script>

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




<?php
} catch(PDOExeption $e) {
  echo 'Little problem with the BDD... come later :)';
  die();
}

?>


    </body>
</html>