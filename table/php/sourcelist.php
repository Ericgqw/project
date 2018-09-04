<?php
	header('Content-Type:application/json;charset=utf-8');
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	$sql = "select * from DMS_SOURCE";
	$resultset = mysqli_query($con,$sql);
	$resultdata = array();
	if(mysqli_num_rows($resultset)>0){
		$i=0;
		while($row = mysqli_fetch_assoc($resultset)) {
			$resultdata[$i]= array("id"=>$row["ID"],"name"=>$row["NAME"],"dbtype"=>$row["DB_TYPE"],"ip"=>$row["URL"],"port"=>$row["PORT"],"dbname"=>$row["DB_NAME"],"username"=>$row["USER_NAME"],"password"=>$row["PASSWORD"],"initpoolsize"=>$row["INITIAL_POOL_SIZE"],"maxpoolsize"=>$row["MAX_POOL_SIZE"]);
			$i++;
		}
	}
	$resultjson = array("data"=>$resultdata);
	echo json_encode($resultjson,JSON_UNESCAPED_UNICODE);
?>