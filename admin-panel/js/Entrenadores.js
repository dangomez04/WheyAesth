$(document).ready(function () {

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

            $('input#submit-crear-entrenador').on('click',function(event){
                event.preventDefault();
                insertar_entrenador();

            });

            $('input#cancelar-crear-entrenador').on('click',function(event){
                event.preventDefault();
                location.href="Entrenadores.html";

            });





            function insertar_entrenador(){
             
                var nombre_entrenador = $('input#nombre-entrenador').val();
                var especialidad_entrenador = $('input#especialidad-entrenador').val();
                var email_entrenador = $('input#email-entrenador').val();

                if(nombre_entrenador == "" || especialidad_entrenador == "" || email_entrenador == ""){
                    $('p#create-help').css({color: "red"});
                    $('p#create-help').text("Todos los campos son obligatorios!");

                } else{
                    var formData = new FormData();
                    formData.append('nombre_entrenador', nombre_entrenador);
                    formData.append('especialidad_entrenador', especialidad_entrenador);
                    formData.append('email_entrenador', email_entrenador);
    
                    let action = "insertar-entrenador";
    
                    $.ajax({
                        type: "POST",
                        url: "php/Entrenadores.php?action=" + action,
                        data: formData,
            
                        processData: false,
                        contentType: false,
            
                        success: function (resultado) {
            
            
                            if (resultado == true) {
                               
            
                                $('p#create-help').css({color: "green"});
                                $('p#create-help').text("Entrenador creado correctamente!");
            
                                setTimeout(() => {
                                    location.href="Entrenadores.html";
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