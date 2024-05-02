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


            //control de selects, ya que el usuario solo puede elegir en uno de los dos select

           

            $('select[name="id_suplemento"]').change(function () {

                if ($(this).val() !== '') {

                    $('select[name="id_accesorio"]').prop('disabled', true);
                } else {

                    $('select[name="id_accesorio"]').prop('disabled', false);
                }


                if ($(this).val() === 'null') {
                    $('select[name="id_accesorio"]').prop('disabled', false);
                } else {
                    $('select[name="id_accesorio"]').prop('disabled', true);
                }
            });
        
            $('select[name="id_accesorio"]').change(function () {

                if ($(this).val() !== '') {

                    $('select[name="id_suplemento"]').prop('disabled', true);
                } else {

                    $('select[name="id_suplemento"]').prop('disabled', false);
                }

                if ($(this).val() === 'null') {
                    $('select[name="id_suplemento"]').prop('disabled', false);
                } else {
                    $('select[name="id_suplemento"]').prop('disabled', true);
                }
            });


            $('input#submit-crear-oferta').on('click',function(event){
                event.preventDefault();
                insertar_oferta();

            });

            $('input#cancelar-crear-oferta').on('click',function(event){
                event.preventDefault();
                location.href="Ofertas-flash.html";

            });


            function insertar_oferta(){

                var precio_oferta = parseFloat($('input#precio-oferta').val());
                var stock_oferta = parseFloat($('input#stock-oferta').val());
                var suplemento_oferta = $('select[name="id_suplemento"]').val();
                var accesorio_oferta = $('select[name="id_accesorio"]').val();

               

                if(isNaN(precio_oferta) || isNaN(stock_oferta)){
                    $('p#create-help').css({color: "red"});
                    $('p#create-help').text("Todos los campos son obligatorios!");
                }else if(suplemento_oferta == "null" && accesorio_oferta == "null"){
                    $('p#create-help').css({color: "red"});
                    $('p#create-help').text("Todos los campos son obligatorios!");
                }else{
                    
                    var formData = new FormData();
                    formData.append('precio_oferta', precio_oferta);
                    formData.append('stock_oferta', stock_oferta);
                    if(suplemento_oferta == "null"){
                        formData.append('suplemento_oferta', null);
                        formData.append('accesorio_oferta', accesorio_oferta);

                    }else{
                        formData.append('suplemento_oferta', suplemento_oferta);
                        formData.append('accesorio_oferta', null);

                    }

                    let action = "insertar-oferta";

                    $.ajax({
                        type: "POST",
                        url: "php/Ofertas-flash.php?action=" + action,
                        data: formData,
            
                        processData: false,
                        contentType: false,
            
                        success: function (resultado) {
            
            
                            if (resultado == true) {
                               
            
                                $('p#create-help').css({color: "green"});
                                $('p#create-help').text("Oferta creada correctamente!");
            
                                setTimeout(() => {
                                    location.href="Ofertas-flash.html";
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