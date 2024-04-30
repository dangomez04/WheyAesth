<?php
require ("includes/CrudRoles.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showRoles();
            break;
       
    }
}



	function showRoles(){

        $dataBase = new Roles();

		$result = $dataBase->show();
		

        if($result == "No hay roles en la base de datos" || $result == "Error al obtener los roles"){
            echo $result;
        }else{
            $roles = array(); 

        while ($row = $result->fetch_assoc()) {
            $roles[] = $row;
        }

        echo json_encode($roles);
        }


	}

?>

