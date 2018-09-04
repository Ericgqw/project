<?php
	$admin = false;
	//启动会话
	session_start(); 
	//判断是否登录
	if(isset($_SESSION["admin"])&&$_SESSION["admin"]==true){
		$url = "../main.html";
		echo " <script language = 'javascript' type = 'text/javascript'> ";
		echo " window.location.href = '$url'";
		echo " </script> ";
	}else{
		$url = "../index.html";
		echo " <script language = 'javascript' type = 'text/javascript'> ";
		echo "alert('请登录后访问！');";
		echo " window.location.href = '$url'";
		echo " </script> ";
	}
?>