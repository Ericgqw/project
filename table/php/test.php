<?php
  header("Content-Type:text/html;charset=utf-8");
  include "phpQuery/phpQuery.php";
  phpQuery::newDocumentXML($_POST['rptId']);
 // $_report=pq('cell');   //获得节点
  echo pq("cells")->find('orgName')->text();
  echo pq("args")->find('editStyle')->text();
?>