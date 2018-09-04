<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
request.setAttribute("path", path);
%>
 <div class="error-full-page">
	<div class="container">
		<div class="row">
			<div class="col-sm-12 page-error">
				<div class="error-number text-azure">
					500
				</div>
				<div class="col-sm-12" style="text-align: center;">
				   <h3> 数据查询失败! </h3>
				</div>
			</div>
		</div>
		<div class="alert alert-danger">
			<i class="icon iconfont icon-error"></i>
			<strong>错误信息 </strong>&nbsp;&nbsp;
			<a href="javascript:void(0)" id="error" type="0">
			  <i class="icon iconfont icon-down2 deep-red icon-size-16"></i>
			</a>
			<p style="display: none;color: black;">
			  ${errorMsg }
			</p>
		</div>
		<div style="width:100%;border-top: 1px solid #cac7c7;">
			<span style="color:red;">Log信息 </span>&nbsp;&nbsp;
			<p style="color: black;">
			  ${debug}
			</p>
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

