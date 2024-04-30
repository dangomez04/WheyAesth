<?php
require ("includes/CrudEntrenadores.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showEntrenadores();
            break;
       
    }
}



	function showEntrenadores(){

        $dataBase = new Entrenadores();

		$result = $dataBase->show();
		

        if($result == "No hay entrenadores en la base de datos" || $result == "Error al obtener los entrenadores"){
            echo $result;
        }else{
            $entrenadores = array(); 

        while ($row = $result->fetch_assoc()) {
            $entrenadores[] = $row;
        }

        echo json_encode($entrenadores);
        }


	}

?>

