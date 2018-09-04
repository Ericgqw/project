<?php
	header("content-type:application/json;charset=utf-8");
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	mysqli_query($con,"set character set 'utf8'");//使用UTF-8中文编码读库 
	mysqli_query($con,"set names 'utf8'");//使用UTF-8中文编码写库  
	$sql = "select * from DMS_CONFIG_FOLDER";
	$resultset = mysqli_query($con,$sql);
	if(mysqli_num_rows($resultset)>0){
		$result = array();
		$i=0;
		while($row=mysqli_fetch_assoc($resultset)){
			if($row["FOLDER_TYPE"]==0){
				$result[$i] = array("id"=>$row["ID"],"pId"=>$row["PARENT_ID"],"name"=>$row["NAME"],"isParent"=>true);
				$i++;
			}
		}
		$resultjson = json_encode($result,JSON_UNESCAPED_UNICODE);
		echo $resultjson;
	}
?>