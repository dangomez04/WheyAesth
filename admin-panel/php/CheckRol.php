<?php 

if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "check-rol":
            echo checkRol();
            break;    
    }
}


function checkRol(){

    session_start();
    if(!isset($_SESSION["rol"])){
        echo "No hay sesion";
    }else {
        echo $_SESSION["rol"];
    }

}


?>