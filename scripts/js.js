$(function() {

  var windowVar =  $(window);
  var navbar = $('nav');
  var links = $('.links');
  var anchors = $('.links a');
  var navbarCols = $('nav .col-3, nav .col-6');
  var navbarLogo = $('.logo img');
  var burger = $('.burger');
  var screenSize = windowVar.height();

/////////////////////////////////////////// SCROLL

  $('#arrow').on('click', function() {

    $('html, body').animate({scrollTop: screenSize - 71.5}, 1500);
  });

/////////////////////////////////////////// NAVBAR

  windowVar.on('scroll', function() {

    if (navbar.offset().top >= screenSize - 72) {
      navbar.css({
        'background-color': '#fff',
        'color': '#e30613',
        'border-bottom': 'solid 1px #e5e5e5'
      });

      links.addClass('hover');

      if (windowVar.width() > 1080) {
        navbarCols.css('padding', '25px 40px');
      } else {
        navbarCols.css('padding', '30px 10px');
      }

      navbarLogo.attr('src', 'images/logo-red.png');
      burger.css('background-color', '#e30613');
    } else {
      navbar.removeAttr('style');
      anchors.removeAttr('style');
      links.removeClass('hover');
      navbarCols.removeAttr('style');
      navbarLogo.attr('src', 'images/logo.png');
      burger.removeAttr('style');
    }
  });

  $('.links a').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 600);
    return false;
});

/////////////////////////////////////////// SLICK

  $('.slick').slick({
    'autoplay': true,
    'arrows': false,
    'dots': true
  });

  if (windowVar.width() < 560) {
    $('.slick-prev, .slick-next').hide();
  }

});
