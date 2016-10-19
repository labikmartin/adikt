$(function() {

/////////////////////////////////////////// VARIABLES
// elements definition
  var windowObject = window;
      html =         document.querySelectorAll('html, body'),
      services =     document.getElementById('services'),
      arrow =        document.getElementsByClassName('header__arrow'),
      navbar =       document.getElementsByClassName('nav')[0],
      navbarItem =   document.getElementsByClassName('nav__item'),
      navPointer =   document.getElementsByClassName('nav__anchor'),
      navbarCols =   document.querySelectorAll('.nav .col-3, .nav .col-6'),
      navbarLogo =   document.getElementsByClassName('logo img'),
      submenuLine =  document.getElementsByClassName('submenu__line');

//properties
  var screenSize = windowObject.offsetHeight;

//colors
  var white =   '#fff',
      red =     '#e30613',
      darkRed = '#cc0511',
      gray =    '#e5e5e5',
      black =   '#000';


  /////////////////////////////////////////// UTILITY FUNCTIONS
  //make array of multiple elements
  function u_arrayElems() {
    var elements = [],
        args =     arguments,
        splitArr;

    for (i = 0; i < args.length; i++) {
      splitArr = args[i];

      var a = 0;

      while ( a < args[i].length) {
        elements.push(splitArr[a]);
        a++;
      }

    }

    return elements;
  }

/////////////////////////////////////////// FUNCTIONS

// -- scroll animation
function scroll(toElement, speed) {
  var windowObject =  window,
      windowPos =     windowObject.pageYOffset,
      //if null >>> use arrow element
      pointer =       (toElement.hasAttribute('href')) ? toElement.getAttribute('href').slice(1) : null,
      elem =          (pointer !== null) ? document.getElementById(pointer) : services,
      elemOffset =    elem.offsetTop;

    var counter = setInterval(function() {
      windowPos;

      if (windowPos > elemOffset) { //bottom to top
        windowObject.scrollTo(0, windowPos);
        windowPos-=speed;

        if (windowPos <= elemOffset) { //cancel scrolling
          clearInterval(counter);
          windowObject.scrollTo(0, elemOffset);
        }
      } else { //top to bottom
        windowObject.scrollTo(0, windowPos);
        windowPos+=speed;

        if (windowPos >= elemOffset) { // cancel scrolling
          clearInterval(counter);
          windowObject.scrollTo(0, elemOffset);
        }
      }

    }, 1);
}


// -- navbar switcher
function navbarSwitch() {

  if (windowObject.pageYOffset >= services.offsetTop) {
    navbar.setAttribute('style',  'background-color:' + white +';'+
                                  'color:' + red +';'+
                                  'border-bottom: solid 1px ' + gray);

    for (i = 0; i < navPointer.length; i++) {
      navPointer[i].setAttribute('style', 'color:' + red + ';');
    }

    for (i = 0; i < submenuLine.length; i++) {
      submenuLine[i].setAttribute('style', 'background-color:' + red +';');
    }

  }

  else {

    navbar.removeAttribute('style');

    var elements = u_arrayElems(navPointer, submenuLine);

    for (i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('style');
    }
  }
}

/////////////////////////////////////////// PAGE SCROLL

  arrow[0].addEventListener('click', function() {
    scroll(this, 18);
  });

  for (i = 0; i < navPointer.length; i++) {
    navPointer[i].addEventListener('click', function(e) {
      scroll(this, 18);
      e.preventDefault();
    });
  }


/////////////////////////////////////////// NAVBAR FUNCTIONALITY

windowObject.addEventListener('load', navbarSwitch);
windowObject.addEventListener('scroll', navbarSwitch);

/*
  $(windowObject).on('scroll', function() {

    if (navbar.offset().top >= screenSize - 72) {
      navbar.css({
        'background-color': '#fff',
        'color': '#e30613',
        'border-bottom': 'solid 1px #e5e5e5'
      });

      anchors.css('color', '#e30613');

      navbarItem.addClass('hover');

      if (windowObject.width() > 1080) {
        navbarCols.css('padding', '25px 40px');
      } else {
        navbarCols.css('padding', '30px 10px');
      }

      navbarLogo.attr('src', 'images/logo-red.png');
      burger.css('background-color', '#e30613');
    } else {
      navbar.removeAttr('style');
      anchors.removeAttr('style');
      navbarItem.removeClass('hover');
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

  if ($(windowObject).width() < 560) {
    $('.slick-prev, .slick-next').hide();
  }
*/
});
