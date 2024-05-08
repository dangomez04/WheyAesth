$(document).ready(function () {


//control de sesiones



//comprobar sesión

let action = 'comprobar-sesion';

$.ajax({
    type: "POST",
    url: "admin-panel/php/CheckSession.php?action=" + action,



    success: function (resultado) {

        resultado = resultado.trim();

        if (resultado == "No hay sesion") {
            location.href = "forbidden.html";

        } else {

            
            

            //comprobar rol


            let action = "check-rol";

            $.ajax({
                type: "POST",
                url: "admin-panel/php/CheckRol.php?action=" + action,



                success: function (resultado) {

                    resultado = resultado.trim();

                    if (resultado == "admin" || resultado == "employee") {
                        location.href = "forbidden.html";
                    }


                },


                error: function (xhr) {
                    console.log(xhr);
                },

            });

        }


    },


    error: function (xhr) {
        console.log(xhr);
    },

});






});
