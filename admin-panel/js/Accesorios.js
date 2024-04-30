$(document).ready(function () {


    let currentAction = 'show';

            $.ajax({
                type: "GET",
                url: "php/Accesorios.php",
                dataType: "json",

                data: {
                    action: currentAction,
                  
                },
                success: function (resultado) {
                  

                    pintar_accesorios(resultado);

                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });



            function pintar_accesorios(array_accesorios){
                var booleanValue = false;

                for (const accesorio of array_accesorios) {
                if(accesorio.novedad == 1){
                    booleanValue=true;
                }else{
                    booleanValue=false;
                }

                 $('table#dataTable tbody').append(

                 "<tr>"
                 
                 +"<td>"+accesorio.id_accesorio+"</td>"
                 +"<td>"+accesorio.nombre_accesorio+"</td>"
                 +"<td>"+accesorio.precio_accesorio+"</td>"
                 +"<td>"+accesorio.descripcion_accesorio+"</td>"
                 +"<td>"+accesorio.color_accesorio+"</td>"
                 +"<td>"+accesorio.stock+"</td>"
                 +"<td>"+booleanValue+"</td>"
                 +"<td>"+"<a target='_blank' href='img/" + accesorio.imagen_accesorio + "'><img width='100' height='100' src='img/" + accesorio.imagen_accesorio + "' alt='" + accesorio.imagen_accesorio + "'></a>"+"</td>"
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