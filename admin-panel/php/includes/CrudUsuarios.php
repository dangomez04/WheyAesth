<?php 
require("Connection.php");

class Usuarios{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT usuarios.*,roles.rol FROM usuarios JOIN roles ON usuarios.rol_usuario=roles.id_rol");

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


    function insertUsuario($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $nombre_usuario = $data['nombre_usuario'];
        $email_usuario = $data['email_usuario'];
        $contraseña_usuario = $data['contraseña_usuario'];
        $rol_usuario = $data['rol_usuario'];


    
		$stmt = $conexion->prepare("INSERT INTO usuarios (nombre_usuario, correo_usuario, contraseña_usuario,rol_usuario) VALUES (?, ?, ?, ?)");

        $stmt->bind_param("sssi", $nombre_usuario,$email_usuario,$contraseña_usuario, $rol_usuario);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar el usuario";
        }


   		 $conexion->close();


    }

    


}








?>