$(document).ready(function () {

    function show() {
        let currentAction = 'show';

        $.ajax({
            type: "GET",
            url: "php/Suplementos.php",
            dataType: "json",

            data: {
                action: currentAction,

            },
            success: function (resultado) {


                pintar_suplementos(resultado);
                pintar_suplementos_select(resultado);

            },


            error: function (xhr) {

                console.log(xhr);
            },

        });



    }

    show();


    if (!localStorage.getItem('idSuplemento')) {

    $('input#submit-crear-suplemento').on('click', function (event) {
        event.preventDefault();
        insertar_suplemento();

    });
}

    $('input#cancelar-crear-suplemento').on('click', function (event) {
        event.preventDefault();
        location.href = "Suplementos.html";

    });

    $('a.btn-crear').on('click',function(){
        localStorage.removeItem('idSuplemento');

    });




    function insertar_suplemento() {

        var nombre_suplemento = $('input#nombre-suplemento').val();
        var precio_suplemento = parseFloat($('input#precio-suplemento').val());
        var peso_suplemento = parseInt($('input#peso-suplemento').val());
        var sabor_suplemento = $('input#sabor-suplemento').val();
        var descripcion_suplemento = $('textarea#desc-suplemento').val();
        var stock_suplemento = parseInt($('input#stock-suplemento').val());
        var novedad_suplemento = parseInt($('select[name="novedad-suplemento"]').val());
        var tipo_suplemento = $('input#tipo-suplemento').val();
        var imagenprovisional = 'noimage.png';

        if (nombre_suplemento == "" || isNaN(precio_suplemento) || isNaN(peso_suplemento) || sabor_suplemento == "" || descripcion_suplemento == "" || isNaN(stock_suplemento) || isNaN(novedad_suplemento) || tipo_suplemento == "") {

            $('p#create-help').css({ color: "red" });
            $('p#create-help').text("Todos los campos son obligatorios!");

        } else {

            var formData = new FormData();
            formData.append('nombre_suplemento', nombre_suplemento);
            formData.append('precio_suplemento', precio_suplemento);
            formData.append('peso_suplemento', peso_suplemento);
            formData.append('sabor_suplemento', sabor_suplemento);
            formData.append('descripcion_suplemento', descripcion_suplemento);
            formData.append('stock_suplemento', stock_suplemento);
            formData.append('novedad_suplemento', novedad_suplemento);
            formData.append('tipo_suplemento', tipo_suplemento);
            formData.append('imagenprovisional', imagenprovisional);

            let action = "insertar-suplemento";

            $.ajax({
                type: "POST",
                url: "php/Suplementos.php?action=" + action,
                data: formData,

                processData: false,
                contentType: false,

                success: function (resultado) {


                    if (resultado == true) {


                        $('p#create-help').css({ color: "green" });
                        $('p#create-help').text("Suplemento creado correctamente!");

                        setTimeout(() => {
                            location.href = "Suplementos.html";
                        }, 1300);

                    } 





                },
                error: function (xhr) {
                    console.log(xhr);
                },

            });



        }





    }




    function pintar_suplementos(array_suplementos) {
        $('table#dataTable tbody').empty();

        var booleanValue = false;

        for (const suplemento of array_suplementos) {

            if (suplemento.novedad == 1) {
                booleanValue = true;
            } else {
                booleanValue = false;
            }


            $('table#dataTable tbody').append(

                "<tr>"

                + "<td>" + suplemento.id_suplemento + "</td>"
                + "<td>" + suplemento.nombre_suplemento + "</td>"
                + "<td>" + suplemento.precio_suplemento + "</td>"
                + "<td>" + suplemento.peso_suplemento + "</td>"
                + "<td>" + suplemento.sabor_suplemento + "</td>"
                + "<td>" + suplemento.descripcion_suplemento + "</td>"
                + "<td>" + suplemento.stock + "</td>"
                + "<td>" + booleanValue + "</td>"
                + "<td>" + suplemento.tipo_suplemento + "</td>"
                + "<td>" + "<a target='_blank' href='img/" + suplemento.imagen_suplemento + "'><img width='100' height='100' src='img/" + suplemento.imagen_suplemento + "' alt='" + suplemento.imagen_suplemento + "'></a>" + "</td>"
                + "<td>"

                + "<a value=" + suplemento.id_suplemento + " class='btn btn-primary btn-icon-split edit-suplemento'>"

                + "<span class='icon text-white-50'>"
                + "<i class='bi bi-pencil-fill'></i>"
                + "</span>"
                + "<span class='text'>Editar</span>"

                + "</a>"

                + "</td>"

                + "<td>"

                + "<a  value=" + suplemento.id_suplemento + " class='btn btn-danger btn-icon-split delete-suplemento'>"

                + "<span class='icon text-white-50'>"
                + "<i class='fas fa-trash'></i>"
                + "</span>"
                + "<span class='text'>Eliminar</span>"

                + "</a>"

                + "</td>"

                + "</tr>"



            );

        }

        $('a.delete-suplemento').on('click', function (event) {
            event.preventDefault();
            var id_suplemento = parseInt($(this).attr('value'));
            eliminar_suplemento(id_suplemento);
        });

        $('a.edit-suplemento').on('click', function (event) {
            event.preventDefault();
            var id_suplemento = parseInt($(this).attr('value'));
            localStorage.setItem('idSuplemento', id_suplemento);
            window.location.href = 'form-suplemento.html';


        });


    }


    //editar
    if(localStorage.getItem('idSuplemento')){

    let action = 'buscar-suplemento';
    var idSuplemento = localStorage.getItem('idSuplemento');


    $.ajax({
        type: "POST",
        url: "php/Suplementos.php?action=" + action,
        data: {
            id_suplemento: idSuplemento
        },
        dataType: 'json',



        success: function (resultado) {


            $("input#submit-crear-suplemento").val("Actualizar");
            $('h6#title-form').text("Editar Suplemento");
            $('input#nombre-suplemento').val(resultado.nombre_suplemento);
            $('input#precio-suplemento').val(resultado.precio_suplemento);
            $('input#peso-suplemento').val(resultado.peso_suplemento);
            $('input#sabor-suplemento').val(resultado.sabor_suplemento);
            $('textarea#desc-suplemento').val(resultado.descripcion_suplemento);
            $('input#stock-suplemento').val(resultado.stock);
            $('input#tipo-suplemento').val(resultado.tipo_suplemento);
            $('input#id_suplemento').val(resultado.id_suplemento);

          
            var valor_novedad = resultado.novedad.toString();

            $('select[name="novedad-suplemento"] option').each(function () {


                if ($(this).val() === valor_novedad) {

                    $(this).prop('selected', true);
                }
            });

            $("input#submit-crear-suplemento").on("click",function(event){
                event.preventDefault();

                var nombre_suplemento = $('input#nombre-suplemento').val();
                var precio_suplemento = $('input#precio-suplemento').val();
                var peso_suplemento = $('input#peso-suplemento').val();
                var sabor_suplemento = $('input#sabor-suplemento').val();
                var descripcion_suplemento = $('textarea#desc-suplemento').val();
                var stock_suplemento = $('input#stock-suplemento').val();
                var tipo_suplemento = $('input#tipo-suplemento').val();
                var novedad_suplemento = $('select[name="novedad-suplemento"]').val();
                var imagenprovisional = 'noimage.png';


                let action = 'insertar-suplemento';

                var formData = new FormData();
                formData.append('id_suplemento', idSuplemento);
                formData.append('nombre_suplemento', nombre_suplemento);
                formData.append('precio_suplemento', precio_suplemento);
                formData.append('sabor_suplemento', sabor_suplemento);
                formData.append('peso_suplemento', peso_suplemento);
                formData.append('descripcion_suplemento', descripcion_suplemento);
                formData.append('stock_suplemento', stock_suplemento);
                formData.append('tipo_suplemento', tipo_suplemento);
                formData.append('novedad_suplemento', novedad_suplemento);
                formData.append('imagenprovisional', imagenprovisional);

                $.ajax({
                    type: "POST",
                    url: "php/Suplementos.php?action=" + action,
                    data: formData,
                    processData: false,
                    contentType: false,



                    success: function (resultado) {

                        if(resultado == true){
                            $('p#create-help').css({ color: "green" });
                            $('p#create-help').text("Suplemento actualizado correctamente!");
    
                            setTimeout(() => {
                                location.href = "Suplementos.html";
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



    function pintar_suplementos_select(array_suplementos) {
        for (const suplemento of array_suplementos) {
            $('select[name="id_suplemento"]').append("<option value=" + suplemento.id_suplemento + ">" + suplemento.nombre_suplemento + "</option>");
        }
    }

    function eliminar_suplemento(id_suplemento) {

        let action = "eliminar-suplemento";

        $.ajax({
            type: "POST",
            url: "php/Suplementos.php?action=" + action,
            data: {
                id_suplemento: id_suplemento
            },



            success: function (resultado) {


                if (resultado == true) {

                    $('span#user-help').css("visibility", "visible");

                    setTimeout(() => {
                        $('span#user-help').css("visibility", "hidden");

                    }, 1000);

                    //para reflejar los cambios al usuario
                    show();

                }





            },
            error: function (xhr) {
                console.log(xhr);
            },

        });

    }






});