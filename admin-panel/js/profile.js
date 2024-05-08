$(document).ready(function () {

    $('span#volver').on('click',function(event){
        event.preventDefault();
        
        location.href="../";

    });


    //comprobar sesión

    let action = 'comprobar-sesion';

    $.ajax({
        type: "POST",
        url: "php/CheckSession.php?action=" + action,



        success: function (resultado) {

            resultado = resultado.trim();

            if (resultado == "No hay sesion") {
                location.href = "../forbidden.html";

            } else {

                $('span#nombre_admin').text(resultado);


                //comprobar rol


                let action = "check-rol";

                $.ajax({
                    type: "POST",
                    url: "php/CheckRol.php?action=" + action,



                    success: function (resultado) {

                        resultado = resultado.trim();

                        if (resultado == "user" || resultado == "employee") {
                            location.href = "../forbidden.html";
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
