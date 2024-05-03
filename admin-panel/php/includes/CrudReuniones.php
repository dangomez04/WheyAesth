<?php 
require("Connection.php");

class Reuniones{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT reuniones.*,entrenadores.nombre_entrenador FROM reuniones JOIN entrenadores ON reuniones.id_entrenador=entrenadores.id_entrenador");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay reuniones en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los reuniones";
        }



    }

    function insertReunion($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $fecha_reunion = $data['fecha_reunion'];
        $hora_reunion = $data['hora_reunion'];
        $duracion_reunion = $data['duracion_reunion'];
        $tematica_reunion = $data['tematica_reunion'];
        $aforo_reunion = $data['aforo_reunion'];
        $entrenador_reunion = $data['entrenador_reunion'];

    
		$stmt = $conexion->prepare("INSERT INTO reuniones (fecha_reunion, hora_reunion, duracion_reunion,tematica_reunion,aforo_reunion,id_entrenador) VALUES (?, ?, ?, ?, ?, ?)");

        $stmt->bind_param("sdisii", $fecha_reunion,$hora_reunion,$duracion_reunion, $tematica_reunion, $aforo_reunion, $entrenador_reunion);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar la reunión";
        }


   		 $conexion->close();

    }

    function deleteReunion($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_reunion = $data['id_reunion'];

        $stmt = $conexion->prepare("DELETE FROM reuniones WHERE id_reunion = ?");

        $stmt->bind_param("i", $id_reunion);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar la reunión";
        }



    }
    


}








?>