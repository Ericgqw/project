<?php
	require("./phpQuery/phpQuery.php");
	$data = file_get_contents('php://input');
	$data = json_decode($data);
	$folderId = $data->folderId;
	$rptxml = $data->rptxml;
	phpQuery::newDocumentXML($rptxml);
	$name =pq("report>name")->text();
	header("content-type:application/json;charset=utf-8");
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	mysqli_query($con,"set character set 'utf8'");//使用UTF-8中文编码读库 
	mysqli_query($con,"set names 'utf8'");//使用UTF-8中文编码写库 
	$format = "Y-m-d h:i:s";
	$sql = "insert into DMS_CONFIG_XML (FOLDER_ID,NAME,XML_TEXT,CREATE_TIME) value (".$folderId.",'".$name."','".$rptxml."','".date($format)."')";
	$resultnum = mysqli_query($con,$sql);
	$result = null;
	if($resultnum){
		//获取插入数据的id
		$id = mysqli_insert_id($con);
		$model = array("id"=>$id,"folderId"=>$folderId,"name"=>$name);
		$result = array("code"=>0,"errorMsg"=>null,"model"=>$model,"success"=>true);
		
	}else{
		$result = array("code"=>1,"errorMsg"=>"数据无法插入","success"=>false);
	}
	echo json_encode($result,JSON_UNESCAPED_UNICODE);
?>