<?php
	require 'dbtools/dbtools.php';
	$workId = $_POST['WORKID'];
	$pwd = $_POST['PASSWORD'];
	$sql = "SELECT USERID,PASSWORD FROM user Where USERID='".$workId."' AND PASSWORD='".$pwd."'";
	$row = queryone($sql);//执行查询，并返回查询的结果。
	if($row =="error"){
		echo "fail";
	}
	else
	{
		session_start();
		$_SESSION["admin"] = true;
		echo "success";
	}
	
?>