(function () {

    $(document).ready(function(){
    var topMenuToggle = $('.top_main_menu_toggle'),
        topMenuWrap = $('.top_main_menu_wrap');
    topMenuToggle.on('click',function () {
        topMenuWrap.toggleClass('collapsed');
    });

    $('body').on('click','.top_main_menu_wrap.collapsed .top_main_menu-item.parent .top_main_menu-link',function (e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    $('.service_mobile_block').on('click',function () {
        $('.service_mobile_sub_wrap').toggleClass('visible');
    });

    $('.slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $('#lightgallery').lightGallery();

    $('.testimonials_spoiler_title').on('click',function () {
        $(this).next('.testimonials_spoiler_wrap').toggleClass('opened').slideToggle();

        if($(this).next('.testimonials_spoiler_wrap').hasClass('opened')) {
            var new_html = $(this).html().replace("spoiler_1", "spoiler_2");
            new_html = new_html.replace("Читать", "Скрыть");
            $(this).html(new_html);
        }
        else {
            var new_html = $(this).html().replace("spoiler_2", "spoiler_1");
            new_html = new_html.replace("Скрыть", "Читать");
            $(this).html(new_html);
        }

    })

    });


})();



