<?php 	
    $ip="192.168.110.148";
	function  connsql(){
	$conn = @mysqli_connect($ip, "root", "it12345678") or die("数据库链接错误");
	if($conn){
	   
	 }else{
      echo "<br>";  
	  echo "connect fail"; 
	  echo "<br>";
	}
	   mysqli_select_db($conn,"KOIDE"); 
	   mysqli_query($conn,"set character set 'utf8'");//使用UTF-8中文编码读库 
	   mysqli_query($conn,"set names 'utf8'");//使用UTF-8中文编码写库       	
	   return $conn;
	} 
	function insert($table,$array){
	   $conn=connsql();
	   $keys="".join(",",array_keys($array));
       $vals="'".join("','",array_values($array))."'";
       $sql="INSERT INTO {$table} ({$keys})VALUES ({$vals})";
       if ($conn->query($sql) === TRUE) {
		   return null;
       } else {
           echo "Error: " . $sql . "<br>" . $conn->error;
           return $sql;
    }
	}
	function update($table,$array,$where=null){
	   $sql="update {$table} set cName='{$array}' ".($where==null?null:" where ").$where;
       mysqli_query(connsql(),$sql);
       return mysqli_affected_rows(connect());	
	}
	function deletedata($table,$where){
	    $where= $where==null?null:" where ".$where;
        $sql ="delete from {$table}{$where}";
        mysqli_query($sql);
        return mysqli_affected_rows();
	}
	function queryone($sql,$result_type=MYSQLI_ASSOC){  //$result_type = MYSQL_ASSOC这个返回的数组是以数据表中的字段为键的而MYSQL_NUM是以数字为键搜索的
	    $result=mysqli_query(connsql(),$sql);
        if ($result->num_rows > 0) {
        // 输出一行数据
        while($row = $result->fetch_assoc()) {
            return $row;
		}
        } else {
        return "error";
    }
	}
	function queryall($sql,$result_type=MYSQLI_ASSOC){
       $conn=connsql();
       $result=$conn->query($sql);
       if ($result->num_rows > 0) {
        // 输出每行数据
        while($row = $result->fetch_assoc()) {
            $rows[]=$row;
        }
        } else {
        echo "0 result";
        }
        return $rows;
	    }    
    function execsql($sql){
	     mysqli_query(connsql(),$sql);
         return mysqli_affected_rows();
	}
		?>