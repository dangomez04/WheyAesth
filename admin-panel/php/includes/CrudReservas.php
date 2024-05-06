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

    function insertReserva($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $reserva_confirmada = $data['reserva_confirmada'];
        $usuario_reserva = $data['usuario_reserva'];
        $reunion_reserva = $data['reunion_reserva'];

        $stmt = $conexion->prepare("INSERT INTO reserva_reuniones (reserva_confirmada, id_usuario, id_reunion) VALUES (?, ?, ?)");

        $stmt->bind_param("iii", $reserva_confirmada,$usuario_reserva,$reunion_reserva);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar la reserva";
        }


   		 $conexion->close();



    }


    function updateReserva($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_reserva = $data['id_reserva'];
        $reunion_reserva = $data['reunion_reserva'];
        $usuario_reserva = $data['usuario_reserva'];
        $reserva_confirmada = $data['reserva_confirmada'];

        $stmt = $conexion->prepare("UPDATE reserva_reuniones SET reserva_confirmada = ?, id_usuario = ?, id_reunion = ? WHERE reserva_reuniones.id_reserva = ?");

        $stmt->bind_param("iiii", $reserva_confirmada,$usuario_reserva,$reunion_reserva, $id_reserva);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al actualizar la reserva";
        }


            $conexion->close();

    }






    function searchReserva($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();
    
        $id_reserva = $data['id_reserva'];
    
    
    
        $stmt = $conexion->prepare("SELECT * FROM reserva_reuniones WHERE reserva_reuniones.id_reserva = ?");
        
        $stmt->bind_param("i", $id_reserva);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No existe una reserva con ese id";
            }
            return $result;
    
        }catch(Exception $e){
            return "Error al buscar una reserva con ese id";
        }


    }

    function deleteReserva($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_reserva = $data['id_reserva'];

        $stmt = $conexion->prepare("DELETE FROM reserva_reuniones WHERE id_reserva = ?");

        $stmt->bind_param("i", $id_reserva);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar la reserva";
        }



    }

    


}








?>