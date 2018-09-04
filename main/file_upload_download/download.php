<?php
//页面加载的时候就调用
 include ("dbtools.php");
 $sql="select * from test where file_id=1";
 $row=queryone($sql);
  downloadFile($row['file_path'],$row['file_name']);
//$filePath是服务器的文件地址
//$saveAsFileName是用户指定的下载的文件名
function downloadFile($filePath,$saveAsFileName){

    // 清空缓冲区并关闭输出缓冲
    ob_end_clean();    

    //r: 以只读方式打开，b: 强制使用二进制模式
    $fileHandle=fopen($filePath,"rb");    
    if($fileHandle===false){
        echo "Can not find file: $filePath\n";
        exit;
    }
    Header("Content-type: application/octet-stream");
    Header("Content-Transfer-Encoding: binary");
    Header("Accept-Ranges: bytes");
    Header("Content-Length: ".filesize($filePath));
    Header("Content-Disposition: attachment; filename=\"$saveAsFileName\"");

    while(!feof($fileHandle)) {
        //从文件指针 handle 读取最多 length 个字节
        echo fread($fileHandle, 32768);    
    }
    fclose($fileHandle);
}
?>