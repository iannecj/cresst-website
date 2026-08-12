(function () {
  "use strict";

  var chips = document.querySelectorAll("#interestChips .chip-toggle");
  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chip.classList.toggle("is-selected");
    });
  });

  var form = document.getElementById("inquiryForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var org = form.organization.value.trim();
    var contact = form.contact.value.trim();
    var email = form.email.value.trim();
    var mission = form.mission.value.trim();
    var interests = Array.prototype.slice
      .call(chips)
      .filter(function (c) { return c.classList.contains("is-selected"); })
      .map(function (c) { return c.textContent; })
      .join(", ");

    var subject = "CRESST consortium inquiry — " + (org || "New inquiry");
    var bodyLines = [
      "Organization: " + org,
      "Contact name: " + contact,
      "Work email: " + email,
      "Mission or program: " + (mission || "—"),
      "Capability of interest: " + (interests || "—"),
    ];
    var mailto =
      "mailto:cresst@ucf.edu?subject=" +
      encodeURIComponent(subject) +
      "&body=" +
      encodeURIComponent(bodyLines.join("\n"));
    window.location.href = mailto;
  });
})();
