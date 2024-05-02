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
                    pintar_usuario_select(resultado);
                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });


            $('input#submit-crear-usuario').on('click',function(event){
                event.preventDefault();
                insertar_usuario();

            });

            $('input#cancelar-crear-usuario').on('click',function(event){
                event.preventDefault();
                location.href="Usuarios.html";

            });

            function insertar_usuario(){
            var nombre_usuario = $('input#nombre-usuario').val();
            var email_usuario = $('input#correo-usuario').val();
            var contraseña_usuario = $('input#contraseña-usuario').val();
            var confirmar_contraseña_usuario = $('input#confirmar-contraseña-usuario').val();

            var rol_usuario = parseInt($('select[name="id_rol"]').val());

            if(nombre_usuario == "" || email_usuario == "" || contraseña_usuario == "" || isNaN(rol_usuario) || confirmar_contraseña_usuario ==""){
                $('p#create-help').css({color: "red"});
                $('p#create-help').text("Todos los campos son obligatorios!");
            }else{

                var formData = new FormData();
                formData.append('nombre_usuario', nombre_usuario);
                formData.append('email_usuario', email_usuario);
                formData.append('contraseña_usuario', contraseña_usuario);
                formData.append('rol_usuario', rol_usuario);
    
                let action = "insertar-usuario";
    
                $.ajax({
                    type: "POST",
                    url: "php/Usuarios.php?action=" + action,
                    data: formData,
        
                    processData: false,
                    contentType: false,
        
                    success: function (resultado) {
        
        
                        if (resultado == true) {
                           
        
                            $('p#create-help').css({color: "green"});
                            $('p#create-help').text("Usuario creado correctamente!");
        
                            setTimeout(() => {
                                location.href="Usuarios.html";
                            }, 1300);
        
                        } else {
                            console.log(resultado);
                        }
        
        
        
        
        
                    },
                    error: function (xhr) {
                        console.log(xhr);
                    },
        
                });
    

            }

            



            }








            function pintar_usuario(array_usuarios){



                for (const usuario of array_usuarios) {


                  
    

                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+usuario.id_usuario+"</td>"
                    +"<td>"+usuario.nombre_usuario+"</td>"
                    +"<td>"+usuario.correo_usuario+"</td>"
                    +"<td>"+usuario.contraseña_usuario+"</td>"
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

            function pintar_usuario_select(array_usuarios){


                for (const usuario of array_usuarios) {
                    $('select[name="usuario-reserva"]').append("<option value="+usuario.id_usuario+">"+usuario.nombre_usuario+"</option>")

                }

            }





        
    });