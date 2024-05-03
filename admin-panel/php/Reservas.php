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

    function insertReserva(){

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

