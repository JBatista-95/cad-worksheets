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
        var button = document.getElementById(device.buttonId);  //coloca o valor do buttonId na var button
        var icon = document.getElementById(device.iconId);  //coloca o valor do IconId na var icon
 
        if (button === null || icon === null) {     //se uma das variaveis for null, dá return
            return;
        }
 
        // O Font Awesome (kit JS) troca cada <i> por um <svg>, por isso o id está
        // num <span> e recriamos o <i> sempre que o estado muda.
        var classes = button.checked ? device.on : device.off;  //Se o button correspondente estiver checked, a variavel classes toma o valor de on, caso contrário, toma o valor de off
        icon.innerHTML = '<i class="' + classes + '"></i>';     //cria uma string com o código HTML a correr no local onde esta a variavel com o nome de icon
    }
 
    // Liga o evento de clique a um dispositivo e sincroniza o estado inicial
    function setupDevice(device) {  //esta função serve para dar um setup inicial aos devices.
        var button = document.getElementById(device.buttonId);  //iguala a variavel button ao device.buttonId
 
        if (button === null) {  //Se for null dá return
            return;
        }
 
        button.addEventListener('change', function() { //nesta linha é iniciada sempre que o button tiver um change state. A função fica á escuta, não precisa de estar sempre a correr.
            updateDevice(device); //Inicia a função updateDevice() sempre  entrar na função anterior.
        });
 
        updateDevice(device); //No ciclo inicial corre a função por aqui para atualizar os estados.S
    }
 
    // ---------------------------------------------------------------
    // Temperaturas: valor aleatório entre 10 e 30 ºC, de 5 em 5 segundos
    // ---------------------------------------------------------------
    var temperatureIds = ['kitchenTemperature', 'livingRoomTemperature'];
 
    function randomTemperature() {
        return (10 + Math.random() * 20).toFixed(1);
    }
 
    function updateTemperatures() {
        temperatureIds.forEach(function(id) { //coloca uma temperatura de cada vez no id
            var element = document.getElementById(id);  //coloca o elemento anterior na variavel element
 
            if (element !== null) { //se o element não for for null
                element.textContent = randomTemperature() + ' °C';  //mete o texto da variavel igual a um valor dado pela função randomTemperature e ºC
            }
        });
    }
 
    // ---------------------------------------------------------------
    // Relógio: data atualizada ao carregar, hora atualizada a cada segundo
    // ---------------------------------------------------------------
    function pad(number) {
        return number < 10 ? '0' + number : String(number); //esta função serve para colocar um zero antes do numero quando for < que 10.
    }
 
    function updateDate() {
        var now = new Date(); //Coloca na variavel now a Data atual
        var element = document.getElementById('dateValue'); //Liga a variavel do HTML á variavel element
 
        if (element !== null) { //Se element não for null,
            element.textContent = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate()); //Copia e formata a dara
        }
    }
 
    function updateTime() {
        var now = new Date(); //Coloca na variavel now a Data atual
        var element = document.getElementById('timeValue'); //Liga a variavel do HTML á variavel element
 
        if (element !== null) {//Se element não for null,
            element.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds()); //Copia e formata a dara
        }
    }
 
    // ---------------------------------------------------------------
    // Arranque
    // ---------------------------------------------------------------
    function init() {                   //Esta função corre quando o HTML inicia totalmente.
        devices.forEach(setupDevice);   //Esta linha corre a função setupDevice() para cada um dos elementos do array devices[]
 
        updateTemperatures();
        setInterval(updateTemperatures, 5000); //Executa a função updateTemperatures de 5s em 5s
 
        updateDate();
        updateTime();
        setInterval(updateTime, 1000);//Executa a função updateTime de 1s em 1s
    }
    //'DOMContentLoaded'é um evento que é disparado assim que o HTML inicial totalmente carregado e analisado.
    document.addEventListener('DOMContentLoaded', init); //nesta linha é iniciada a função init() quando o evento acontece.
})();
 