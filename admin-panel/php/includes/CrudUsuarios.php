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

    function updateUsuario($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_usuario = $data['id_usuario'];
        $nombre_usuario = $data['nombre_usuario'];
        $email_usuario = $data['email_usuario'];
        $rol_usuario = $data['rol_usuario'];
        $apellidos_usuario = $data['apellidos_usuario'];
        $fecha_usuario = $data['fecha_usuario'];
        $sexo = $data['sexo'];
        $condition_same_pass = $_POST["condition_same_pass"];

        //si es la misma contraseña que al darle a editar, no hacemos md5 sobre algo que ya tiene md5
        
        if($condition_same_pass == "true"){
            $contraseña_usuario = $data['contraseña_usuario'];

        }else{
            $contraseña_usuario = md5($data['contraseña_usuario']);

        }

        $stmt = $conexion->prepare("UPDATE usuarios SET nombre_usuario = ?, apellidos_usuario = ?, correo_usuario = ?, contraseña_usuario = ?, fecha_nacimiento = ?, sexo_usuario = ?, rol_usuario = ? WHERE usuarios.id_usuario = ?");

        $stmt->bind_param("ssssssii", $nombre_usuario, $apellidos_usuario, $email_usuario, $contraseña_usuario, $fecha_usuario, $sexo, $rol_usuario, $id_usuario);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al actualizar el usuario";
        }


            $conexion->close();
    }

    function insertUsuario($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $nombre_usuario = $data['nombre_usuario'];
        $email_usuario = $data['email_usuario'];
        $contraseña_usuario = md5($data['contraseña_usuario']);
        $rol_usuario = $data['rol_usuario'];
        $apellidos_usuario = $data['apellidos_usuario'];
        $fecha_usuario = $data['fecha_usuario'];
        $sexo = $data['sexo'];

        //comprobar que el correo no existe ya en la base de datos

        $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE correo_usuario = ?");
        $stmt->bind_param("s", $email_usuario);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            return "El correo electrónico ya esta en uso, prueba con otro";
        }

        //si no esta en uso, insertar

		$stmt = $conexion->prepare("INSERT INTO usuarios (nombre_usuario, apellidos_usuario, correo_usuario, contraseña_usuario, fecha_nacimiento, sexo_usuario, rol_usuario) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $stmt->bind_param("ssssssi", $nombre_usuario,$apellidos_usuario,$email_usuario, $contraseña_usuario, $fecha_usuario, $sexo, $rol_usuario);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar el usuario";
        }


   		 $conexion->close();


    }

    function searchUsuario($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();
    
        $id_usuario = $data['id_usuario'];
    
    
    
        $stmt = $conexion->prepare("SELECT * FROM usuarios WHERE usuarios.id_usuario = ?");
        
        $stmt->bind_param("i", $id_usuario);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No existe un usuario con ese id";
            }
            return $result;
    
        }catch(Exception $e){
            return "Error al buscar un usuario con ese id";
        }
        


    }

    function deleteUsuario($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_usuario = $data['id_usuario'];

        $stmt = $conexion->prepare("DELETE FROM usuarios WHERE id_usuario = ?");

        $stmt->bind_param("i", $id_usuario);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar el usuario";
        }
    }


    function login($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $correo_registrado = $data['correo_registrado'];
        $contraseña_usuario = $data['contraseña_usuario'];


        $stmt = $conexion->prepare("SELECT usuarios.*, roles.rol FROM usuarios JOIN roles ON usuarios.rol_usuario=roles.id_rol WHERE correo_usuario = ? AND contraseña_usuario = ?");
        
        $stmt->bind_param("ss", $correo_registrado,$contraseña_usuario);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "Credenciales incorrectas";
            }
            return $result;

        }catch(Exception $e){
            return "Error en el login";
        }


    }


}








?>