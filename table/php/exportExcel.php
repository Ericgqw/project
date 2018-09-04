
<?php
	header("Content-Type:text/html;charset=utf-8");
	include_once('../Classes/PHPExcel.php');
	error_reporting(E_ALL);
	ini_set('display_errors', TRUE);
	ini_set('display_startup_errors', TRUE);
	$jsonstr = $_POST['exportData'];
	$json = json_decode($jsonstr);
	$table = $json->report->table;
	$len = count($table);
	//创建对象
	$excel = new PHPExcel();
	//Excel表格式,这里简略写了8列
	$letter = array('A','B','C','D','E','F','F','G');
	$letter = array_slice($letter,0,$len);
	$objActSheet = $excel->getActiveSheet();
	for($i = 0;$i < $len;$i++) {
		$row = $table[$i];
			for($j= 0;$j<=count($row);$j++){
				$col = $row[$j];
				if($col !=null){
					$index = $j-1>0?$j-1:0;
					$pre_col = $row[$index];
					$cp = $pre_col->cp;
					$x = $j+$cp-1;
					$rn = $col->rn + 1;
					$y = $i+1;
					if($col->cp > 1){
						$nx = $x+$col->cp-1;
						$objActSheet->mergeCells("$letter[$x]$y:$letter[$nx]$y");
					}
					//设置单元格的值;
					$objActSheet->setCellValue("$letter[$x]$y",$col->text->val);
					
					//设置单元格宽,高度
					$objActSheet->getColumnDimension("$letter[$x]")->setWidth($col->w/8);
					$objActSheet->getRowDimension("$y")->setRowHeight("$col->h");
					//设置字体样式
					if(isset($col->style->fw)){
						$objActSheet->getStyle("$letter[$x]$y")->getFont()->setBold(true);
					}
					//垂子对齐方式
					if($col->style->verticalAlign=="middle"){
						$objActSheet->getStyle("$letter[$x]$y")->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_CENTER);
					}else if($col->style->verticalAlign=="top"){
						$objActSheet->getStyle("$letter[$x]$y")->getAlignment()->setVertical(PHPExcel_Style_Alignment::VERTICAL_TOP);
					}
					//水平对齐方式
					if(isset($col->style->textAlign)){
						if($col->style->textAlign=="center"){
							    $objActSheet->getStyle("$letter[$x]$y")->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_CENTER);
						}else{
							$objActSheet->getStyle("$letter[$x]$y")->getAlignment()->setHorizontal(\PHPExcel_Style_Alignment::HORIZONTAL_LEFT);
						}
					}
					if(isset($col->style->border)){
						$around = null;
						$aroundVal = $col->style->border[0]->index;
						if($aroundVal==5){
							$around = "allborders";
						}else if($aroundVal==0){
							$around = "bottom";
						}else if($aroundVal==1){
							$around = "top";
						}else if($aroundVal==2){
							$around = "left";
						}else if($aroundVal==3){
							$around = "right";
						}
						$styleArray = array(
							'borders'=>array(
								$around=>array(
									'style'=>PHPExcel_Style_Border::BORDER_THIN,
									'color'=>array(
									'rgb'=>'000000'
									)
								),
							),
						);
						if($col->cp == 1){//不存在单元格合并的情况
							$objActSheet->getStyle("$letter[$x]$y")->applyFromArray($styleArray);
						}else{
							$objActSheet->getStyle("$letter[$x]$y")->applyFromArray($styleArray);
							$x++;
							$objActSheet->getStyle("$letter[$x]$y")->applyFromArray($styleArray);
						}
						
					}
				}
			}
	}
	
	//创建Excel输入对象
	$write = new PHPExcel_Writer_Excel5($excel);
	ob_end_clean();//清空缓存，避免乱码;
	header("Pragma: public");
	header("Expires: 0");
	header("Cache-Control:must-revalidate, post-check=0, pre-check=0");
	header("Content-Type:application/force-download");
	header("Content-Type:application/vnd.ms-execl");
	header("Content-Type:application/octet-stream");
	header("Content-Type:application/download");
	header('Content-Disposition:attachment;filename="testdata.xls"');
	header("Content-Transfer-Encoding:binary");
	$write->save('php://output');
?>
