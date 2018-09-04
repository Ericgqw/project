<?php
	header('Content-Type:application/json;charset=utf-8');
	$id = $_POST["id"];
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	$sql = "select * from DMS_SOURCE where ID =".$id;
	$resultset = mysqli_query($con,$sql);
	if(mysqli_num_rows($resultset)>0){
		$row = mysqli_fetch_assoc($resultset);
		$result = array("id"=>$row["ID"],"name"=>$row["NAME"],"dbType"=>$row["DB_TYPE"],"url"=>$row["URL"],"port"=>$row["PORT"],"dbName"=>$row["DB_NAME"],"username"=>$row["USER_NAME"],"password"=>$row["PASSWORD"],"initialPoolSize"=>$row["INITIAL_POOL_SIZE"],"maxPoolSize"=>$row["MAX_POOL_SIZE"],"maxIdleTime"=>$row["MAX_IDLE_TIME"],"dbCharset"=>$row["DB_CHARSET"]);
		echo json_encode($result,JSON_UNESCAPED_UNICODE);
	}
?>