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

    <title>移动报表管理</title>
    
    <%@ include file="/anyrt/style.html"%>
    <link rel="stylesheet" type="text/css" href="${path}/anyrt/design/css/icheck/minimal.css">
    <link rel="stylesheet" type="text/css" href="${path}/anyrt/css/iconfont/iconfont.css">
    <link href="${path}/anyrt/design/css/style.css" rel="stylesheet" />
    <%@ include file="/anyrt/js.jsp"%>
</head>
<body>
<div class="main" style="padding-top:60px;">
     <div class="header-top navbar fixed-top" style="margin-left:60px;padding:16px;">
           <span style="padding-left:60px;font-size:14px;"><b>移动报表作品</b></span>
     </div>
	 <div style="position:fixed;top:0;float:left;width:60px;height:100%;background-color: #3b3f51;z-index:20;padding-top:20px;">
	       <ul class="left-tool-menu">
	        <li>
	          <a href="${path}/rptMgr/app/add_rpt.htm"><i class="icon iconfont icon-baobiaosheji16x16 fa-lg" style="font-size:24px"></i><span class="icon-name">报表设计</span></a>
	        </li>
	        <li>
	          <a href="${path}/source/index.htm?type=app"><i class="icon iconfont icon--shujuyuan fa-lg" style="font-size:28px"></i><span class="icon-name">数据源</span></a>
	        </li>
	        <li class="left-tool-menu-active">
	          <a href="${path}/rptMgr/app/index.htm"><i class="icon iconfont icon-baobiao fa-lg" style="font-size:24px"></i><span class="icon-name">报表</span></a>
	        </li>
	       </ul>
      </div>
	  
      <div class="main-box" style="margin-left: 60px;">
		  <div class="main-content">
		      <div class="row row-panel" style="height:100%">
               <div class="col-sm-5 pr-0">
			      <div class="panel-st" style="overflow:auto;">
				     <div class="panel-heading">
					    <h4 class="panel-title text-primary">移动报表列表</h4>
						<div class="panel-tools"> 
						   <div class="tool-btn">
						      <u:hasAcl targetUrl="/rptMgr/app/add_folder.htm">
								<span class="green" style="font-size:17px;" title="新增目录" id="icon-add-folder">
									<i class="icon iconfont icon-plus"></i>
								</span> 
							  </u:hasAcl>
							  <u:hasAcl targetUrl="/rptMgr/app/mod_folder.htm">
								<span class="blue" style="font-size:17px;" title="更新目录" id="icon-mod-folder">
									<i class="icon iconfont icon-mod"></i>
								</span>
							  </u:hasAcl>
							  <u:hasAcl targetUrl="/rptMgr/app/del_folder.htm">
								<span class="red" style="font-size:17px;" title="删除目录" id="icon-del-folder">
									<i class="icon iconfont icon-del"></i>
								</span>
							  </u:hasAcl>
							  <u:hasAcl targetUrl="/rptMgr/app/move_folder.htm">
								<span class="red" style="font-size:16px;" title="移动" id="icon-move-folder">
									<i class="icon iconfont icon-move"></i>
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
			   <div class="col-sm-7 pl-0" style="-webkit-user-select:text;user-select: text;">
			      <div class="panel-st marginRight-5" style="overflow:auto;">
				     <div class="panel-heading">
					 </div>
					 <div class="panel-body">
					  <form class="form-horizontal" id="rptMgr-form" target="_blank" method="post">
					    <input type="hidden" id="mod_id"/>
					    <div class="form-group">
                           <label class="col-sm-3 control-label">登陆访问</label>
						   <div class="col-sm-8 text" id="visitType">
						     <input type="checkbox"/>
						   </div>
						</div>
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
                           <label class="col-sm-3 control-label">报表URL</label>
						   <div class="col-sm-8 text" id="rptUrl">
						   </div>
						</div>
						<div class="form-group">
						   <div class="col-sm-offset-2 col-sm-10">
						      <div class="tool-btn">
						      <u:hasAcl targetUrl="/rptMgr/app/del_rpt_tplt.htm">
								    <span title="报表删除" id="btn-del-rpt" style="margin-right:10px;">
									<i class="icon iconfont icon-del orange" style="font-size:16px;"></i>&nbsp;报表删除
								</span> 
								</u:hasAcl>
						       <u:hasAcl targetUrl="/rptMgr/app/update_rpt.htm">
								<span title="报表更新" id="btn-mod-rpt" style="margin-right:10px;">
									<i class="icon iconfont icon-mod orange" style="font-size:16px;"></i>&nbsp;报表更新
								</span> 
							   </u:hasAcl>
							   <u:hasAcl targetUrl="/report/app/pre.htm">
								<span title="报表预览" id="btn-query-rpt">
									<i class="icon iconfont icon-barchart orange" style="font-size:16px;"></i>&nbsp;报表预览
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
	
	<div class="footer" style="left:60px;">
            ${config['sysReserved']}
     </div>
	
	<div id="folderAdd" style="display:none;margin:10px;margin-top:20px;">
	   <form class="form-horizontal" id="folderAdd-form">
	        <input type="hidden" name="parentId" id="add-parentId"/>
			<div class="form-group">
			   <label class="col-sm-2 control-label">上级目录</label>
			   <div class="col-sm-6">
				   <input type="text" class="form-control" id="add-parent-name" readonly="readonly"/>
			   </div>
			</div>
			<div class="form-group">
			   <label class="col-sm-2 control-label">目录名称</label>
			   <div class="col-sm-8">
				   <input type="text" class="form-control" name="folder" id="add-folder" check-type="required" required-message="请输入目录名称"/>
			   </div>
			</div>
		 </form>
	 </div>
	 
	 <div id="folderMod" style="display:none;margin:10px;margin-top:20px;">
	   <form class="form-horizontal" id="folderMod-form">
	        <input type="hidden" name="folderId" id="mod-folderId"/>
			<div class="form-group">
			   <label class="col-sm-2 control-label">目录名称</label>
			   <div class="col-sm-8">
				   <input type="text" class="form-control" name="folder" id="mod-folder" check-type="required" required-message="请输入目录名称"/>
			   </div>
			</div>
		 </form>
	 </div>
	 
	 <div id="folderMove" style="display:none;margin:10px;margin-top:20px;">
	    <ul id="moveTree" class="ztree"></ul>
	 </div>
	 <div id="rptSwf" style="display:none;">
	     <div id="content"></div>
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
	      $("#mod_id").val(treeNode.id);
	      selectedTreeNode = treeNode;
	      if(!selectedTreeNode.isParent) {
	    	 $("#visitType").show();
	    	 $("#visitType").find("input[type=checkbox]").unbind();
	    	 var accessAuth = selectedTreeNode.accessAuth;
	    	 var checkStr = accessAuth == 0 ? "check" : "uncheck";
	    	 $("#visitType").find("input[type=checkbox]").iCheck(checkStr);
	    	 
	         $("#rptMgr-form").attr("action", '${path}/app/' + selectedTreeNode.key + ".rpt?_hd=no");
	         $("#rptName").empty().html(selectedTreeNode.name);
	         $("#rptUrl").empty().html('${basePath}app/' + selectedTreeNode.key + ".rpt?_hd=no");
	         $("#ct").empty().html(selectedTreeNode.ct);
	         $("#mt").empty().html(selectedTreeNode.mt);
	         
	         $("#visitType").find("input[type=checkbox]").bind('ifChanged', function(e){
		    	   if(!selectedTreeNode) {
		    		   return false;
		    	   }
		    	   var visitType = $(this).is(":checked") ? 0 : 1;
		    	   $.ajax({
			             type: "POST",
			             url: "${path }/rptMgr/update_rpt_access_auth.htm",
			             data:{rptId:selectedTreeNode.key, cid:selectedTreeNode.key, accessAuth:visitType},
			             dataType : "json",
			             success: function(code){
			                 if(code != 0) {
			                	 layer.alert("设置报表是否登陆访问错误");
			                 } else {
			                	 selectedTreeNode.accessAuth = visitType;
			                 }
			             },error:function() {
			            	 layer.alert("设置报表是否登陆访问错误");
			             }
			        });
		       });
	      } else {
	         $("#rptMgr-form").attr("action", "");
	         $("#rptName").empty();
	         $("#rptUrl").empty();
	         $("#ct").empty();
	         $("#mt").empty();
	      }
	   }
	   
	   function callSuccess(cx) {
	      if(selectedTreeNode) {
	         treeObject.addNodes(selectedTreeNode, {id:"x-" + cx.id, pId:cx.folderId, name:cx.name, key:cx.id, ct:cx.ct, mt:cx.mt, isParent:false});
	      } else {
	         treeObject.addNodes(null, {id:"x-" + cx.id, pId:0, name:cx.name, key:cx.id, ct:cx.ct, mt:cx.mt, isParent:false});
	      }
	   }
	   
	   function callSuccessUpdate() {
		   if(!selectedTreeNode) {
			   return;
		   }
		   $.ajax({
			   type: "POST",
			   url: "${path }/rptMgr/query_rpt.htm",
			   data: {"rptId":selectedTreeNode.key},
			   dataType : "json",
			   success: function(suc){
				   selectedTreeNode.name = suc.name;
				   selectedTreeNode.mt = suc.mt;
				   selectedTreeNode.iconSkin = suc.available ? null : "error";
				   treeObject.updateNode(selectedTreeNode);
				   $("#rptName").empty().html(selectedTreeNode.name);
				   $("#mt").empty().html(selectedTreeNode.mt);
			   }
		 });
	   }
	   
	   $(function() {
	       // set panel height
	       var contentH = $(".main-box").height();
	       contentH -= ($(".page-heading").height() + 40);
	       $(".panel-st").height(contentH);
	       
	       $("#visitType").find("input[type=checkbox]").iCheck({
               checkboxClass: 'icheckbox_minimal'
           });
	       
	       $("#icon-add-folder").click(function() {
	          
	          resetForm($("#folderAdd-form"));
	          
	          if(selectedTreeNode && !selectedTreeNode.isParent) {
	              layer.alert('请选择目录!', {icon: 0});
	              return false;
	          }
	          
	          if(selectedTreeNode) {
	             $("#add-parentId").val(selectedTreeNode.id);
	             $("#add-parent-name").val(selectedTreeNode.name);
	          }
	          
	          layer.open({
				  type: 1, 
				  title: '新建目录',
				  shadeClose: true,
				  area: ['600px', '300px'],
				  content: $("#folderAdd"),
				  btn: ['确定', '取消'],
				  yes:function(index) {
				     if (!$("#folderAdd-form").valid(this)){
						return false;
				     }
				     var jsonData = {
			    		 parentId:$("#add-parentId").val(),
				         folder:$("#add-folder").val()
				     };
				     $.ajax({
						   type: "POST",
						   url: "${path }/rptMgr/app/add_folder.htm",
						   data: jsonData,
						   dataType : "json",
						   success: function(cf){
						     if(!cf) {
						        layer.alert('目录创建失败或已存在!', {icon: 2});
						     }
						     if(selectedTreeNode) {
						    	treeObject.addNodes(selectedTreeNode, {id:cf.id, pId:cf.parentId, name:cf.name, isParent:true});
						     } else {
						    	treeObject.addNodes(null, {id:cf.id, pId: 0, name:cf.name, isParent:true});
						     }
						     layer.close(index);
						   },
						   error:function() {
							  layer.alert('目录创建失败或已存在!', {icon: 2});
						   }
					 });
				 },
				 cancel:function() {
				    $("#folderAdd-form").validation(); 
				 }
			  });
	       });
	       
	       $("#icon-mod-folder").click(function(){
	           resetForm($("#folderMod-form"));
	           
	           if(!selectedTreeNode) {
	              layer.alert('请选择需要更新的目录!', {icon: 0});
	              return false;
	           }
	           if(!selectedTreeNode.isParent) {
	              layer.alert('请选择需要删除的目录!', {icon: 0});
	              return false;
	           }
	           
	           $("#mod-folderId").val(selectedTreeNode.id);
	           $("#mod-folder").val(selectedTreeNode.name);
	           
	           layer.open({
				  type: 1, 
				  title: '更新目录',
				  shadeClose: true,
				  area: ['600px', '300px'],
				  content: $("#folderMod"),
				  btn: ['确定', '取消'],
				  yes:function(index) {
				     if (!$("#folderMod-form").valid(this)){
						return false;
				     }
				     var jsonData = {
			    		 id:$("#mod-folderId").val(),
				         folder:$("#mod-folder").val()
				     };
				     $.ajax({
						   type: "POST",
						   url: "${path }/rptMgr/app/mod_folder.htm",
						   data: jsonData,
						   dataType : "json",
						   success: function(cf){
						     if(!cf) {
						        layer.alert('目录更新失败或已存在!', {icon: 2});
						     } else {
						    	 selectedTreeNode.name = cf.name;
							     treeObject.updateNode(selectedTreeNode);
						     }
						     layer.close(index);
						   },
						   error:function() {
							   layer.alert('目录更新失败或已存在!', {icon: 2});
						   }
					 });
				 },
				 cancel:function() {
				    $("#folderMod-form").validation(); 
				 }
			  });
	       });
	       
	       $("#icon-del-folder").click(function() {
		       if(!selectedTreeNode) {
	              layer.alert('请选择需要删除的目录!', {icon: 0});
	              return false;
	           }
	           if(!selectedTreeNode.isParent) {
	              layer.alert('请选择需要删除的目录!', {icon: 0});
	              return false;
	           }
	           
		       layer.confirm('您确定要删除这个目录及目录中的报表文件吗?', {icon: 3, title:'提示'}, function(index){	
		           layer.close(index);
		           var ldIndex = layer.load(2, {shade: [0.5,'#fff']});
		           $.ajax({
					   type: "POST",
					   url: "${path }/rptMgr/app/del_folder.htm",
					   data: {id:selectedTreeNode.id},
					   dataType : "json",
					   success: function(code){
						 layer.close(ldIndex);
					     if(code != 0) {
					        layer.alert('目录删除出现错误!', {icon: 2});
					     } else {
					        treeObject.removeNode(selectedTreeNode);
					        var parentNode = selectedTreeNode.getParentNode();
					        if(parentNode != null) {
					        	parentNode.isParent = true;
						        treeObject.updateNode(parentNode);
					        }
					        selectedTreeNode = null;
					     }
					   },
					   error:function() {
						   layer.close(ldIndex);
					       layer.alert('目录删除出现错误!', {icon: 2});
					   }
				   });		
		       });
		   });
	       
	       $("#folderAdd-form").validation(); 
	       $("#folderMod-form").validation(); 
	       
	       $("#icon-move-folder").click(function() {
	            if(!selectedTreeNode) {
	               layer.alert('请选择需要移动的目录或文件!', {icon: 0});
	               return false;
	            }
	            
	            $.ajax({
				   type: "POST",
				   url: "${path}/rptMgr/app/find_all_folder.htm",
				   dataType : "json",
				   success: function(moveTree){
				       $.fn.zTree.init($("#moveTree"), moveSetting, moveTree);
	                   var treeMoveObject = $.fn.zTree.getZTreeObj("moveTree");
	                    
	                   layer.open({
						  type: 1, 
						  title: '移动到',
						  shadeClose: true,
						  area: ['500px', '400px'],
						  content: $("#folderMove"),
						  btn: ['确定', '取消'],
						  yes:function(index) {
							   var destNodes = treeMoveObject.getSelectedNodes();
						       if(destNodes == null || destNodes.length == 0) {
						           layer.alert('请选择目标目录!', {icon: 0});
						           return false;
						       }
						       var destNode = destNodes[0];
						       if(selectedTreeNode.id == destNode.id) {
						           layer.alert('不能移入相同的目录!', {icon:0});
						           return false;
						       }
						       						       
							   $.ajax({
								   type: "POST",
								   url: "${path }/rptMgr/app/move_folder.htm",
								   data: {id:selectedTreeNode.id, destId:destNode.id},
								   dataType : "json",
								   success: function(code){
									 if(code == -1) {
										 layer.alert('不能移入它本身子目录!', {icon:2});
									 } else if(code != 0) {
								        layer.alert('目录移动出现错误!', {icon: 2});
								     } else {
								        var parentNode = selectedTreeNode.getParentNode();
								        var treeDestNode = treeObject.getNodeByParam("id", destNode.id);
								        treeObject.moveNode(treeDestNode, selectedTreeNode, "inner", false);
								        treeObject.updateNode(selectedTreeNode);
								        if(parentNode != null && !parentNode.isParent) {
								             parentNode.isParent = true;
					                         treeObject.updateNode(parentNode);
								        }
								        layer.close(index);
								     }
								   },
								   error:function() {
								       layer.alert('目录移动出现错误!', {icon: 2});
								   }
							   });
						  },
						  cancel:function() {
						  }
					  });
				   },
				   error:function() {
				    
				   }
				 });
	       });
	       
	       // rpt mgr
	       $("#btn-add-rpt").click(function() {
		        if(!selectedTreeNode) {
	               layer.alert('请选择报表模板存放的目录!', {icon: 0});
	               return false;
	            }
	            if(!selectedTreeNode.isParent) {
	               layer.alert('请选择报表模板存放的目录!', {icon: 0});
	               return false;
	            }
	            
	            var index = layer.open({
					type: 2, 
					title: '新建报表',
					shade:false,
					shift: -1,
				    shadeClose: true,
				    maxmin:true,
				    fix:false,
					content: "${path}/rptMgr/app/add_rpt.htm?folderId=" + selectedTreeNode.id
				});
				
				layer.full(index);
	       });
	       
	       $("#btn-mod-rpt").click(function() {
	            if(!selectedTreeNode) {
	               layer.alert('请选择报表模板!', {icon: 0});
	               return false;
	            }
	            if(selectedTreeNode.isParent) {
	               layer.alert('请选择报表模板!', {icon: 0});
	               return false;
	            }
	            
	            document.location.href = "${path}/rptMgr/app/update_rpt.htm?rptId=" + selectedTreeNode.key;
	       });
	       
	       $("#btn-del-rpt").click(function() {
	            if(!selectedTreeNode) {
	               layer.alert('请选择报表模板!', {icon: 0});
	               return false;
	            }
	            if(selectedTreeNode.isParent) {
	               layer.alert('请选择报表模板!', {icon: 0});
	               return false;
	            }
	            
	            layer.confirm('您确定要删除该报表模板文件吗?', {icon: 3, title:'提示'}, function(index){	
	               layer.close(index);
		           $.ajax({
					   type: "POST",
					   url: "${path }/rptMgr/app/del_rpt_tplt.htm",
					   data: {rptId:selectedTreeNode.key},
					   dataType : "json",
					   success: function(suc){
					     if(!suc) {
					        layer.alert('报表模板文件删除出现错误!', {icon: 2});
					     } else {
					        treeObject.removeNode(selectedTreeNode);
					        var parentNode = selectedTreeNode.getParentNode();
					        if(!parentNode.isParent) {
					           parentNode.isParent = true;
					           treeObject.updateNode(parentNode);
					        }
					        selectedTreeNode = null;
					        
					        $("#rptMgr-form").attr("action", "");
					        $("#rptName").empty();
					        $("#rptUrl").empty();
					        $("#ct").empty();
					        $("#mt").empty();
					     }
					   },
					   error:function() {
					       layer.alert('报表模板文件删除出现错误!', {icon: 2});
					   }
				   });		
		       });
	       });
	       
	       $("#tree-down").click(function() {
		        treeObject.expandAll(true);
		   });
		   
		   $("#tree-up").click(function() {
		        treeObject.expandAll(false);
		   });
		   
		   $("#btn-query-rpt").click(function(){
		        if($("#rptMgr-form").attr("action") == "") {
		            layer.alert('请选择报表', {icon: 0});
		            return false;
		        }
		        $("#rptMgr-form").submit();
		   });
		   
	   });
	</script>
</body>
</html>
