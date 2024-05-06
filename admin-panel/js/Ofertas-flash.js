$(document).ready(function () {

    function show() {

        let currentAction = 'show';

        $.ajax({
            type: "GET",
            url: "php/Ofertas-flash.php",
            dataType: "json",

            data: {
                action: currentAction,

            },
            success: function (resultado) {


                pintar_ofertas(resultado);

            },


            error: function (xhr) {

                console.log(xhr);
            },

        });


    }
    show();


    //control de selects, ya que el usuario solo puede elegir en uno de los dos select



    $('select[name="id_suplemento"]').change(function () {

        if ($(this).val() !== '') {

            $('select[name="id_accesorio"]').prop('disabled', true);
        } else {

            $('select[name="id_accesorio"]').prop('disabled', false);
        }


        if ($(this).val() === 'null') {
            $('select[name="id_accesorio"]').prop('disabled', false);
        } else {
            $('select[name="id_accesorio"]').prop('disabled', true);
        }
    });

    $('select[name="id_accesorio"]').change(function () {

        if ($(this).val() !== '') {

            $('select[name="id_suplemento"]').prop('disabled', true);
        } else {

            $('select[name="id_suplemento"]').prop('disabled', false);
        }

        if ($(this).val() === 'null') {
            $('select[name="id_suplemento"]').prop('disabled', false);
        } else {
            $('select[name="id_suplemento"]').prop('disabled', true);
        }
    });


    $('input#submit-crear-oferta').on('click', function (event) {
        event.preventDefault();
        insertar_oferta();

    });

    $('input#cancelar-crear-oferta').on('click', function (event) {
        event.preventDefault();
        location.href = "Ofertas-flash.html";

    });

    $('a.btn-crear').on('click',function(){
        localStorage.removeItem('idOferta');

    });

    function insertar_oferta() {

        var precio_oferta = parseFloat($('input#precio-oferta').val());
        var stock_oferta = parseInt($('input#stock-oferta').val());
        var suplemento_oferta = parseInt($('select[name="id_suplemento"]').val());
        var accesorio_oferta = parseInt($('select[name="id_accesorio"]').val());



        if (isNaN(precio_oferta) || isNaN(stock_oferta)) {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");
        } else if (isNaN(suplemento_oferta) && isNaN(accesorio_oferta)) {
            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");
        } else {
            var nulValue = null;
            var formData = new FormData();
            formData.append('precio_oferta', precio_oferta);
            formData.append('stock_oferta', stock_oferta);
            if (isNaN(suplemento_oferta)) {
                formData.append('suplemento_oferta', nulValue);
                formData.append('accesorio_oferta', accesorio_oferta);

            } else {
                formData.append('accesorio_oferta', nulValue);
                formData.append('suplemento_oferta', suplemento_oferta);

            }

            let action = "insertar-oferta";

            $.ajax({
                type: "POST",
                url: "php/Ofertas-flash.php?action=" + action,
                data: formData,

                processData: false,
                contentType: false,

                success: function (resultado) {


                    if (resultado == true) {

                        console.log(resultado);
                        $('p#create-help').css({ color: "green" });
                        $('p#create-help').text("Oferta creada correctamente!");

                        setTimeout(() => {
                            location.href = "Ofertas-flash.html";
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



    function pintar_ofertas(array_ofertas) {

        $('table#dataTable tbody').empty();

        for (const oferta of array_ofertas) {



            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + oferta.id_oferta_flash + "</td>"
                + "<td>" + oferta.precio_oferta + "</td>"
                + "<td>" + oferta.stock_oferta + "</td>"
                + "<td>" + oferta.nombre_suplemento + "</td>"
                + "<td>" + oferta.nombre_accesorio + "</td>"


                + "<td>"

                + "<a value=" + oferta.id_oferta_flash + " class='btn btn-primary btn-icon-split edit-oferta'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a value=" + oferta.id_oferta_flash + " class='btn btn-danger btn-icon-split delete-oferta'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );

        }

        $('a.delete-oferta').on('click', function (event) {
            event.preventDefault();
            var id_oferta = parseInt($(this).attr('value'));
            eliminar_oferta(id_oferta);
        });

        $('a.edit-oferta').on('click', function (event) {
            event.preventDefault();
            var id_oferta = parseInt($(this).attr('value'));
            localStorage.setItem('idOferta', id_oferta);
            window.location.href = 'form-oferta.html';


        });



    }

    //editar
    if(localStorage.getItem('idOferta')){

    let action = 'buscar-oferta';
    var idOferta = localStorage.getItem('idOferta');


    $.ajax({
        type: "POST",
        url: "php/Ofertas-flash.php?action=" + action,
        data: {
            id_oferta: idOferta
        },
        dataType: 'json',



        success: function (resultado) {
            $("input#submit-crear-oferta").val("Actualizar");
            $('h6#form-title-oferta').text("Editar Oferta flash");
            $('input#precio-oferta').val(resultado.precio_oferta);
            $('input#stock-oferta').val(resultado.stock_oferta);

            
            if(resultado.id_suplemento != null){
                var valor_suplemento = resultado.id_suplemento.toString();

            setTimeout(() => {
                $('select[name="id_suplemento"] option').each(function() {

                    if ($(this).val() === valor_suplemento) {
    
                        $(this).prop('selected', true);
                    }
                });
            }, 10);
            }else{
                var valor_accesorio = resultado.id_accesorio.toString();

                setTimeout(() => {
                    $('select[name="id_accesorio"] option').each(function() {

                        if ($(this).val() === valor_accesorio) {
        
                            $(this).prop('selected', true);
                        }
                    });
                }, 10);
            }

        },
        error: function (xhr) {
            console.log(xhr);
        },

    });

    }

    function eliminar_oferta(id_oferta) {

        let action = "eliminar-oferta";

        $.ajax({
            type: "POST",
            url: "php/Ofertas-flash.php?action=" + action,
            data: {
                id_oferta: id_oferta
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