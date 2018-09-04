<%@ page language="java"  pageEncoding="utf-8"%>
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
       <div id="contentDiv" style="position:relative;overflow: none;">
               <div id="dv" style="position:absolute;left:2px;z-index:2000;"></div>
			${html}
	</div>
<script type="text/javascript">
   var reportList = new ReportList("${curPage}", "${allPage}");
   reportList.initApp();
   reportList.fixedCell(parseInt("${pv.fixedRow}"),parseInt("${pv.fixedCol}"));
</script>
