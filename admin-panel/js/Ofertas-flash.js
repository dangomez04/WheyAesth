$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Ofertas-flash.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_ofertas(resultado);

                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



            function pintar_ofertas(array_ofertas){



                for (const oferta of array_ofertas) {


            
                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+oferta.id_oferta_flash+"</td>"
                    +"<td>"+oferta.precio_oferta+"</td>"
                    +"<td>"+oferta.stock_oferta+"</td>"
                    +"<td>"+oferta.nombre_suplemento+"</td>"
                    +"<td>"+oferta.nombre_accesorio+"</td>"


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





        
    });