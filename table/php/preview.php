<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>报表数据</title>
    
<link href="../css/bootstrap.min.css" rel="stylesheet" />
<link href="../css/iconfont/iconfont.css" rel="stylesheet">
<link href="../css/bootstrap-select.css" rel="stylesheet">
<link href="../css/metroStyle/metroStyle.css" rel="stylesheet">
<link href="../css/green.css" rel="stylesheet">
<link href="../css/webuploader.css" rel="stylesheet">
<link href="../css/simplebar.css" rel="stylesheet">
<link href="../css/style.css" rel="stylesheet">
    
<script src="../js/jquery-1.11.3.min.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/jquery.bootpag.min.js"></script>
<script src="../js/layer/laydate/laydate.js"></script>
<script src="../js/bootstrap-select.min.js"></script>
<script src="../js/jquery.ztree.all-3.5.min.js"></script>
<script src="../js/icheck.min.js"></script>
<script src="../js/layer/layer.js"></script>
<script src="../js/simplebar.js"></script>
<script src="../js/dms.js"></script>

<script src="../js/summernote.min.js"></script>
<script src="../form/printer.js"></script>

<script src="../js/swfobject.js"></script>
<script src="../js/svg.js"></script>
<script src="../js/base64.min.js"></script>
<script src="../js/echarts.min.js"></script>
<script src="../js/echarts-wordcloud.min.js"></script>
<script src="../js/customed.js"></script>
<script src="../js/china.js"></script>
<script src="../js/world.js"></script>
<script src="../js/chart.adaptor.js"></script>
<script src="../report/js/report.js"></script>
<script src="../report/js/reportList.js"></script>
<script src="../report/js/jquery.treetable.js"></script>
</head>
<body >

<div class="main content">

   <div id="reportQuery" class="page-condition">
    <form>
     <input type="hidden" id="interval" name="interval" value="">
     <input type="hidden" id="timeType" name="timeType" value="">
   </form>
  
	
    <form class="form-horizontal" id="reportQuery-form">
        <input type="hidden" id="curPage" name="_curPage" value="">
        <input type="hidden" id="pageSize" name="_pageSize" value="">
		<input type ="hidden" id="rptId" name="rptId" value="
			<?php
				$xmlstr = $_POST['rptId'];
				echo base64_encode($xmlstr);
			?>
		">
		
		<div style="padding: 6px;">
		<table width="100%">
		<tr><td>
			
		<table id="formId">
 <?php
	$xmlstr = $_POST['rptId'];
	require("./phpQuery/phpQuery.php");
	require("./createReport.php");
	phpQuery::newDocumentXML($xmlstr);
	$args_cols = pq("args>canvas>columns>column");
	$args_rows = pq("args>canvas>rows>row");
	//获取args中的元素
	$args_allele = pq("args>htmlcell,args>conditioncell");
	createReport($args_allele,$args_cols,$args_rows,null);
 ?>
		</table>
		</td>
		</tr>
		</table>
	</div>
</form>
   </div>
   <div style="background: #e5e6e7;height: 1px;"></div>
  <div class="collapse navbar-collapse page-menu">
    <form class="form-horizontal" id="exportQuery-form" action="/dmp/report/pre/exportFile.htm" method="post">
      <input id='fileType' type='hidden' name='_fileType' />
      <input id='_pdfType' type='hidden' name='_pdfType' value=""/>
      <div id="export-form-input" style="display: none;"></div>
	  
	   <table style="height:34px;">
        <tr><td>
           <ul class="nav navbar-nav">
                 
                <li><a href="javascript:void(0);" id="icon-printer-pdf" title="PDF打印"><i class="icon iconfont icon-pdfzhijiedayin fa-lg deep-red" style="font-size:24px"></i></a></li>
                
				 <li><a href="javascript:void(0);" onclick="report.exportFile(0)" title="输出excel.xls"><i class="icon iconfont icon-xls fa-lg deep-green" style="font-size:26px"></i></a></li>
				 
				 <li><a href="javascript:void(0);" onclick="report.exportFile(2)" title="输出word"><i class="icon iconfont icon-word fa-lg blue" style="font-size:26px"></i></a></li>
				 
				 <li><a href="javascript:void(0);" onclick="report.exportFile(3)" title="输出pptx"><i class="icon iconfont icon-ppt fa-lg red" style="font-size:24px"></i></a></li>
				 
				 
				 <li><a href="javascript:void(0);" onclick="report.exportFile(1)" title="输出pdf"><i class="icon iconfont icon-PDF fa-lg red" style="font-size:24px"></i></a></li>
				 
            </ul>
	   </td></tr>
    </table>
   </form>
  </div>
  <div class="table-content" id="table-content">
  </div>
  <div id="printerPage" style="display: none;"></div>
  <form id="printer-form">
     <div id="printer-form-input" style="display: none;"></div>
  </form>
 <div id="printer-setting" style="margin-top:20px;display:none;">
    <table align="center" class="printer-st">
	   <tr>
	    <td width="60" colspan="1" rowspan="2" valign="top" style="padding-top:6px;">页数</td>
	    <td><input type="radio" name="pageSelect" value="0" colspan="2"/>&nbsp;全部</td>
	   </tr>
	   <tr>
	    <td colspan="2"><input type="radio" name="pageSelect" value="2"/>&nbsp;指定页</td>
	    <td><input type="text" id="printStart" name="printStart" style="width: 80px;" value="1" class="form-control"/>&nbsp;到&nbsp;<input type="text" id="printEnd" name="printEnd" style="width: 80px;" value="1" class="form-control"/></td>
	   </tr>
	   <tr>
	    <td width="60" colspan="1">缩放</td>
	    <td colspan="2" style="vertical-align: middle;"><input type="checkbox" id="scaleEnable" name="scaleEnable" value="1"/>&nbsp;&nbsp;适合页面大小</td>
	   </tr>
	 </table>
  </div>
  <div id="printIframe-div">
 </div>
</div>
	<script type="text/javascript">
		var report = new Report();
		report.loadMode = "0";
		report.initPreReport();
		
	
	</script>
</body>
</html>
