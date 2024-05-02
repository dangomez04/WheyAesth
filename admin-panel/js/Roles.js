$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Roles.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_rol(resultado);
                    pintar_rol_select(resultado);
                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });


            $('input#submit-crear-rol').on('click',function(event){
                event.preventDefault();
                insertar_rol();

            });

            $('input#cancelar-crear-rol').on('click',function(event){
                event.preventDefault();
                location.href="Roles.html";

            });



            function insertar_rol(){
                
                var nombre_rol = $('input#nombre-rol').val();

                if(nombre_rol==""){
                    $('p#create-help').css({color: "red"});
                    $('p#create-help').text("Todos los campos son obligatorios!");
                }else{
                    var formData = new FormData();
                    formData.append('nombre_rol', nombre_rol);
    
    
                    let action = "insertar-rol";
    
                    $.ajax({
                        type: "POST",
                        url: "php/Roles.php?action=" + action,
                        data: formData,
            
                        processData: false,
                        contentType: false,
            
                        success: function (resultado) {
            
            
                            if (resultado == true) {
                               
            
                                $('p#create-help').css({color: "green"});
                                $('p#create-help').text("Rol creado correctamente!");
            
                                setTimeout(() => {
                                    location.href="Roles.html";
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


            function pintar_rol(array_roles){



                for (const rol of array_roles) {


                  
    

                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+rol.id_rol+"</td>"
                    +"<td>"+rol.rol+"</td>"
                  

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

            function pintar_rol_select(array_roles){
                for (const rol of array_roles) {
                        $('select[name="id_rol"]').append("<option value="+rol.id_rol+">"+rol.rol+"</option>")
                }
            }





        
    });