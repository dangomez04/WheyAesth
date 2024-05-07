$(document).ready(function () {

    function show() {

        let currentAction = 'show';

        $.ajax({
            type: "GET",
            url: "php/Roles.php",
            dataType: "json",

            data: {
                action: currentAction,

            },
            success: function (resultado) {


                pintar_rol(resultado);
                pintar_rol_select(resultado);
            },


            error: function (xhr) {

                console.log(xhr);
            },

        });
    }

    show();

    if(!localStorage.getItem('idRol')){
        $('input#submit-crear-rol').on('click', function (event) {
            event.preventDefault();
            insertar_rol();
    
        });
    }
  

    $('input#cancelar-crear-rol').on('click', function (event) {
        event.preventDefault();
        location.href = "Roles.html";

    });

    $('a.btn-crear').on('click', function () {
        localStorage.removeItem('idRol');

    });



    function insertar_rol() {

        var nombre_rol = $('input#nombre-rol').val();

        if (nombre_rol == "") {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");
        } else {
            var formData = new FormData();
            formData.append('nombre_rol', nombre_rol);


            let action = "insertar-rol";

            $.ajax({
                type: "POST",
                url: "php/Roles.php?action=" + action,
                data: formData,

                processData: false,
                contentType: false,

                success: function (resultado) {


                    if (resultado == true) {


                        $('p#create-help').css({ color: "green" });
                        $('p#create-help').text("Rol creado correctamente!");

                        setTimeout(() => {
                            location.href = "Roles.html";
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

        }


    }


    function pintar_rol(array_roles) {
        $('table#dataTable tbody').empty();



        for (const rol of array_roles) {





            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + rol.id_rol + "</td>"
                + "<td>" + rol.rol + "</td>"


                + "<td>"

                + "<a value=" + rol.id_rol + " class='btn btn-primary btn-icon-split edit-rol'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a data-bs-toggle='modal' data-bs-target='#exampleModal' value=" + rol.id_rol + " class='btn btn-danger btn-icon-split delete-rol'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );

        }

        $('a.delete-rol').on('click', function (event) {
            event.preventDefault();

            var id_rol = parseInt($(this).attr('value'));
            eliminar_rol(id_rol);
        });

        $('a.edit-rol').on('click', function (event) {
            event.preventDefault();
            var id_rol = parseInt($(this).attr('value'));
            localStorage.setItem('idRol', id_rol);
            window.location.href = 'form-rol.html';


        });

    }

    //editar
    if (localStorage.getItem('idRol')) {
        let action = 'buscar-rol';
        var idRol = localStorage.getItem('idRol');


        $.ajax({
            type: "POST",
            url: "php/Roles.php?action=" + action,
            data: {
                id_rol: idRol
            },
            dataType: 'json',



            success: function (resultado) {
                $("input#submit-crear-rol").val("Actualizar");

                $('h6#title-form-rol').text("Editar Rol");
                $('input#nombre-rol').val(resultado.rol);
                $('input#id_rol').val(resultado.id_rol);


                $("input#submit-crear-rol").on('click',function(event){
                    event.preventDefault();
                    
                    let action = 'insertar-rol';

                    var nombre_rol = $('input#nombre-rol').val();
                    var id_rol = $('input#id_rol').val();

                    var formData = new FormData();
                    formData.append('id_rol', id_rol);
                    formData.append('nombre_rol', nombre_rol);
    
                    $.ajax({
                        type: "POST",
                        url: "php/Roles.php?action=" + action,
                        data: formData,
                        processData: false,
                        contentType: false,
    
    
    
                        success: function (resultado) {
    
                            if(resultado == true){
                                $('p#create-help').css({ color: "green" });
                                $('p#create-help').text("Rol actualizado correctamente!");
        
                                setTimeout(() => {
                                    location.href = "Roles.html";
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
    

                });
                

            },
            error: function (xhr) {
                console.log(xhr);
            },

        });

    }


    function pintar_rol_select(array_roles) {
        for (const rol of array_roles) {
            $('select[name="id_rol"]').append("<option value=" + rol.id_rol + ">" + rol.rol + "</option>")
        }
    }

    function eliminar_rol(id_rol) {

        let action = "eliminar-rol";

        $.ajax({
            type: "POST",
            url: "php/Roles.php?action=" + action,
            data: {
                id_rol: id_rol
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