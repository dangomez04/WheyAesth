$(document).ready(function () {


let action = 'comprobar-sesion';

$.ajax({
    type: "POST",
    url: "admin-panel/php/CheckSession.php?action="+action,
    


    success: function (resultado) {

        if (resultado == "No hay sesion") {
            
        }else{
            var usuario_actual = resultado;

            $('span#cuenta').text(usuario_actual);
            $('ul#secondMenu').css({width: '36vw'});
            $('.searchbar').css({width: '43vw'});

        }   


    },


    error: function (xhr) {
        console.log(xhr);
    },

});



});
