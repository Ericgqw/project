<script src="jquery.min.js"></script>
<!-- Chart code -->
<script>
var dataobj=[];
<?php
					$conn=mysql_connect("192.168.110.185","root","it12345678");
					if(!$conn){
						echo "连接失败";
					}
					mysql_select_db("RD_AUTO_Machine",$conn);
					mysql_query("set names utf8");
					//$sql="select * from $table_name";
					$sql = $_GET['sql'];
					$res=mysql_query($sql,$conn);

					while($row=mysql_fetch_row($res)){
					
						echo "var obj={ \"mydata\": ".$row[1].",\"mylabel\":\"".$row[0]."\"};";
						echo "dataobj.push(obj);";
					}
	
?>

var chart = AmCharts.makeChart( "chartdiv", {
  "type": "serial",
  "theme": "none",
  "dataProvider": dataobj ,
  
  "valueAxes": [ {
    "gridColor": "#FFFFFF",
    "gridAlpha": 0.2,
    "dashLength": 0
  } ],
  "gridAboveGraphs": true,
  "startDuration": 1,
  "graphs": [ {
    "balloonText": "[[category]]: <b>[[value]]</b>",
    "fillAlphas": 0.8,
    "lineAlpha": 0.2,
    "type": "column",
    "valueField": "mydata"
  } ],
  "chartCursor": {
    "categoryBalloonEnabled": false,
    "cursorAlpha": 0,
    "zoomable": false
  },
  "categoryField": "mylabel",
  "categoryAxis": {
    "gridPosition": "start",
    "gridAlpha": 0,
    "tickPosition": "start",
    "tickLength": 20
  },

  "export": {
    "enabled": true
  }

} );
</script>

<!-- HTML -->
<div id="chartdiv"></div>