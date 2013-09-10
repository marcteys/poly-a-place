<?php

	 require('config.php');




if(!empty($_POST)) {
	extract($_POST);
	foreach ($_POST as $key => $value) {
		$$key = $value;
	}

	$sql = "UPDATE polyaplacebdd SET dateEdit = :dateEdit, terrainData=:terrainData WHERE randUrl='$randUrl'";
	$req = $DB -> prepare($sql);
	$req -> execute(array(
		'dateEdit' => date('Y-m-d'),
		'terrainData' => $terrainData,
	));

	?>

edit

	<?php
} else {
		echo' pas de post';
	}



?>
