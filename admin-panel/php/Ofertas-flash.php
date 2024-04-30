<?php
require ("includes/CrudOfertas.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showOfertas();
            break;
       
    }
}



	function showOfertas(){

        $dataBase = new Ofertas();

		$result = $dataBase->show();
		

        if($result == "No hay ofertas en la base de datos" || $result == "Error al obtener las ofertas"){
            echo $result;
        }else{
            $ofertas = array(); 

        while ($row = $result->fetch_assoc()) {
            $ofertas[] = $row;
        }

        echo json_encode($ofertas);
        }


	}

?>

