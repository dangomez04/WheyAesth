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

?>

