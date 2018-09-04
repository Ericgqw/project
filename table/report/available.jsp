<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
%>
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>错误信息</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	
	<link href="${path}/anyrt/css/bootstrap.min.css" rel="stylesheet" />
	<link href="${path}/anyrt/css/style.css" rel="stylesheet">
	
	<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="${path}/anyrt/js/html5shiv.min.js"></script>
      <script src="${path}/anyrt/js/respond.min.js"></script>
    <![endif]-->
    <style>
	  body {
         background: #fafafa;
	  }

	  h3 {
		 margin-top:10px;
	  }
	</style>
    
	<script src="${path}/anyrt/js/jquery-1.11.3.min.js"></script>
    <script src="${path}/anyrt/js/bootstrap.min.js"></script>
	
  </head>
 <body style="overflow: auto;">
 <div class="error-full-page">
	<div class="container">
		<div class="row">
			<div class="col-sm-12 page-error">
				<div class="error-number text-azure">
					500
				</div>
				<div class="col-sm-12" style="text-align: center;">
				   <h3> 您没有权限访问该页面 </h3>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
  $(function(){
      $("#error").click(function(){
          var type = $(this).attr("type");
          if(type == 0) {
             $(this).find("i").removeClass("icon iconfont icon-down2").addClass("icon iconfont icon-arrowon");
             $(this).next("p").show();
             $(this).attr("type", 1);
          } else {
             $(this).find("i").removeClass("icon iconfont icon-arrowon").addClass("icon iconfont icon-down2");
             $(this).attr("type", 0);
             $(this).next("p").hide();
          }
      });
  });
</script>
</body>
</html>

