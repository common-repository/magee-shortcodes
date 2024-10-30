<?php
include('./phpqrcode/qrlib.php');
function covertHexToRGB($hex){
	$colors = sscanf($hex, "%02x%02x%02x");
	return $colors;
}
$size = $_GET["size"];
$content = $_GET["content"];
$fgcolor = htmlspecialchars($_GET["fgcolor"]);
$bgcolor = htmlspecialchars($_GET["bgcolor"]);
$fgcolors = covertHexToRGB($fgcolor);
$bgcolors = covertHexToRGB($bgcolor);

QRcode::png($content, $bgcolors, $fgcolors, false, QR_ECLEVEL_L, $size/33 );
exit;