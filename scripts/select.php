<?php

require 'config.php';

try {
	if(!empty($_POST))
		{
			extract($_POST);
			foreach ($_POST as $key => $value) {
				$$key=$value;
			}


	$sql = "SELECT * FROM polyaplacebdd WHERE randUrl = '$randUrl'";
	$req = $DB -> query($sql);
	while ($donnees = $req -> fetch(PDO::FETCH_ASSOC)) {
		foreach ($donnees as $key => $value) {
			$$key = $value;
		} ?>


{
  "id": "<?php echo $id; ?>",
  "terrainData": "<?php echo $terrainData; ?>",
  "terrainName": "<?php echo $terrainName; ?>",
  "randUrl": "<?php echo $randUrl; ?>",
  "user": "<?php echo $user; ?>",
  "dateCrea": <?php echo $dateCrea; ?>",
  "dateEdit": "<?php echo $dateEdit; ?>""

};






 <?php }
} else {
	echo 'problem post';
}
}
 catch(PDOException $e) {

	echo "Problem sql";
}
?>
