$(document).ready(function () {

    function show(){
        
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
    
        }

        show();

    $('input#submit-crear-reserva').on('click', function (event) {
        event.preventDefault();
        insertar_reserva();


    });

    $('input#cancelar-crear-reserva').on('click', function (event) {
        event.preventDefault();
        location.href = "Reservas.html";

    });


    function insertar_reserva(){
        var reserva_confirmada = $('select[name="reserva-confirmada"]').val();
        var usuario_reserva = $('[name="usuario-reserva"]').val();
        var reunion_reserva = $('[name="reunion-reserva"]').val();

        var formData = new FormData();
        formData.append('reserva_confirmada', reserva_confirmada);
        formData.append('usuario_reserva', usuario_reserva);
        formData.append('reunion_reserva', reunion_reserva);

        let action = "insertar-reserva";

        $.ajax({
            type: "POST",
            url: "php/Reservas.php?action=" + action,
            data: formData,

            processData: false,
            contentType: false,

            success: function (resultado) {


                if (resultado == true) {
                   

                    $('p#create-help').css({color: "green"});
                    $('p#create-help').text("Reserva creada correctamente!");

                    setTimeout(() => {
                        location.href="Reservas.html";
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


    function pintar_reservas(array_reservas) {
        $('table#dataTable tbody').empty();


        var reserva_confirmada = false;

        for (const reserva of array_reservas) {


            if (reserva.reserva_confirmada == 1) {
                reserva_confirmada = true;
            } else {
                reserva_confirmada = false;
            }


            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + reserva.id_reserva + "</td>"
                + "<td>" + reserva_confirmada + "</td>"
                + "<td>" + reserva.nombre_usuario + "</td>"
                + "<td>" + reserva.tematica_reunion + "</td>"


                + "<td>"

                + "<a href='#' class='btn btn-primary btn-icon-split'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a value="+reserva.id_reserva+" class='btn btn-danger btn-icon-split delete-reserva'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );

        }

        $('a.delete-reserva').on('click',function(event){
            event.preventDefault();
            var id_reserva = parseInt($(this).attr('value'));
            eliminar_reserva(id_reserva);
         });



         function eliminar_reserva(id_reserva){

            let action = "eliminar-reserva";
         
            $.ajax({
                type: "POST",
                url: "php/Reservas.php?action=" + action,
                data: {
                    id_reserva: id_reserva    
                },
    
         
    
                success: function (resultado) {
    
    
                    if (resultado == true) {

                        $('span#user-help').css("visibility", "visible");

                        setTimeout(() => {
                            $('span#user-help').css("visibility", "hidden");

                        }, 1000);

                       
                        //para reflejar los cambios al usuario
                      show();
                      
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






});