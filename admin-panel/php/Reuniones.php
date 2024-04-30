<?php
require ("includes/CrudReuniones.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showReuniones();
            break;
       
    }
}



	function showReuniones(){

        $dataBase = new Reuniones();

		$result = $dataBase->show();
		

        if($result == "No hay reuniones en la base de datos" || $result == "Error al obtener las reuniones"){
            echo $result;
        }else{
            $reuniones = array(); 

        while ($row = $result->fetch_assoc()) {
            $reuniones[] = $row;
        }

        echo json_encode($reuniones);
        }


	}

?>

