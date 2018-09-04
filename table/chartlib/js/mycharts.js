 function barchart(bar_attribute){
	var default_param={                 //需要传入的参数值
	mychart:" ",
	title:{
		text:" ",               //图表主标题
	    subtext:" ",	        //图表副标题
		padding:" ",            //标题内边距
		left:" ",
		top:" ",                //上下左右距离
		right:" ",
		bottom:" ",
	    textStyle:{
			fontSize:" ",
			color:" "}
	},       
	tooltip:{                     //提示框组件
		trigger:"axis" ,             //item(数据视图触发，主要用于散点图、饼图)，axis(坐标轴触发，主要 用于柱状图、折线图)    	 	 
	   axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
        },
	   // textStyle:{
			// fontSize:" ",
			// color:" "}
	}, 
      toolbox:{    //工具栏，内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具
	   show:true,  //默认为true
	  // // orient:" ",  //工具栏icon的布局朝向
	  // // itemSize:" ", //工具栏icon的大小
	  // // itemGap:" ",   //工具栏icon每项之间的间隔
	  // // showtitle:" ",  //是否在鼠标hover的时候显示每个工具icon的标题
	  feature:{        //各工具栏配置项
	     restore:{},        //配置项还原
	     dataView:{readOnly: false},       //数据视图工具，可以展示当前图表所用的数据，编辑后可动态更新
		// dataZoom:" ",        //数据区域缩放
		 saveAsImage: {},       //保存为图片   
         magicType:{            //动态类型切换
		   show:true,            //是否显示该工具(默认为true)     
		   type:['line','bar','stack']           //['line','bar','stack(堆叠模式)','tiled(平铺模式)']
		 }		 
	 },   
	  left:" ",
	  right:" ",
	  top:" ",
	  bottom:" ",
	  width:" ",
	  height:" "
	 },	
	 // grid:{                   //直角坐标系内绘制网格
	    // show:true,              //默认为flase
	    // left:" ",
	    // top:" ",
	    // right:" ",
	    // bottom:" "
	 // },
	legend:{
	    data:" ",              //图例组件
		//align:" ",            //对齐方式
		show:true  ,           //默认为true
	     textStyle:{
			fontSize:" ",
			color:" "}
	},                 
	xAxis:{
        type:"category",	          //value：数值轴  category：类目轴（默认）（必须通过data设置数据）  time:时间轴  log：对数轴	
		data:" " ,              //x轴数据（当type=category时有效）
	    nameTextStyle:{
		  color:" ",
          fontSize:" ",
		  align:" ",
		  fontFamily:" "
		},
		dataZoomEnabled:false,     //是否启用滚动条
		 zoomStart:"0",           //滚动条开始位置
		 zoomEnd:"30"             //滚动条结束位置
	},
    yAxis:{                    //y轴数据
		  type:"value",  
        nameTextStyle:{
		  color:" ",
          fontSize:" ",         //同xAxis，默认为value  
		  align:" ",
		  fontFamily:" "
		}		     		
	},
	// dataset:{                //用于单独的数据集声明，实现数据单独管理，被多个组件复用
	  // source:" ",                //原始数据，一般来说，原始数据表达的是二维表
	// },
	// radar:{                       //雷达图坐标系组件，只适用于雷达图
	    // center:" ",               //圆心坐标['50%,50%'],第一项是横坐标，第二项是纵坐标
	    // radius:" ",                //半径
		// indicator:" "              //雷达图的指示器，用来指定雷达图中的多个变量
		// //[name:指示器名称，max:指示器最大值，min:指示器最小值，color:标签待定颜色]
	// },
	// visualMap:{    //视觉映射组件，用于视觉编码，将数据映射到视觉元素
	   // type:" ",    //可选择continuous(默认)和piecewise两种类型
	   // min:" ",     //指定允许的最小值
	   // max:" ",     //指定允许的最大值
	   // range:" ",   //指定手柄应数值的位置，默认为range[min,max]
	   // calculable:" ", //是否显示拖拽用的手柄
	   // realtime:" ",  //拖拽时是否实时更新
	   // text:" ",    //两端的文本
	// },
	series:[ ]                  //系列列表，每个系列通过type决定自己的图标类型
	// {                           //图表展示数据
		// name: '',
		// type: '',          //可选，展示类型：bar、line、pie
		// data: ''
        // barGap: "-100%"    当为-100%的实现重叠
 }
    $.extend(default_param,bar_attribute); 
	var param = {};
	function dealObjectValue(default_param){
     if ( default_param === null || default_param === undefined || default_param === "" ) return param;
	  for ( var key in default_param ){
        if ( typeof(default_param[key]) === "Object" ){
            param[key] = dealObjectValue(default_param[key]);
        }else if(  default_param[key] !== null && default_param[key] !== undefined && default_param[key]!== " "  ){
            param[key] = default_param[key];
        }
    } 
	}
     dealObjectValue(default_param);
	 return param;
	//  window.onresize = default_param.mychart.resize;  //自适应
 }	
 //参数一：json数组长度（length），参数二：需要拼接字符字段
 function getString(data_json,append_string){    
   var string=" ";
   var length=data_json.length;
   for(var i=0;i<length;i++){
	  string += "data_json[" +i+ ']["'+append_string+'"]' + ',';
	}
	if (string.length > 0) {
      string = string.substr(0, string.length - 1);
    }
	string=string.split(",");
	for(var i=0;i<length;i++){
	  string[i]=eval(string[i])
	}
	return string;
	 }
  function change(table){         //让表格内容上下滚动
	  var css_style="background:#062236;color:#fafafa;vertical-align:middle;text-align:center;";
		var row = table.insertRow(table.rows.length);//在table的最后增加一行,table.rows.length是表格的总行数
		table.style=css_style;
		for(j=0;j<table.rows[0].cells.length;j++){//循环第一行的所有单元格的数据，让其加到最后新加的一行数据中（注意下标是从0开始的）			
			var cell = row.insertCell(j);//给新插入的行中添加单元格
			cell.height = "40px";//一个单元格的高度，跟css样式中的line-height高度一样
			cell.style.cssText=css_style;
			cell.innerHTML = table.rows[0].cells[j].innerHTML;//设置新单元格的内容，这个根据需要，自己设置	
		}
		table.deleteRow(0);//删除table的第一行
	};
   function tableInterval(table_id){
	 var table = document.getElementById(table_id);//获得表格
	 change(table);//执行表格change函数，删除第一行，最后增加一行，类似行滚动
	};
	 function draw_chart(sql_sentence,object,db_ip,db_name){         //object中定义的值必须跟数据库返回的字段相同
  		       var temp=new Array(); 
	     $.ajax({ url:"../php/php/getdatas.php",
                            type:'post'	,data:{sql:sql_sentence,db_ip:db_ip,db_name:db_name},					
							context: document.body, 
							dateType:"json",
							async: false,
							success: function(data){
							 var data_json=JSON.parse(data);
							 var arr = Object.keys(object);
							 var len = arr.length;	 		 
							 var array=Object.getOwnPropertyNames(object);   //Array[i](取出key)  object[Array[i]](取出value)
							 for(var i=0;i<len;i++){
							   temp[i]=getString(data_json,object[array[i]]);                 		  
							 }							 
						},				  
							error:function(){
                              alert("出错")								
						}
					}); 
                return temp;					
		  }