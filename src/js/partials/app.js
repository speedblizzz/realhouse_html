(function () {
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
})();

