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


    //control de correo válido
    const regexCorreo = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/;
    var conditionCorreo = false;
    var conditionRegex = false;
    var conditionRepeat = false;

    $('input#correo-usuario').on('input', function () {
        var correo_intro = $('input#correo-usuario').val();

        if (!regexCorreo.test(correo_intro)) {
            $('p#email-help').css({ color: "red" });
            $('p#email-help').text("Introduce un correo válido")
            conditionCorreo = false;
        } else {
            $('p#email-help').text("");
            conditionCorreo = true;

        }

        if (conditionRegex && conditionRepeat && conditionCorreo) {
            $('input#submit-crear-usuario').prop("disabled", false);
            $('input#submit-crear-usuario').css({ opacity: 1 });
        } else {
            $('input#submit-crear-usuario').prop("disabled", true);
            $('input#submit-crear-usuario').css({ opacity: 0.3 });
        }

    });


    //manejo de contraseñas
    const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$()#€!%*?&+.])[A-Za-z\d@$()#€!%*?&+. ]{8,}$/;


    $('input#contraseña-usuario').on('input', function () {

        var contraseña = $('input#contraseña-usuario').val();
        var confirmarContraseña = $('input#confirmar-contraseña-usuario').val();

        if (confirmarContraseña != contraseña) {
            $('p#confirm-help').css({ color: "red" });
            $('p#confirm-help').text("Las contraseñas no coinciden");
            conditionRepeat = false;
        } else {
            $('p#confirm-help').text("");

            conditionRepeat = true;

        }


        if (!regex_pass.test(contraseña)) {
            $('#pass-help').text("La contraseña debe contener: Min. 8 caracteres, 1 Mayus, 1 Minus, 1 Número y Caracter especial")
            $('#pass-help').css({ color: 'red' });
            conditionRegex = false;

        } else {
            $('#pass-help').text("");
            conditionRegex = true;

        }


        if (conditionRegex && conditionRepeat && conditionCorreo) {
            $('input#submit-crear-usuario').prop("disabled", false);
            $('input#submit-crear-usuario').css({ opacity: 1 });
        } else {
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

        if (conditionRegex && conditionRepeat && conditionCorreo) {
            $('input#submit-crear-usuario').prop("disabled", false);
            $('input#submit-crear-usuario').css({ opacity: 1 });
        } else {
            $('input#submit-crear-usuario').prop("disabled", true);
            $('input#submit-crear-usuario').css({ opacity: 0.3 });
        }



    });

    if (!localStorage.getItem('idUsuario')) {

        $('input#submit-crear-usuario').on('click', function (event) {
            event.preventDefault();
            insertar_usuario();

        });
    }

    $('input#cancelar-crear-usuario').on('click', function (event) {
        event.preventDefault();
        location.href = "Usuarios.html";

    });

    $('a.btn-crear').on('click', function () {
        localStorage.removeItem('idUsuario');

    });

    function insertar_usuario() {
        var nombre_usuario = $('input#nombre-usuario').val();
        var apellidos_usuario = $('input#apellidos-usuario').val();
        var email_usuario = $('input#correo-usuario').val();
        var contraseña_usuario = $('input#contraseña-usuario').val();
        var confirmar_contraseña_usuario = $('input#confirmar-contraseña-usuario').val();
        var fecha_usuario = $('input#fecha-usuario').val();
        var inputSexo = $('input[name="sexo"]:checked');
        var sexo;

        if(inputSexo.hasClass('hombre')){
            sexo = "Hombre";
        }else{
            sexo = "Mujer";

        }

        var rol_usuario = parseInt($('select[name="id_rol"]').val());

        if (nombre_usuario == "" || email_usuario == "" || contraseña_usuario == "" || isNaN(rol_usuario) || confirmar_contraseña_usuario == "" || apellidos_usuario == "" || fecha_usuario == "") {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");
        } else {

            var formData = new FormData();
            formData.append('nombre_usuario', nombre_usuario);
            formData.append('email_usuario', email_usuario);
            formData.append('contraseña_usuario', contraseña_usuario);
            formData.append('rol_usuario', rol_usuario);
            formData.append('apellidos_usuario', apellidos_usuario);
            formData.append('fecha_usuario', fecha_usuario);
            formData.append('sexo_usuario', sexo);


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

                    }else{
                        $('p#create-help').css({ color: "red" });
                        $('p#create-help').text(resultado);

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

            var fecha_formateada = new Date(usuario.fecha_nacimiento);

            var opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric' };

            var fecha_nacimiento_usuario = fecha_formateada.toLocaleDateString('es-ES', opcionesFecha);




            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + usuario.id_usuario + "</td>"
                + "<td>" + usuario.nombre_usuario + "</td>"
                + "<td>" + usuario.apellidos_usuario + "</td>"
                + "<td>" + usuario.correo_usuario + "</td>"
                + "<td>" + usuario.contraseña_usuario + "</td>"
                + "<td>" + fecha_nacimiento_usuario + "</td>"
                + "<td>" + usuario.sexo_usuario + "</td>"
                + "<td>" + usuario.rol + "</td>"


                + "<td>"

                + "<a value=" + usuario.id_usuario + " class='btn btn-primary btn-icon-split edit-usuario'>"

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

        $('a.edit-usuario').on('click', function (event) {
            event.preventDefault();
            var id_usuario = parseInt($(this).attr('value'));
            localStorage.setItem('idUsuario', id_usuario);
            window.location.href = 'form-usuario.html';


        });

    }


    //editar
    if (localStorage.getItem('idUsuario')) {

        let action = 'buscar-usuario';
        var idUsuario = localStorage.getItem('idUsuario');


        $.ajax({
            type: "POST",
            url: "php/Usuarios.php?action=" + action,
            data: {
                id_usuario: idUsuario
            },
            dataType: 'json',



            success: function (resultado) {
                $("input#submit-crear-usuario").val("Actualizar");

                $('h6#title-form-usuario').text("Editar Usuario");

                $('input#nombre-usuario').val(resultado.nombre_usuario);
                $('input#apellidos-usuario').val(resultado.apellidos_usuario);
                $('input#correo-usuario').val(resultado.correo_usuario);
                $('input#contraseña-usuario').val(resultado.contraseña_usuario);
                $('input#confirmar-contraseña-usuario').val(resultado.contraseña_usuario);
                $('input#fecha-usuario').val(resultado.fecha_nacimiento);

                if(resultado.sexo_usuario == "Hombre"){
                    $('input#radio_hombre').prop('checked',true);

                }else{
                    $('input#radio_mujer').prop('checked',true);

                }



                $('input#id_usuario').val(resultado.id_usuario);


                var valor_rol = resultado.rol_usuario.toString();

                setTimeout(() => {
                    $('select[name="id_rol"] option').each(function () {

                        if ($(this).val() === valor_rol) {

                            $(this).prop('selected', true);
                        }
                    });
                }, 10);

                //control de correo válido
                const regexCorreo = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/;
                var conditionCorreo = false;
                var conditionRegex = false;
                var conditionRepeat = false;

                var correo_intro = $('input#correo-usuario').val();
            
                if(!regexCorreo.test(correo_intro)){
                    $('p#email-help').css({ color: "red" });
                    $('p#email-help').text("Introduce un correo válido")
                    conditionCorreo = false;
                }else{
                    $('p#email-help').text("");
                    conditionCorreo = true;
        
                }
        
                if (conditionRegex && conditionRepeat && conditionCorreo) {
                    $('input#submit-crear-usuario').prop("disabled", false);
                    $('input#submit-crear-usuario').css({ opacity: 1 });
                } else {
                    $('input#submit-crear-usuario').prop("disabled", true);
                    $('input#submit-crear-usuario').css({ opacity: 0.3 });
                }

                $('input#correo-usuario').on('input',function(){
                    var correo_intro = $('input#correo-usuario').val();
            
                    if(!regexCorreo.test(correo_intro)){
                        $('p#email-help').css({ color: "red" });
                        $('p#email-help').text("Introduce un correo válido")
                        conditionCorreo = false;
                    }else{
                        $('p#email-help').text("");
                        conditionCorreo = true;
            
                    }
            
                    if (conditionRegex && conditionRepeat && conditionCorreo) {
                        $('input#submit-crear-usuario').prop("disabled", false);
                        $('input#submit-crear-usuario').css({ opacity: 1 });
                    } else {
                        $('input#submit-crear-usuario').prop("disabled", true);
                        $('input#submit-crear-usuario').css({ opacity: 0.3 });
                    }
            
                });








                //manejo de contraseñas
                const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$()#€!%*?&+.])[A-Za-z\d@$()#€!%*?&+. ]{8,}$/;

                var contraseña = $('input#contraseña-usuario').val();
                var confirmarContraseña = $('input#confirmar-contraseña-usuario').val();

                if (confirmarContraseña != contraseña) {
                    $('p#confirm-help').css({ color: "red" });
                    $('p#confirm-help').text("Las contraseñas no coinciden");
                    conditionRepeat = false;
                } else {
                    $('p#confirm-help').text("");

                    conditionRepeat = true;

                }


                if (!regex_pass.test(contraseña)) {
                    $('#pass-help').text("La contraseña debe contener: Min. 8 caracteres, 1 Mayus, 1 Minus, 1 Número y Caracter especial")
                    $('#pass-help').css({ color: 'red' });
                    conditionRegex = false;

                } else {
                    $('#pass-help').text("");
                    conditionRegex = true;

                }


                if (conditionRegex && conditionRepeat && conditionCorreo) {
                    $('input#submit-crear-usuario').prop("disabled", false);
                    $('input#submit-crear-usuario').css({ opacity: 1 });
                } else {
                    $('input#submit-crear-usuario').prop("disabled", true);
                    $('input#submit-crear-usuario').css({ opacity: 0.3 });
                }



                $('input#contraseña-usuario').on('input', function () {

                    var contraseña = $('input#contraseña-usuario').val();
                    var confirmarContraseña = $('input#confirmar-contraseña-usuario').val();

                    if (confirmarContraseña != contraseña) {
                        $('p#confirm-help').css({ color: "red" });
                        $('p#confirm-help').text("Las contraseñas no coinciden");
                        conditionRepeat = false;
                    } else {
                        $('p#confirm-help').text("");

                        conditionRepeat = true;

                    }


                    if (!regex_pass.test(contraseña)) {
                        $('#pass-help').text("La contraseña debe contener: Min. 8 caracteres, 1 Mayus, 1 Minus, 1 Número y Caracter especial")
                        $('#pass-help').css({ color: 'red' });
                        conditionRegex = false;

                    } else {
                        $('#pass-help').text("");
                        conditionRegex = true;

                    }


                    if (conditionRegex && conditionRepeat && conditionCorreo) {
                        $('input#submit-crear-usuario').prop("disabled", false);
                        $('input#submit-crear-usuario').css({ opacity: 1 });
                    } else {
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

                    if (conditionRegex && conditionRepeat) {
                        $('input#submit-crear-usuario').prop("disabled", false);
                        $('input#submit-crear-usuario').css({ opacity: 1 });
                    } else {
                        $('input#submit-crear-usuario').prop("disabled", true);
                        $('input#submit-crear-usuario').css({ opacity: 0.3 });
                    }



                });



                $("input#submit-crear-usuario").on("click", function (event) {

                    event.preventDefault()
                    let action = 'insertar-usuario';

                    var nombre_usuario = $('input#nombre-usuario').val();
                    var apellidos_usuario = $('input#apellidos-usuario').val();
                    var correo_usuario = $('input#correo-usuario').val();
                    var contraseña_usuario = $('input#contraseña-usuario').val();
                    var rol_usuario = $('select[name="id_rol"]').val();
                    var fecha_usuario = $('input#fecha-usuario').val();
                    var inputSexo = $('input[name="sexo"]:checked');
                    var sexo;
            
                    if(inputSexo.hasClass('hombre')){
                        sexo = "Hombre";
                    }else{
                        sexo = "Mujer";
            
                    }
                    var id_usuario = $('input#id_usuario').val();

                    var formData = new FormData();
                    formData.append('id_usuario', id_usuario);
                    formData.append('nombre_usuario', nombre_usuario);
                    formData.append('apellidos_usuario', apellidos_usuario);
                    formData.append('correo_usuario', correo_usuario);
                    formData.append('contraseña_usuario', contraseña_usuario);
                    formData.append('fecha_usuario', fecha_usuario);
                    formData.append('sexo', sexo);
                    formData.append('rol_usuario', rol_usuario);

                    $.ajax({
                        type: "POST",
                        url: "php/Usuarios.php?action=" + action,
                        data: formData,
                        processData: false,
                        contentType: false,



                        success: function (resultado) {

                            if (resultado == true) {
                                $('p#create-help').css({ color: "green" });
                                $('p#create-help').text("Usuario actualizado correctamente!");

                                setTimeout(() => {
                                    location.href = "Usuarios.html";
                                }, 1300);

                            } else {
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