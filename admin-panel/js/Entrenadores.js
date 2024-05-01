$(document).ready(function () {
    console.log("hola");

    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Entrenadores.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_entrenadores(resultado);
                    pintar_entrenadores_select(resultado);
                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



            function pintar_entrenadores(array_entrenadores){
                for (const entrenador of array_entrenadores) {
                
                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+entrenador.id_entrenador+"</td>"
                    +"<td>"+entrenador.nombre_entrenador+"</td>"
                    +"<td>"+entrenador.especialidad_entrenador+"</td>"
                    +"<td>"+entrenador.correo_entrenador+"</td>"
                    
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

            function pintar_entrenadores_select(array_entrenadores){

                for (const entrenador of array_entrenadores) {
                    $('select[name="id_entrenador"]').append("<option value="+entrenador.id_entrenador+">"+entrenador.nombre_entrenador+"</option>");
                }

            }





        
    });