<?php
require ("includes/CrudSuplementos.php");

		
if (isset($_GET['action'])){
    
    switch ($_GET['action']) {
        case "show":
            echo showSuplementos();
            break;

        case "insertar-suplemento":
            echo insertSuplemento();
             break;  
        
        case "eliminar-suplemento":
             echo deleteSuplemento();
              break;  
       
    }
}



	function showSuplementos(){

        $dataBase = new Suplementos();

		$result = $dataBase->show();
		

        if($result == "No hay suplementos en la base de datos" || $result == "Error al obtener los suplementos"){
            echo $result;
        }else{
            $suplementos = array(); 

        while ($row = $result->fetch_assoc()) {
            $suplementos[] = $row;
        }

        echo json_encode($suplementos);
        }


	}

    function insertSuplemento(){
        $nombre_suplemento = $_POST['nombre_suplemento'];
        $precio_suplemento = $_POST['precio_suplemento'];
        $peso_suplemento = $_POST['peso_suplemento'];
        $sabor_suplemento = $_POST['sabor_suplemento'];
        $descripcion_suplemento = $_POST['descripcion_suplemento'];
        $stock_suplemento = $_POST['stock_suplemento'];
        $novedad_suplemento = $_POST['novedad_suplemento'];
        $tipo_suplemento = $_POST['tipo_suplemento'];
        $imagenprovisional = $_POST['imagenprovisional'];


        $data = array(

            'nombre_suplemento' => $nombre_suplemento,
            'precio_suplemento' => $precio_suplemento,
            'peso_suplemento' => $peso_suplemento,
            'sabor_suplemento' => $sabor_suplemento,
            'descripcion_suplemento' => $descripcion_suplemento,
            'stock_suplemento' => $stock_suplemento,
            'novedad_suplemento' => $novedad_suplemento,
            'tipo_suplemento' => $tipo_suplemento,
            'imagenprovisional' => $imagenprovisional
        );
        


        $dataBase = new Suplementos();
        $result = $dataBase->insertSuplemento($data);

        if($result === true){
            echo true;

        }else {
            echo $result;
        }


    }

    function deleteSuplemento(){

        $id_suplemento = $_POST['id_suplemento'];
        
        $data = array(
        
            'id_suplemento' => $id_suplemento
        
         );


         $dataBase = new Suplementos();
         $result = $dataBase->deleteSuplemento($data);
 
         if($result === true){
             echo true;
 
         }else {
             echo $result;
         }

    }

?>

