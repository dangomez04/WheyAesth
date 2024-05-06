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

        case "buscar-reunion":
            echo searchReunion(); 
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

    function searchReunion(){

        $id_reunion = $_POST['id_reunion'];

        $data = array(
                'id_reunion' =>  $id_reunion
            );

    $dataBase = new Reuniones();
    $result = $dataBase->searchReunion($data);

    if($result=="No existe una reunion con ese id" || $result=="Error al buscar una reunion con ese id"){
        echo $result;
    }else{
        $reunion_encontrada = $result->fetch_assoc();
        echo json_encode($reunion_encontrada);

    }



    }


    function insertReunion(){

        if(isset($_POST['id_reunion']) && !empty($_POST['id_reunion'])) {

            $id_reunion = $_POST['id_reunion'];
            $fecha_reunion = $_POST['fecha_reunion'];
            $tematica_reunion = $_POST['tematica_reunion'];
            $duracion_reunion = $_POST['duracion_reunion'];
            $hora_reunion = $_POST['hora_reunion'];
            $aforo_reunion = $_POST['aforo_reunion'];
            $id_entrenador = $_POST['id_entrenador'];

           
            $data = array(
                'id_reunion' => $id_reunion,
                'fecha_reunion' => $fecha_reunion,
                'tematica_reunion' => $tematica_reunion,
                'duracion_reunion' => $duracion_reunion,
                'hora_reunion' => $hora_reunion,
                'aforo_reunion' => $aforo_reunion,
                'id_entrenador' => $id_entrenador


               
            );
    
            $dataBase = new Reuniones();
            $result = $dataBase->updateReunion($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }

        }else{

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

