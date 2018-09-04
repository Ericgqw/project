<%@ page language="java" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
%>
<c:if test="${isBmap}">
      <script src="${path}/anyrt/js/bmap.min.js"></script>
      <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=${bmapKey }"></script>
    </c:if>
   <div id="reportQuery">
   <form>
     <input type="hidden" id="interval" name="interval" value="${async.interval}">
     <input type="hidden" id="timeType" name="timeType" value="${async.timeType}">
   </form>
    <form class="form-horizontal" id="reportQuery-form">
        <input type="hidden" id="curPage" name="_curPage" value="${curPage}">
        <input type="hidden" id="pageSize" name="_pageSize" value="${pageSize}">
        <input type="hidden" id="rptId" name="rptId" value="${rptId }">
		<c:if test="${factor != null}">
		  <div style="padding: 6px;">
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
    <div style="background: #e5e6e7;height: 1px;margin-bottom: 2px;"></div>
   </c:if>
  <div <c:if test="${bgStyle != null}">${bgStyle }</c:if><c:if test="${bgStyle == null}">style="background:#ffffff;"</c:if>>
  <div style="padding-right:3px;padding-left:1px;overflow: auto;" id="table-content"></div>
  </div>
	<script type="text/javascript">
		var report = new Report("${path}", '${compAsync}');
		report.initAppReport(false);
		
	    function nextPage(num) {
		    $("#curPage").val(num);
		    report.loadContentWithParam();
	    }
	    
	    function prePage(num) {
	        $("#curPage").val(num);
		    report.loadContentWithParam();
	    } 
	</script>
