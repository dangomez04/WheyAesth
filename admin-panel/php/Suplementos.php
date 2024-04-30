<?php
require ("includes/CrudSuplementos.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showSuplementos();
            break;
       
    }
}



	function showSuplementos(){

        $dataBase = new Suplementos();

		$result = $dataBase->show();
		

        if($result == "No hay suplementos en la base de datos" || $result == "Error al obtener los suplementos"){
            echo $result;
        }else{
            $suplementos = array(); 

        while ($row = $result->fetch_assoc()) {
            $suplementos[] = $row;
        }

        echo json_encode($suplementos);
        }


	}

?>

