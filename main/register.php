<?php
	require 'dbtools/dbtools.php';
	$action = $_POST['action'];
	$workid = $_POST['WORKID'];
	if($action == "ajax"){//ajax方式提交
		//检测该工卡号是否已经注册
		$sql = "SELECT USERID NAME FROM user WHERE USERID='".$workid."'";
		$result = queryone($sql);
		if($result!="error"){//帐号已被注册
			echo "fail";
		}else  //帐号未被注册
		{
			$sql = "SELECT NAME FROM Staff WHERE WORKID ='".$workid."'";
			$result = queryone($sql);
			if($result !="error"){
				echo $result['NAME'];
			}
		}
	}
	else //表单方式提交
	{
		$name = $_POST['NAME'];
		$password = $_POST['PASSWORD'];
		$table = "user";
		$array = array("USERID"=>$workid,"NAME"=>$name,"PASSWORD"=>$password);
		$result = insert($table,$array);
		if($result == null){//插入数据成功
			$url = "login.html";
			echo " <script language = 'javascript' type = 'text/javascript'> ";
			echo "alert('注册成功,跳转到登录界面');";
			echo " window.location.href = '$url'";
			echo " </script> ";
		}
		else
		{
			echo "服务器出错了";
		}
	}
?>