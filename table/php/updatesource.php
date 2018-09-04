<?php
	header('Content-Type:application/json;charset=utf-8');
	$id = $_POST["id"];
	$name = $_POST["name"];
	$dbType = $_POST["dbType"];
	$url = $_POST["url"];
	$port = $_POST["port"];
	$dbname = $_POST["dbName"];
	$username = $_POST["username"];
	$password = $_POST["password"];
	$initialPoolSize = $_POST["initialPoolSize"];
	$maxPoolSize = $_POST["maxPoolSize"];
	$maxIdleTime = $_POST["maxIdleTime"];
	$dbCharset = $_POST["dbCharset"];
	$con =mysqli_connect($url.":".$port,$username,$password,$dbname);
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	$sql = "update DMS_SOURCE set ID=".$id.",NAME='".$name."',DB_TYPE='".$dbType."',URL='".$url."',PORT='".$port."',DB_NAME='".$dbname."',USER_NAME='".$username."',PASSWORD='".$password."',DB_CHARSET='".$dbCharset."',INITIAL_POOL_SIZE=".$initialPoolSize.",MAX_POOL_SIZE=".$maxPoolSize.",MAX_IDLE_TIME=".$maxIdleTime." where ID=".$id;
	$resultset = mysqli_query($con,$sql);
	$result = null;
	if($resultset){
		$result = array("code"=>0,"errorMsg"=>null,"success"=>true,"model"=>null);
	}else{
		$result = array("code"=>1,"errorMsg"=>"数据库无法使用!","success"=>true,"model"=>null);
	}
	echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>