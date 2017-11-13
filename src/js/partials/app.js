
    $(".countdown_block__timer")
        .countdown("2017/12/01", function(event) {
            $(this).text(
                event.strftime('%D : %H : %M : %S')
            );
        });
