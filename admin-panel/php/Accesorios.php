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
		

        if($result == "No hay accesorios en la base de datos" || $result == "Error al obtener los accesorios"){
            echo $result;
        }else{
            $accesorios = array(); 

        while ($row = $result->fetch_assoc()) {
            $accesorios[] = $row;
        }

        echo json_encode($accesorios);
        }


	}

?>

