<?php
	$xmlstr = $_POST['rptId'];
	$xmlstr = base64_decode($xmlstr);
	require("./phpQuery/phpQuery.php");
	require("./createReport.php");
	phpQuery::newDocumentXML($xmlstr);
	//获取sql语句
	$dataset = pq("datasets>dataset");
	$alldata=array();//存储所有查询出来的数据
	if(count($dataset)>0){
		$con =mysqli_connect("localhost","root","it12345678","LJY");
		if (!$con)
		{
			die('Could not connect: ' . mysqli_error());
		}
		mysqli_query($con,"set character set 'utf8'");//使用UTF-8中文编码读库 
		mysqli_query($con,"set names 'utf8'");//使用UTF-8中文编码写库  
		foreach($dataset as $ds){
			$source = pq($ds)->find("source")->text();
			$name = pq($ds)->find("name")->text();
			$sql ="select * from DMS_SOURCE where NAME='".$source."'";
			$resultset = mysqli_query($con,$sql);
			$con=null;
			if(mysqli_num_rows($resultset)==1){
				$row =mysqli_fetch_assoc($resultset);
				$url = $row["URL"];
				$port = $row["PORT"];
				$dbname = $row["DB_NAME"];
				$username = $row["USER_NAME"];
				$password = $row["PASSWORD"];
				$dbtype = $row["DB_TYPE"];
				$con =mysqli_connect($url.":".$port,$username,$password,$dbname);
				mysqli_query($con,"set character set 'utf8'");//使用UTF-8中文编码读库 
				mysqli_query($con,"set names 'utf8'");//使用UTF-8中文编码写库
			}
			if(!$con){
				die('Could not connect: ' . mysqli_error());
			}
			  $sql = pq($ds)->find("sql")->text();
			  preg_match_all("/:\w+/",$sql, $matches, PREG_SET_ORDER);
			  if(count($matches)){
				  foreach($matches as $m){
					 $arg = substr($m[0],1);
					 $value = $_POST[$arg];
					 if($value==""){
						 
					 }
					$sql= str_replace($m,$value,$sql);
				}
			  }
			$resultset = mysqli_query($con,$sql);
			if(mysqli_num_rows($resultset)>0){
				while($row=mysqli_fetch_assoc($resultset)){
					foreach($row as $key=>$val){
						$alldata[$name.".".$key] = $val?$val:"null";
					}
				}
			}
		}
	}
	//获取cells中的行和列
	$cells_cols = pq("report>canvas>columns>column");
	$cells_rows = pq("report>canvas>rows>row");
	//获取所有的元素
	$html ='<div id="contentDiv" class="panel-ct" style="overflow: auto; height: 625px;"><div id="dv"></div>
				<table id="tg" class="tg" cellspacing="0" cellpadding="0">';
	echo $html;
	$cells_allele = pq("cells>htmlcell,cells>conditioncell,cells>columncell");
	createReport($cells_allele,$cells_cols,$cells_rows,$alldata);
	echo "</table></div>";
?>