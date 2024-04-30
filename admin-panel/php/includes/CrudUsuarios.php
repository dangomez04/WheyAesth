<?php 
require("Connection.php");

class Usuarios{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT usuarios.*,roles.rol FROM usuarios JOIN roles ON usuarios.id_rol=roles.id_rol");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay usuarios en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los usuarios";
        }



    }

    


}








?>