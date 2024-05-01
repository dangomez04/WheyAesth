<?php
require ("includes/CrudAccesorios.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showAccesorios();
            break;

        case "insertar-accesorio":
            echo insertAccesorio();
            break;   
       
    }
}



	function showAccesorios(){

        $dataBase = new Accesorios();

		$result = $dataBase->show();
		

        if($result == "No hay accesorios en la base de datos" || $result == "Error al obtener los accesorios"){
            echo $result;
        }else{
            $accesorios = array(); 

        while ($row = $result->fetch_assoc()) {
            $accesorios[] = $row;
        }

        echo json_encode($accesorios);
        }


	}

    function insertAccesorio(){
        $nombre_accesorio = $_POST['nombre_accesorio'];
        $precio_accesorio = $_POST['precio_accesorio'];
        $desc_accesorio = $_POST['desc_accesorio'];
        $color_accesorio = $_POST['color_accesorio'];
        $stock_accesorio = $_POST['stock_accesorio'];
        $novedad_accesorio = $_POST['novedad_accesorio'];
        $imagenprovisional = $_POST['imagenprovisional'];


        $data = array(
            
           'nombre_accesorio' => $nombre_accesorio,
           'precio_accesorio' => $precio_accesorio,
           'desc_accesorio' => $desc_accesorio,
           'color_accesorio' => $color_accesorio,
           'stock_accesorio' => $stock_accesorio,
           'novedad_accesorio' => $novedad_accesorio,
           'imagenprovisional' =>  $imagenprovisional
        
        
        
        );

      

        $dataBase = new Accesorios();
        $result = $dataBase->insertAccesorio($data);

        if($result === true){
            echo true;

        }else {
            echo $result;
        }

    }

?>

