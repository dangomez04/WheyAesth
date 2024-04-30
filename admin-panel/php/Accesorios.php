<?php
require ("includes/CrudAccesorios.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showAccesorios();
            break;
       
    }
}



	function showAccesorios(){

        $dataBase = new Accesorios();

		$result = $dataBase->show();
		

        // if($result == "No hay accesorios en la base de datos" || $result == "Error al obtener los accesorios"){
        //     echo $result;
        // }else{
        //     // $accesorios = $result->fetch_assoc();

        //     echo json_encode($result);

        // }


	}

?>

