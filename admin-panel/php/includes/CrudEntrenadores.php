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

    


}








?>