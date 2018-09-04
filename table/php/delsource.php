<?php
	header('Content-Type:application/json;charset=utf-8');
	$name = $_POST["name"];
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	$sql = "delete from DMS_SOURCE where NAME ='".$name."'";
	$resutset = mysqli_query($con,$sql);
	if($resutset){
		echo "true";
	}else
	{
		echo "false";
	}
?>