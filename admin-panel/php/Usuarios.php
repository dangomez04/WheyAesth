<?php
require ("includes/CrudUsuarios.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showUsuarios();
            break;
       
    }
}



	function showUsuarios(){

        $dataBase = new Usuarios();

		$result = $dataBase->show();
		

        if($result == "No hay usuarios en la base de datos" || $result == "Error al obtener los usuarios"){
            echo $result;
        }else{
            $usuarios = array(); 

        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }

        echo json_encode($usuarios);
        }


	}

?>

