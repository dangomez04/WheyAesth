<?php 
require("Connection.php");

class Accesorios{

   

    function show(){

        // $sqlConnection = new Connection();
        // $mySQL = $sqlConnection->getConnection();
        // $stmt = $mySQL->prepare("SELECT * FROM accesorios");

        // try{
        //     $stmt->execute();
        //     $result = $stmt->get_result();
        //     $stmt->close();
        //     if($result->num_rows==0){
        //         return "No hay accesorios en la base de datos";
        //     }
        //     return $result;

        // }catch(Exception $e){
        //     return "Error al obtener los accesorios";
        // }


        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();


       
			$sql_accesorios=$conexion->query("SELECT * FROM accesorios");

		

		
	$json_Data=array();

	$accesorios=array();
	

	while ($row = mysqli_fetch_assoc($sql_accesorios)) {
		$accesorios[] = $row;
	}

	

	$json_Data['accesorios'] = $coches;
	

echo json_encode($json_Data);

$conexion->close();
    }

    


}








?>