$(document).ready(function () {


    //mostrar/ocultar buscador en movil

    const searchIcon = $('#search_icon');
    const containerSearchPhone = $('#container-search-phone');

    searchIcon.click(function(event) {
        event.preventDefault(); 
        
        if (containerSearchPhone.is(':hidden')) {
            containerSearchPhone.slideDown('slow'); 
        } else {
            containerSearchPhone.slideUp('slow'); 
        }
    });
});
