<?php
require ("includes/CrudUsuarios.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showUsuarios();
            break;

        case "insertar-usuario":
             echo insertUsuario();
             break;


        case "eliminar-usuario":
             echo deleteUsuario();
             break;    
             
        case "buscar-usuario":
            echo searchUsuario();
            break;  

        case "login":
            echo loginUser();
            break;       
    }
}



	function showUsuarios(){

        $dataBase = new Usuarios();

		$result = $dataBase->show();
		

        if($result == "No hay usuarios en la base de datos" || $result == "Error al obtener los usuarios"){
            echo $result;
        }else{
            $usuarios = array(); 

        while ($row = $result->fetch_assoc()) {
            $usuarios[] = $row;
        }

        echo json_encode($usuarios);
        }


	}

    function searchUsuario(){

        $id_usuario = $_POST['id_usuario'];

        $data = array(
                'id_usuario' =>  $id_usuario
            );

    $dataBase = new Usuarios();
    $result = $dataBase->searchUsuario($data);

    if($result=="No existe un usuario con ese id" || $result=="Error al buscar un usuario con ese id"){
        echo $result;
    }else{
        $usuario_encontrado = $result->fetch_assoc();
        echo json_encode($usuario_encontrado);

    }


    }


    function insertUsuario(){
        if(isset($_POST['id_usuario']) && !empty($_POST['id_usuario'])) {

            $id_usuario = $_POST["id_usuario"];
            $nombre_usuario = $_POST["nombre_usuario"];
            $email_usuario = $_POST["correo_usuario"];
            $contraseña_usuario = $_POST["contraseña_usuario"];
            $rol_usuario = $_POST["rol_usuario"];
            $apellidos_usuario = $_POST["apellidos_usuario"];
            $fecha_usuario = $_POST["fecha_usuario"];
            $sexo = $_POST["sexo"];
            $condition_same_pass = $_POST["condition_same_pass"];

    
            $data = array(
                'id_usuario' => $id_usuario,
                'nombre_usuario' => $nombre_usuario,
                'email_usuario' => $email_usuario,
                'contraseña_usuario' => $contraseña_usuario,
                'rol_usuario' => $rol_usuario,
                'apellidos_usuario' => $apellidos_usuario,
                'fecha_usuario' => $fecha_usuario,
                'condition_same_pass' => $condition_same_pass,
                'sexo' => $sexo
    
            );
    
            $dataBase = new Usuarios();
            $result = $dataBase->updateUsuario($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }
    

        }else {
            $nombre_usuario = $_POST["nombre_usuario"];
            $email_usuario = $_POST["email_usuario"];
            $contraseña_usuario = $_POST["contraseña_usuario"];
            $rol_usuario = $_POST["rol_usuario"];
            $apellidos_usuario = $_POST["apellidos_usuario"];
            $fecha_usuario = $_POST["fecha_usuario"];
            $sexo = $_POST["sexo_usuario"];

         
    
            $data = array(
                'nombre_usuario' => $nombre_usuario,
                'email_usuario' => $email_usuario,
                'contraseña_usuario' => $contraseña_usuario,
                'rol_usuario' => $rol_usuario,
                'apellidos_usuario' => $apellidos_usuario,
                'fecha_usuario' => $fecha_usuario,
                'sexo' => $sexo

            );
    
            $dataBase = new Usuarios();
            $result = $dataBase->insertUsuario($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }
    
        }
    }

    function deleteUsuario(){

        $id_usuario = $_POST['id_usuario'];
        
        $data = array(
        
            'id_usuario' => $id_usuario
        
         );


         $dataBase = new Usuarios();
         $result = $dataBase->deleteUsuario($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }


    }

    function loginUser(){
      
        $correo_usuario = $_POST['correo_registrado'];
        $contraseña_usuario = md5($_POST['contraseña_registrada']);

       
    
        $data = array(
            'correo_registrado' => $correo_usuario,
            'contraseña_usuario' => $contraseña_usuario        
        );

        $dataBase = new Usuarios();
        $result = $dataBase->login($data);
    
    
        if($result=="Credenciales incorrectas" || $result=="Error en el login"){
                echo $result;
        }else{
            
            $usuario = $result->fetch_assoc();

            session_start();
            $_SESSION["usuario"] = $usuario["nombre_usuario"];
            $_SESSION["rol"] = $usuario["rol"];
        
            echo json_encode($usuario);
        }


    }

?>

