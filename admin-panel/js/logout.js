$(document).ready(function () {


    $('a#cerrar-sesion-admin').on('click', function (event) {
        event.preventDefault();
        console.log("cerrar");

        let action = "cerrar-sesion";
        $.ajax({
            type: "GET",
            url: "php/CerrarSesion.php?action=" + action,
            dataType: "json",

            success: function (resultado) {
                if (resultado) {
                    location.href = "../";
                    // si se cierra sesion quito de localstorage los datos del usuario registrado para que no se carguen en el login
                    localStorage.removeItem('correo_registrado');
                    localStorage.removeItem('contraseña_registrada');
                }

            },


            error: function (xhr) {
                console.log(xhr);
            },

        });
    });



});

