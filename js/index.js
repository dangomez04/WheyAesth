$(document).ready(function () {

checkSession();

setTimeout(() => {
    $('a#logout').on("click",function(event){
        event.preventDefault();
    
        cerrarSesion();
    
    });
}, 50);




function cerrarSesion(){

let action = "cerrar-sesion";
$.ajax({
    type: "GET",
    url: "admin-panel/php/CerrarSesion.php?action="+action,
    dataType: "json",

    success: function (resultado) {
        if (resultado) {
            location.href = "index.html";
            // si se cierra sesion quito de localstorage los datos del usuario registrado para que no se carguen en el login
            localStorage.removeItem('correo_registrado');
            localStorage.removeItem('contraseña_registrada');
        }

    },


    error: function (xhr) {
        console.log(xhr);
    },

});

}




function checkSession(){
    let action = 'comprobar-sesion';

    $.ajax({
        type: "POST",
        url: "admin-panel/php/CheckSession.php?action="+action,
        
    
    
        success: function (resultado) {
            
            resultado = resultado.trim();
            
            if (resultado == "No hay sesion") {
                $('span#cuenta').text('Iniciar sesión | Crear cuenta');

            }else{
                var usuario_actual = resultado;
    
                $('span#cuenta').text(usuario_actual);
                $('ul#secondMenu').css({width: '36vw'});

                if($('a#logout').length === 0){
                    $('ul#secondMenu').append('<li><a style="cursor: pointer;" id="logout"><i class="bi bi-box-arrow-right"></i>Cerrar Sesión</a></li>');

                }
                $('.searchbar').css({width: '43vw'});

                $('span#cuenta').on('click',function(event){
                    event.preventDefault();
                    
                    //comprobar el rol del usuario actual y redirigir según convenga

                    let action = "check-rol";

                    $.ajax({
                        type: "POST",
                        url: "admin-panel/php/CheckRol.php?action="+action,
                        
                    
                    
                        success: function (resultado) {
                            
                            resultado = resultado.trim();
                            
                            if(resultado == "admin"){
                                location.href="admin-panel/index.html";
                            }else if(resultado == "user"){
                                location.href="usuario.html";
                            }else{
                                location.href="entrenador.html";

                            }
                    
                    
                        },
                    
                    
                        error: function (xhr) {
                            console.log(xhr);
                        },
                    
                    });
                });


    
            }   
    
    
        },
    
    
        error: function (xhr) {
            console.log(xhr);
        },
    
    });
}    


});
