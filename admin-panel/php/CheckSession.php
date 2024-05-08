<?php

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "comprobar-sesion":
            echo comprobarSesion();
            break;    
    }
}



function comprobarSesion(){

    session_start();
    if(!isset($_SESSION["usuario"])){
        echo "No hay sesion";
    }else {
        echo $_SESSION["usuario"];
    }
    

}






    

?>

