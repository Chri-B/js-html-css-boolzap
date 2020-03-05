// console.log(time);


$('.tasto-invio').click(function() {
    messageSent(); // milestone 1.2
    setTimeout(messageOk, 1000); // milestone 2.1
});

$('#find-contact').keyup(function(event) {
    var carattereFiltro = $(this).val().toLowerCase(); // assegno alla variabile il valore del carattere inserito dall'utente e lo rendo minuscolo

    $('.chat-preview h4').each(function() { // confronto il valore inserito dall'utente con OGNUNO degli elementi h4 (dove ci sono i nomi dei contatti)
        if ($(this).text().toLowerCase().includes(carattereFiltro)) { // se il valore digitato dall'utente compare in uno dei miei contatti, allora lo mostro
            $(this).parents('.chat-preview').show();
        } else { // altrimenti lo scarto e quindi non lo visualizzo
            $(this).parents('.chat-preview').hide();
        }
    });
});

$(document).keydown(function(event) {
    switch (event.which) {
        case 13:
            messageSent();
            setTimeout(messageOk, 1000);
            break;
    }
});

// funzione messaggio inviato dopo input utente
function messageSent() {
    var messaggioInput = $('#messaggio-input').val();
    $('#messaggio-input').val('');
    var messaggio = $('.template .chat-message').clone().addClass('sent');
    messaggio.find('.testo-messaggio').text(messaggioInput);
    messaggio.children('.message-time').html(getTime());
    $('.main-room').append(messaggio);
};

// funzione messaggi di risposta 'ok'
function messageOk() {
    var messaggio = $('.template .chat-message').clone().addClass('received');
    messaggio.find('.testo-messaggio').text('ok');
    messaggio.children('.message-time').html(getTime());
    $('.main-room').append(messaggio);
};

// funzione per avere orario
function getTime() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    return time;
};
