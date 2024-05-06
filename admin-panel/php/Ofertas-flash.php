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
                
         case "eliminar-oferta":
             echo deleteOferta();
             break;
         
         case "buscar-oferta":
            echo searchOferta();
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


    function searchOferta(){

        $id_oferta = $_POST['id_oferta'];

        $data = array(
                'id_oferta' =>  $id_oferta
            );

    $dataBase = new Ofertas();
    $result = $dataBase->searchOferta($data);

    if($result=="No existe una oferta con ese id" || $result=="Error al buscar una oferta con ese id"){
        echo $result;
    }else{
        $oferta_encontrada = $result->fetch_assoc();
        echo json_encode($oferta_encontrada);

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

    function deleteOferta(){

        $id_oferta = $_POST['id_oferta'];
        
        $data = array(
        
            'id_oferta' => $id_oferta
        
         );


         $dataBase = new Ofertas();
         $result = $dataBase->deleteOferta($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }
        
        
    }

?>

