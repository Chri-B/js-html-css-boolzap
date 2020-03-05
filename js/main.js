// console.log(time);


$('.tasto-invio').click(function() {
    messageSent(); // milestone 1.2
    setTimeout(messageOk, 1000); // milestone 2.1
});

$(document).keydown(function(event) {
    switch (event.which) {
        case 13:
            messageSent();
            setTimeout(messageOk, 1000);
            break;
    }
});


function messageSent() {
    var messaggioInput = $('#messaggio-input').val();
    $('#messaggio-input').val('');
    var messaggio = $('.template .chat-message').clone().addClass('sent');
    messaggio.find('.testo-messaggio').text(messaggioInput);
    messaggio.children('.message-time').html(getTime());
    $('.main-room').append(messaggio);
};

function messageOk() {
    var messaggio = $('.template .chat-message').clone().addClass('received');
    messaggio.find('.testo-messaggio').text('ok');
    messaggio.children('.message-time').html(getTime());
    $('.main-room').append(messaggio);
};


function getTime() {
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes();
    return time;
};
