$(document).ready(function () {


    function show() {
        let currentAction = 'show';

        $.ajax({
            type: "GET",
            url: "php/Accesorios.php",
            dataType: "json",

            data: {
                action: currentAction,

            },
            success: function (resultado) {


                pintar_accesorios(resultado);
                pintar_accesorios_select(resultado);

            },


            error: function (xhr) {

                console.log(xhr);
            },

        });
    }


    show();




    $('input#submit-crear-accesorio').on('click', function (event) {
        event.preventDefault();
        insertar_accesorio();

    });


    $('input#cancelar-crear-accesorio').on('click', function (event) {
        event.preventDefault();
        location.href = "Accesorios.html";

    });








    function insertar_accesorio() {
        var nombre_accesorio = $('input#nombre-accesorio').val();
        var precio_accesorio = parseFloat($('input#precio-accesorio').val());
        var desc_accesorio = $('textarea#desc-accesorio').val();
        var color_accesorio = $('input#color-accesorio').val();
        var stock_accesorio = parseInt($('input#stock-accesorio').val());
        var novedad_accesorio = parseInt($('select[name="novedad-accesorio"]').val());
        var imagenprovisional = 'noimage.png';

        //falta comprobar imagen
        if (nombre_accesorio == "" || isNaN(precio_accesorio) || desc_accesorio == "" || color_accesorio == "" || isNaN(stock_accesorio) || isNaN(novedad_accesorio)) {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");
        } else {


            var formData = new FormData();
            formData.append('nombre_accesorio', nombre_accesorio);
            formData.append('precio_accesorio', precio_accesorio);
            formData.append('desc_accesorio', desc_accesorio);
            formData.append('color_accesorio', color_accesorio);
            formData.append('stock_accesorio', stock_accesorio);
            formData.append('novedad_accesorio', novedad_accesorio);
            formData.append('imagenprovisional', imagenprovisional);

            let action = "insertar-accesorio";

            $.ajax({
                type: "POST",
                url: "php/Accesorios.php?action=" + action,
                data: formData,

                processData: false,
                contentType: false,

                success: function (resultado) {


                    if (resultado == true) {


                        $('p#create-help').css({ color: "green" });
                        $('p#create-help').text("Accesorio creado correctamente!");

                        setTimeout(() => {
                            location.href = "Accesorios.html";
                        }, 1300);

                    } else {
                        console.log(resultado);
                    }





                },
                error: function (xhr) {
                    console.log(xhr);
                },

            });
        }


    }



    function pintar_accesorios(array_accesorios) {

        $('table#dataTable tbody').empty();


        var booleanValue = false;

        for (const accesorio of array_accesorios) {
            if (accesorio.novedad == 1) {
                booleanValue = true;
            } else {
                booleanValue = false;
            }

            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + accesorio.id_accesorio + "</td>"
                + "<td>" + accesorio.nombre_accesorio + "</td>"
                + "<td>" + accesorio.precio_accesorio + "</td>"
                + "<td>" + accesorio.descripcion_accesorio + "</td>"
                + "<td>" + accesorio.color_accesorio + "</td>"
                + "<td>" + accesorio.stock + "</td>"
                + "<td>" + booleanValue + "</td>"
                + "<td>" + "<a target='_blank' href='img/" + accesorio.imagen_accesorio + "'><img width='100' height='100' src='img/" + accesorio.imagen_accesorio + "' alt='" + accesorio.imagen_accesorio + "'></a>" + "</td>"
                + "<td>"

                + "<a  value=" + accesorio.id_accesorio + "  class='btn btn-primary btn-icon-split edit-accesorio'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a value=" + accesorio.id_accesorio + " class='btn btn-danger btn-icon-split delete-accesorio'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );



        }
        $('a.delete-accesorio').on('click', function (event) {
            event.preventDefault();
            var id_accesorio = parseInt($(this).attr('value'));
            eliminar_accesorio(id_accesorio);
        });

        $('a.edit-accesorio').on('click', function (event) {
            event.preventDefault();
            var id_accesorio = parseInt($(this).attr('value'));
            localStorage.setItem('idAccesorio', id_accesorio);
            window.location.href = 'form-accesorio.html';

           
        });


    }

    //editar 
    let action = 'buscar-accesorio';
    var idAccesorio = localStorage.getItem('idAccesorio');


    $.ajax({
        type: "POST",
        url: "php/Accesorios.php?action=" + action,
        data: {
            id_accesorio: idAccesorio
        },
        dataType : 'json',



        success: function (resultado) {

            console.log(resultado);
                
            

            $('input#nombre-accesorio').val(resultado.nombre_accesorio);
            
            $('h6#title-form').text("Editar Accesorio");


        },
        error: function (xhr) {
            console.log(xhr);
        },

    });




    function pintar_accesorios_select(array_accesorios) {
        for (const accesorio of array_accesorios) {
            $('select[name="id_accesorio"]').append("<option value=" + accesorio.id_accesorio + ">" + accesorio.nombre_accesorio + "</option>");
        }
    }


    



    function eliminar_accesorio(id_accesorio) {

        let action = "eliminar-accesorio";

        $.ajax({
            type: "POST",
            url: "php/Accesorios.php?action=" + action,
            data: {
                id_accesorio: id_accesorio
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