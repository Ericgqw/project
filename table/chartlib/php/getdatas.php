<?php
  header("content-type:text/html;charset=utf-8");
  include("dbtools.php");
  $ip="192.168.110.148";
  $db_name="RD_AUTO_Machine";
  $sql_main=$_POST['sql'];
  $row_main=queryall($sql_main,$ip,$db_name);
  $json_main=json_encode($row_main,JSON_UNESCAPED_UNICODE);
  echo $json_main;
?>