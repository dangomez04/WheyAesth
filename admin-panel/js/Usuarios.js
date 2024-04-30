$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Usuarios.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_usuario(resultado);

                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



            function pintar_usuario(array_usuarios){



                for (const usuario of array_usuarios) {


                  
    

                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+usuario.id_usuario+"</td>"
                    +"<td>"+usuario.nombre_usuario+"</td>"
                    +"<td>"+usuario.correo_usuario+"</td>"
                    +"<td>"+usuario.rol+"</td>"
                   

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