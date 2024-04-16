$(document).ready(function() {
    $('a#lateralMenu').on('click',function(){
        var iconoActual = $('svg#list').html();
        var nuevoIcono;

        if (iconoActual.includes('M2.5')) {
            // si el icono actual del menu lateral es la hamburguesa:

            nuevoIcono = '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>';
            //mostrar menu lateral

            $("div.latMenu").toggle();
        } else {
            nuevoIcono = 
                '<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />';
                //ocultar menu lateral
                $("div.latMenu").toggle();

            }

        //asignamos el nuevo icono
        $('a#lateralMenu svg').html(nuevoIcono);
    });
});
