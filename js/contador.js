$(document).ready(function () {
      // Función para iniciar la cuenta regresiva
      function iniciarCuentaRegresiva() {
        // Calcula la hora de reinicio del contador
        var restartTime = new Date();
        restartTime.setHours(restartTime.getHours() + 1);
        restartTime.setMinutes(0);
        restartTime.setSeconds(0);

        // Inicia la cuenta regresiva inicial
        actualizarContador(restartTime);

        // Actualiza el contador cada segundo
        setInterval(function () {
            // Obtiene la hora actual
            var now = new Date();

            // Si es hora de reiniciar, calcula la nueva hora de reinicio
            if (now >= restartTime) {
                restartTime.setHours(restartTime.getHours() + 1);
                actualizarContador(restartTime);
            }

            // Calcula la diferencia de tiempo entre ahora y la hora de reinicio
            var distance = restartTime - now;

            // Calcula las horas, minutos y segundos restantes
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Formatea el tiempo en HH:MM:SS
            var formattedTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

            // Muestra el contador en la página
            document.getElementById("contador-oferta").innerHTML = formattedTime;
        }, 1000); // actualiza cada segundo
    }

    // Función para actualizar el contador con una nueva hora de reinicio
    function actualizarContador(restartTime) {
        // Obtiene la hora actual
        var now = new Date();

        // Calcula la diferencia de tiempo entre ahora y la nueva hora de reinicio
        var distance = restartTime - now;

        // Calcula las horas, minutos y segundos restantes
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Formatea el tiempo en HH:MM:SS
        var formattedTime = hours.toString().padStart(2, '0') + ":" + minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');

        // Muestra el contador en la página
        document.getElementById("contador-oferta").innerHTML = formattedTime;
    }

    // Inicia la cuenta regresiva cuando el documento esté listo
    iniciarCuentaRegresiva();
});
