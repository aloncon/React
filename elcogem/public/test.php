<?php
 echo "hallo world";
 $to = "aloncon@gmail.com";
$subject = "My subject - php";
$txt = "Hello world!";
$headers = "From: webmaster@example.com" . "\r\n" .
"CC: somebodyelse@example.com";

mail($to,$subject,$txt,$headers);
?>