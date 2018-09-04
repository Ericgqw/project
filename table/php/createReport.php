<?php
	function createReport($allele,$cols,$rows,$alldata){
		$rowtotal = count($rows);//获取行数
		$coltotal = count($cols);//获取列数
		$arr = array(array());//该数组的作用主要是定位
		foreach($allele as $e){
			$rn = pq($e)->attr("rowNum");
			$cn = pq($e)->attr("colNum");
			$arr[$rn][$cn] = $e;
		}
		
		for($i=0;$i<$rowtotal;$i++){
			echo "<tr>";
			for($j=0;$j<$coltotal;$j++){
				$ele = $arr[$i][$j];
				if($ele==null){
					continue;
				}
				$rp = pq($ele)->attr("rowSpan");
				$cp = pq($ele)->attr("colSpan");
				for($k=0;$k<$rp;$k++){//处理合并的行
					for($m=0;$m<$cp;$m++){//处理合并的列
						if($k==0&&$m==0){
							continue;
						}
						$arr[$i+$k][$j+$m]=null;
					}
				}
				$rs = pq($ele)->attr("rowSpan");
				$cs = pq($ele)->attr("colSpan");
				$w = pq($ele)->attr("w");
				$h = pq($ele)->attr("h");
				//设置边框样式 side值和边框的映射关系 左：2  右:3  上: 1 下:0  全:5 
				$border = pq($ele)->find("border");
				$borderstyle="";
				if(count($border)>0){
					foreach($border as $bdr){
						$side = pq($bdr)->attr("side");
						$color = pq($bdr)->attr("color");
						$borderStyle = pq($bdr)->attr("borderStyle");
						$borderWidth = pq($bdr)->attr("borderWidth");
						if($side==0){
							$side="border-bottom";
						}else if($side==1){
							$side="border-top";
						}else if($side==2){
							$side="border-left";
						}else if($side==3){
							$side="border-right";
						}else if($side==5){
							$side ="border";
						}
						$borderstyle = $borderstyle.$side.":".$color." ".$borderStyle." ".$borderWidth."px;";
					}
				}
			
				//设置字体样式，文本对齐方式，背景色
				$fw = pq($ele)->find("fontWeight")->text();
				$fw = $fw?"font-weight:".$fw.";":"";
				$fs = pq($ele)->find("fontStyle")->text();
				$fs = $fs?"font-style:".$fs.";":"";
				$txtdec = pq($ele)->find("textDecoration")->text();
				$txtdec = $txtdec?"text-decoration:".$txtdec.";":"";
				$color = pq($ele)->find("color")->text();
				$color = $color?"color:".$color.";":"";
				$fontsize = pq($ele)->find("fontSize")->text();
				$fontsize = $fontsize?"font-size:".$fontsize."px;":"";
				$va = pq($ele)->find("verticalAlign")->text();
				$va = $va?"vertical-align:".$va.";":"";
				$ha = pq($ele)->find("horizontalAlign")->text();
				$ha = $ha?"text-align:".$ha.";":"";
				$bgc = pq($ele)->find("backgroundColor")->text();
				$bgc = $bgc?"background:".$bgc.";":"";
				$fontstyle = $fw.$fs.$txtdec.$color.$va.$ha.$fontsize.$bgc;
		
				echo "<td rowSpan='".$rs."'colspan='".$cs."'style='width:".$w."px;height:".$h."px;".$borderstyle."".$fontstyle."'>";
				$edits = pq($ele)->find("editStyle")->text();
				$name = pq($ele)->find("name")->text();
				if($ele->tagName=="conditioncell"){
					$height = pq($ele)->find("height")->text();
					$width = pq($ele)->find("width")->text();
					$height = $height?$height:26;
					$width = $width?$width:160;
					if($edits==1){//编辑框
						echo "<input type='text' name='".$name."' style='width:".$width."px;height:".$height."px' class='form-control'>";
					}else if($edits==2){//下拉列表框
						$option = pq($ele)->find("select>option");
						echo "<select name='".$name."' multi='0' style='width:".$width."px;height:".$height."px' class='selectpicker form-control' data-style='btn-select' data-width='160' data-container='body' title='' tabindex='-98'>
						<option value='' style='width:".$width."px;height:".$height."px'></option>";
						foreach($option as $o){
							$value = pq($o)->attr("value");
							$txt = pq($o)->text();
							echo"<option value='".$value."' style='width:".$width."px;height:".$height."px'>".$txt."</option>";
						}
						echo "</select>";
					}else if($edits==10){
						
						echo "<select name='".$name."' multi='0' style='width:".$width."px;height:".$height."px' class='selectpicker form-control' data-style='btn-select' data-width='160' data-container='body' title='' tabindex='-98'>
							<option value=''></option></select>";

					}else if($edits==3){
						$dataformat = pq($ele)->find("dateFormat")->text();
						$dataformat = $dataformat?$dataformat:"yyyy-MM-dd";
						echo "<input type='text' name='".$name."' style='width:".$width."px;height:".$height."px'class='form_time form-control has-form-icon' data-date-format='".$dataformat."' style='width:160px;'>";
					}else if($edits==6){
						$label=pq($ele)->find("group>check")->attr("label");
						$value=pq($ele)->find("group>check")->attr("value");
						echo "<input type='checkbox' name='".$name."' value='".$value."'><span style='margin-left:5px'>".$label."</span>";
					}else if($edits==7){
						echo "7";
					}else if($edits==9){
						
						$btntype = pq($ele)->find("button")->attr("type");
						if($btntype==20){
							echo "<input type='button' value='查询' class='c-btn blue-bg small' onclick='report.btnQueryWithParam()'>";
						}else if($btntype==21){
							echo "<input type='button' value='重置' class='c-btn skyblue-bg small'>";
						}else{
							$value=pq($ele)->find("name")->text();
							$height = $height==26?"auto":$height."px";
							$width = $width==160?"auto":$width."px";
							echo "<input type='button' value='".$value."' class='c-btn blue-bg small' style='width:".$width.";height:".$height."'>";
						}
					}else if($edits==4){
						echo "<input type='text' name='".$name."' multi='0' style='width:160px;' class='input-tree form-control has-form-icon' data='[]'>
						<i class='icon iconfont icon-ic_tree form-icon'></i>";
					}else if($edits==5){
						$label=pq($ele)->find("group>radio")->attr("label");
						$value=pq($ele)->find("group>radio")->attr("value");
						echo "<input type='radio' name='".$name."' value='".$value."'><span style='margin-left:5px'>".$label."</span>";
					}
				}else if($ele->tagName=="htmlcell"){
					$txt = pq($ele)->find("name")->text();
					echo $txt;
				}else if($ele->tagName=="columncell"){
					$val = pq($ele)->find("name")->text();
					echo $alldata[$val];
				}
				
				echo "</td>";
			}
			echo "</tr>";
		}
	}
?>