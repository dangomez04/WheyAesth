$(document).ready(function () {
    

$('input#registrarse').on('click',function(event){
    event.preventDefault();
    window.location.href = "signin.html";


});



if(localStorage.getItem('correo_registrado') && localStorage.getItem('contraseña_registrada')){

    var correo_registrado = localStorage.getItem('correo_registrado');
    var contraseña_registrada = localStorage.getItem('contraseña_registrada');

    $('input#email-usuario').val(correo_registrado);
    $('input#contraseña').val(contraseña_registrada);

}

$('input#enviar-login').on('click',function(event){

event.preventDefault();

var correo_intro = $('input#email-usuario').val();
var pass_intro = $('input#contraseña').val();

let action = 'login';
var formData = new FormData();
formData.append('correo_registrado', correo_intro);
formData.append('contraseña_registrada', pass_intro);


$.ajax({
    type: "POST",
    url: "admin-panel/php/Usuarios.php?action=" + action,
    data: formData,
    processData: false,
    contentType: false,

    success: function (resultado) {



        if(resultado == "Credenciales incorrectas" || resultado=="Error en el login"){
            console.log("entro aqui");
            $("p#help").text(resultado);
            $("p#help").css({color: "red"});

           
        }else{
            // let result = JSON.parse(resultado);
            // console.log(result);
            $("p#help").text("Sesión iniciada con éxito");
            $("p#help").css({color: "green"});
            
            setTimeout(function () {
                location.href = "index.html";
            }, 1000);

        }

    },


    error: function (xhr) {
        console.log(xhr);
    },

});



});



});
