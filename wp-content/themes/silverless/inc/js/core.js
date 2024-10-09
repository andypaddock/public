//=require vendor/01-mixitup.min.js
//=require vendor/02-mixitup-pagination.js
//=require vendor/fslightbox.js
//=require vendor/mapbox-geocoder.min.js
//=require vendor/mapbox.js
//=require vendor/slick.js

'use strict';
jQuery(document).ready(function ($) {
  var navHeight = $('.main-nav').outerHeight();

  /* ADD CLASS ON SCROLL DOWN nPX */
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    if (scroll >= 100) {
      $('body').addClass('scrolled');
      $('.main-nav').css('top', '-' + navHeight + 'px');
    } else {
      $('body').removeClass('scrolled');
      $('.main-nav').css('top', '0');
    }
  });
  /* ADD CLASS ON SCROLL UP */
  var c,
    currentScrollTop = 0,
    navbar = $('.main-nav');

  $(window).scroll(function () {
    var a = $(window).scrollTop();
    var b = navbar.height();
    currentScrollTop = a;
    if (c < currentScrollTop && a > b + b) {
      navbar.css('top', '-' + navHeight + 'px');
      navbar.removeClass('solid');
    } else if (c > currentScrollTop && !(a <= b)) {
      navbar.css('top', '0');
      navbar.addClass('solid');
    }
    c = currentScrollTop;
  });

  $('.js-view-grid').on('click', function (e) {
    e.preventDefault();
    $('#page').toggleClass('show-grid');
    $(this).addClass('active');
  });

  /* INITIATE SLIDERS */
  $('.recipe-slider').slick({
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    centerPadding: '25px',
    variableWidth: true,
    rows: 0,
    prevArrow: $('.slider--nav-previous'),
    nextArrow: $('.slider--nav-next')
  });

  /* SCROLL TO NEXT SECTION */
  $('body').on('click', '.js_scroll-next-section', function (e) {
    e.preventDefault();
    var $currentSection = $(this).closest('section');
    var $nextSection = $currentSection.next('section');
    var $nextdiv = $currentSection.next('div');
    if ($nextSection.length > 0) {
      $nextSection[0].scrollIntoView({ behavior: 'smooth' });
    }
    if ($nextdiv.length > 0) {
      $nextdiv[0].scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* ANIMATIONS */
  $('body').addClass('js-on');

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $(entry.target).removeClass('hidden').addClass('visible');

        // Disconnect the observer after the element is animated
        observer.unobserve(entry.target);
      } else {
        $(entry.target).removeClass('visible').addClass('hidden');
      }
    });
  }

  // Create an Intersection Observer for non-tiled elements
  const observer = new IntersectionObserver(
    (entries) => handleIntersection(entries, observer),
    {
      threshold: 0.1
    }
  );

  // Target non-tiled elements to observe
  const nonTiledElements = $('.fm-below, .fm-above, .fm-left, .fm-right');

  // Start observing each non-tiled target element
  nonTiledElements.each(function (index, element) {
    observer.observe(element);
  });

  // Create an Intersection Observer for tiled elements
  const tiledObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !$(entry.target).hasClass('animated')) {
          // Calculate delay based on index
          const delay = index * 200; // Adjust this delay according to your preference
          setTimeout(() => {
            $(entry.target).removeClass('hidden').addClass('visible animated');

            // Disconnect the observer after the element is animated
            tiledObserver.unobserve(entry.target);
          }, delay);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  // Target tiled elements to observe
  const tiledElements = $('.tiled');

  // Start observing each tiled target element
  tiledElements.each(function (index, element) {
    tiledObserver.observe(element);
  });
  $(document).on('scroll', function () {
    var header = $('#home-header');
    var scrollPosition = $(window).scrollTop();

    // Check if the scroll is beyond 100vh
    if (scrollPosition > $(window).height()) {
      header.addClass('visible');
    } else {
      header.removeClass('visible');
    }
  });
});
// Function to set a cookie
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Convert days to milliseconds
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
}

// Function to get a cookie value
function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Check if the age verification cookie exists
if (getCookie('ageVerified') !== 'true') {
  document.getElementById('age-gate').style.display = 'flex'; // Show the gateway only if the cookie isn't set
}

document.getElementById('yes-btn').addEventListener('click', function () {
  // document.getElementById('age-gate').style.display = 'none'; // Hide the age gate
  setCookie('ageVerified', 'true', 180); // Set cookie to expire in 180 days

  // Start splat animations after hiding the age gate
  startSplatAnimations(); // Call the function to start animations
});

// document.getElementById('no-btn').addEventListener('click', function() {
//     window.location.href = 'https://www.google.com'; // Redirect to another page if under 18
// });
