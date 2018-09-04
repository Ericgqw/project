<?php
	$url = "http://192.168.110.148:88/project/table/big2.html";
	$contents = file_get_contents($url); 
	echo $contents; 
?>