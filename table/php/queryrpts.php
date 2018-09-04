<?php
	$con =mysqli_connect("localhost","root","it12345678","LJY");
	if (!$con)
	{
		die('Could not connect: ' . mysqli_error());
	}
	mysqli_query($con,"set character set 'utf8'");//使用UTF-8中文编码读库 
	mysqli_query($con,"set names 'utf8'");//使用UTF-8中文编码写库 
	$sql="select * from DMS_CONFIG_FOLDER where FOLDER_TYPE=0 and PARENT_ID=0";//查找一级目录
	$resultset1 = mysqli_query($con,$sql);
	if(mysqli_num_rows($resultset1)>0){
		$result = array();
		$k = 0;
		while($row1 = mysqli_fetch_assoc($resultset1)){
			$i=0;
			$children1 = array();
			$name1 = $row1["NAME"];
			$id1 = $row1["ID"];
			$sql = "select * from DMS_CONFIG_FOLDER where PARENT_ID=".$id1;//查找二级目录
			$resultset2 = mysqli_query($con,$sql);
			if(mysqli_num_rows($resultset2)>0){
				while($row2 = mysqli_fetch_assoc($resultset2)){
					$j=0;
					$children2 = array();
					$id2 = $row2["ID"];
					$name2 = $row2["NAME"];
					$sql = "select * from DMS_CONFIG_XML where FOLDER_ID=".$id2;//查找二级目录下的文件
					$resultset3 = mysqli_query($con,$sql);
					if(mysqli_num_rows($resultset3)>0){
						while($row3 = mysqli_fetch_assoc($resultset3)){
							$id3 = $row3["ID"];
							$name3 = $row3["NAME"];
							$children2[$j] = array("id"=>$id3,"name"=>$name3,"isFile"=>true);
							$j++;
						}
						$children1[$i] = array("id"=>$id2,"name"=>$name2,"isFile"=>false,"children"=>$children2);
						$i++;
					}
				}
			}
			$sql = "select * from DMS_CONFIG_XML where FOLDER_ID=".$id1;//查找一级目录下的文件
			$resultset2 = mysqli_query($con,$sql);
			if(mysqli_num_rows($resultset2)>0){
				while($row2 = mysqli_fetch_assoc($resultset2)){
					$id2 = $row2["ID"];
					$name2 = $row2["NAME"];
					$children1[$i] = array("id"=>$id2,"name"=>$name2,"isFile"=>true);
					$i++;
				}
				$result[$k] = array("id"=>$id1,"name"=>$name1,"isFile"=>false,"children"=>$children1);
				$k++;
			}
			
		}
		
		echo json_encode($result,JSON_UNESCAPED_UNICODE);
	}
?>