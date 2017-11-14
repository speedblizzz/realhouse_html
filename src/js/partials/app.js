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

    $('.slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1
    });
})();

