// cambio icona in base a click/focus
$('#messaggio-input').focus(function() {
    $('.input-msg').addClass('box-shadow');
    $('.tasto-invio').find('i').removeClass('fa-microphone');
    $('.tasto-invio').find('i').addClass('fa-paper-plane');
}).blur(function() {
    $('.input-msg').removeClass('box-shadow');
    $('.tasto-invio').find('i').removeClass('fa-paper-plane');
    $('.tasto-invio').find('i').addClass('fa-microphone');
});

// invio messaggio inserito da utente
$('.tasto-invio').click(function() {
    var messaggioInput = $('#messaggio-input').val();
    if(messaggioInput.trim().length >0) { // aggiunta controllo per evitare invio spazi vuoti
        $('#messaggio-input').val('');
        appendMsg(messaggioInput, 'sent'); // milestone 1.2
        scroll();
        setTimeout(function() {
            appendMsg('ok','received');
            scroll();
        }, 1000); // milestone 2.1
    };
});

// invio messaggio inserito da utente con pressione invio
$('.input-msg').keydown(function(event) {
    switch (event.which) {
        case 13:
        var messaggioInput = $('#messaggio-input').val();
        if (messaggioInput.trim().length > 0) { // aggiunta controllo per evitare invio spazi vuoti
            $('#messaggio-input').val('');
            appendMsg(messaggioInput, 'sent'); // milestone 1.2
            scroll();
            setTimeout(function() {
                appendMsg('ok','received');
                scroll();
            }, 1000); // milestone 2.1
            $('.tasto-invio').find('i').toggleClass('fa-microphone fa-paper-plane');
            $('.input-msg').removeClass('box-shadow');
        }
        break;
    }
});

// ricerca contatto tramite barra ricerca (milestone 2.2)
$('#find-contact').keyup(function(event) {
    var carattereFiltro = $(this).val().toLowerCase(); // assegno alla variabile il valore del carattere inserito dall'utente e lo rendo minuscolo
    $('.chat-preview h4').each(function() { // confronto il valore inserito dall'utente con OGNUNO degli elementi h4 (dove ci sono i nomi dei contatti)
        if ($(this).text().toLowerCase().includes(carattereFiltro)) { // se il valore digitato dall'utente compare in uno dei miei contatti, allora lo mostro
            $(this).parents('.chat-preview').show();
        } else { // altrimenti lo scarto e quindi non lo visualizzo
            $(this).parents('.chat-preview').hide();
        };
    });
});

// click su chat - overlay rimane evidenziato - hover gestito su CSS
$('.chat-preview').click(function() {
    if ($('.chat-preview').find('.overlay-visible').is(':visible')) {
        $('.chat-preview').children('.overlay').removeClass('overlay-visible');
        $(this).children('.overlay').addClass('overlay-visible');
    } else {
        $(this).children('.overlay').addClass('overlay-visible');
    }
});




// funzione crea messaggio e aggiungi a chat
function appendMsg(testoInput, sentReceived) {
    var messaggio = $('.template .chat-message').clone().addClass(sentReceived);
    messaggio.find('.testo-messaggio').text(testoInput);
    messaggio.children('.message-time').html(getTime());
    $('.main-room').append(messaggio);
}

// funzione per avere orario
function getTime() {
    var dt = new Date();
    if (dt.getMinutes() < 10) {
        time = dt.getHours() + ":" + 0 + dt.getMinutes();
    } else {
        var time = dt.getHours() + ":" + dt.getMinutes();
    };
    return time;
};

// funzione per scroll down automatico infinito
function scroll() { // Funzione di autoscorrimento in basso
    var scrollBot = document.getElementById('scrolled');
    scrollBot.scrollTop = scrollBot.scrollHeight;
}
