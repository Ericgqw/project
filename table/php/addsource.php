<?php
	header('Content-Type:application/json;charset=utf-8');
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
	//检查数据源名称是否已经存在
	$sql = "select * from DMS_SOURCE where NAME='".$name."'";
	$resultset = mysqli_query($con,$sql);
	if(mysqli_num_rows($resultset)>0){
		$result = array("code"=>3);
		$result_json = json_encode($result,JSON_UNESCAPED_UNICODE);
		echo $result_json;
		exit();
	}
	$sql = "INSERT INTO DMS_SOURCE (NAME,DB_TYPE,URL,PORT,DB_NAME,USER_NAME,PASSWORD,DB_CHARSET,INITIAL_POOL_SIZE,MAX_POOL_SIZE,MAX_IDLE_TIME,CHECK_TIME_OUT)
			VALUE('".$name."','".$dbType."','".$url."',".$port.",'".$dbname."','".$username."',	'".$password."','".$dbCharset."',".$initialPoolSize.",".$maxPoolSize.",".$maxIdleTime.",18000)";
	
	if(mysqli_query($con,$sql)){
		$result = array("code"=>0);
		$result_json = json_encode($result,JSON_UNESCAPED_UNICODE);
		echo $result_json;
	}else{
		$result = array("errorMsg"=>"数据插入失败");
		$result_json = json_encode($result,JSON_UNESCAPED_UNICODE);
		echo $result_json;
	}
?>