 function chart_line(string1,data_json){	//参数1：不良品数量  参数二：json数组解析后的数值
   chart.draw(eval('('+    '{"chart":{ 	"type":"area", 	"height":200, 	"backgroundColor":"#062236", 	"percent":2 	}, 	"title":{ "align":"left", 	"text":"项目不合格产品数量/小时", 	"textStyle":{"fontSize":14, 	"color":"#eeeeee" 	 }}, 	 "legend":{ "textStyle":{"color":"#eeeeee"}}, 		 "series":[{"data":['+string1+']}], 		 "xAxis":{"data":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"], 		 "type":"category", 		 "lineColor":"#C0D0E0", 		 "splitLineEnabled":true, 		 "splitLineType":"solid", 		 "label":{"textStyle":{"color":"#eeeeee"}}}, 		 "yAxis":{"type":"number","lineColor":"#C0D0E0", 		 "splitLineEnabled":false, 		 "splitLineType":"solid", 		 "label":{"textStyle":{"color":"#eeeeee"}}}}'+')'),'chart_5_0')	
   }