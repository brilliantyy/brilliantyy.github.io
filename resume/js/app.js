$(function() {

    initPage();

    var navToTop = $('nav').offset().top;
    var aboutPageToTop = $('.about-page').offset().top;
    var pageHeight = $('.home-page').height();
    var dis = pageHeight * 0.073;

    $(window).scroll(function() {
        var scrollHeight = $(this).scrollTop();
        if (scrollHeight >= navToTop) {
            $('nav').css({'position': 'fixed', 'top' : '0px'});
        }

        if (aboutPageToTop - $(this).scrollTop() >= dis) {
            $('nav').css({'position': 'absolute', 'top': pageHeight * 0.927 +'px'});
        }
    });

    $('nav ul li').mouseover(function() {
        $(this).children().css('color', '#ffffff');
    }).mouseout(function() {
        $(this).children().css('color', '#c3c8d6');
    }).click(function() {
        $(this).addClass('selected').siblings().removeClass('selected');
    });
















    function initPage() {
        var height = $('.home-page').height();

        $('.about-page').css({'top': height + 'px'});
        $('.skills-page').css({'top': 2 * height + 'px'});
        $('.works-page').css({'top': 3 * height + 'px'});
        $('.education-page').css({'top': 4 * height + 'px'});
        $('.contact-page').css({'top': 6 * height + 'px'});

        $('nav').css({'height': height * 0.073 + 'px', 'top': height * 0.927 + 'px'});
    }


});
