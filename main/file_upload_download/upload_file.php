<?php
header("content-type:text/html;charset=UTF-8");
include("dbtools.php");
function fileupload($file_path){   //文件的默认下载路径为upload
	if ($_FILES["file"]["error"] > 0)   //$_FILE用于获取文件上传的信息，上下文的文件的相关信息存在$_FILES数组变量中
{
    echo "错误：" . $_FILES["file"]["error"] . "<br>";
}
else
{
    echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
    echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
    echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"]."<br>";
}
     $dir = iconv("UTF-8", "GBK", $file_path);
        if (!file_exists($dir)){
            mkdir ($dir,0777,true);
        }
		 $time=microtime();
            // 将该文件则将文件上传到 upload 目录下
            move_uploaded_file($_FILES["file"]["tmp_name"], $file_path. $time.$_FILES["file"]["name"]);
            echo "文件存储在: " . $file_path . $time.$_FILES["file"]["name"];  
      return $time.$_FILES["file"]["name"];
	}
	$file_path="upload/" ; //传入的路径的后面需要加上/
    $file_name=fileupload($file_path);
	$table="test";
	$data=date("Y/m/d");
	$array=array("file_name"=>$file_name,"file_path"=>$file_path,"file_data"=>$data);
	insert($table,$array);
?>
