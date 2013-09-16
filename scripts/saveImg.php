<?php


  // *** Include the class
  include("resize-class.php");


if(!empty($_POST)) {
	extract($_POST);
	foreach ($_POST as $key => $value) {
		$$key = $value;
	}

$imageData=$canvasData;
// Remove the headers (data:,) part.
// A real application should use them according to needs such as to check image type
$filteredData=substr($imageData, strpos($imageData, ",")+1);

// Need to decode before saving since the data we received is already base64 encoded
$unencodedData=base64_decode($filteredData);

$fp = fopen( '../images/tmp/'.$newRandName.'big.png', 'wb' );
fwrite( $fp, $unencodedData);
fclose( $fp );




$file = '../images/tmp/'.$newRandName.'big.png';

//indicate the path and name for the new resized file
$resizedFile = '../images/'.$newRandName.'big.png';

//call the function
smart_resize_image($file , 200, 200 , true, $resizedFile , true/*delete original*/, false ,100);





}

/*
echo $image;

$thumb_width = 200;
$thumb_height = 150;

$width = imagesx($image);
$height = imagesy($image);

$original_aspect = $width / $height;
$thumb_aspect = $thumb_width / $thumb_height;

if ( $original_aspect >= $thumb_aspect )
{
   // If image is wider than thumbnail (in aspect ratio sense)
   $new_height = $thumb_height;
   $new_width = $width / ($height / $thumb_height);
}
else
{
   // If the thumbnail is wider than the image
   $new_width = $thumb_width;
   $new_height = $height / ($width / $thumb_width);
}

$thumb = imagecreatetruecolor( $thumb_width, $thumb_height );

// Resize and crop
imagecopyresampled($thumb,
                   $image,
                   0 - ($new_width - $thumb_width) / 2, // Center the image horizontally
                   0 - ($new_height - $thumb_height) / 2, // Center the image vertically
                   0, 0,
                   $new_width, $new_height,
                   $width, $height);
imagepng($thumb, $filename, 80);


}
/*
if (isset($GLOBALS["HTTP_RAW_POST_DATA"]))
{
// Get the data
$imageData=$GLOBALS['HTTP_RAW_POST_DATA'];

// Remove the headers (data:,) part.
// A real application should use them according to needs such as to check image type
$filteredData=substr($imageData, strpos($imageData, ",")+1);

// Need to decode before saving since the data we received is already base64 encoded
$unencodedData=base64_decode($filteredData);

echo "unencodedData ".$unencodedData;

// Save file. This example uses a hard coded filename for testing,
// but a real application can specify filename in POST variable
$fp = fopen( 'test.png', 'wb' );
fwrite( $fp, $unencodedData);
fclose( $fp );
}*/
?>