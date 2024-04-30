<?php
require ("includes/CrudReservas.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showReservas();
            break;
       
    }
}



	function showReservas(){

        $dataBase = new Reservas();

		$result = $dataBase->show();
		

        if($result == "No hay reservas en la base de datos" || $result == "Error al obtener las reservas"){
            echo $result;
        }else{
            $reservas = array(); 

        while ($row = $result->fetch_assoc()) {
            $reservas[] = $row;
        }

        echo json_encode($reservas);
        }


	}

?>

