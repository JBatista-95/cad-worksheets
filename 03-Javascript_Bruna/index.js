var app = (function () {

    'use strict';

    // ---------- Alíneas a) a d): toggles ----------

    var LIGHT_ON  = 'fa-solid fa-lightbulb text-warning';
    var LIGHT_OFF = 'fa-regular fa-lightbulb';
    var MUSIC_ON  = 'fa-solid fa-music text-primary';
    var MUSIC_OFF = 'fa-solid fa-volume-xmark text-danger';

    // Liga um interruptor ao seu ícone e sincroniza o estado inicial
    // O Font Awesome (kit JS) troca o <i> por um <svg>. Por isso criamos
    // sempre um <i> novo, que o Font Awesome volta a converter.
    function setIcon(iconId, classes) {
        var old = document.getElementById(iconId);
        if (!old) {
            console.error('Ícone não encontrado:', iconId);
            return;
        }
        var fresh = document.createElement('i');
        fresh.id = iconId;
        fresh.className = classes;
        old.replaceWith(fresh);
    }

    function bindToggle(buttonId, iconId, classOn, classOff) {
        var button = document.getElementById(buttonId);

        if (!button) {
            console.error('Botão não encontrado:', buttonId);
            return;
        }

        function refresh() {
            setIcon(iconId, button.checked ? classOn : classOff);
        }

        button.addEventListener('change', refresh);
        refresh(); // o ícone começa coerente com o estado do switch
    }

    bindToggle('kitchenLightBtn', 'kitchenLightIcon', LIGHT_ON, LIGHT_OFF);
    bindToggle('ceilingLightBtn', 'ceilingLightsIcon', LIGHT_ON, LIGHT_OFF);
    bindToggle('ambientLightBtn', 'ambientLightIcon', LIGHT_ON, LIGHT_OFF);
    bindToggle('musicBtn', 'musicIcon', MUSIC_ON, MUSIC_OFF);

    // ---------- Alínea e): temperaturas a cada 5 s ----------

    function randomTemp() {
        return (Math.random() * 20 + 10).toFixed(1); // entre 10 e 30
    }

    function updateTemps() {
        document.getElementById('kitchenTemp').textContent = randomTemp() + ' °C';
        document.getElementById('livingTemp').textContent = randomTemp() + ' °C';
    }

    setInterval(updateTemps, 5000);

    // ---------- Alínea f): data e hora ----------

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function updateClock() {
        var now = new Date();

        document.getElementById('clockTime').textContent =
            pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());

        document.getElementById('clockDate').textContent =
            now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
    }

    updateClock();                   // data e hora logo ao carregar a página
    setInterval(updateClock, 1000);  // atualiza a cada segundo

})();
