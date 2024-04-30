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

                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



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





        
    });