<?php
require ("includes/CrudReservas.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showReservas();
            break;

        case "insertar-reserva":
             echo insertReserva();
              break;

        case "eliminar-reserva":
            echo deleteReserva();
              break;

        case "buscar-reserva":
            echo searchReserva();
            break;         
    }
}



	function showReservas(){

        $dataBase = new Reservas();

		$result = $dataBase->show();
		

        if($result == "No hay reservas en la base de datos" || $result == "Error al obtener las reservas"){
            echo $result;
        }else{
            $reservas = array(); 

        while ($row = $result->fetch_assoc()) {
            $reservas[] = $row;
        }

        echo json_encode($reservas);
        }


	}

    function searchReserva(){
        $id_reserva = $_POST['id_reserva'];

        $data = array(
                'id_reserva' =>  $id_reserva
            );

    $dataBase = new Reservas();
    $result = $dataBase->searchReserva($data);

    if($result=="No existe una reserva con ese id" || $result=="Error al buscar una reserva con ese id"){
        echo $result;
    }else{
        $reserva_encontrada = $result->fetch_assoc();
        echo json_encode($reserva_encontrada);

    }
    }

    function insertReserva(){

        if(isset($_POST['id_reserva']) && !empty($_POST['id_reserva'])) {

            $id_reserva = $_POST['id_reserva'];+
            $reunion_reserva = $_POST['reunion_reserva'];
            $usuario_reserva = $_POST['usuario_reserva'];
            $reserva_confirmada = $_POST['reserva_confirmada'];

           
            $data = array(
                'id_reserva' => $id_reserva,
                'reunion_reserva' => $reunion_reserva,
                'usuario_reserva' => $usuario_reserva,
                'reserva_confirmada' => $reserva_confirmada

               
            );
    
            $dataBase = new Reservas();
            $result = $dataBase->updateReserva($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }
        }else{
            $reserva_confirmada = $_POST['reserva_confirmada'];
            $usuario_reserva = $_POST['usuario_reserva'];
            $reunion_reserva = $_POST['reunion_reserva'];
    
            $data = array(
    
                'reserva_confirmada' => $reserva_confirmada,
                'usuario_reserva' => $usuario_reserva,
                'reunion_reserva' => $reunion_reserva
    
            );
    
            $dataBase = new Reservas();
            $result = $dataBase->insertReserva($data);
    
            if($result === true){
                echo true;
    
            }else {
                echo $result;
            }
        }
       

    }


    function deleteReserva(){
        $id_reserva = $_POST['id_reserva'];
        
        $data = array(
        
            'id_reserva' => $id_reserva
        
         );


         $dataBase = new Reservas();
         $result = $dataBase->deleteReserva($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }

    }

?>

