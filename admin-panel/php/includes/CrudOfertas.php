<?php 
require("Connection.php");

class Ofertas{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT ofertas_flash.*,suplementos.nombre_suplemento,accesorios.nombre_accesorio FROM ofertas_flash LEFT JOIN suplementos ON ofertas_flash.id_suplemento=suplementos.id_suplemento LEFT JOIN accesorios ON ofertas_flash.id_accesorio=accesorios.id_accesorio");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay ofertas en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al buscar ofertas";
        }



    }

    


}








?>