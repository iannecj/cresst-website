(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 24) {
      nav.classList.add("is-scrolled");
    } else {
      nav.classList.remove("is-scrolled");
    }
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  navToggle.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mobileMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Hero background video: slow-motion loop, fast fade-in on load, slow
  // crossfade at the loop seam. Real continuous playback via
  // video.playbackRate is the only way to get genuinely smooth motion
  // (a play/pause burst-cycle trick was tried first to hit an exact speed,
  // but it visibly stutters — every burst is a small hard jump). Chromium
  // clamps playbackRate to a minimum of 0.0625 (1/16), so that's the floor
  // used here instead of a lower but stuttery approximation.
  var heroVideo = document.getElementById("heroVideo");
  if (heroVideo && !reduceMotion) {
    var MIN_RATE = 0.0625;
    var MAX_OPACITY = 0.85;
    var LOOP_FADE_SECONDS = 1; // video-content seconds faded at each loop seam
    var PAGE_FADE_MS = 1600; // real-time fade-in on first load

    var pageLoadTs = null;
    var hasLooped = false; // only crossfade the restart-from-zero after the first full pass

    function loopFactor(t, duration) {
      if (hasLooped && t < LOOP_FADE_SECONDS) return t / LOOP_FADE_SECONDS;
      if (t > duration - LOOP_FADE_SECONDS) return (duration - t) / LOOP_FADE_SECONDS;
      return 1;
    }

    function paint(ts) {
      if (heroVideo.duration) {
        if (pageLoadTs === null) pageLoadTs = ts;
        var pageFactor = Math.min(1, (ts - pageLoadTs) / PAGE_FADE_MS);
        var factor = Math.min(pageFactor, loopFactor(heroVideo.currentTime, heroVideo.duration));
        heroVideo.style.opacity = Math.max(0, Math.min(1, factor)) * MAX_OPACITY;
      }
      requestAnimationFrame(paint);
    }
    requestAnimationFrame(paint);

    heroVideo.addEventListener("ended", function () {
      hasLooped = true;
      heroVideo.currentTime = 0;
      heroVideo.play();
    });

    function start() {
      try {
        heroVideo.playbackRate = MIN_RATE;
      } catch (e) {
        heroVideo.playbackRate = 1;
      }
      heroVideo.play();
    }
    if (heroVideo.readyState >= 1) {
      start();
    } else {
      heroVideo.addEventListener("loadedmetadata", start, { once: true });
    }
  }

  // Recolor a logo image on a canvas and swap the <img> to the result.
  // pixelFn receives (r,g,b,a) for each pixel and returns [r,g,b,a].
  function processLogoImage(imgEl, pixelFn) {
    if (!imgEl) return;
    var keyImg = new Image();
    keyImg.crossOrigin = "anonymous";
    keyImg.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = keyImg.naturalWidth;
      canvas.height = keyImg.naturalHeight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(keyImg, 0, 0);
      var frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      var data = frame.data;
      for (var i = 0; i < data.length; i += 4) {
        var out = pixelFn(data[i], data[i + 1], data[i + 2], data[i + 3]);
        data[i] = out[0];
        data[i + 1] = out[1];
        data[i + 2] = out[2];
        data[i + 3] = out[3];
      }
      ctx.putImageData(frame, 0, 0);
      imgEl.src = canvas.toDataURL("image/png");
    };
    keyImg.src = imgEl.src;
  }

  // Stylized CRESST wordmark: the source PNG has no real alpha around the
  // letters (it's a flattened render with a dark starfield backdrop), so a
  // CSS blend mode can't fully remove it — key out dark pixels instead.
  processLogoImage(document.getElementById("cresstWordmarkKeyed"), function (r, g, b, a) {
    var DARK = 55; // luminance at/below this becomes fully transparent
    var BRIGHT = 130; // luminance at/above this stays fully opaque
    var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    var alpha = Math.max(0, Math.min(1, (luminance - DARK) / (BRIGHT - DARK)));
    return [r, g, b, Math.round(a * alpha)];
  });

  // CRESST shield logo: source is on a solid white background with navy
  // shield/text/orbit-ring elements, meant for print. Key out the white to
  // transparent and recolor the navy to gold so it reads on a dark navbar.
  processLogoImage(document.getElementById("cresstShieldLogo"), function (r, g, b, a) {
    var luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (luminance > 235) {
      return [r, g, b, 0]; // near-white background -> transparent
    }
    var isNavy = b - r > 25 && b - g > 15 && luminance < 160;
    if (isNavy) {
      return [0xee, 0xc0, 0x6b, a]; // recolor navy -> brand gold (--gold-400)
    }
    return [r, g, b, a];
  });
})();
