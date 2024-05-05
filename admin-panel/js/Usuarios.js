$(document).ready(function () {

    function show() {

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

    }

    show();

    //botón inicialmente desabilitado hasta que se cumplan las obligaciones al crear usuario

    $('input#submit-crear-usuario').prop("disabled", true);
    $('input#submit-crear-usuario').css({ opacity: 0.3 });

    //manejo de contraseñas
    const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$()#€!%*?&+.])[A-Za-z\d@$()#€!%*?&+. ]{8,}$/;
    var conditionRegex = false;
    var conditionRepeat = false; 

    $('input#contraseña-usuario').on('input',function(){

        var contraseña = $('input#contraseña-usuario').val();
        var confirmarContraseña = $('input#confirmar-contraseña-usuario').val();

        if(confirmarContraseña!=contraseña){
            $('p#confirm-help').css({ color: "red" });
            $('p#confirm-help').text("Las contraseñas no coinciden");
            conditionRepeat = false;
        }else {
            $('p#confirm-help').text("");
          
            conditionRepeat = true;

        }


        if(!regex_pass.test(contraseña)){
            $('#pass-help').text("La contraseña debe contener: Min. 8 caracteres, 1 Mayus, 1 Minus, 1 Número y Caracter especial")
            $('#pass-help').css({color: 'red'});
            conditionRegex = false;
          
        }else{
            $('#pass-help').text("");
            conditionRegex = true;
            
        }


        if(conditionRegex && conditionRepeat){
            $('input#submit-crear-usuario').prop("disabled", false);
            $('input#submit-crear-usuario').css({ opacity: 1 });
        }else{
            $('input#submit-crear-usuario').prop("disabled", true);
            $('input#submit-crear-usuario').css({ opacity: 0.3 });
        }



    });



    $('input#confirmar-contraseña-usuario').on('input', function () {
        var contraseña = $('input#contraseña-usuario').val();
        var confirmarContraseña = $(this).val();

        if (contraseña != confirmarContraseña) {
            $('p#confirm-help').css({ color: "red" });
            $('p#confirm-help').text("Las contraseñas no coinciden");
            conditionRepeat = false;

          
        } else {
            $('p#confirm-help').text("");
          
            conditionRepeat = true;

        }

        if(conditionRegex && conditionRepeat){
            $('input#submit-crear-usuario').prop("disabled", false);
            $('input#submit-crear-usuario').css({ opacity: 1 });
        }else{
            $('input#submit-crear-usuario').prop("disabled", true);
            $('input#submit-crear-usuario').css({ opacity: 0.3 });
        }



    });

    $('input#submit-crear-usuario').on('click', function (event) {
        event.preventDefault();
        insertar_usuario();

    });

    $('input#cancelar-crear-usuario').on('click', function (event) {
        event.preventDefault();
        location.href = "Usuarios.html";

    });

    function insertar_usuario() {
        var nombre_usuario = $('input#nombre-usuario').val();
        var email_usuario = $('input#correo-usuario').val();
        var contraseña_usuario = $('input#contraseña-usuario').val();
        var confirmar_contraseña_usuario = $('input#confirmar-contraseña-usuario').val();

        var rol_usuario = parseInt($('select[name="id_rol"]').val());

        if (nombre_usuario == "" || email_usuario == "" || contraseña_usuario == "" || isNaN(rol_usuario) || confirmar_contraseña_usuario == "") {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");
        } else {

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


                        $('p#create-help').css({ color: "green" });
                        $('p#create-help').text("Usuario creado correctamente!");

                        setTimeout(() => {
                            location.href = "Usuarios.html";
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








    function pintar_usuario(array_usuarios) {

        $('table#dataTable tbody').empty();


        for (const usuario of array_usuarios) {





            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + usuario.id_usuario + "</td>"
                + "<td>" + usuario.nombre_usuario + "</td>"
                + "<td>" + usuario.correo_usuario + "</td>"
                + "<td>" + usuario.contraseña_usuario + "</td>"
                + "<td>" + usuario.rol + "</td>"


                + "<td>"

                + "<a href='#' class='btn btn-primary btn-icon-split'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a value=" + usuario.id_usuario + " class='btn btn-danger btn-icon-split delete-usuario'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );

        }

        $('a.delete-usuario').on('click', function (event) {
            event.preventDefault();
            var id_usuario = parseInt($(this).attr('value'));
            eliminar_usuario(id_usuario);
        });


    }

    function pintar_usuario_select(array_usuarios) {


        for (const usuario of array_usuarios) {
            $('select[name="usuario-reserva"]').append("<option value=" + usuario.id_usuario + ">" + usuario.nombre_usuario + "</option>")

        }

    }

    function eliminar_usuario(id_usuario) {

        let action = "eliminar-usuario";

        $.ajax({
            type: "POST",
            url: "php/Usuarios.php?action=" + action,
            data: {
                id_usuario: id_usuario
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






});