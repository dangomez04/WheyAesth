<?php 
require("Connection.php");

class Accesorios{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT * FROM accesorios");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay accesorios en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los accesorios";
        }



    }

    


}








?>