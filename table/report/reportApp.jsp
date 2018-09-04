<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
request.setAttribute("title", request.getAttribute("reportName"));
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>${reportName}</title>
    
    <link rel="stylesheet" href="${path}/anyrt/app/css/frozenui.css"/>
	<link href="${path}/anyrt/css/iconfont/iconfont.css" rel="stylesheet">
	<link rel="stylesheet" href="${path}/anyrt/css/lCalendar.css">
	<link rel="stylesheet" href="${path}/anyrt/app/css/mobileSelect.css">
	<link rel="stylesheet" href="${path}/anyrt/app/css/app.css">
	<link rel="stylesheet" href="${path}/anyrt/app/css/awesome.css">
	
	<script src="${path}/anyrt/js/jquery-1.11.3.min.js"></script>
    <script src="${path}/anyrt/js/svg.js"></script>
    <script src="${path}/anyrt/app/js/iscroll-probe.js"></script>
    <script src="${path}/anyrt/js/lCalendar.js"></script>
    <script src="${path}/anyrt/app/js/mobileSelect-mod.js"></script>
	<script src="${path}/anyrt/js/base64.min.js"></script>
	<script src="${path}/anyrt/js/echarts.min.js"></script>
	<script src="${path}/anyrt/js/echarts-wordcloud.min.js"></script>
	<script src="${path}/anyrt/js/customed.js"></script>
	<script src="${path}/anyrt/js/china.js"></script>
	<script src="${path}/anyrt/js/world.js"></script>
	<script src="${path}/anyrt/js/chart.adaptor.js"></script>
	<script src="${path}/anyrt/app/js/app.js"></script>
	<script src="${path}/anyrt/app/js/layer.js"></script>
	<script src="${path}/anyrt/js/jquery.ztree.all-3.5.min.js"></script>
	<script src="${path}/anyrt/report/js/reportApp.js"></script>
	<script src="${path}/anyrt/report/js/reportAppList.js"></script>
    <c:if test="${isBmap}">
      <script src="${path}/anyrt/js/bmap.min.js"></script>
      <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=${bmapKey }"></script>
    </c:if>
</head>
<body>
       <%@ include file="/anyrt/app/header.jsp"%>
        <form class="form-horizontal" id="reportQuery-form">
        <input type="hidden" id="curPage" name="_curPage" value="${curPage}">
        <input type="hidden" id="pageSize" name="_pageSize" value="${pageSize}">
        <input type="hidden" id="rptId" name="rptId" value="${rptId }">
		<c:if test="${factor != null}">
		       <div style="position:fixed;z-index:99;width:100%;" id="reportQuery-form-arg">
                    <ul class="ui-list ui-list-pure ui-border-b">
                        <li class="ui-list-info-tool-li">
                            <div id="ui-list-info-tool-arg" class="ui-list-info ui-border-t ui-list-info-tool" style="margin-left:12px;">
                                <span class="ui-nowrap">参数</span><i class="icon iconfont icon-arrowdown blue"></i>
                            </div>
                        </li>
                    </ul>
                 </div>
                    <div class="demo-block">
                        <div class="ui-actionsheet ui-actionsheet-top" id="ui-actionsheet-arg">  
                            <div class="ui-actionsheet-cnt ui-actionsheet-drop-menu">
                                <div style="background:#fff;border-top:1px solid #ccc;">
                                    <div id="arg-wrap">
                                     <div style="padding:5px;">
                                        ${factor }
                                     </div>
                                    </div>
                                    <div style="width:100%;position:absolute;" id="arg-query-btn">
                                        <ul class="ui-tiled">
                                            <li><input type="button" id="btn-query-reset" class="ui-btn ui-btn-primary btn-reset" value="重置"></li>
                                            <li><input type="button" id="btn-query-submit" class="ui-btn ui-btn-primary btn-sure" value="查询"></li>
                                        </ul>
                                    </div>
                                </div> 
                            </div>         
                        </div>
                    </div>
		</c:if>
		<c:if test="${paramObject != null}">
		   <c:forEach items="${paramObject}" var="map">
		      <input type="hidden" name="${map.key }" value="${map.value }">
		   </c:forEach>
		</c:if>
	 </form>
 <div class="ui-container">
      <div <c:if test="${bgStyle != null}">${bgStyle }</c:if><c:if test="${bgStyle == null}">style="background:#ffffff;"</c:if>>
		  <div style="padding:1px;width:100%;overflow:auto;" id="table-content"></div>
	  </div>
</div>
<c:if test="${pageSize > 0}">
   <div class="ui-footer ui-footer-btn">
      <ul class="ui-tiled ui-border-t" id="app-pagination">
          <li><i class="icon iconfont icon-left"></i></li>
          <li></li>
          <li><i class="icon iconfont icon-right"></i></li>
      </ul>
   </div>
 </c:if>
	<script type="text/javascript">
	    $(function(){
	    	var jhObj = $("div.ui-header-positive");
	    	var thObj = $("div.ui-footer-btn");
	    	var argMenu = $("#reportQuery-form-arg");
	    	var jh = jhObj.length > 0 ? jhObj.height() : 0;
	    	var th = thObj.length > 0 ? thObj.height() : 0;
	    	var argH = argMenu.length > 0 ? argMenu.height() : 0;
	    	
	        var contentH = $(document).height() - jh - th - argH;
            //$("#table-content").height(contentH);
            if(argH > 0) {
            	$("#reportQuery-form-arg").css("top", jh);
            	$("div.ui-container").css("padding-top", argH);
            	$("#arg-wrap").parent().height(contentH - 100);
            	var bottom = $("#arg-query-btn").height();
            	$("#arg-wrap").height(contentH - bottom - 100);
            	$("#arg-query-btn").css("top", contentH - bottom - 99);
            }
            
            $("#ui-list-info-tool-arg").click(function() {
            	var _i = $(this).find("i");
            	if(_i.hasClass("icon-arrowdown")) {
            		var argTop = jh + argH;
            		_i.removeClass("icon-arrowdown").addClass("icon-updir");
            		$('#ui-actionsheet-arg').addClass('show');
            		$("#ui-actionsheet-arg").find(".ui-actionsheet-cnt").css("-webkit-transform", "translate3d(0, "+argTop+"px, 0)");
            	} else {
            		_i.removeClass("icon-updir").addClass("icon-arrowdown");
            		$('#ui-actionsheet-arg').removeClass('show');
            		$("#ui-actionsheet-arg").find(".ui-actionsheet-cnt").css("-webkit-transform", "translate3d(0, -100%, 0)");
            	}
            });
            
            if($("#arg-wrap").length > 0) {
            	new IScroll('#arg-wrap', {
            		scrollbars: true,
            		mouseWheel: true,
            		interactiveScrollbars: true,
            		shrinkScrollbars: 'scale',
            		fadeScrollbars: true
            	});
            }
	    })
	    
		var report = new Report("${path}", '${compAsync}', '${relative}');
	    report.initAppReport();
	</script>
</body>
</html>
