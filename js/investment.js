(function () {
  "use strict";

  // ── budget data, in $ thousands, transcribed from CRESST_BaseBudget.xlsx ──
  var TABS = {
    base: {
      code: "P1",
      priority: "Priority 1",
      tabCode: "PRIORITY 1",
      label: "CRESST (Base)",
      sub: "Core program operations — beam time, pulsed-laser acquisition, certification content, workshops, and student support.",
      y1: 1255,
      y2: 1050,
      total: 2305,
      totalFmt: "$2.305M",
      rangeFmt: null,
      rows: [
        { label: "Pulsed-laser system acquisition", purpose: "Single-event-effects screening without beam time", y1: 450, y2: 350 },
        { label: "Laser installation, safety systems, and lab modifications", purpose: "Interlocks, enclosure, and lab fit-out for laser operation", y1: 50, y2: 50 },
        { label: "Winter Garden 200-MeV proton beam time (100 hrs over 2 years)", purpose: "Proton SEE and TID campaigns at mission-relevant energy", y1: 100, y2: 75 },
        { label: "Texas A&M beam time", purpose: "Heavy-ion complement to the proton campaigns", y1: 50, y2: 50 },
        { label: "Texas A&M travel — faculty plus five students", purpose: "Student-run test campaigns at the Cyclotron Institute", y1: 50, y2: 50 },
        { label: "UCF Materials Characterization Facility and other shared facilities", purpose: "Materials analysis supporting packaging and failure work", y1: 40, y2: 60 },
        { label: "Online professional-certification content (TSS + others)", purpose: "Credentialed coursework for the workforce pipeline", y1: 200, y2: 100 },
        { label: "Annual CRESST workshop", purpose: "Partner and NASA-facing technical exchange", y1: 40, y2: 40 },
        { label: "CRESST conference travel and exhibit booth", purpose: "Sector presence and recruiting", y1: 10, y2: 10 },
        { label: "Consultants and external subject-matter experts", purpose: "Specialist review of methods and data packages", y1: 50, y2: 50 },
        { label: "FSE / Sandia demonstrations and collaborations (materials, JPL design support)", purpose: "Joint demonstrations across the semiconductor corridor", y1: 50, y2: 50 },
        { label: "Student support (2 graduate, 4 undergraduate, no burden)", purpose: "Funded research positions carrying the pipeline", y1: 110, y2: 110 },
        { label: "Test hardware, software, dosimetry, fixtures, and shipping", purpose: "Consumables and instrumentation for every campaign", y1: 30, y2: 30 },
        { label: "Maintenance / contingency reserve", purpose: "Service contracts and unplanned repair", y1: 25, y2: 25 },
      ],
    },
    fa: {
      code: "P2",
      priority: "Priority 2",
      tabCode: "PRIORITY 2",
      label: "FA Lab",
      sub: "Failure-analysis laboratory build-out — inspection, probing, fault localization, decapsulation, and sample preparation.",
      y1: 1750,
      y2: 1250,
      total: 3000,
      totalFmt: "$3.0M",
      rangeFmt: null,
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
      code: "P3",
      priority: "Priority 3",
      tabCode: "PRIORITY 3",
      label: "Cryo / Power Instrument Electronics",
      sub: "Power electronics at cryogenic temperatures — TVAC, a high-power cryostat, a lunar-grid converter testbed, EMI/EMC pre-compliance, students, and faculty effort.",
      y1: 880,
      y2: 730,
      total: 1710,
      totalFmt: "$1.71M",
      rangeFmt: null,
      rows: [
        { label: "50-Kelvin-capable TVAC with 50 kV feedthroughs", purpose: "Capability to do medium-voltage instrument work at cryogenic temperature", y1: 300, y2: 300 },
        { label: "40–400 K high-power cryostat (3 L test volume; 40 W heat lift @ 50 K)", purpose: "Dedicated 40–400 K cryostat for energized converter and electronics testing above 5 kW; 3 L DUT volume, 40 W at 50 K, and MV/high-current feedthroughs — separate from the TVAC.", y1: 150, y2: 150 },
        { label: "Automated extreme-temperature power-electronics device and passive characterization bench", purpose: "Automated cryogenic double-pulse and static/dynamic testing of GaN/SiC, gate drives, and passives after thermal cycling; generates reliability models.", y1: 50, y2: 50 },
        { label: "3-phase 1-kHz high-voltage lunar grid emulator / converter testbed", purpose: "Programmable 3-phase 1–2 kHz source plus custom 3-kV isolation/step-up, load, protection, and measurement for lunar-grid converter testing.", y1: 100, y2: 100 },
        { label: "Cryogenic lunar-surface power converter and wireless-charging demonstrators", purpose: "Lunar high-voltage power-delivery and wireless-charging converter demonstrators for extreme-environment validation.", y1: 50, y2: 50 },
        { label: "Student researchers — 2 graduate + 2 undergraduate (unburdened)", purpose: "Support for commissioning, characterization, reliability modeling, and converter demonstrations.", y1: 80, y2: 80 },
        { label: "Space power EMI/EMC pre-compliance test bench", purpose: "Conducted EMI/EMC and near-field pre-compliance: LISNs, probes, EMI receiver/spectrum analyzer, and field probes.", y1: 50, y2: 50 },
        { label: "Faculty support (Batarseh, Dey, Yang)", purpose: "Faculty effort across the cryogenic power-electronics program.", y1: 100, y2: 100 },
      ],
    },
    wg: {
      code: "P4",
      priority: "Priority 4",
      tabCode: "PRIORITY 4",
      label: "WG Upfit",
      sub: "Winter Garden proton test cell — the largest single capability line in the plan. The outfit quote is pending; $3–5M is expected.",
      y1: 3000,
      y2: 2000,
      total: 5000,
      totalFmt: "$3–5M",
      rangeFmt: "$3–5M",
      rows: [
        { label: "Outfit Test Cell Proton Facility — Winter Garden", purpose: "Quote pending — $3–5M expected. Planning split shown: beam line, dosimetry, shielding, and test-cell instrumentation", y1: 3000, y2: 2000 },
      ],
    },
  };

  var ORDER = ["base", "fa", "cryo", "wg"];
  var GRAND = 12015; // sum of tab totals, $K
  var SHARE = { base: 19, fa: 25, cryo: 14, wg: 42 };

  function fmt(k) {
    if (k >= 1000) {
      var m = k / 1000;
      return "$" + (k % 1000 === 0 ? m.toFixed(1) : m.toFixed(2)) + "M";
    }
    return "$" + k + "K";
  }

  var currentTab = "base";
  var displayed = 0; // current animated total, in $K
  var raf = null;

  var els = {
    envelopeCaption: document.getElementById("envelopeCaption"),
    asideTag: document.getElementById("asideTag"),
    asideLabel: document.getElementById("asideLabel"),
    asideSub: document.getElementById("asideSub"),
    countLabel: document.getElementById("countLabel"),
    countUp: document.getElementById("countUp"),
    asideY1: document.getElementById("asideY1"),
    asideY2: document.getElementById("asideY2"),
    asideY1Bar: document.getElementById("asideY1Bar"),
    asideY2Bar: document.getElementById("asideY2Bar"),
    asideCount: document.getElementById("asideCount"),
    lineItemsBody: document.getElementById("lineItemsBody"),
    totalLabel: document.getElementById("totalLabel"),
    totalAmt: document.getElementById("totalAmt"),
    totalY1: document.getElementById("totalY1"),
    totalY2: document.getElementById("totalY2"),
  };

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
          '<div class="desc"><span class="label">' + r.label + '</span><span class="purpose">' + r.purpose + "</span></div>" +
          '<div class="alloc"><span class="total">' + fmt(total) + '</span><div class="bar-track"><div class="bar-fill gold" style="width:' + bar + '%;"></div></div></div>' +
          '<span class="y1">' + (r.y1 ? fmt(r.y1) : "—") + "</span>" +
          '<span class="y2">' + (r.y2 ? fmt(r.y2) : "—") + "</span>" +
          "</div>"
        );
      })
      .join("");
  }

  function animateCount(from, to, isRange, rangeLabel) {
    if (raf) cancelAnimationFrame(raf);
    if (isRange) {
      els.countUp.textContent = rangeLabel;
      els.countLabel.textContent = "PACKAGE TOTAL · QUOTE PENDING";
      return;
    }
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

    document.querySelectorAll("#tabGrid .tab-card").forEach(function (card) {
      card.classList.toggle("is-active", card.getAttribute("data-tab") === id);
    });
    document.querySelectorAll("#envelopeBar .envelope-seg").forEach(function (seg) {
      var on = seg.getAttribute("data-seg") === id;
      seg.style.background = on
        ? "linear-gradient(90deg,var(--gold-500),var(--gold-300))"
        : "rgba(147,160,189,.2)";
    });

    els.envelopeCaption.textContent = tab.label + " · " + SHARE[id] + "% of envelope";
    els.asideTag.textContent = tab.priority + " · TAB " + tab.code;
    els.asideLabel.textContent = tab.label;
    els.asideSub.textContent = tab.sub;
    els.asideY1.textContent = fmt(tab.y1);
    els.asideY2.textContent = fmt(tab.y2);
    els.asideY1Bar.style.width = Math.round((tab.y1 / tab.total) * 100) + "%";
    els.asideY2Bar.style.width = Math.round((tab.y2 / tab.total) * 100) + "%";
    els.asideCount.textContent = tab.rows.length;
    els.totalLabel.textContent = "Total · " + tab.label;
    els.totalAmt.textContent = tab.totalFmt;
    els.totalY1.textContent = fmt(tab.y1);
    els.totalY2.textContent = fmt(tab.y2);

    renderRows(tab);
    animateCount(opts.skipAnimation ? tab.total : prevTotal, tab.total, !!tab.rangeFmt, tab.rangeFmt);
  }

  document.querySelectorAll("[data-tab]").forEach(function (el) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      var id = el.getAttribute("data-tab");
      selectTab(id);
      if (history.replaceState) history.replaceState(null, "", "#" + id);
    });
  });

  var initial = (window.location.hash || "").replace("#", "");
  if (!TABS[initial]) initial = "base";
  selectTab(initial, { skipAnimation: true });
})();
