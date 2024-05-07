$(document).ready(function () {



    function show() {
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

    }

    show();

    if (!localStorage.getItem('idEntrenador')) {

        $('input#submit-crear-entrenador').on('click', function (event) {
            event.preventDefault();
            insertar_entrenador();

        });

    }

    $('input#cancelar-crear-entrenador').on('click', function (event) {
        event.preventDefault();
        location.href = "Entrenadores.html";

    });


    $('a.btn-crear').on('click', function () {
        localStorage.removeItem('idEntrenador');

    });




    function insertar_entrenador() {

        var nombre_entrenador = $('input#nombre-entrenador').val();
        var especialidad_entrenador = $('input#especialidad-entrenador').val();
        var email_entrenador = $('input#email-entrenador').val();

        if (nombre_entrenador == "" || especialidad_entrenador == "" || email_entrenador == "") {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");

        } else {
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


                        $('p#create-help').css({ color: "green" });
                        $('p#create-help').text("Entrenador creado correctamente!");

                        setTimeout(() => {
                            location.href = "Entrenadores.html";
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


    function pintar_entrenadores(array_entrenadores) {

        $('table#dataTable tbody').empty();

        for (const entrenador of array_entrenadores) {

            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + entrenador.id_entrenador + "</td>"
                + "<td>" + entrenador.nombre_entrenador + "</td>"
                + "<td>" + entrenador.especialidad_entrenador + "</td>"
                + "<td>" + entrenador.correo_entrenador + "</td>"

                + "<td>"

                + "<a value=" + entrenador.id_entrenador + " class='btn btn-primary btn-icon-split edit-entrenador'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a  value=" + entrenador.id_entrenador + " class='btn btn-danger btn-icon-split delete-entrenador'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );

        }

        $('a.delete-entrenador').on('click', function (event) {
            event.preventDefault();
            var id_entrenador = parseInt($(this).attr('value'));
            eliminar_entrenador(id_entrenador);

        });

        $('a.edit-entrenador').on('click', function (event) {
            event.preventDefault();
            var id_entrenador = parseInt($(this).attr('value'));
            localStorage.setItem('idEntrenador', id_entrenador);
            window.location.href = 'form-entrenador.html';


        });

    }

    //editar
    if (localStorage.getItem('idEntrenador')) {

        let action = 'buscar-entrenador';
        var idEntrenador = localStorage.getItem('idEntrenador');


        $.ajax({
            type: "POST",
            url: "php/Entrenadores.php?action=" + action,
            data: {
                id_entrenador: idEntrenador
            },
            dataType: 'json',



            success: function (resultado) {

                $("input#submit-crear-entrenador").val("Actualizar");
                $('h6#title-form-entrenador').text("Editar Entrenador");
                $('input#nombre-entrenador').val(resultado.nombre_entrenador);
                $('input#especialidad-entrenador').val(resultado.especialidad_entrenador);
                $('input#email-entrenador').val(resultado.correo_entrenador);
                $('input#id_entrenador').val(resultado.id_entrenador);

                $("input#submit-crear-entrenador").on('click', function (event) {
                    event.preventDefault();
                    var nombre_entrenador = $('input#nombre-entrenador').val();
                    var especialidad_entrenador = $('input#especialidad-entrenador').val();
                    var correo_entrenador = $('input#email-entrenador').val();
                    var id_entrenador = $('input#id_entrenador').val();


                    let action = 'insertar-entrenador';

                    var formData = new FormData();
                    formData.append('id_entrenador', id_entrenador);
                    formData.append('nombre_entrenador', nombre_entrenador);
                    formData.append('especialidad_entrenador', especialidad_entrenador);
                    formData.append('correo_entrenador', correo_entrenador);

                    $.ajax({
                        type: "POST",
                        url: "php/Entrenadores.php?action=" + action,
                        data: formData,
                        processData: false,
                        contentType: false,
    
    
    
                        success: function (resultado) {
    
                            if(resultado == true){
                                $('p#create-help').css({ color: "green" });
                                $('p#create-help').text("Entrenador actualizado correctamente!");
        
                                setTimeout(() => {
                                    location.href = "Entrenadores.html";
                                }, 1300);
        
                            }else{
                                $('p#create-help').css({ color: "red" });
                                $('p#create-help').text(resultado);                            
                            }
                            

                        },
                        error: function (xhr) {
                            console.log(xhr);
                        },
    
                    });


                });



            },
            error: function (xhr) {
                console.log(xhr);
            },

        });

    }

    function pintar_entrenadores_select(array_entrenadores) {

        for (const entrenador of array_entrenadores) {
            $('select[name="id_entrenador"]').append("<option value=" + entrenador.id_entrenador + ">" + entrenador.nombre_entrenador + "</option>");
        }

    }


    function eliminar_entrenador(id_entrenador) {
        let action = "eliminar-entrenador";

        $.ajax({
            type: "POST",
            url: "php/Entrenadores.php?action=" + action,
            data: {
                id_entrenador: id_entrenador
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
                    console.log("error: " + resultado);
                }





            },
            error: function (xhr) {
                console.log(xhr);
            },

        });

    }






});