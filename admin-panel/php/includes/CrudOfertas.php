<?php 
require("Connection.php");

class Ofertas{

   

    function show(){

        $sqlConnection = new Connection();
        $mySQL = $sqlConnection->getConnection();
        $stmt = $mySQL->prepare("SELECT ofertas_flash.*,suplementos.nombre_suplemento,accesorios.nombre_accesorio FROM ofertas_flash LEFT JOIN suplementos ON ofertas_flash.id_suplemento=suplementos.id_suplemento LEFT JOIN accesorios ON ofertas_flash.id_accesorio=accesorios.id_accesorio");

        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No hay ofertas en la base de datos";
            }
            return $result;

        }catch(Exception $e){
            return "Error al buscar ofertas";
        }


    }


    function searchOferta($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();
    
        $id_oferta = $data['id_oferta'];
    
    
    
        $stmt = $conexion->prepare("SELECT * FROM ofertas_flash WHERE ofertas_flash.id_oferta_flash = ?");
        
        $stmt->bind_param("i", $id_oferta);
        try{
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
            if($result->num_rows==0){
                return "No existe una oferta con ese id";
            }
            return $result;
    
        }catch(Exception $e){
            return "Error al buscar una oferta con ese id";
        }
    }

    function updateOferta($data){

        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_oferta = $data['id_oferta'];
        $precio_oferta = $data['precio_oferta'];
        $stock_oferta = $data['stock_oferta'];
        $accesorio_oferta = $data['accesorio_oferta'];
        $suplemento_oferta = $data['suplemento_oferta'];
        $stmt = $conexion->prepare("UPDATE ofertas_flash SET precio_oferta = ?, stock_oferta = ?, id_suplemento = ?, id_accesorio = ? WHERE ofertas_flash.id_oferta_flash = ?");

        if($suplemento_oferta=="null"){
            $stmt->bind_param("diiii", $precio_oferta,$stock_oferta,$nullVal, $accesorio_oferta,$id_oferta);

        }else{
            $stmt->bind_param("diiii", $precio_oferta,$stock_oferta, $suplemento_oferta,$nullVal,$id_oferta);

        }

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al actualizar la oferta";
        }


            $conexion->close();
    }

    function insertOferta($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $precio_oferta = $data['precio_oferta'];
        $stock_oferta = $data['stock_oferta'];
        $suplemento_oferta = $data['suplemento_oferta'];
        $accesorio_oferta = $data['accesorio_oferta'];
        $nullVal = null;


		$stmt = $conexion->prepare("INSERT INTO ofertas_flash (precio_oferta, stock_oferta, id_suplemento, id_accesorio) VALUES (?, ?, ?, ?)");

        //condición para insertar segun que producto como nulo, debido a la logica con la que utilizo mi tabla en la web
        if($suplemento_oferta=="null"){
            $stmt->bind_param("diii", $precio_oferta,$stock_oferta,$nullVal, $accesorio_oferta,);

        }else{
            $stmt->bind_param("diii", $precio_oferta,$stock_oferta, $suplemento_oferta,$nullVal);

        }

        
       
        try{
            $stmt->execute();
           
            $stmt->close();


    
           
            return true;

        }catch(Exception $e){
            return "Error al insertar la reunión";
        }


   		 $conexion->close();
    
    }

    function deleteOferta($data){
        $sqlConnection = new Connection();
        $conexion = $sqlConnection->getConnection();

        $id_oferta = $data['id_oferta'];

        $stmt = $conexion->prepare("DELETE FROM ofertas_flash WHERE id_oferta_flash = ?");

        $stmt->bind_param("i", $id_oferta);

        try{
            $stmt->execute();
           
            $stmt->close();
           
            return true;

        }catch(Exception $e){
            return "Error al eliminar la oferta";
        }


    }

    


}








?>