<?php
require ("includes/CrudOfertas.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showOfertas();
            break;

          case "insertar-oferta":
                echo insertOferta();
                break;    
       
    }
}



	function showOfertas(){

        $dataBase = new Ofertas();

		$result = $dataBase->show();
		

        if($result == "No hay ofertas en la base de datos" || $result == "Error al obtener las ofertas"){
            echo $result;
        }else{
            $ofertas = array(); 

        while ($row = $result->fetch_assoc()) {
            $ofertas[] = $row;
        }

        echo json_encode($ofertas);
        }


	}

    function insertOferta(){
        $precio_oferta = $_POST['precio_oferta'];
        $stock_oferta = $_POST['stock_oferta'];
        $suplemento_oferta = $_POST['suplemento_oferta'];
        $accesorio_oferta = $_POST['accesorio_oferta'];



        $data = array(
            'precio_oferta' => $precio_oferta,
            'stock_oferta' => $stock_oferta,
            'suplemento_oferta' => $suplemento_oferta,
            'accesorio_oferta' => $accesorio_oferta
        
        );

        $dataBase = new Ofertas();
        $result = $dataBase->insertOferta($data);

        if($result === true){
            echo true;

        }else {
            echo $result;
        }


    }

?>

