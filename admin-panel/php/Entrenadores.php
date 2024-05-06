<?php
require ("includes/CrudEntrenadores.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showEntrenadores();
            break;

        case "insertar-entrenador":
            echo insertEntrenador();
             break; 

        case "eliminar-entrenador":
                echo deleteEntrenador();
             break;  
           
        case "buscar-entrenador":
              echo searchEntrenador();
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

    function insertEntrenador(){

        if(isset($_POST['id_entrenador']) && !empty($_POST['id_entrenador'])) {

            $id_entrenador = $_POST['id_entrenador'];
            $nombre_entrenador = $_POST['nombre_entrenador'];
            $especialidad_entrenador = $_POST['especialidad_entrenador'];
            $email_entrenador = $_POST['correo_entrenador'];
    
    
            $data = array(
                'id_entrenador' => $id_entrenador,
                'nombre_entrenador' => $nombre_entrenador,
                'especialidad_entrenador' => $especialidad_entrenador,
                'email_entrenador' => $email_entrenador
    
            );
    
            $dataBase = new Entrenadores();
            $result = $dataBase->updateEntrenador($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }



        }else{
            $nombre_entrenador = $_POST['nombre_entrenador'];
            $especialidad_entrenador = $_POST['especialidad_entrenador'];
            $email_entrenador = $_POST['email_entrenador'];
    
    
            $data = array(
                'nombre_entrenador' => $nombre_entrenador,
                'especialidad_entrenador' => $especialidad_entrenador,
                'email_entrenador' => $email_entrenador
    
            );
    
            $dataBase = new Entrenadores();
            $result = $dataBase->insertEntrenador($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }
        }

        


    }

    function searchEntrenador(){

        $id_entrenador = $_POST['id_entrenador'];

        $data = array(
                'id_entrenador' =>  $id_entrenador
            );

    $dataBase = new Entrenadores();
    $result = $dataBase->searchEntrenador($data);

    if($result=="No existe un entrenador con ese id" || $result=="Error al buscar un entrenador con ese id"){
        echo $result;
    }else{
        $entrenador_encontrado = $result->fetch_assoc();
        echo json_encode($entrenador_encontrado);

    }

    }

    function deleteEntrenador(){

        $id_entrenador = $_POST['id_entrenador'];
        
        $data = array(
        
            'id_entrenador' => $id_entrenador
        
         );


         $dataBase = new Entrenadores();
         $result = $dataBase->deleteEntrenador($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }

    }

?>

