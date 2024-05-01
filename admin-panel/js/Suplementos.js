$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Suplementos.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_suplementos(resultado);
                    pintar_suplementos_select(resultado);

                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



            function pintar_suplementos(array_suplementos){

                var booleanValue = false;

                for (const suplemento of array_suplementos) {
                
                    if(suplemento.novedad == 1){
                        booleanValue=true;
                    }else{
                        booleanValue=false;
                    }


                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+suplemento.id_suplemento+"</td>"
                    +"<td>"+suplemento.nombre_suplemento+"</td>"
                    +"<td>"+suplemento.precio_suplemento+"</td>"
                    +"<td>"+suplemento.peso_suplemento+"</td>"
                    +"<td>"+suplemento.sabor_suplemento+"</td>"
                    +"<td>"+suplemento.descripcion_suplemento+"</td>"
                    +"<td>"+suplemento.stock+"</td>"
                    +"<td>"+booleanValue+"</td>"
                    +"<td>"+suplemento.tipo_suplemento+"</td>"
                    +"<td>"+"<a target='_blank' href='img/" + suplemento.imagen_suplemento + "'><img width='100' height='100' src='img/" + suplemento.imagen_suplemento + "' alt='" + suplemento.imagen_suplemento + "'></a>"+"</td>"
                    +"<td>"
   
                    +"<a href='#' class='btn btn-primary btn-icon-split'>"
                    
                    +"<span class='icon text-white-50'>"
                       +"<i class='bi bi-pencil-fill'></i>"
                    +"</span>"
                    +"<span class='text'>Editar</span>"
                    
                    +"</a>"
                    
                    +"</td>"
   
                    +"<td>"
   
                    +"<a href='#' class='btn btn-danger btn-icon-split'>"
                    
                    +"<span class='icon text-white-50'>"
                       +"<i class='fas fa-trash'></i>"
                    +"</span>"
                    +"<span class='text'>Eliminar</span>"
                    
                    +"</a>"
                    
                    +"</td>"
   
                    +"</tr>"
                   
                   
                   
                   );
   
                   }
             
                

            }   

            function pintar_suplementos_select(array_suplementos){
                for (const suplemento of array_suplementos) {
                        $('select[name="id_suplemento"]').append("<option value="+suplemento.id_suplemento+">"+suplemento.nombre_suplemento+"</option>");
                }
            }





        
    });