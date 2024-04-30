<?php 
require("Connection.php");

class Reservas{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT reserva_reuniones.*,usuarios.nombre_usuario,reuniones.tematica_reunion FROM reserva_reuniones JOIN usuarios ON reserva_reuniones.id_usuario=usuarios.id_usuario JOIN reuniones ON reserva_reuniones.id_reunion=reuniones.id_reunion");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay reservas en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener las reservas";
        }



    }

    


}








?>