<?php
try {
	$DB = new PDO('mysql:host=localhost;dbname=marcteysmysql', 'root', '');
	//$DB = new PDO('mysql:host=localhost;dbname=marcteysmysql', 'root', 'mysql');
	//mysql
	$DB -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOExeption $e) {
	echo 'Little problem with the BDD... come later :)';
	die();
}

$racine = '/';








/*
try {
	$sql = 'SELfECT * FROM projects';
	$req = $DB -> query($sql);
	// la variable $req stoque les données
	while ($d = $req -> fetch(PDO::FETCH_ASSOC)) {

		echo '<pre>';
		print_r($d);
		echo '</pre>';
	}
} catch(PDOException $e) {
	echo 'Mauvaise requète';
}*/
?>
