<?php 
require("Connection.php");

class Suplementos{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT * FROM suplementos");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay suplementos en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al obtener los suplementos";
        }



    }


    function insertSuplemento($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $nombre_suplemento = $data['nombre_suplemento'];
        $precio_suplemento = $data['precio_suplemento'];
        $peso_suplemento = $data['peso_suplemento'];
        $sabor_suplemento = $data['sabor_suplemento'];
        $descripcion_suplemento = $data['descripcion_suplemento'];
        $stock_suplemento = $data['stock_suplemento'];
        $novedad_suplemento = $data['novedad_suplemento'];
        $tipo_suplemento = $data['tipo_suplemento'];
        $imagenprovisional = $data['imagenprovisional'];


		$stmt = $conexion->prepare("INSERT INTO suplementos (nombre_suplemento, precio_suplemento, peso_suplemento, sabor_suplemento, descripcion_suplemento, stock, novedad, tipo_suplemento, imagen_suplemento) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

        $stmt->bind_param("sdissiiss", $nombre_suplemento,$precio_suplemento,$peso_suplemento,$sabor_suplemento, $descripcion_suplemento, $stock_suplemento,$novedad_suplemento, $tipo_suplemento, $imagenprovisional);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al insertar el suplemento";
        }


   		 $conexion->close();
    }

    function searchSuplemento($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();
    
        $id_suplemento = $data['id_suplemento'];
    
    
    
        $stmt = $conexion->prepare("SELECT * FROM suplementos WHERE suplementos.id_suplemento = ?");
        
        $stmt->bind_param("i", $id_suplemento);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No existe un suplemento con ese id";
            }
            return $result;
    
        }catch(Exception $e){
            return "Error al buscar un suplemento con ese id";
        }

    }


    function deleteSuplemento($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_suplemento = $data['id_suplemento'];

        $stmt = $conexion->prepare("DELETE FROM suplementos WHERE id_suplemento = ?");

        $stmt->bind_param("i", $id_suplemento);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar el suplemento";
        }



    }


    


}








?>