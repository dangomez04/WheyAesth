<?php
require ("includes/CrudRoles.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showRoles();
            break;

        case "insertar-rol":
            echo insertRol();
            break;
            
            
        case "eliminar-rol":
             echo deleteRol();
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


    function insertRol(){
        $nombre_rol = $_POST['nombre_rol'];

        $data = array(
            'nombre_rol' => $nombre_rol
           
        );

        $dataBase = new Roles();
        $result = $dataBase->insertRol($data);

        if($result === true){
            echo true;

        }else {
            echo $result;
        }

    }

    function deleteRol(){

        $id_rol = $_POST['id_rol'];
        
        $data = array(
        
            'id_rol' => $id_rol
        
         );


         $dataBase = new Roles();
         $result = $dataBase->deleteRol($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }


    }
?>

