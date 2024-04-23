$(document).ready(function () {
    $('a#lateralMenu').on('click', function () {


        var iconoActual = $('svg#list').html();
        var nuevoIcono;

        if (iconoActual.includes('M2.5')) {

            nuevoIcono = '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>';
            $("div.latMenu").addClass('show-menu');

        } else {
            nuevoIcono = '<path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />';
           
            $("div.latMenu").removeClass('show-menu');
        }

        $('a#lateralMenu svg').html(nuevoIcono);
    });

    var divSecondMenuItems = document.querySelector('.latMenu nav #second-menu-items');

    function moveItemsToSidebar() {
        var mainMenuItems = document.querySelectorAll('.mainMenu ul#secondMenu li a');
        divSecondMenuItems.innerHTML = '';

        mainMenuItems.forEach(function (item) {
            var clonedItem = item.cloneNode(true); 

            divSecondMenuItems.appendChild(clonedItem);
        });
    }

 

    window.addEventListener('resize', function () {
        if (window.innerWidth <= 768) {
            moveItemsToSidebar();
        }else{
            divSecondMenuItems.innerHTML = '';
        }
    });

    if (window.innerWidth <= 768) {
        moveItemsToSidebar();
    }else{
        divSecondMenuItems.innerHTML = '';
    }


});
