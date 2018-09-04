				function chart_3_0(){
					$.ajax({ url: "php/getdatas.php",
                            type:'post'	,data:{sql:"select * from RD_AUTO_Machine.Plan_AutoD"},					
							context: document.body, 
							dateType:"json",
							success: function(data){
							var data_json=JSON.parse(data);
							var append_string1="PLANqty";
							var append_string2="DONEqty";
							var append_string3="MACH";
							var PLANqty=" ";
							var DONEqty=" ";
							var MACH=" ";
							var length=data_json.length;
							PLANqty=getString(data_json,append_string1);
							DONEqty=getString(data_json,append_string2);
							MACH=getString(data_json,append_string3);
							chart_bar(PLANqty,DONEqty,MACH,data_json);                  	 						  		  
						},
							error:function(){
							
						}
					});
}
             function list(){
			 $.ajax({ url: "php/getdatas.php",
                            type:'post'	,data:{sql:"select * from RD_AUTO_Machine.Plan_prd"},					
							context: document.body, 
							dateType:"json",
							success: function(data){
							var data_json=JSON.parse(data);
							getdatas(data_json,3,2,0,"MACH");			 						 
							getdatas(data_json,3,2,1,"PLANqty");	 					 
							getdatas(data_json,3,2,2,"qtyOK");		   //列表赋值			  
							getdatas(data_json,3,2,3,"Remainqty");
							getdatas(data_json,3,2,4,"ITEMNO");	
							},
			                 error:function(){
			 
			                 }
			         });
			 }
				function chart_5_0(){
	             $.ajax({ url: "php/getdatas.php", 
						    type:'post',data:{sql:"select * from RD_AUTO_Machine.Plan_NG"},
							context: document.body, 
							dateType:"json",
							success: function(data){							 
						     var data_json=JSON.parse(data);
							 var append_string="NGqty";
							 var NGqty=" ";
							 NGqty=getString(data_json,append_string);
                             chart_line(NGqty,data_json);												
						    },
							error:function(){
							  
							}
						});
				}
				function num(){
				   $.ajax({ url: "php/getdatas.php", 
			       type:'post',data:{sql:"select * from RD_AUTO_Machine.Plan_AutoSum"},
				   context: document.body, 
				   dateType:"json",
				   success: function(data){
				     var data_json=JSON.parse(data);
				     var now = new Date();
					$("#1_0_0_0").text(data_json[0]["PLANqty"]);
					$("#1_0_0_3").text(data_json[0]["TARGETqty"]);
					$("#1_0_3_3").text(data_json[0]["MACHqty"]);
					$("#1_0_0_6").text(data_json[0]["DONEqty"]);
					$("#1_0_3_0").text(data_json[0]["NGqty"]);
					$("#1_0_0_9").text(data_json[0]["Remainqty"]);
					$("#1_0_3_6").text(data_json[0]["DoneRate"]);
					$("#1_0_3_9").text(data_json[0]["RemainRate"]); 
					$("#time").text(now.getFullYear() + "-" +((now.getMonth()+1)<10?"0":"")+(now.getMonth()+1)+"-"+(now.getDate()<10?"0":"")+now.getDate());
				},	
		        error:function(){
		         
		        }
		      });
		 }
		 //参数一：json数组长度（data_json），参数二：需要拼接字符字段
		  function getString(data_json,append_string){    
		    var string=" ";			
			var length=data_json.length;
			for(var i=0;i<length;i++){
				string += 'data_json[' +i+ ']["'+append_string+'"]' + ',';
				}
				if (string.length > 0) {
                   string = string.substr(0, string.length - 1);
                }			
			return string;
		  }
		  //参数一：json数组长度（data_json），参数二：起始的id中第1\2\3\4个数，参数三：需要赋值的字段
		  function getdatas(data_json,one,two,four,string){
			 var length=data_json.length;
 	          if(length==11){                    //当自动机开机数是11时执行该分支
			    for(var i=0;i<length;i++){
			   //$("#3_2_2_0").text(data_json[0]["MACH"]); 
                $("#"+one+"_"+two+"_"+(i+2)+"_"+four).text(data_json[i][string]);					 
			}
			  }	else{                        //当开机数不是11时执行该分支
                 for(var i=0,j=0;i<length;i++,j++){
			   //$("#3_2_2_0").text(data_json[0]["MACH"]); 
                $("#"+one+"_"+two+"_"+(j+2)+"_"+four).text(data_json[i][string]);		//需要循环使用表格		 
			    if(j==10){
				   j=0;
		
				   if(getdata_flag==0){
					 getdata_flag=1;
					 return;
				   }
				}
			}
			  }				  
		  }
		   
		 