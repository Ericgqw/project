<?php
  header("content-type:text/html;charset=utf-8");
  include("dbtools.php");
  $sql_main=$_POST['sql'];
  $db_ip=$_POST['db_ip'];
  $db_name=$_POST['db_name'];
  $row_main=queryall($sql_main,$db_ip,$db_name);
  $json_main=json_encode($row_main,JSON_UNESCAPED_UNICODE);
  echo $json_main;
?>