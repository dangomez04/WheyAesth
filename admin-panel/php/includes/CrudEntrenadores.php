<?php 
require("Connection.php");

class Entrenadores{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT * FROM entrenadores");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay entrenadores en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los entrenadores";
        }



    }


  

    function insertEntrenador($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $nombre_entrenador = $data['nombre_entrenador'];
        $especialidad_entrenador = $data['especialidad_entrenador'];
        $email_entrenador = $data['email_entrenador'];
    


		$stmt = $conexion->prepare("INSERT INTO entrenadores (nombre_entrenador, especialidad_entrenador, correo_entrenador) VALUES (?, ?, ?)");

        $stmt->bind_param("sss", $nombre_entrenador,$especialidad_entrenador,$email_entrenador);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar el entrenador";
        }


   		 $conexion->close();


    }

    
    function deleteEntrenador($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_entrenador = $data['id_entrenador'];

        $stmt = $conexion->prepare("DELETE FROM entrenadores WHERE id_entrenador = ?");

        $stmt->bind_param("i", $id_entrenador);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar el entrenador";
        }



    }

    function searchEntrenador($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();
    
        $id_entrenador = $data['id_entrenador'];
    
    
    
        $stmt = $conexion->prepare("SELECT * FROM entrenadores WHERE entrenadores.id_entrenador = ?");
        
        $stmt->bind_param("i", $id_entrenador);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No existe un entrenador con ese id";
            }
            return $result;
    
        }catch(Exception $e){
            return "Error al buscar un entrenador con ese id";
        }
        
    
    }

}








?>