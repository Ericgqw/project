<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>选择报表</title>
    
    <%@ include file="/anyrt/style.html"%>
</head>
<body style="overflow:auto;" class="bg-white">
    <div style="padding:20px;">
		<ul id="tree" class="ztree"></ul>
	</div>
	
	<script src="${path}/anyrt/js/jquery-1.11.3.min.js"></script>
    <script src="${path}/anyrt/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="${path }/anyrt/js/jquery.ztree.all-3.5.min.js"></script>
	<script type="text/javascript">
	   var setting = {
		   data: {
			  simpleData: {
				 enable: true
			  }
		   }
	   };
	
	   var treeNodes = eval('${files}');
	   var zTree;
	   $(function() {
		   $.fn.zTree.init($("#tree"), setting, treeNodes);
		   zTree = $.fn.zTree.getZTreeObj("tree");
	   });

	   function getSelectRoleNodes() {
	      return zTree.getSelectedNodes();
	   }
	</script>
</body>
</html>
