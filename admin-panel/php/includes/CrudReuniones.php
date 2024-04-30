<?php 
require("Connection.php");

class Reuniones{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT * FROM reuniones");

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

    


}








?>