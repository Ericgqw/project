<?php
	header('Content-Type:application/json;charset=utf-8');
	$name = $_POST["sourceName"];
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	$sql ="select * from DMS_SOURCE where NAME='".$name."'";
	$resultset = mysqli_query($con,$sql);
	$url=null;
	$port = null;
	$dbname = null;
	$username = null;
	$password = null;
	$dbtype = null;
	if(mysqli_num_rows($resultset)==1){
		$row =mysqli_fetch_assoc($resultset);
		$url = $row["URL"];
		$port = $row["PORT"];
		$dbname = $row["DB_NAME"];
		$username = $row["USER_NAME"];
		$password = $row["PASSWORD"];
		$dbtype = $row["DB_TYPE"];
	}
	if($dbtype=="mysql"){
		$con =mysqli_connect($url.":".$port,$username,$password,$dbname);
		if (!$con)
		{
			die('Could not connect: ' . mysqli_error());
		}
		$sql ="select table_name from information_schema.TABLES where TABLE_SCHEMA='".$dbname."'";
		$resultset = mysqli_query($con,$sql);
		$result = array();
		if(mysqli_num_rows($resultset)>0){
			$i=0;
			$result[$i]= array("id"=>$dbname,"name"=>$dbname);
			while($row =mysqli_fetch_assoc($resultset)){
				$i++;
				$result[$i] = array("id"=>$row["table_name"],"name"=>$row["table_name"],"pId"=>$dbname);
			}
			echo json_encode($result);
		}
	}
?>