$(document).ready(function () {


    //inicialmente botón desabilitado hasta que se cumplan las condiciones
    $('input#enviar-registro').prop("disabled", true);
    $('input#enviar-registro').css({ opacity: 0.7 });
    //quitar hover
    $('input#enviar-registro').css("pointer-events", "none");

    // control de correo válido
    const regexCorreo = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}/;
    var conditionCorreo = false;
    var conditionRegex = false;
    var conditionRepeat = false;

    $('input#email-usuario').on('input', function () {
        var email_intro = $('input#email-usuario').val();

        if (!regexCorreo.test(email_intro)) {
            $('p#email-help').css({ color: "red" });
            $('p#email-help').text("Introduce un correo válido")
            conditionCorreo = false;
        } else {
            $('p#email-help').text("");
            conditionCorreo = true;
        }


        if (conditionRegex && conditionRepeat && conditionCorreo) {
            $('input#enviar-registro').prop("disabled", false);
            $('input#enviar-registro').css({ opacity: 1 });
            $('input#enviar-registro').css("pointer-events", "");

        } else {
            $('input#enviar-registro').prop("disabled", true);
            $('input#enviar-registro').css({ opacity: 0.5 });
            $('input#enviar-registro').css("pointer-events", "none");

        }

    });


    // control de contraseñas

    //manejo de contraseñas
    const regex_pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$()#€!%*?&+.])[A-Za-z\d@$()#€!%*?&+. ]{8,}$/;


    $('input#contraseña').on('input', function () {

        var contraseña = $(this).val();
        var confirmarContraseña = $('input#confirmar-contraseña').val();

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
            $('input#enviar-registro').prop("disabled", false);
            $('input#enviar-registro').css({ opacity: 1 });
            $('input#enviar-registro').css("pointer-events", "");

        } else {
            $('input#enviar-registro').prop("disabled", true);
            $('input#enviar-registro').css({ opacity: 0.5 });
            $('input#enviar-registro').css("pointer-events", "none");

        }



    });



    $('input#confirmar-contraseña').on('input', function () {
        var contraseña = $('input#contraseña').val();
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
            $('input#enviar-registro').prop("disabled", false);
            $('input#enviar-registro').css({ opacity: 1 });
            $('input#enviar-registro').css("pointer-events", "");

        } else {
            $('input#enviar-registro').prop("disabled", true);
            $('input#enviar-registro').css({ opacity: 0.5 });
            $('input#enviar-registro').css("pointer-events", "none");

        }




    });


    $('input#cancelar-registro').on('click', function (event) {
        event.preventDefault();
        location.href = "login.html";
    });


    $('input#enviar-registro').on('click', function (event) {
        event.preventDefault();
        registrar_usuario();

    });


    function registrar_usuario(){

        var nombre_usuario = $('input#nombre-usuario').val();
        var apellidos = $('input#apellidos').val();
        var email_usuario = $('input#email-usuario').val();
        var contraseña = $('input#contraseña').val();
        var fecha = $('input#fecha-usuario').val();

        var fecha_formateada = new Date(fecha);

        var opcionesFecha = { day: '2-digit', month: '2-digit', year: 'numeric' };

        var fecha_usuario = fecha_formateada.toLocaleDateString('es-ES', opcionesFecha);

        var inputSexo = $('input[name="sexo"]:checked');
        var sexo;

        if(inputSexo.hasClass('hombre')){
            sexo = "Hombre";
        }else{
            sexo = "Mujer";

        }
    
        if(nombre_usuario == "" || apellidos == "" || fecha_usuario == "Invalid Date"){
           
            $('p#register-help').css({color: 'red'});
            $('p#register-help').text("Todos los campos son obligatorios!");
        
        }else{
            $('p#register-help').text("ok");

        }


    }




});
