(function () {
  "use strict";

  var pills = document.querySelectorAll("#filterRow .filter-pill");
  var cards = document.querySelectorAll("#directoryGrid .directory-card");
  if (!pills.length || !cards.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener("click", function () {
      var filter = pill.getAttribute("data-filter");

      pills.forEach(function (p) { p.classList.remove("is-active"); });
      pill.classList.add("is-active");

      cards.forEach(function (card) {
        var show = filter === "All" || card.getAttribute("data-group") === filter;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
})();
