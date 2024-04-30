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
                  

                    console.log(resultado);
                },


                error: function (xhr) {
                    
                    console.log(xhr);
                },

            });
        
    });