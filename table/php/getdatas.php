<?php
  header("content-type:text/html;charset=utf-8");
  include("dbtools.php");
  $sql_main=$_POST['sql'];
  $row_main=queryall($sql_main);
  $json_main=json_encode($row_main,JSON_UNESCAPED_UNICODE);
  echo  $json_main;
?>