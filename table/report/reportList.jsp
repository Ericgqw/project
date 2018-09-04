<%@ page language="java" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
%>
<script type="text/javascript">
<c:if test="${relative == 2 }">percentWidth();</c:if>
<c:if test="${relative == 4 }">percentHeight();</c:if>
<c:if test="${relative == 6 }">
percentWidth();
percentHeight();
</c:if>
</script>
        <div id="contentDiv" class="panel-ct<c:if test="${bgEnabled == 1}"> panel-ct-no</c:if>"> 
            <div id="dv"></div>
		    ${html}
		    <c:if test="${allPage != null}">
			  <div style="height:50px;padding-top:10px;">
				<span  style="padding-left:10px;font-weight:bold;">显示:${startRecord} - ${endRecord} 总记录数:${totalRecord}</span>
				<div id="pagination" class="page"></div>
			  </div>
			</c:if>
		</div>
<script type="text/javascript">
   var reportList = new ReportList("${curPage}", "${allPage}", "${relative}");
   <%if((Integer)request.getAttribute("offset") == 1) {%>
	   reportList.center();
   <%}%>
   reportList.fixedCell(parseInt("${pv.fixedRow}"),parseInt("${pv.fixedCol}"));
   reportList.init();
</script>
<c:if test="${dev != null}">
   <script type="text/javascript">
    $(function() {
        ${dev.jsCode}
    });
   </script>
</c:if>
