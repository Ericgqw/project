<?php
	$rptId = $_POST["rptId"];
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	mysqli_query($con,"set character set 'utf8'");//使用UTF-8中文编码读库 
	mysqli_query($con,"set names 'utf8'");//使用UTF-8中文编码写库 
	$sql = "select XML_TEXT from DMS_CONFIG_XML where id=".$rptId;
	$resultset = mysqli_query($con,$sql);
	if(mysqli_num_rows($resultset)>0){
		$row = mysqli_fetch_assoc($resultset);
		$result = $row["XML_TEXT"];
		echo $result;
	}
?>