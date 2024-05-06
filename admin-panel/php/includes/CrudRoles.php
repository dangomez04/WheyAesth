<?php 
require("Connection.php");

class Roles{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT * FROM roles");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay roles en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los roles";
        }



    }


    function insertRol($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $nombre_rol = $data['nombre_rol'];

        $stmt = $conexion->prepare("INSERT INTO roles (rol) VALUES (?)");

        $stmt->bind_param("s", $nombre_rol);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar el rol";
        }


   		 $conexion->close();


    
        }


        function updateRol($data){

            $sqlConnection = new Connection();
            $conexion = $sqlConnection->getConnection();

            $id_rol = $data['id_rol'];
            $nombre_rol = $data['nombre_rol'];
    
            $stmt = $conexion->prepare("UPDATE roles SET rol = ? WHERE roles.id_rol = ?");
    
            $stmt->bind_param("si", $nombre_rol,$id_rol);
    
            try{
                $stmt->execute();
               
                $stmt->close();
               
                return true;
    
            }catch(Exception $e){
                return "Error al actualizar el rol";
            }
    
    
                $conexion->close();
    
        }


    function searchRol($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();
    
        $id_rol = $data['id_rol'];
    
    
    
        $stmt = $conexion->prepare("SELECT * FROM roles WHERE roles.id_rol = ?");
        
        $stmt->bind_param("i", $id_rol);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No existe un rol con ese id";
            }
            return $result;
    
        }catch(Exception $e){
            return "Error al buscar un rol con ese id";
        }
    }
    
    function deleteRol($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_rol = $data['id_rol'];

        $stmt = $conexion->prepare("DELETE FROM roles WHERE id_rol = ?");

        $stmt->bind_param("i", $id_rol);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar el rol";
        }

    }


}








?>