<?php
	header("content-type:application/json;charset=utf-8");
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
		$sql =$_POST["sql"];
		$index=strpos($sql,"where");
		if($index>0){
			$sql = substr($sql,0,$index);
		}
		$resultset=mysqli_query($con,$sql);
		 if(mysqli_num_rows($resultset)>0){
			 $row=mysqli_fetch_assoc($resultset);
			 $columns = array_keys($row);
			 $resultjson = array("code"=>0,"errorMsg"=>null,"success"=>true,"model"=>$columns);
			 echo json_encode($resultjson);
		 }
	
	}
?>