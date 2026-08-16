(function () {
  "use strict";

  // ── budget data, in $ thousands, from the CRESST Startup Budget Deck (Rev 8/13/26) ──
  var CAT = [
    { label: "Radiation Test", total: 1375, ucf: 634, fse: 741, resides: "WG, TAMU, UCF/FSI" },
    { label: "Cryogenic Test", total: 800, ucf: 369, fse: 431, resides: "UCF/FSI" },
    { label: "Advanced Packaging Demo", total: 400, ucf: 185, fse: 215, resides: "No fixed footprint" },
    { label: "Workforce", total: 380, ucf: 380, fse: 0, resides: "No fixed footprint" },
    { label: "Work Control", total: 275, ucf: 0, fse: 275, resides: "FSI/FSE" },
    { label: "Failure Analysis", total: 200, ucf: 92, fse: 108, resides: "UCF" },
    { label: "Test Capability", total: 200, ucf: 200, fse: 0, resides: "No fixed footprint" },
    { label: "Consultants", total: 100, ucf: 100, fse: 0, resides: "No fixed footprint" },
    { label: "Marketing", total: 40, ucf: 40, fse: 0, resides: "No fixed footprint" },
  ];

  var TABS = {
    core: {
      code: "P1",
      priority: "Priority 1",
      tabCode: "PRIORITY 1",
      status: "The ask",
      label: "CRESST Core Launch",
      sub: "Radiation and cryogenic test, an advanced-packaging demonstration, workforce content, work control, and pay-for-service failure analysis — fourteen lines across nine categories.",
      y1: 1810,
      y2: 1960,
      total: 3770,
      totalFmt: "$3.77M",
      rows: [
        { label: "Winter Garden 200-MeV proton beam time (100 hrs over 2 years)", purpose: "Proton SEE and TID campaigns at mission-relevant energy", cat: "Radiation Test", resides: "WG", y1: 75, y2: 100 },
        { label: "Texas A&M beam time and test campaign (120 hrs each year)", purpose: "Heavy-ion complement to the proton campaigns", cat: "Radiation Test", resides: "TAMU", y1: 100, y2: 100 },
        { label: "Pulsed laser and install", purpose: "Single-event-effects screening without beam time", cat: "Radiation Test", resides: "UCF/FSI", y1: 900, y2: 0 },
        { label: "Test fixtures, dosimetry", purpose: "Consumables and instrumentation for every campaign", cat: "Radiation Test", resides: "UCF", y1: 50, y2: 50 },
        { label: "50-Kelvin-capable TVAC with 50 kV feedthroughs", purpose: "Medium-voltage instrument work at cryogenic temperature", cat: "Cryogenic Test", resides: "UCF/FSI", y1: 0, y2: 800 },
        { label: "Advanced packaging demo — UCF CRESST / FSE / Sandia demonstrations", purpose: "UCF-side materials, JPL design support, lab and test-facility access", cat: "Advanced Packaging Demo", resides: "N/A", y1: 200, y2: 200 },
        { label: "Online professional-certification content (TSS + others)", purpose: "Credentialed coursework for the workforce pipeline", cat: "Workforce", resides: "N/A", y1: 150, y2: 150 },
        { label: "Annual CRESST workshop", purpose: "Partner and NASA-facing technical exchange", cat: "Workforce", resides: "N/A", y1: 40, y2: 40 },
        { label: "Optical and metallurgical microscopy suite", purpose: "Bright field, dark field, polarization, stitching, and evidence documentation", cat: "Work Control", resides: "FSI/FSE", y1: 175, y2: 0 },
        { label: "Shared controlled handling system", purpose: "ESD-safe evidence handling, imaging database, secure storage, benches, and fixtures", cat: "Work Control", resides: "FSI/FSE", y1: 0, y2: 100 },
        { label: "UCF Materials Characterization Facility and pay-for-service analysis", purpose: "Shared UCF facilities plus AAA and NanoSpective service work", cat: "Failure Analysis", resides: "UCF", y1: 50, y2: 150 },
        { label: "Service contracts and training on new equipment", purpose: "Keeps new instruments qualified and staff current", cat: "Test Capability", resides: "N/A", y1: 0, y2: 200 },
        { label: "Consultants and external subject-matter experts", purpose: "Specialist review of methods and data packages", cat: "Consultants", resides: "N/A", y1: 50, y2: 50 },
        { label: "CRESST marketing", purpose: "Sector presence and recruiting", cat: "Marketing", resides: "N/A", y1: 20, y2: 20 },
      ],
    },
    fa: {
      code: "P3",
      priority: "Priority 3",
      tabCode: "PRIORITY 3",
      status: "Future thrust",
      label: "FA Lab",
      sub: "Failure-analysis laboratory build-out — inspection, probing, fault localization, decapsulation, and sample preparation. Funded from earned revenue and equipment grants, not the core-launch request.",
      y1: 1750,
      y2: 1250,
      total: 3000,
      totalFmt: "$3.0M",
      rows: [
        { label: "High-resolution electronics X-ray micro-CT", purpose: "Package, die-attach, wire-bond, solder-joint, via, crack, void, and foreign-material inspection before opening the part", y1: 650, y2: 0 },
        { label: "Semiconductor parameter analyzer and modern curve-tracer system", purpose: "Pin-to-pin curve tracing, leakage, breakdown, parametric shifts, power-device testing, and pre-/post-radiation comparison", y1: 325, y2: 0 },
        { label: "Manual / semi-automatic microprobe stations, switching matrix, sockets, fixtures", purpose: "Die-level probing, packaged-part interrogation, microprobing, and repeatable fault verification", y1: 225, y2: 0 },
        { label: "Thermal / IR and photon-emission fault-localization system", purpose: "Detect localized shorts, leakage, latch-up damage, current paths, and active die defects", y1: 0, y2: 450 },
        { label: "Optical and metallurgical microscopy suite", purpose: "Bright field, dark field, polarization, low-angle illumination, extended depth of field, image stitching, and evidence documentation", y1: 175, y2: 0 },
        { label: "Electronics decapsulation and delidding suite", purpose: "Chemical jet etch, plasma cleaning, mechanical delidding, package opening, localized coating removal, and evidence-preserving access", y1: 0, y2: 300 },
        { label: "Electronics-specific cross-sectioning and sample preparation", purpose: "Precision sectioning, mounting, grinding, polishing, ion cleaning, die thinning, and package cross sections", y1: 0, y2: 225 },
        { label: "Wire-pull and ball / shear bond tester", purpose: "Quantitative assessment of wire bonds, solder balls, bumps, die attach, and package-interconnect strength", y1: 0, y2: 175 },
        { label: "ESD-safe evidence handling, imaging database, secure storage, benches, and fixtures", purpose: "Chain of custody, controlled handling, photographic records, fixtures, and test-data integration", y1: 0, y2: 100 },
        { label: "Facility modifications, utilities, chemical safety, installation, training, and service contracts", purpose: "Fume extraction, acid-compatible wet bench, chilled water, compressed gases, power conditioning, vibration control, installation, and operator training", y1: 375, y2: 0 },
      ],
    },
    cryo: {
      code: "P2",
      priority: "Priority 2",
      tabCode: "PRIORITY 2",
      status: "Future thrust",
      label: "Cryo / Power Instrument Electronics",
      sub: "Power electronics at cryogenic temperatures — a high-power cryostat, a lunar-grid converter testbed, EMI/EMC pre-compliance, students, and faculty effort. The 50 K TVAC now sits in the core launch.",
      y1: 580,
      y2: 530,
      total: 1110,
      totalFmt: "$1.11M",
      rows: [
        { label: "40–400 K high-power cryostat (3 L test volume; 40 W heat lift @ 50 K)", purpose: "Dedicated 40–400 K cryostat for energized converter and electronics testing above 5 kW; 3 L DUT volume, 40 W at 50 K, and MV/high-current feedthroughs — separate from the TVAC.", y1: 150, y2: 150 },
        { label: "Automated extreme-temperature power-electronics device and passive characterization bench", purpose: "Automated cryogenic double-pulse and static/dynamic testing of GaN/SiC, gate drives, and passives after thermal cycling; generates reliability models.", y1: 50, y2: 50 },
        { label: "3-phase 1-kHz high-voltage lunar grid emulator / converter testbed", purpose: "Programmable 3-phase 1–2 kHz source plus custom 3-kV isolation/step-up, load, protection, and measurement for lunar-grid converter testing.", y1: 100, y2: 100 },
        { label: "Cryogenic lunar-surface power converter and wireless-charging demonstrators", purpose: "Lunar high-voltage power-delivery and wireless-charging converter demonstrators for extreme-environment validation.", y1: 50, y2: 50 },
        { label: "Student researchers — 2 graduate + 2 undergraduate (unburdened)", purpose: "Support for commissioning, characterization, reliability modeling, and converter demonstrations.", y1: 80, y2: 80 },
        { label: "Space power EMI/EMC pre-compliance test bench", purpose: "Conducted EMI/EMC and near-field pre-compliance: LISNs, probes, EMI receiver/spectrum analyzer, and field probes.", y1: 50, y2: 0 },
        { label: "Faculty support (Batarseh, Dey, Yang)", purpose: "Faculty effort across the cryogenic power-electronics program.", y1: 100, y2: 100 },
      ],
    },
    wg: {
      code: "P4",
      priority: "Priority 4",
      tabCode: "PRIORITY 4",
      status: "Future thrust",
      label: "WG Upfit",
      sub: "Winter Garden proton test cell — the largest single capability line in the plan, funded from earned revenue and equipment grants. The outfit figure is an estimate and the quote is pending.",
      y1: 3000,
      y2: 2000,
      total: 5000,
      totalFmt: "$5.0M",
      rows: [
        { label: "Outfit Test Cell Proton Facility — Winter Garden", purpose: "Estimate — quote pending. Planning split shown: beam line, dosimetry, shielding, and test-cell instrumentation", y1: 3000, y2: 2000 },
      ],
    },
  };

  var ORDER = ["core", "fa", "cryo", "wg"];

  function fmt(k) {
    if (k >= 1000) {
      var m = k / 1000;
      return "$" + (k % 1000 === 0 ? m.toFixed(1) : m.toFixed(2)) + "M";
    }
    return "$" + k + "K";
  }

  var currentTab = "core";
  var displayed = 0; // current animated total, in $K
  var raf = null;

  var els = {
    asideTag: document.getElementById("asideTag"),
    asideLabel: document.getElementById("asideLabel"),
    asideSub: document.getElementById("asideSub"),
    asideFundPill: document.getElementById("asideFundPill"),
    countLabel: document.getElementById("countLabel"),
    countUp: document.getElementById("countUp"),
    asideY1: document.getElementById("asideY1"),
    asideY2: document.getElementById("asideY2"),
    asideY1Bar: document.getElementById("asideY1Bar"),
    asideY2Bar: document.getElementById("asideY2Bar"),
    asideCount: document.getElementById("asideCount"),
    paysFirst: document.getElementById("paysFirst"),
    lineItemsBody: document.getElementById("lineItemsBody"),
    totalLabel: document.getElementById("totalLabel"),
    totalAmt: document.getElementById("totalAmt"),
    totalY1: document.getElementById("totalY1"),
    totalY2: document.getElementById("totalY2"),
    payerSection: document.getElementById("payerSection"),
    payerRows: document.getElementById("payerRows"),
  };

  function renderPayerRows() {
    if (!els.payerRows) return;
    var maxCat = Math.max.apply(null, CAT.map(function (c) { return c.total; }));
    els.payerRows.innerHTML = CAT.map(function (c) {
      var uw = ((c.ucf / maxCat) * 100).toFixed(1) + "%";
      var fw = ((c.fse / maxCat) * 100).toFixed(1) + "%";
      return (
        '<div class="payer-row">' +
        '<span class="cat">' + c.label + "</span>" +
        '<div class="payer-stack">' +
        (c.ucf ? '<div class="payer-fill ucf" style="width:' + uw + ';">' + fmt(c.ucf) + "</div>" : "") +
        (c.fse ? '<div class="payer-fill fse" style="width:' + fw + ';">' + fmt(c.fse) + "</div>" : "") +
        "</div>" +
        '<span class="total">' + fmt(c.total) + "</span>" +
        '<span class="resides-pill">' + c.resides + "</span>" +
        "</div>"
      );
    }).join("");
  }

  function renderRows(tab) {
    var maxRow = Math.max.apply(
      null,
      tab.rows.map(function (r) { return r.y1 + r.y2; })
    );
    els.lineItemsBody.innerHTML = tab.rows
      .map(function (r, i) {
        var total = r.y1 + r.y2;
        var bar = Math.round((total / maxRow) * 100);
        return (
          '<div class="line-item">' +
          '<span class="n">' + String(i + 1).padStart(2, "0") + "</span>" +
          '<div class="desc">' +
          (r.cat ? '<span class="cat">' + r.cat + "</span>" : "") +
          '<span class="label">' + r.label + '</span><span class="purpose">' + r.purpose + "</span>" +
          (r.resides ? '<span class="resides">Resides &middot; ' + r.resides + "</span>" : "") +
          "</div>" +
          '<div class="alloc"><span class="total">' + fmt(total) + '</span><div class="bar-track"><div class="bar-fill gold" style="width:' + bar + '%;"></div></div></div>' +
          '<span class="y1">' + (r.y1 ? fmt(r.y1) : "—") + "</span>" +
          '<span class="y2">' + (r.y2 ? fmt(r.y2) : "—") + "</span>" +
          "</div>"
        );
      })
      .join("");
  }

  function animateCount(from, to) {
    if (raf) cancelAnimationFrame(raf);
    els.countLabel.textContent = "PACKAGE TOTAL";
    var t0 = performance.now();
    var dur = 750;
    function step(t) {
      var p = Math.min(1, (t - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      var val = Math.round(from + (to - from) * e);
      els.countUp.textContent = "$" + (val * 1000).toLocaleString("en-US");
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
  }

  function selectTab(id, opts) {
    var tab = TABS[id];
    if (!tab) return;
    opts = opts || {};
    var prevTotal = displayed;
    currentTab = id;
    displayed = tab.total;
    var isCore = id === "core";

    document.querySelectorAll("#tabGrid .tab-card").forEach(function (card) {
      card.classList.toggle("is-active", card.getAttribute("data-tab") === id);
    });

    els.asideTag.textContent = tab.priority + " · TAB " + tab.code;
    els.asideLabel.textContent = tab.label;
    els.asideSub.textContent = tab.sub;
    els.asideFundPill.textContent = tab.status;
    els.asideFundPill.classList.toggle("ask", isCore);
    els.asideY1.textContent = fmt(tab.y1);
    els.asideY2.textContent = fmt(tab.y2);
    els.asideY1Bar.style.width = Math.round((tab.y1 / tab.total) * 100) + "%";
    els.asideY2Bar.style.width = Math.round((tab.y2 / tab.total) * 100) + "%";
    els.asideCount.textContent = tab.rows.length;
    els.paysFirst.style.display = isCore ? "flex" : "none";
    els.totalLabel.textContent = "Total · " + tab.label;
    els.totalAmt.textContent = tab.totalFmt;
    els.totalY1.textContent = fmt(tab.y1);
    els.totalY2.textContent = fmt(tab.y2);
    if (els.payerSection) els.payerSection.style.display = isCore ? "" : "none";

    renderRows(tab);
    animateCount(opts.skipAnimation ? tab.total : prevTotal, tab.total);
  }

  document.querySelectorAll("[data-tab]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var id = el.getAttribute("data-tab");
      selectTab(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  });

  renderPayerRows();

  var initial = (window.location.hash || "").replace("#", "");
  if (!TABS[initial]) initial = "core";
  selectTab(initial, { skipAnimation: true });
})();
