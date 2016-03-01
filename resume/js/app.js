$(function() {

    initPage();

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
    }
});
