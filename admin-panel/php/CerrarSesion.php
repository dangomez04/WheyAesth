<?php 

if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "cerrar-sesion":
            echo cerrarSesion();
            break;    
    }
}
function cerrarSesion(){

    session_start();
    session_destroy();
    unset($_SESSION["usuario"]);
    unset($_SESSION["rol"]);
    
    if(!isset($_SESSION["usuario"])){
    echo true;
    }
    
}


?>