'use strict';
$(document).ready(function() {
  $('a').click(function() {
    let scrollingTo = $(this).attr('href');
    if (scrollingTo !== '#home') {
      $('html, body').animate({
        scrollTop: $(scrollingTo).offset().top
      }, 1000);
    }
    else {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    }
  });
  $('.burger').click(function(event) {
    $('.burger,.nav-container').toggleClass('active');
    $('body').toggleClass('lock');
  })
  $('.nav_a').click(function(event) {
    $('.burger,.nav-container').toggleClass('active');
    $('body').toggleClass('lock');
  })
  $('.slider').slick({
    arrows: true,
    dots: true,
    adaptiveHeight: true, 
    autoplay: true,
    waitForAnimate: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        }        
      }
    ],
  });
})