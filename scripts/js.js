$(function() {

// -------------- COMMENTS LEGEND
  /////////////////////////////////////////// === CATEGORY
  // -- === category item
  // === note

/////////////////////////////////////////// VARIABLES
// -- elements definition
  var windowObject =    window,
      html =            document.querySelectorAll('html, body'),
      services =        document.getElementById('services'),
      arrow =           document.getElementsByClassName('header__arrow')[0],
      navbar =          document.getElementsByClassName('nav')[0],
      navFixed =        document.getElementById('fixed'),
      navbarItem =      document.getElementsByClassName('nav__item'),
      navPointer =      document.getElementsByClassName('nav__anchor'),
      navbarCols =      document.querySelectorAll('.nav .col-3, .nav .col-6'),
      navbarLogo =      document.querySelector('.nav__logo img'),
      submenu =         document.getElementsByClassName('submenu')[0],
      pageSections =    document.querySelectorAll('#services, #members, #contact'),
      documentHeight,
      offsets = [];

// -- lengths
  var pageSectionsLength =  pageSections.length,
      navPointerLength =    navPointer.length;

// -- properties
  var screenSize = windowObject.offsetHeight;

// -- colors
  var white =   '#fff',
      red =     '#e30613',
      darkRed = '#cc0511',
      gray =    '#e5e5e5',
      black =   '#000';

  /////////////////////////////////////////// UTILITY FUNCTIONS
  // -- add class
  function u_addClass(elem, classes) {
    var classList = elem.className;
    var update = classList + ' ' + classes;
    var isUpdated = classList.match(classes);
    if (!isUpdated) {
      elem
        .className = update;
    }
    else { return false; }
  }

  // -- remove class
  function u_removeClass(elem, classes) {
    var matchPattern = new RegExp('\\s?' + classes, 'g');
    var classList = elem.className;
    var hasClass = classList.match(classes);
    if (hasClass) {
      var removeClasses = classList.toString().replace(matchPattern, '');
      elem
        .className = removeClasses;
    } else { return false; }
  }

  // -- scroll animation
  function u_scroll(toElement, speed) {
    var windowObject =  window,
        windowPos =     windowObject.pageYOffset,
        //if null >>> use arrow element
        pointer =       (toElement.hasAttribute('href')) ? toElement.getAttribute('href').slice(1) : null,
        elem =          (pointer !== null) ? document.getElementById(pointer) : services,
        elemOffset =    elem.offsetTop;
    var counter = setInterval(function() {
      windowPos;
      if (windowPos > elemOffset) { //bottom to top
        windowObject
          .scrollTo(0, windowPos);
        windowPos-=speed;
        if (windowPos <= elemOffset) { // cancel scrolling
          clearInterval(counter);
          windowObject
            .scrollTo(0, elemOffset+1);
        }
      } else { //top to bottom
        windowObject
          .scrollTo(0, windowPos);
        windowPos+=speed;
        if (windowPos >= elemOffset) { // cancel scrolling
          clearInterval(counter);
          windowObject
            .scrollTo(0, elemOffset+2);
        }
      }
    }, 15);
  }

  // -- make array of multiple elements
  function u_arrayElems() {
    var elements = [],
        args =     arguments,
        splitArr;
    // iterate through returned object and extract selector lists
    for (i = 0; i < args.length; i++) {
      splitArr = args[i];
      // iterate through each extracted list and place its items into 1 array
      var a = 0;
      while ( a < args[i].length) {
        elements
          .push(splitArr[a]);
        a++;
      }
    }
    return elements;
  }

  // -- test value of attribute
  function u_testAttrVal(selector, attr, val) {
    var element = document.querySelector(selector);
    var attribute = element.getAttribute(attr);
    if (attribute != val) {
      return true;
    } else {return false;}
  }

/////////////////////////////////////////// FUNCTIONS
// -- navbar switcher
function navbarSwitch(offsets, documentHeight) {
  var imgSource,
      windowOffset = this.pageYOffset,
      lastSection = pageSections[pageSectionsLength-1].offsetTop < windowOffset,
      bottomSection =   window.innerHeight + windowOffset;
  // change navbar item color according to current window section
  for (i = 0; i < pageSectionsLength; i++) {
    var section =       pageSections[i].id,
        link =          document.getElementsByClassName(section)[0],
        startSection =  pageSections[i].offsetTop < windowOffset,
        endSection =    windowOffset < (offsets[i+1] || documentHeight);
    if (startSection && endSection) {
      // prevent adding styles
      if (!(link.hasAttribute('style'))) {
        link
          .style.color = black;
      }
    // fix for bottom section
  } else if (documentHeight === bottomSection || lastSection) {
      navPointer[navPointerLength-2]
        .removeAttribute('style');
      navPointer[navPointerLength-1]
        .style.color = black;
    } else {
      link
        .removeAttribute('style');
    }
  }
  // -- style switch
  if (windowObject.pageYOffset >= services.offsetTop) {
    imgSource = 'images/logo-red.png';
    u_addClass(navFixed, 'navFixed');
  }
  else {
    imgSource = 'images/logo.png';
    u_removeClass(navFixed, 'navFixed');
  }
  // prevent adding attribute
  var equalAttribute = u_testAttrVal('.nav__logo img', 'src', imgSource);
  if (equalAttribute) {
    navbarLogo
      .setAttribute('src', imgSource);
  } else {
    return;
  }
}

/////////////////////////////////////////// ARROW ANIMATION
var arrowAnim = setInterval(function() {
  arrow
    .style.transform = arrow.style.transform == 'scale(1.1)' ? 'scale(1.0)' : 'scale(1.1)';
  arrow
    .style.transition = 'all .3s linear';
}, 500);

/////////////////////////////////////////// PAGE SCROLL
  arrow.addEventListener('click', function() {
    u_scroll(this, 48);
  });

  for (i = 0; i < navPointer.length; i++) {
    navPointer[i]
      .addEventListener('click', function(e) {
        u_scroll(this, 48);
        e.preventDefault();
      });
  }

/////////////////////////////////////////// NAVBAR FUNCTIONALITY
windowObject.addEventListener('load', function() {
  // store full page height
  documentHeight = html[0].scrollHeight;
  // store vertical position of page sections
  for (i = 0; i < pageSectionsLength; i++) {
    var  offset = pageSections[i].offsetTop;
    offsets.push(offset);
  }
  //navbar switcher
  navbarSwitch(offsets, documentHeight);
});

windowObject.addEventListener('scroll', function() {
  //navbar switcher
  navbarSwitch(offsets, documentHeight);
});

/////////////////////////////////////////// JQUERY
/////////////////////////////////////////// SLICK

  $('.slick').slick({
    'autoplay': true,
    'arrows':   false,
    'dots':     true
  });

  if ($(window).width() < 560) {
    $('.slick-prev, .slick-next')
      .hide();
  }
});
