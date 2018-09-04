<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
int exportFlag = (Integer)request.getAttribute("exportFlag");
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>${reportName}</title>
    
    <%@ include file="/anyrt/style.html"%>
    <%@ include file="/anyrt/rptjs.jsp"%>
    <c:if test="${isBmap}">
      <script src="${path}/anyrt/js/bmap.min.js"></script>
      <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=${bmapKey }"></script>
    </c:if>
</head>
<body <c:if test="${bgStyle != null}">${bgStyle }</c:if>>
<div class="main content">
   <div id="reportQuery" class="page-condition">
	 <form>
	    <input type="hidden" id="interval" name="interval" value="${async.interval}">
	    <input type="hidden" id="timeType" name="timeType" value="${async.timeType}">
	 </form>
     <form class="form-horizontal" id="reportQuery-form">
        <input type="hidden" id="curPage" name="_curPage" value="${curPage}">
        <input type="hidden" id="pageSize" name="_pageSize" value="${pageSize}">
        <input type="hidden" id="rptId" name="rptId" value="${rptId }">
		<c:if test="${factor != null}">
			<div style="padding: 6px;overflow:auto;">
			  <table width="100%">
			   <tr><td>${factor }</td></tr>
			  </table>
			 </div>
		</c:if>
		<c:if test="${paramObject != null}">
		   <c:forEach items="${paramObject}" var="map">
		      <input type="hidden" name="${map.key }" value="${map.value }">
		   </c:forEach>
		</c:if>
	 </form>
   </div>
   <c:if test="${factor != null}">
    <div style="background: #e5e6e7;height: 1px;"></div>
   </c:if>
 <div class="collapse navbar-collapse page-menu">
    <form class="form-horizontal" id="exportQuery-form" action="${path }/report/exportFile.htm" method="post">
      <input id='fileType' type='hidden' name='_fileType' />
      <input id='_pdfType' type='hidden' name='_pdfType' value=""/>
     <div id="export-form-input" style="display: none;"></div>
     <%if (exportFlag != 0) { %> 
     <table style="height:30px;">
        <tr>
        <%if (((1 << 7) & exportFlag) != 0) { %> 
	     <td style="vertical-align: top;">
	        <table style="height:30px;">
			   <tr>
				  <td>
					<span style="padding-left:5px;">输出页数&nbsp;</span>
				  </td>
				  <td>
				    <span style="padding-left:2px;"><input type="text" name="_startEPage" style="width:40px;" value="1"/></span>
				  </td>
				  <td>
					<span style="padding-right:5px;padding-left:3px;">-&nbsp;<input type="text" id="endEPage" name="_endEPage" style="width:40px;"/></span>
				  </td>
			  </tr>
		  </table>
	    </td>
	    <%} %>
	    <td>
           <ul class="nav navbar-nav">
                 <%if (((1 << 6) & exportFlag) != 0) { %> 
                 <li><a href="javascript:void(0);" id="icon-printer-pdf" title="PDF打印"><i class="icon iconfont icon-pdfzhijiedayin fa-lg deep-red" style="font-size:24px"></i></a></li>
                 <%} %>
                 <%if (((1 << 5) & exportFlag) != 0) { %> 
                 <li><a href="javascript:void(0);" id="icon-printer" title="Flash打印"><i class="icon iconfont icon-flashzhijiedayin fa-lg wblue" style="font-size:24px"></i></a></li>
				 <%} %>
				 <%if (((1 << 4) & exportFlag) != 0) { %> 
				 <li><a href="javascript:void(0);" id="icon-printView" title="Flash打印预览"><i class="icon iconfont icon-dayinyulan1 fa-lg wblue" style="font-size:24px"></i></a></li>
				 <%} %>
				 <%if (((1 << 0) & exportFlag) != 0) { %>
				 <li><a href="javascript:void(0);" onclick="report.exportFile(0)" title="输出excel.xls"><i class="icon iconfont icon-xls fa-lg deep-green" style="font-size:26px"></i></a></li>
				 <%} %>
				  <%if (((1 << 9) & exportFlag) != 0) { %>
				 <li><a href="javascript:void(0);" onclick="report.exportFile(9)" title="输出excel.xlsx"><i class="icon iconfont icon-EXCEL fa-lg deep-green" style="font-size:24px"></i></a></li>
				 <%} %>
				 <%if (((1 << 2) & exportFlag) != 0) { %>
				 <li><a href="javascript:void(0);" onclick="report.exportFile(2)" title="输出word"><i class="icon iconfont icon-word fa-lg blue" style="font-size:26px"></i></a></li>
				 <%} %>
				 <%if (((1 << 3) & exportFlag) != 0) { %>
				 <li><a href="javascript:void(0);" onclick="report.exportFile(3)" title="输出pptx"><i class="icon iconfont icon-ppt fa-lg red" style="font-size:24px"></i></a></li>
				 <%} %>
				 <%if (((1 << 1) & exportFlag) != 0) { %>
				 <li><a href="javascript:void(0);" onclick="report.exportFile(1)" title="输出pdf"><i class="icon iconfont icon-PDF fa-lg red" style="font-size:24px"></i></a></li>
				 <%} %>
				 <%if (((1 << 8) & exportFlag) != 0) { %>
				 <li>
				  <ul class="nav navbar-nav nav-tool page-report" style="display: block;">
                        <li class="dropdown" style="margin-left:10px;margin-right:6px;width:80px;">
                            <a href="javascript:void(0)" class="dropdown-toggle" data-toggle="dropdown">参数记录<span class="caret"></span></a> 
                            <ul class="dropdown-menu">
                                <li class="tl-add-query-arg" style="width:160px;height:25px;font-size:12px;"><a href="javascript:void(0)"><i class="icon iconfont icon-add fa-lg" style="font-size:14px"></i>&nbsp;保存参数条件</a></li>
                                <li class="tl-del-query-arg" style="width:160px;height:25px;font-size:12px;"><a href="javascript:void(0)"><i class="icon iconfont icon-delete red fa-lg" style="font-size:18px"></i>&nbsp;清除参数条件</a></li>
                            </ul> 
                         </li>
                    </ul>
				 </li>
				 <%} %>
            </ul>
	   </td>
	 </tr>
    </table>
    <%} %>
   </form>
  </div>
  <div class="table-content" id="table-content"></div>
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
   <script src="${path}/anyrt/js/anyrt.js"></script>
	<script type="text/javascript">
		var report = new Report("${path}", '${compAsync}');
		report.loadMode = "${loadMode}";
		report.initReport();
		window.report = report;
		
		window.anyrt = new AnyRt("${path}");
		
		function doResize() {
			var contentH = $("body").height() - $(".page-condition").height()
	        - $(".page-menu").height() - 25;
	       $("#table-content").height(contentH);
	       
	       if(reportList) {
	       	   reportList.resize();
	       }
		}
		
	  var resizeTimer = null; 
	  $(window).resize(function() {
		  if (resizeTimer) clearTimeout(resizeTimer); 
		    resizeTimer = setTimeout("doResize()", 300); 
	   });
	</script>

	<c:if test="${dev != null}">
       <c:if test="${dev.jslib != null }">
          <c:forEach items="${dev.jslib}" var="lib">
             ${lib}
          </c:forEach>
       </c:if>
       <c:if test="${dev.cssCode != null}">
          <style>
             ${dev.cssCode}
          </style>
       </c:if>
    </c:if>
	<c:if test="${argDev != null}">
       <c:if test="${argDev.jslib != null }">
          <c:forEach items="${argDev.jslib}" var="lib">
             ${lib}
          </c:forEach>
       </c:if>
       <c:if test="${argDev.cssCode != null}">
          <style>
             ${argDev.cssCode}
          </style>
       </c:if>
       <script type="text/javascript">
	       $(function() {
	           ${argDev.jsCode}
	       });
       </script>
    </c:if>
</body>
</html>