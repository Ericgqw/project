<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@taglib prefix="u" uri="http://java.sun.com/jsp/jstl/u"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
request.setAttribute("path", path);
request.setAttribute("basePath", basePath);
%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />

    <title>报表管理</title>
    
    <%@ include file="/anyrt/style.html"%>
    <%@ include file="/anyrt/js.jsp"%>
</head>
<body>
      <div class="ifrmain">
		  <div class="main-content">
		      <div class="row row-panel" style="height:100%">
               <div class="col-sm-5 pr-0">
			      <div class="panel-st" style="overflow:auto;">
				     <div class="panel-heading">
					    <h4 class="panel-title text-primary">报表列表</h4>
						<div class="panel-tools"> 
						   <div class="tool-btn">
						      <u:hasAcl targetUrl="/rptMgr/bak/add.htm">
								<span style="font-size:14px;" title="备份报表" id="icon-add-bak">
									<i class="icon iconfont icon-beifenguanli green"></i>&nbsp;备份报表
								</span>
							  </u:hasAcl>
								<span class="purple" style="font-size:17px;" id="tree-down">
									<i class="icon iconfont icon-angle-double-down"></i> 
								</span>
								<span class="purple" style="font-size:17px;" id="tree-up">
									<i class="icon iconfont icon-angle-double-up"></i> 
								</span>
							 </div>
						</div>
					 </div>
					 <div class="panel-body">
						<ul id="rptTree" class="ztree"></ul>
					 </div>
				  </div>
			   </div>
			   <div class="col-sm-7 pl-0">
			      <div class="panel-st marginRight-5" style="overflow:auto;">
				     <div class="panel-heading">
				         
					 </div>
					 <div class="panel-body">
					  <form class="form-horizontal" id="rptMgr-form" target="_blank">
					    <input type="hidden" id="mod_id"/>
						<div class="form-group">
                           <label class="col-sm-3 control-label">报表名称</label>
						   <div class="col-sm-8 text" id="rptName">
						   </div>
						</div>
						<div class="form-group">
                           <label class="col-sm-3 control-label">报表创建时间</label>
						   <div class="col-sm-8 text" id="ct">
						   </div>
						</div>
						<div class="form-group">
                           <label class="col-sm-3 control-label">报表最后更新时间</label>
						   <div class="col-sm-8 text" id="mt">
						   </div>
						</div>
						<div class="form-group">
                           <label class="col-sm-3 control-label">报表备份时间</label>
						   <div class="col-sm-8 text" id="bt">
						   </div>
						</div>
						<div class="form-group">
						   <div class="col-sm-offset-2 col-sm-10">
						      <div class="tool-btn">
						       <u:hasAcl targetUrl="/rptMgr/bak/rec.htm">
								<span title="恢复备份报表" id="btn-rec-bak" style="margin-right:10px;">
									<i class="icon iconfont icon-mod orange" style="font-size:16px;"></i>&nbsp;恢复备份
								</span>
							  </u:hasAcl>
							 </div>
						   </div>
						</div>
					  </form>
					 </div>
				  </div>
			   </div>
			</div>
		  </div>
	</div>
	<script type="text/javascript">
	    var globalJs = new GlobalJs("${path}");
	    globalJs.init();
	    
	    var setting = {
		   data: {
			  simpleData: {
				 enable: true
			  }
		   },
		   callback:{
			  onClick:zTreeOnClick
		   }
	   };
	   
	   var moveSetting = {
		   data: {
			  simpleData: {
				 enable: true
			  }
		   }
	   };
	   
	   var treeNodes = eval('${files}');
	   var treeObject;
	   $(function() {
		   $.fn.zTree.init($("#rptTree"), setting, treeNodes);
		   treeObject = $.fn.zTree.getZTreeObj("rptTree");
	   });
	   
	   var selectedTreeNode;
	   
	   function zTreeOnClick(event, treeId, treeNode) {
	      selectedTreeNode = treeNode;
	      if(!selectedTreeNode.isParent) {
	         $("#rptName").empty().html(selectedTreeNode.name);
	         $("#rptTemplate").empty().html(selectedTreeNode.id);
	         $("#ct").empty().html(selectedTreeNode.ct);
	         $("#mt").empty().html(selectedTreeNode.mt);
	         $("#bt").empty().html(selectedTreeNode.bt);
	      } else {
	         $("#rptName").empty();
	         $("#rptTemplate").empty();
	         $("#ct").empty();
	         $("#mt").empty();
	         $("#bt").empty();
	      }
	   }
	
	   $(function() {
		   // set panel height
	       var contentH = $(document).height();
	       $(".panel-st").height(contentH - 26);
	       
	       $("#icon-add-bak").click(function() {
	    	   layer.confirm('您确定要备份当前报表吗?(如果备份,旧的备份会被新的备份替换)', {icon: 3, title:'提示',shade:false}, function(index){
	    		   var ldIndex = layer.load(2, {shade: [0.5,'#fff']});
		           $.ajax({
					   type: "POST",
					   url: "${path }/rptMgr/bak/add.htm",
					   dataType : "json",
					   success: function(suc){
						  layer.close(ldIndex);
					      if(suc == 0) {
					    	  location.reload();
					      } else {
					    	  layer.alert('报表备份出现错误!', {icon: 2});
					      }
					   },
					   error:function() {
						  layer.close(ldIndex);
					      layer.alert('报表备份出现错误!', {icon: 2});
					   }
				   });		
		       });
	       });
	       
	       $("#btn-rec-bak").click(function() {
	    	    if(!selectedTreeNode) {
	               layer.alert('请选择报表模板!', {icon: 0});
	               return false;
	            }
	            if(selectedTreeNode.isParent) {
	               layer.alert('请选择报表模板!', {icon: 0});
	               return false;
	            }
	    	   layer.confirm("您确定要使用备份报表替换["+$("#rptName").html()+"]报表吗?(如果替换,当前报表会使用备份的报表)", {icon: 3, title:'提示',shade:false}, function(index){
	    		   var ldIndex = layer.load(2, {shade: [0.5,'#fff']});
		           $.ajax({
					   type: "POST",
					   url: "${path }/rptMgr/bak/rec.htm",
					   data: {xmlId:selectedTreeNode.key},
					   dataType : "json",
					   success: function(suc){
						  layer.close(ldIndex);
					      if(suc == 0) {
					    	  layer.alert('报表恢复完成', {icon: 1});
					      } else {
					    	  layer.alert('恢复报表备份出现错误!', {icon: 2});
					      }
					   },
					   error:function() {
						  layer.close(ldIndex);
					      layer.alert('恢复报表备份出现错误!', {icon: 2});
					   }
				   });		
		       });
	       })
	       
	       $("#tree-down").click(function() {
		        treeObject.expandAll(true);
		   });
		   
		   $("#tree-up").click(function() {
		        treeObject.expandAll(false);
		   });
	   });
	</script>
</body>
</html>
