<?php

require 'config.php';

try {
	if(!empty($_POST))
		{
			extract($_POST);
			foreach ($_POST as $key => $value) {
				$$key=$value;
			}


	$sql = 'INSERT INTO polyaplacebdd(user,terrainName,randUrl,dateCrea,dateEdit,terrainData) VALUES (:user,:terrainName,:randUrl,:dateCrea,:dateEdit,:terrainData)';
	$req = $DB -> prepare($sql);
	$req -> execute(array(
	"user" => $user,
	"terrainName" => $terrainName,
	"randUrl" => $randUrl,
	"dateCrea"=> date('Y-m-d'),
	"dateEdit"=> date('Y-m-d'),
	"terrainData" => $terrainData

));
 ?>


<a href="/obiwan/"  class="resumebutton">saved !</a>


 <?php
} else {
	echo 'problem';
}
}
 catch(PDOException $e) {

	echo "Problem... :-(";
}
?>
