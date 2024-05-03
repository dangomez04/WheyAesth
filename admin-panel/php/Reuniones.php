<?php
require ("includes/CrudReuniones.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showReuniones();
            break;

        case "insertar-reunion":
           echo insertReunion();
             break; 

        case "eliminar-reunion":
            echo deleteReunion(); 
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


    function insertReunion(){
        $fecha_reunion = $_POST['fecha_reunion'];
        $hora_reunion = $_POST['hora_reunion'];
        $duracion_reunion = $_POST['duracion_reunion'];
        $tematica_reunion = $_POST['tematica_reunion'];
        $aforo_reunion = $_POST['aforo_reunion'];
        $entrenador_reunion = $_POST['entrenador_reunion'];


        $data = array(
            'fecha_reunion' => $fecha_reunion,
            'hora_reunion' => $hora_reunion,
            'duracion_reunion' => $duracion_reunion,
            'tematica_reunion' => $tematica_reunion,
            'aforo_reunion' => $aforo_reunion,
            'entrenador_reunion' => $entrenador_reunion

        );

        $dataBase = new Reuniones();
        $result = $dataBase->insertReunion($data);

        if($result === true){
            echo true;

        }else {
            echo $result;
        }


    }

    function deleteReunion(){

        $id_reunion = $_POST['id_reunion'];
        
        $data = array(
        
            'id_reunion' => $id_reunion
        
         );


         $dataBase = new Reuniones();
         $result = $dataBase->deleteReunion($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }

    }

?>

