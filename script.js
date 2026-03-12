document.addEventListener("DOMContentLoaded", function () {
  if (typeof window.jQuery === "undefined") {
    return;
  }

  const $ = window.jQuery;

  // 1. Mobile Menu Toggle
  const $menuBtn = $("#mobile-menu-btn");
  const $menu = $("#mobile-menu");
  const $menuIcon = $menuBtn.find("i");
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      $menu
        .removeClass("opacity-0 pointer-events-none")
        .addClass("opacity-100 pointer-events-auto");
      $menuIcon.removeClass("ph-list").addClass("ph-x");
      $("body").css("overflow", "hidden"); // Prevent background scrolling
    } else {
      $menu
        .removeClass("opacity-100 pointer-events-auto")
        .addClass("opacity-0 pointer-events-none");
      $menuIcon.removeClass("ph-x").addClass("ph-list");
      $("body").css("overflow", "");
    }
  }

  $menuBtn.on("click", toggleMenu);
  $(".mobile-link").on("click", toggleMenu);

  // 2. Sticky Navbar Glassmorphism on Scroll
  const $navbar = $("#navbar");

  $(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
      $navbar
        .addClass(
          "bg-mist/90 backdrop-blur-md shadow-sm border-b border-stone/50 py-3",
        )
        .removeClass("py-4 border-transparent");
    } else {
      $navbar
        .removeClass(
          "bg-mist/90 backdrop-blur-md shadow-sm border-b border-stone/50 py-3",
        )
        .addClass("py-4 border-transparent");
    }
  });

  // 3. Smooth Scrolling for Anchor Links (Delegated)
  $(document).on("click", 'a[href^="#"]', function (event) {
    event.preventDefault();
    const target = $(this.getAttribute("href"));

    if (target.length) {
      const offset = 80; // Account for fixed navbar height
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - offset,
          },
          800,
          "easeInOutExpo",
        ); // Custom easing feel
    }
  });

  // Custom Easing function for smoother scroll (equivalent to easeInOutExpo)
  $.easing.easeInOutExpo = function (x, t, b, c, d) {
    if (t == 0) return b;
    if (t == d) return b + c;
    if ((t /= d / 2) < 1) return (c / 2) * Math.pow(2, 10 * (t - 1)) + b;
    return (c / 2) * (-Math.pow(2, -10 * --t) + 2) + b;
  };

  // 4. Scroll Reveal (Intersection Observer pattern using jQuery fallback logic)
  function checkReveal() {
    const windowHeight = $(window).height();
    const scrollTop = $(window).scrollTop();
    const revealPoint = 100; // Trigger point offset

    $(".reveal").each(function () {
      const elementTop = $(this).offset().top;
      // If element is in viewport
      if (elementTop < scrollTop + windowHeight - revealPoint) {
        $(this).addClass("active");
      }
    });
  }

  // Trigger once on load
  checkReveal();
  // Bind to scroll
  $(window).on("scroll", function () {
    // Throttled slightly for performance
    requestAnimationFrame(checkReveal);
  });
});
