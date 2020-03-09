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

// invio messaggio inserito da utente e risposta (dopo click icona invio)
$('.tasto-invio').click(function() {
    var messaggioInput = $('#messaggio-input').val();
    if(messaggioInput.trim().length > 0) { // aggiunta controllo per evitare invio spazi vuoti
        $('#messaggio-input').val('');
        appendMsg(messaggioInput, 'sent'); // milestone 1.2
        scroll();
        setTimeout(function() {
            appendMsg('ok','received');
            scroll();
        }, 1000); // milestone 2.1
    };
});

// invio messaggio inserito da utente con pressione tastiera 'enter'
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
    };
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

// click su chat-preview - overlay rimane evidenziato - hover gestito su CSS
$('.chat-preview').click(function() {
    if ($('.chat-preview').find('.active').is(':visible')) {
        $('.chat-preview').children('.overlay').removeClass('active');
        $(this).children('.overlay').addClass('active');
    } else {
        $(this).children('.overlay').addClass('active');
    }
});

// utilizzo del data per mostrare una chat selezionata con click
$('.left .chat-list .chat-preview').click(function() { // al click della corrispondente chat-preview
    var contatto = $(this).data('codiceContatto'); // associo alla variabile contatto il data-codice-contatto
    // console.log(contatto);
    $('.right .chat-room-container').each(function() { // successivamente confronto i data-codice-contatto LEFT con quelli RIGHT
        if (contatto == $(this).data('codiceContatto')) { // se corrispondono, mostro il data-codice-contatto selezionato al click iniziale
            $('.right .chat-room-container').removeClass('active');
            $(this).addClass('active');
        }
    });
});

// al click su chat appare box di selezione
$(document).on('mouseenter', 'i.fas.fa-angle-down', function() {
    if($('.edit-message').is(':visible')){
        $('.edit-message').removeClass('active');
        $(this).siblings('.edit-message').addClass('active');
    } else {
        $(this).siblings('.edit-message').addClass('active');
    };
});
$(document).on('mouseleave', '.chat-message', function() {
    $('.edit-message').removeClass('active');
});

$(document).on('click', '.edit-message.active .delete-msg', function() {
    $(this).parents('.chat-message').hide();
});


// funzione crea messaggio e aggiungi a chat
function appendMsg(testoInput, sentReceived) {
    var messaggio = $('.template .chat-message').clone().addClass(sentReceived);
    messaggio.find('.testo-messaggio').text(testoInput);
    messaggio.children('.message-time span').html(getTime());
    $('.active .main-room').append(messaggio);
}

// funzione ottenimento orario
function getTime() {
    var dt = new Date();
    if (dt.getMinutes() < 10) {
        time = dt.getHours() + ":" + 0 + dt.getMinutes();
    } else {
        var time = dt.getHours() + ":" + dt.getMinutes();
    };
    return time;
};

// funzione per scroll-down automatico
function scroll() {
    var pixelScroll = $('.active .main-room').height(); // aggiunto '.active' per aumentare specificità classe richiamata
    console.log('pixelHeight' + pixelScroll);
    $('.active .main-room').scrollTop(pixelScroll);
};
