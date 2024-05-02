$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Reuniones.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_reuniones(resultado);
                    pintar_reuniones_select(resultado);
                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });


            $('input#submit-crear-reunion').on('click',function(event){
                event.preventDefault();
                insertar_reunion();

            });

            $('input#cancelar-crear-reunion').on('click',function(event){
                event.preventDefault();
                location.href="Reuniones.html";

            });



            function insertar_reunion(){

                var fecha_reunion = $('input#fecha-reunion').val();
                var hora_reunion =  parseFloat($('input#hora-reunion').val());
                var duracion_reunion = parseInt($('input#duracion-reunion').val());
                var tematica_reunion = $('input#tematica-reunion').val();
                var aforo_reunion = parseInt($('input#aforo-reunion').val());
                var entrenador_reunion =  parseInt($('select[name="id_entrenador"]').val());

       
                    if(fecha_reunion == "" || isNaN(hora_reunion) || isNaN(duracion_reunion) || tematica_reunion == "" || isNaN(aforo_reunion) || isNaN(entrenador_reunion)){
                        $('p#create-help').css({color: "red"});
                        $('p#create-help').text("Todos los campos son obligatorios!");
                    }else{
                        var formData = new FormData();
                        formData.append('fecha_reunion', fecha_reunion);
                        formData.append('hora_reunion', hora_reunion);
                        formData.append('duracion_reunion', duracion_reunion);
                        formData.append('tematica_reunion', tematica_reunion);
                        formData.append('aforo_reunion', aforo_reunion);
                        formData.append('entrenador_reunion', entrenador_reunion);
        
                        let action = "insertar-reunion";
        
                        $.ajax({
                            type: "POST",
                            url: "php/Reuniones.php?action=" + action,
                            data: formData,
                
                            processData: false,
                            contentType: false,
                
                            success: function (resultado) {
                
                
                                if (resultado == true) {
                                   
                
                                    $('p#create-help').css({color: "green"});
                                    $('p#create-help').text("Reunion creada correctamente!");
                
                                    setTimeout(() => {
                                        location.href="Reuniones.html";
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




            function pintar_reuniones(array_reuniones){

                for (const reunion of array_reuniones) {

                    var fechaReunion = new Date(reunion.fecha_reunion);

                    var opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric' };

                    var fechaFormateada = fechaReunion.toLocaleDateString('es-ES',opcionesFecha);




                
                    $('table#dataTable tbody').append(
   
                    "<tr>"
                    
                    +"<td>"+reunion.id_reunion+"</td>"
                    +"<td>"+fechaFormateada+"</td>"
                    +"<td>"+reunion.hora_reunion+"</td>"
                    +"<td>"+reunion.duracion_reunion+"</td>"
                    +"<td>"+reunion.tematica_reunion+"</td>"
                    +"<td>"+reunion.aforo_reunion+"</td>"
                    +"<td>"+reunion.nombre_entrenador+"</td>"

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


            function pintar_reuniones_select(array_reuniones){
                for (const reunion of array_reuniones) {
                        $('select[name="reunion-reserva"]').append("<option value="+reunion.id_reunion+">"+reunion.tematica_reunion+"</option>")
                }
            }





        
    });