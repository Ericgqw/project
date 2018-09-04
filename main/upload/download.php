<?php
//页面加载的时候就调用
//如果浏览器不能解析该文件，浏览器会自动下载
//而如果浏览器是图片或者txt，会直接在浏览器中打开
downloadFile("upload/","Koala.jpeg");

//$filePath是服务器的文件地址
//$saveAsFileName是用户指定的下载后的文件名
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