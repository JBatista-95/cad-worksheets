var app = (function() {
    'use strict';
 
    // ---------------------------------------------------------------
    // Exercício 1 - Hello World (descomentar só para testar o ponto 1d)
    // ---------------------------------------------------------------
    // alert('Hello World');
 
    // ---------------------------------------------------------------
    // Exercício 2 - Home Sweet Home
    // ---------------------------------------------------------------
 
    // Classes Font Awesome para cada estado (ícone + cor)
    var LIGHT_ON  = 'fa-solid fa-lightbulb text-warning';
    var LIGHT_OFF = 'fa-regular fa-lightbulb text-secondary';
    var MUSIC_ON  = 'fa-solid fa-music text-primary';
    var MUSIC_OFF = 'fa-solid fa-volume-xmark text-danger';
 
    // Cada dispositivo: id do botão (checkbox), id do ícone e classes de cada estado
    var devices = [
        { buttonId: 'kitchenLightBtn',       iconId: 'kitchenLightIcon',       on: LIGHT_ON, off: LIGHT_OFF },
        { buttonId: 'livingCeilingLightBtn', iconId: 'livingCeilingLightIcon', on: LIGHT_ON, off: LIGHT_OFF },
        { buttonId: 'livingAmbientLightBtn', iconId: 'livingAmbientLightIcon', on: LIGHT_ON, off: LIGHT_OFF },
        { buttonId: 'livingMusicBtn',        iconId: 'livingMusicIcon',        on: MUSIC_ON, off: MUSIC_OFF }
    ];
 
    // Atualiza o ícone/cor de acordo com o estado do botão
    function updateDevice(device) {
        var button = document.getElementById(device.buttonId);
        var icon = document.getElementById(device.iconId);
 
        if (button === null || icon === null) {
            return;
        }
 
        // O Font Awesome (kit JS) troca cada <i> por um <svg>, por isso o id está
        // num <span> e recriamos o <i> sempre que o estado muda.
        var classes = button.checked ? device.on : device.off;
        icon.innerHTML = '<i class="' + classes + '"></i>';
    }
 
    // Liga o evento de clique a um dispositivo e sincroniza o estado inicial
    function setupDevice(device) {
        var button = document.getElementById(device.buttonId);
 
        if (button === null) {
            return;
        }
 
        button.addEventListener('change', function() {
            updateDevice(device);
        });
 
        updateDevice(device);
    }
 
    // ---------------------------------------------------------------
    // Temperaturas: valor aleatório entre 10 e 30 ºC, de 5 em 5 segundos
    // ---------------------------------------------------------------
    var temperatureIds = ['kitchenTemperature', 'livingRoomTemperature'];
 
    function randomTemperature() {
        return (10 + Math.random() * 20).toFixed(1);
    }
 
    function updateTemperatures() {
        temperatureIds.forEach(function(id) {
            var element = document.getElementById(id);
 
            if (element !== null) {
                element.textContent = randomTemperature() + ' °C';
            }
        });
    }
 
    // ---------------------------------------------------------------
    // Relógio: data atualizada ao carregar, hora atualizada a cada segundo
    // ---------------------------------------------------------------
    function pad(number) {
        return number < 10 ? '0' + number : String(number);
    }
 
    function updateDate() {
        var now = new Date();
        var element = document.getElementById('dateValue');
 
        if (element !== null) {
            element.textContent = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
        }
    }
 
    function updateTime() {
        var now = new Date();
        var element = document.getElementById('timeValue');
 
        if (element !== null) {
            element.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
        }
    }
 
    // ---------------------------------------------------------------
    // Arranque
    // ---------------------------------------------------------------
    function init() {
        devices.forEach(setupDevice);
 
        updateTemperatures();
        setInterval(updateTemperatures, 5000);
 
        updateDate();
        updateTime();
        setInterval(updateTime, 1000);
    }
 
    document.addEventListener('DOMContentLoaded', init);
 
})();
 