<?php 
require("Connection.php");

class Accesorios{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT * FROM accesorios");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay accesorios en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los accesorios";
        }



    }

    function insertAccesorio($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $nombre_accesorio = $data['nombre_accesorio'];
        $precio_accesorio = $data['precio_accesorio'];
        $desc_accesorio = $data['desc_accesorio'];
        $color_accesorio = $data['color_accesorio'];
        $stock_accesorio = $data['stock_accesorio'];
        $novedad_accesorio = $data['novedad_accesorio'];
        $imagenprovisional = $data['imagenprovisional'];


		$stmt = $conexion->prepare("INSERT INTO accesorios (nombre_accesorio, precio_accesorio, descripcion_accesorio, color_accesorio, stock, novedad, imagen_accesorio) VALUES (?, ?, ?, ?, ?, ?, ?)");

        $stmt->bind_param("sdssiis", $nombre_accesorio,$precio_accesorio,$desc_accesorio,$color_accesorio, $stock_accesorio, $novedad_accesorio,$imagenprovisional);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar el accesorio";
        }


   		 $conexion->close();
    }


   function searchAccesorio($data){

    $sqlConnection = new Connection();
    $conexion = $sqlConnection->getConnection();

    $id_accesorio = $data['id_accesorio'];



    $stmt = $conexion->prepare("SELECT * FROM accesorios WHERE accesorios.id_accesorio = ?");
    
    $stmt->bind_param("i", $id_accesorio);
    try{
        $stmt->execute();
        $result = $stmt->get_result();
        $stmt->close();
        if($result->num_rows==0){
            return "No existe un accesorio con ese id";
        }
        return $result;

    }catch(Exception $e){
        return "Error al buscar un accesorio con ese id";
    }
    }

    function deleteAccesorio($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_accesorio = $data['id_accesorio'];

        $stmt = $conexion->prepare("DELETE FROM accesorios WHERE id_accesorio = ?");

        $stmt->bind_param("i", $id_accesorio);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar el accesorio";
        }


    }

    


}








?>