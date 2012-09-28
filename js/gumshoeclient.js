/**
 * Javascript needed for the Gumshoe UI to operate
 */
$(document).ready(function(){
    var clueContainer = '<div class="well clueinstance" rel="{instance}"><h4>Hot on the trail of "{clue}"</h4><pre><div class="cluewindow clue_{instance} monospace cluewindow">Waiting for new evidence...\n</div></pre></div>';
    var socket  = io.connect("127.0.0.1", {port: 8000});

    $('#btnGiveUp').click(function(){
        socket.emit('stopListening', {});
    });

    $('.clue').click(function(){
        var instance = $(this).attr('rel');

        var myClue = clueContainer;
        myClue = myClue.replace(/{instance}/g, instance);
        myClue = myClue.replace(/{clue}/g, $(this).html());

        $clueContainer = $(myClue);
        $('.starthere').after($clueContainer);

        socket.emit('registerListener', { id: instance });

        setTimeout(function(){
            $('.cluewindow').addClass('clueloaded');
        },1000);
    });

    socket.on("notify", function (message){
        var notifyContainer = '.clue_' + message.id;

        $(notifyContainer).append( message.text );
        $(notifyContainer).scrollTop($(notifyContainer).prop("scrollHeight"));
    });

    socket.on("imnotlistening", function (message){
        console.log("Server not listening to any files");
        $('.clueinstance').addClass('goaway');
    });
});