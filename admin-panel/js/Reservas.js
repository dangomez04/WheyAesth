$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Reservas.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_reservas(resultado);

                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



            function pintar_reservas(array_reservas){


                var reserva_confirmada = false;

                for (const reserva of array_reservas) {


                    if(reserva.reserva_confirmada == 1){
                        reserva_confirmada=true;
                    }else{
                        reserva_confirmada=false;
                    }
    

                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+reserva.id_reserva+"</td>"
                    +"<td>"+reserva_confirmada+"</td>"
                    +"<td>"+reserva.nombre_usuario+"</td>"
                    +"<td>"+reserva.tematica_reunion+"</td>"
                   

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