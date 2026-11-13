var WI =
  "assets/images/weekenjoy.png";
var M = [
  {
    n: "November 2026",
    y: 2026,
    m: 10,
    hl: [1, 2],
    ev: {
      13: ["Quran Story Night"],
      14: ["wi", "Spin the Frizbee"],
      21: ["Mabit Syabab"],
      28: ["wi"],
    },
  },
  {
    n: "Disember 2026",
    y: 2026,
    m: 11,
    hl: [22, 23, 24, 25, 26, 27, 28, 29, 30],
    ev: {
      4: ["Exit Hub", "alt"],
      12: ["wi"],
      19: ["Interaksi dengan Al Quran"],
      20: ["Interaksi dengan Al Quran"],
    },
  },
];
var D = ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu"],
  MS = [
    "Jan",
    "Feb",
    "Mac",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ogos",
    "Sep",
    "Okt",
    "Nov",
    "Dis",
  ];
document.getElementById("wileg").src = WI;
var out = document.getElementById("months"),
  list = [];
M.forEach(function (o) {
  var first = new Date(o.y, o.m, 1).getDay(),
    days = new Date(o.y, o.m + 1, 0).getDate(),
    h = "";
  D.forEach(function (d) {
    h +=
      '<div class="dow" role="columnheader"><span class="dl">' +
      d +
      '</span><span class="ds" aria-hidden="true">' +
      d.slice(0, 3) +
      "</span></div>";
  });
  for (var i = 0; i < first; i++) h += '<div class="cell"></div>';
  for (var d = 1; d <= days; d++) {
    var e = o.ev[d],
      k = o.m * 100 + d,
      c = "cell" + (k >= 1009 && k <= 1120 ? " ev" : " hl"),
      t = "";
    if (e) {
      t =
        e[0] === "wi"
          ? '<img class="wi" src="' +
            WI +
            '" alt="Weekenjoy' +
            (e[1] ? ": " + e[1] : "") +
            '" title="Weekenjoy' +
            (e[1] ? ": " + e[1] : "") +
            '">'
          : '<span class="tag' +
            (e[1] ? " " + e[1] : "") +
            '">' +
            e[0] +
            "</span>";
      if (e[0] !== "wi") list.push([o.y, o.m, d, e[0]]);
    }
    h +=
      '<div class="' +
      c +
      '"><span class="num">' +
      (d < 10 ? "0" : "") +
      d +
      "</span>" +
      t +
      "</div>";
  }
  var tail = (7 - ((first + days) % 7)) % 7;
  for (i = 0; i < tail; i++) h += '<div class="cell"></div>';
  out.insertAdjacentHTML(
    "beforeend",
    '<div class="month"><h3>' +
      o.n +
      '</h3><div class="scroll" tabindex="0" role="region" aria-label="Kalendar ' +
      o.n +
      '"><div class="grid" role="grid">' +
      h +
      "</div></div></div>",
  );
});

function svg(w, h, b) {
  return (
    '<svg viewBox="0 0 ' +
    w +
    " " +
    h +
    '" shape-rendering="crispEdges" aria-hidden="true">' +
    b +
    "</svg>"
  );
}
function rc(x, y, w, h, f) {
  return (
    '<rect x="' +
    x +
    '" y="' +
    y +
    '" width="' +
    w +
    '" height="' +
    h +
    '" fill="' +
    f +
    '"/>'
  );
}
// pixel Quran
var QA = [
    ".kkkkkkkkkkkkkk.",
    "kGGGGGGGGGGGGGGk",
    "kGGGyyyyGGGGGGGk",
    "kGGyyGGGGGGGGGGk",
    "kGGyyGGGGGGyGGGk",
    "kGGyyGGGGGyyyGGk",
    "kGGGyyyyGGGyGGGk",
    "kGGGGGGGGGGGGGGk",
    "kGGGGGGGGGGGGGGk",
    "kkkkkkkkkkkkkkkk",
    "kwwwwwwwwwwwwwwk",
    ".kkkkkkkkkkkkkk.",
  ],
  QP = { k: "#1D1A33", G: "#2E9E6B", y: "#FFD84A", w: "#fff" };
var QS = "";
QA.forEach(function (r, y) {
  for (var x = 0; x < r.length; x++)
    if (QP[r[x]]) QS += rc(x, y, 1, 1, QP[r[x]]);
});
QS = svg(16, 12, QS);
// pixel campus skyline
function city() {
  var h = 40,
    o = rc(0, 40, 240, 4, "#5CBF84"),
    B = [
      [6, 40, 26, "#9FB0DE"],
      [56, 20, 18, "#B7C4E8"],
      [84, 70, 22, "#C9B8FF"],
      [170, 56, 30, "#B7C4E8"],
    ];
  B.forEach(function (b) {
    o += rc(b[0], h - b[2], b[1], b[2], b[3]);
    for (var x = b[0] + 4; x < b[0] + b[1] - 4; x += 8)
      for (var y = h - b[2] + 4; y < h - 6; y += 8)
        o += rc(x, y, 3, 3, "#fff");
  });
  o +=
    rc(112, 24, 14, 6, "#C9B8FF") +
    rc(116, 20, 6, 4, "#C9B8FF") +
    rc(118, 14, 2, 6, "#FFD84A") +
    rc(116, 32, 6, 8, "#1D1A33");
  [
    [46, 10],
    [158, 12],
    [232, 10],
  ].forEach(function (t) {
    o +=
      rc(t[0], h - t[1], 8, t[1] - 4, "#2E9E6B") +
      rc(t[0] + 3, h - 4, 2, 4, "#7A4B2A");
  });
  return svg(240, 44, o).replace(
    "<svg ",
    '<svg preserveAspectRatio="xMidYMax slice" ',
  );
}
// ---------- event carousel (built from the calendar data in M) ----------
// Every named event in M gets a slide. Weekenjoy days only get a slide when
// they have a title, e.g. 14: ["wi", "Spin the Frizbee"].
// Extra details + poster per event live in INFO (keyed by the event name).
// Posters go in assets/posters/ (portrait, ~1080 px wide). Events without a
// poster show a "coming soon" card.
var POSTER_DIR = "assets/posters/";
var INFO = {
  "Quran Story Night": {
    poster: "quran-story-night.jpg",
    lines: [
      "Bersama Amsyar Syabab Way · Hos: Aziq Azmi",
      "Kona Mokapot Coffee UM · 8.45–10.00 mlm",
    ],
  },
  "Spin the Frizbee": {
    poster: "spin-the-frizbee.jpg",
    lines: ["Court KK5 · 8.30 pagi"],
  },
};
function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
function esc(s) {
  return String(s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
var EVENTS = (function () {
  var by = {};
  M.forEach(function (o) {
    Object.keys(o.ev).forEach(function (d) {
      var e = o.ev[d],
        wi = e[0] === "wi",
        name = wi ? e[1] : e[0];
      if (!name) return; // untitled Weekenjoy day
      (by[name] = by[name] || { name: name, wi: wi, dates: [] }).dates.push(
        new Date(o.y, o.m, +d),
      );
    });
  });
  return Object.keys(by)
    .map(function (k) {
      var ev = by[k];
      ev.dates.sort(function (a, b) {
        return a - b;
      });
      ev.slug = slug(ev.name);
      ev.when = fmtDates(ev.dates);
      ev.info = INFO[ev.name] || {};
      return ev;
    })
    .sort(function (a, b) {
      return a.dates[0] - b.dates[0];
    });
})();
// "13 Nov 2026" · "19–20 Dis 2026" · "14 & 28 Nov · 12 Dis 2026"
function fmtDates(ds) {
  var groups = [],
    g = null;
  ds.forEach(function (d) {
    if (g && d - g.end === 864e5) g.end = d;
    else groups.push((g = { start: d, end: d }));
  });
  var byMonth = [];
  groups.forEach(function (g) {
    var m = g.start.getMonth(),
      lbl =
        g.start.getDate() +
        (g.end > g.start ? "–" + g.end.getDate() : "");
    var last = byMonth[byMonth.length - 1];
    if (last && last.m === m) last.d.push(lbl);
    else byMonth.push({ m: m, d: [lbl] });
  });
  return (
    byMonth
      .map(function (b) {
        return b.d.join(" & ") + " " + MS[b.m];
      })
      .join(" · ") +
    " " +
    ds[0].getFullYear()
  );
}
function carousel() {
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var slides = EVENTS.map(function (ev, i) {
    var end = ev.dates[ev.dates.length - 1],
      status =
        end < today
          ? '<em class="st done">Selesai</em>'
          : ev.dates.some(function (d) {
                return +d === +today;
              })
            ? '<em class="st now">Hari ini</em>'
            : '<em class="st">Akan datang</em>';
    return (
      '<div class="slide" role="group" aria-roledescription="slaid" aria-label="' +
      (i + 1) +
      " / " +
      EVENTS.length +
      ": " +
      esc(ev.name) +
      '"><a class="poster" href="#kalendar">' +
      (ev.info.poster
        ? '<img class="pimg" src="' +
          POSTER_DIR +
          ev.info.poster +
          '" alt="Poster ' +
          esc(ev.name) +
          '"' +
          (i ? ' loading="lazy"' : "") +
          ">"
        : '<div class="ph">' +
          (ev.wi ? '<img class="phwi" src="' + WI + '" alt="">' : "") +
          "<b>" +
          esc(ev.name) +
          "</b><small>Poster coming soon</small></div>") +
      '</a><div class="cap">' +
      status +
      (ev.wi ? "<small>Weekenjoy</small>" : "") +
      "<strong>" +
      esc(ev.name) +
      "</strong><span>" +
      esc(ev.when) +
      "</span>" +
      (ev.info.lines || [])
        .map(function (l) {
          return "<span>" + esc(l) + "</span>";
        })
        .join("") +
      "</div></div>"
    );
  }).join("");
  var dots = EVENTS.map(function (ev, i) {
    return (
      '<button type="button" aria-label="Slaid ' +
      (i + 1) +
      ": " +
      esc(ev.name) +
      '"></button>'
    );
  }).join("");
  return (
    '<div class="car" role="region" aria-roledescription="karusel" aria-label="Acara Re:Quran"><div class="track" tabindex="0">' +
    slides +
    '</div><button type="button" class="nb prev" aria-label="Sebelum">‹</button><button type="button" class="nb next" aria-label="Seterusnya">›</button><div class="dots">' +
    dots +
    "</div></div>"
  );
}
function initCarousel(root) {
  var track = root.querySelector(".track"),
    slides = track.children,
    dots = root.querySelectorAll(".dots button"),
    n = slides.length,
    cur = 0,
    timer = 0,
    paused = false,
    reduce =
      window.matchMedia &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;
  function go(i, smooth) {
    cur = (i + n) % n;
    track.scrollTo({
      left: cur * track.clientWidth,
      behavior: smooth === false || reduce ? "auto" : "smooth",
    });
    mark();
  }
  function mark() {
    dots.forEach(function (d, i) {
      d.setAttribute("aria-current", i === cur ? "true" : "false");
    });
  }
  function auto() {
    clearInterval(timer);
    if (!reduce && !paused)
      timer = setInterval(function () {
        go(cur + 1);
      }, 5000);
  }
  root.querySelector(".prev").addEventListener("click", function () {
    go(cur - 1);
    auto();
  });
  root.querySelector(".next").addEventListener("click", function () {
    go(cur + 1);
    auto();
  });
  dots.forEach(function (d, i) {
    d.addEventListener("click", function () {
      go(i);
      auto();
    });
  });
  track.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      go(cur + (e.key === "ArrowLeft" ? -1 : 1));
      auto();
    }
  });
  // keep `cur` in sync when the user swipes
  var st = 0;
  track.addEventListener(
    "scroll",
    function () {
      clearTimeout(st);
      st = setTimeout(function () {
        var i = Math.round(track.scrollLeft / track.clientWidth);
        if (i !== cur && i >= 0 && i < n) {
          cur = i;
          mark();
          auto();
        }
      }, 80);
    },
    { passive: true },
  );
  ["mouseenter", "focusin", "touchstart"].forEach(function (t) {
    root.addEventListener(
      t,
      function () {
        paused = true;
        clearInterval(timer);
      },
      { passive: true },
    );
  });
  ["mouseleave", "focusout"].forEach(function (t) {
    root.addEventListener(t, function () {
      paused = false;
      auto();
    });
  });
  // start on the next upcoming event
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  var first = EVENTS.findIndex(function (ev) {
    return ev.dates[ev.dates.length - 1] >= today;
  });
  go(first < 0 ? 0 : first, false);
  window.addEventListener("resize", function () {
    go(cur, false);
  });
  auto();
}

function banner(el, t, withEvents) {
  el.innerHTML =
    '<div class="banner' +
    (withEvents ? " hero" : "") +
    '"><i class="cloud" style="top:24px"></i><i class="cloud" style="top:60px;animation-delay:-40s"></i><div class="in"><div class="txt"><div class="quran">' +
    QS +
    "</div><" +
    t +
    ' class="bt">Hidupkan kampus kita dengan Al-Quran.</' +
    t +
    '><p class="s">Gerakan menghidupkan Al-Quran di dewan kuliah, perpustakaan, asrama dan persahabatan kita.</p><a class="btn" href="#game">Main sekarang</a></div>' +
    (withEvents ? carousel() : "") +
    '</div><div class="city">' +
    city() +
    "</div></div>";
  if (withEvents) initCarousel(el.querySelector(".car"));
}
banner(document.getElementById("b1"), "h1", true);
banner(document.getElementById("b2"), "p");
(function () {
  var BONUS = 25;
  // storage: shared database when available, otherwise this device only
  var Store = (function () {
    var db = null,
      mode = "local",
      subs = { s: [], c: [] },
      L;
    try {
      L = JSON.parse(localStorage.getItem("rq_data"));
    } catch (e) {}
    L = L || { s: {}, c: [] };
    function sv() {
      try {
        localStorage.setItem("rq_data", JSON.stringify(L));
      } catch (e) {}
    }
    function emit() {
      Object.keys(L.s).length;
      subs.s.forEach(function (f) {
        f(
          Object.keys(L.s).map(function (k) {
            return Object.assign({ id: k }, L.s[k]);
          }),
        );
      });
      subs.c.forEach(function (f) {
        f(L.c.slice());
      });
    }
    var ready = (async function () {
      try {
        var cl = window.claude;
        if (cl && cl.use) {
          var d = await Promise.race([
            cl.use("db"),
            new Promise(function (r) {
              setTimeout(r, 6000, null);
            }),
          ]);
          if (d) {
            db = d;
            mode = "db";
            d.collection("scores")
              .orderBy("pts", "desc")
              .limit(100)
              .onSnapshot(function (sn) {
                subs.s.forEach(function (f) {
                  f(
                    sn.docs.map(function (x) {
                      return Object.assign({ id: x.id }, x.data());
                    }),
                  );
                });
              });
            d.collection("confessions")
              .orderBy("t", "desc")
              .limit(100)
              .onSnapshot(function (sn) {
                subs.c.forEach(function (f) {
                  f(
                    sn.docs.map(function (x) {
                      return x.data();
                    }),
                  );
                });
              });
          }
        }
      } catch (e) {}
      if (mode === "local") emit();
      return mode;
    })();
    return {
      ready: ready,
      onS: function (f) {
        subs.s.push(f);
      },
      onC: function (f) {
        subs.c.push(f);
      },
      get: async function (id) {
        if (db) {
          var r = await db.collection("scores").doc(id).get();
          return r.exists ? r.data() : null;
        }
        return L.s[id] || null;
      },
      put: async function (id, o) {
        if (db) await db.collection("scores").doc(id).set(o);
        else {
          L.s[id] = o;
          sv();
          emit();
        }
      },
      conf: async function (o) {
        if (db)
          await db
            .collection("confessions")
            .doc("c" + o.t + Math.random().toString(36).slice(2, 6))
            .set(o);
        else {
          L.c.unshift(o);
          L.c = L.c.slice(0, 100);
          sv();
          emit();
        }
      },
    };
  })();
  function me() {
    try {
      return JSON.parse(localStorage.getItem("rq_me"));
    } catch (e) {
      return null;
    }
  }
  var $ = function (id) {
    return document.getElementById(id);
  };
  // ranking
  Store.onS(function (a) {
    var m = me(),
      gl = $("glist");
    gl.textContent = "";
    a.sort(function (x, y) {
      return (
        (+y.pts || 0) + (+y.bonus || 0) - (+x.pts || 0) - (+x.bonus || 0)
      );
    });
    $("gstat").textContent = a.length
      ? ""
      : "Belum ada rekod. Jadi yang pertama!";
    a.slice(0, 50).forEach(function (v, i) {
      var li = document.createElement("li"),
        b = document.createElement("b"),
        n = document.createElement("span"),
        e = document.createElement("em");
      b.textContent = i + 1 + ".";
      n.textContent = String(v.name || "?").slice(0, 16);
      e.textContent = (+v.pts || 0) + (+v.bonus || 0) + " mata";
      if (v.bonus) {
        var sm = document.createElement("small");
        sm.textContent = " (+" + v.bonus + " kongsi)";
        e.appendChild(sm);
      }
      if (m && v.id === m.slug) li.className = "me";
      li.appendChild(b);
      li.appendChild(n);
      li.appendChild(e);
      gl.appendChild(li);
    });
  });
  Store.ready.then(function (md) {
    if (md === "local")
      $("gstat").textContent = $("gstat").textContent || "";
    $("gstat").dataset.m = md;
    // referral credit: #r-<slug>
    var h = location.hash.match(/^#r-([a-z0-9-]{3,24})$/),
      m = me();
    if (h && !(m && m.slug === h[1])) {
      var k = "rq_cr_" + h[1],
        done = false;
      try {
        done = localStorage.getItem(k);
      } catch (e) {}
      if (!done)
        Store.get(h[1])
          .then(function (d) {
            if (!d) return;
            try {
              localStorage.setItem(k, 1);
            } catch (e) {}
            d.bonus = (+d.bonus || 0) + BONUS;
            return Store.put(h[1], d);
          })
          .catch(function () {});
    }
  });
  // game
  var lastPts = 0,
    panel = $("gpanel");
  var c = document.getElementById("gc"),
    x = c.getContext("2d"),
    W = 180,
    H = 270,
    HZ = 70,
    PY = 232,
    FF = 60,
    LW = 52;
  x.imageSmoothingEnabled = false;
  var $ = function (id) {
      return document.getElementById(id);
    },
    ov = $("gov"),
    msg = $("gmsg"),
    btn = $("gbtn"),
    hs = $("gs"),
    hd = $("gd"),
    hb = $("gb");
  var PAL = {
    k: "#111",
    S: "#F2C29B",
    w: "#fff",
    y: "#FFD84A",
    Y: "#FFF6C8",
  };
  var P = [
      "..kkkk..",
      ".kkkkkk.",
      ".kkkkkk.",
      "..SSSS..",
      "..wwww..",
      ".wwwwww.",
      "wwwwwwww",
      "wwwwwwww",
      ".wwwwww.",
      ".wwwwww.",
    ],
    LG = [".kk..kk.", "..kkkk.."],
    RL = ["..kkkk..", ".wwwwww.", "wwwwwwww", ".wwwwww."];
  var STAR = [
      "...y...",
      "..yYy..",
      ".yyYyy.",
      "yYYYYYy",
      ".yyYyy.",
      "..yYy..",
      "...y...",
    ],
    MOON = ["..YYY.", "YYY...", "YY....", "YY....", "YYY...", "..YYY."];
  var SK = [
    [0, 12, 10],
    [12, 10, 18],
    [22, 12, 8],
    [34, 8, 24],
    [42, 12, 12],
    [54, 10, 20],
    [64, 12, 9],
    [76, 8, 15],
    [84, 14, 11],
    [134, 10, 16],
    [144, 12, 10],
    [156, 10, 22],
    [166, 14, 12],
  ];
  function spr(a, px, py, p) {
    p = Math.max(1, Math.round(p));
    for (var r = 0; r < a.length; r++)
      for (var q = 0; q < a[r].length; q++) {
        var ch = a[r][q];
        if (ch !== ".") {
          x.fillStyle = PAL[ch];
          x.fillRect(
            Math.round(px + q * p),
            Math.round(py + r * p),
            p,
            p,
          );
        }
      }
  }
  function R(a, b, w, h, col) {
    x.fillStyle = col;
    x.fillRect(
      Math.round(a),
      Math.round(b),
      Math.max(1, Math.round(w)),
      Math.max(1, Math.round(h)),
    );
  }
  var bs = [];
  for (var i = 0; i < 14; i++)
    bs.push({
      x: Math.random() * W,
      y: Math.random() * 60,
      s: Math.random() < 0.3 ? 3 : 2,
    });
  var st = "idle",
    lx,
    tl,
    jh,
    vy,
    roll,
    items,
    speed,
    dist,
    score,
    gap,
    t = 0,
    best = 0,
    unlocked = false,
    raf = 0,
    last = 0,
    vis = true;
  try {
    best = +localStorage.getItem("rq_best2") || 0;
  } catch (e) {}
  hb.textContent = best;
  function reset() {
    lx = 1;
    tl = 1;
    jh = 0;
    vy = 0;
    roll = 0;
    items = [];
    speed = 3;
    dist = 0;
    score = 0;
    gap = 60;
    hs.textContent = 0;
    hd.textContent = "0m";
  }
  reset();
  function key(a) {
    if (a === "L") tl = Math.max(0, tl - 1);
    else if (a === "R") tl = Math.min(2, tl + 1);
    else if (a === "U") {
      if (jh < 0.5) {
        vy = 5.2;
        roll = 0;
      }
    } else if (a === "D") {
      if (jh > 0.5) vy = -8;
      else roll = 28;
    }
  }
  function row() {
    var ty = [],
      fr = [],
      i;
    for (i = 0; i < 3; i++) {
      var r = Math.random();
      ty[i] =
        r < 0.25
          ? 0
          : r < 0.45
            ? "l"
            : r < 0.65
              ? "h"
              : r < 0.88
                ? "t"
                : 0;
    }
    if (
      ty.every(function (v) {
        return v === "t";
      })
    )
      ty[Math.floor(Math.random() * 3)] = 0;
    for (i = 0; i < 3; i++) {
      if (ty[i]) {
        items.push({ k: ty[i], l: i, z: 300, n: ty[i] === "t" ? 14 : 6 });
        if (ty[i] === "l" && Math.random() < 0.6)
          items.push({ k: "c", l: i, z: 300, e: 22 });
      } else fr.push(i);
    }
    if (fr.length && Math.random() < 0.75) {
      var L = fr[Math.floor(Math.random() * fr.length)];
      for (i = 0; i < 4; i++)
        items.push({ k: "c", l: L, z: 340 + i * 14 });
    }
  }
  function upd(dt) {
    t += dt;
    speed = Math.min(7.5, speed + 0.0012 * dt);
    dist += speed * dt * 0.1;
    lx += (tl - lx) * Math.min(1, 0.28 * dt);
    if (jh > 0 || vy > 0) {
      jh += vy * dt;
      vy -= 0.45 * dt;
      if (jh <= 0) {
        jh = 0;
        vy = 0;
      }
    }
    if (roll > 0) roll -= dt;
    gap -= speed * dt;
    if (gap <= 0) {
      row();
      gap = 110 + speed * 14 + Math.random() * 50;
    }
    for (var i = items.length - 1; i >= 0; i--) {
      var o = items[i];
      o.z -= speed * dt;
      if (o.z < -40) {
        items.splice(i, 1);
        continue;
      }
      if (Math.abs(lx - o.l) > (o.k === "c" ? 0.5 : 0.55)) continue;
      if (o.k === "c") {
        if (Math.abs(o.z) < 8 && (o.e ? jh > 8 : jh < 14)) {
          items.splice(i, 1);
          score++;
          hs.textContent = score;
        }
      } else if (
        o.z < 6 &&
        o.z + o.n > -6 &&
        (o.k === "t" ||
          (o.k === "l" && jh < 13) ||
          (o.k === "h" && roll <= 0))
      ) {
        over();
        return;
      }
    }
    hd.textContent = Math.floor(dist) + "m";
  }
  function over() {
    st = "over";
    lastPts = score * 10 + Math.floor(dist);
    if (lastPts > best) {
      best = lastPts;
      hb.textContent = best;
      try {
        localStorage.setItem("rq_best2", best);
      } catch (e) {}
    }
    msg.innerHTML =
      "Terlanggar!<br>Nur: " +
      score +
      " &nbsp; Jarak: " +
      Math.floor(dist) +
      "m<br>Mata: " +
      lastPts;
    btn.hidden = false;
    btn.textContent = "Cuba lagi";
    ov.hidden = false;
    $("gpts").textContent = lastPts;
    panel.hidden = false;
    $("gnote").textContent = "";
    $("gsv").disabled = false;
    $("gsv").textContent = "Simpan rekod";
  }
  function D(it) {
    var s = FF / (FF + it.z);
    if (s > 1.7) return;
    var yy = HZ + (PY - HZ) * s,
      cx = 90 + (it.l - 1) * LW * s,
      k = it.k;
    if (k === "c") {
      var p = 2 * s;
      spr(STAR, cx - 3.5 * p, yy - (9 + (it.e || 0)) * s - 3.5 * p, p);
    } else if (k === "l") {
      R(cx - 20 * s, yy - 14 * s, 40 * s, 14 * s, "#FF4D6D");
      R(cx - 20 * s, yy - 9 * s, 40 * s, 4 * s, "#fff");
    } else if (k === "h") {
      R(cx - 20 * s, yy - 28 * s, 4 * s, 28 * s, "#ddd");
      R(cx + 16 * s, yy - 28 * s, 4 * s, 28 * s, "#ddd");
      R(cx - 20 * s, yy - 28 * s, 40 * s, 12 * s, "#FFD84A");
      R(cx - 20 * s, yy - 24 * s, 40 * s, 4 * s, "#111");
    } else {
      R(cx - 22 * s, yy - 44 * s, 44 * s, 44 * s, "#8FC9A9");
      R(cx - 22 * s, yy - 44 * s, 44 * s, 5 * s, "#fff");
      R(cx - 16 * s, yy - 35 * s, 12 * s, 12 * s, "#111");
      R(cx + 4 * s, yy - 35 * s, 12 * s, 12 * s, "#111");
      R(cx - 4 * s, yy - 12 * s, 8 * s, 5 * s, "#FFD84A");
    }
  }
  function player() {
    var px = 90 + (lx - 1) * LW,
      fy = PY - jh;
    R(px - 8, PY, 16, 3, "rgba(0,0,0,.35)");
    if (roll > 0 && jh < 1) spr(RL, px - 8, PY - 8, 2);
    else {
      spr(P, px - 8, fy - 22, 2);
      spr(
        [jh > 1 ? LG[1] : LG[Math.abs(Math.floor(t / 5)) % 2]],
        px - 8,
        fy - 2,
        2,
      );
    }
  }
  function draw() {
    R(0, 0, W, HZ, "#8FD0FF");
    R(0, 40, W, 30, "#B4E1FF");
    R(0, 58, W, 12, "#D8F1FF");
    bs.forEach(function (b) {
      R(
        b.x,
        b.y,
        b.s,
        b.s,
        Math.floor(t / 25 + b.x) % 3
          ? "rgba(255,255,255,.6)"
          : "rgba(255,255,255,.15)",
      );
    });
    R(150, 10, 12, 12, "#FFD84A");
    SK.forEach(function (a) {
      R(a[0], HZ - a[2], a[1], a[2], "#8FB5D9");
    });
    R(104, HZ - 44, 14, 44, "#8FB5D9");
    R(102, HZ - 48, 18, 4, "#8FB5D9");
    R(108, HZ - 56, 6, 8, "#8FB5D9");
    R(108, HZ - 38, 6, 6, "#FFD84A");
    R(122, HZ - 20, 18, 20, "#8FB5D9");
    for (var y = HZ; y < H; y += 2) {
      var s = (y + 1 - HZ) / (PY - HZ),
        z = FF / s - FF,
        b = Math.floor((z + dist * 10) / 18) & 1,
        hw = 78 * s,
        we = Math.max(1, Math.round(3 * s)),
        lw = Math.max(1, Math.round(2 * s));
      R(0, y, W, 2, b ? "#79C48B" : "#8ED09E");
      R(90 - hw, y, hw * 2, 2, b ? "#B9C0D2" : "#AEB6CA");
      R(90 - hw, y, we, 2, "#fff");
      R(90 + hw - we, y, we, 2, "#fff");
      if (b) {
        R(90 - 26 * s - lw / 2, y, lw, 2, "#fff");
        R(90 + 26 * s - lw / 2, y, lw, 2, "#fff");
      }
    }
    items.sort(function (a, b) {
      return b.z - a.z;
    });
    var pd = false;
    items.forEach(function (it) {
      if (!pd && it.z <= 0) {
        player();
        pd = true;
      }
      D(it);
    });
    if (!pd) player();
  }
  function frame(ts) {
    raf = 0;
    // rAF timestamps can be slightly earlier than performance.now() taken in go(),
    // so clamp to avoid a negative dt (which made `t` negative and broke sprites)
    var dt = Math.max(0, Math.min(2.5, (ts - last) / 16.67 || 1));
    last = ts;
    if (st === "run" && vis) upd(dt);
    draw();
    if (st === "run" && vis) raf = requestAnimationFrame(frame);
  }
  function go() {
    if (!raf) {
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
  }
  function start() {
    if (st === "run") return;
    panel.hidden = true;
    reset();
    st = "run";
    ov.hidden = true;
    go();
  }
  // overlay / "Mula main" / "Cuba lagi" – start from idle or after game over
  ov.addEventListener("click", function () {
    if (st !== "run") start();
  });
  var sx = 0,
    sy = 0,
    sd = false;
  c.addEventListener("pointerdown", function (e) {
    e.preventDefault();
    sx = e.clientX;
    sy = e.clientY;
    sd = true;
    try {
      c.setPointerCapture(e.pointerId);
    } catch (_) {}
  });
  c.addEventListener("pointermove", function (e) {
    if (!sd) return;
    var dx = e.clientX - sx,
      dy = e.clientY - sy;
    if (Math.abs(dx) > 22 || Math.abs(dy) > 22) {
      sd = false;
      if (st !== "run") {
        start();
        return;
      }
      key(
        Math.abs(dx) > Math.abs(dy)
          ? dx < 0
            ? "L"
            : "R"
          : dy < 0
            ? "U"
            : "D",
      );
    }
  });
  c.addEventListener("pointerup", function () {
    if (sd) {
      sd = false;
      if (st !== "run") start();
      else key("U");
    }
  });
  c.addEventListener("pointercancel", function () {
    sd = false;
  });
  document.querySelectorAll(".pad button").forEach(function (b) {
    b.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      if (st !== "run") start();
      else key(b.dataset.k);
    });
  });

  var mm = me();
  if (mm) $("gname").value = mm.name || "";
  function showShare(m) {
    var u = location.href.split("#")[0] + "#r-" + m.slug;
    $("glink").value = u;
    $("gshare").hidden = false;
  }
  $("gsv").addEventListener("click", async function () {
    var n = ($("gname").value || "").trim().slice(0, 16),
      note = $("gnote");
    if (!n) {
      note.textContent = "Masukkan nama anda dahulu.";
      return;
    }
    $("gsv").disabled = true;
    try {
      var m = me() || {
        slug:
          (n.toLowerCase().replace(/[^a-z0-9]+/g, "") || "pemain").slice(
            0,
            10,
          ) +
          "-" +
          Math.random().toString(36).slice(2, 6),
      };
      m.name = n;
      try {
        localStorage.setItem("rq_me", JSON.stringify(m));
      } catch (e) {}
      var o = (await Store.get(m.slug)) || { pts: 0, bonus: 0 };
      if (lastPts > (+o.pts || 0)) o.pts = lastPts;
      o.name = n;
      o.bonus = +o.bonus || 0;
      o.t = Date.now();
      await Store.put(m.slug, o);
      note.textContent =
        "Rekod disimpan! Lihat kedudukan anda di Ranking." +
        ((await Store.ready) === "local"
          ? " (Disimpan pada peranti ini sahaja.)"
          : "");
      $("gsv").textContent = "Disimpan";
      showShare(m);
    } catch (e) {
      $("gsv").disabled = false;
      note.textContent = "Gagal simpan. Cuba lagi.";
    }
  });
  $("gshb").addEventListener("click", async function () {
    var u = $("glink").value,
      note = $("gnote"),
      t = "Jom main game Re:Quran dan kumpul Nur Petunjuk!";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Re:Quran", text: t, url: u });
        return;
      }
    } catch (e) {
      if (e && e.name === "AbortError") return;
    }
    try {
      await navigator.clipboard.writeText(u);
      note.textContent = "Pautan disalin. Kongsi kepada kawan anda!";
    } catch (e) {
      $("glink").select();
      note.textContent =
        "Salin pautan di atas dan kongsi kepada kawan anda.";
    }
  });
  var KM = {
    ArrowLeft: "L",
    KeyA: "L",
    ArrowRight: "R",
    KeyD: "R",
    ArrowUp: "U",
    KeyW: "U",
    Space: "U",
    ArrowDown: "D",
    KeyS: "D",
  };
  window.addEventListener("keydown", function (e) {
    if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
    var m = KM[e.code];
    if (m && vis) {
      e.preventDefault();
      if (st === "run") key(m);
      else start();
    }
  });
  if ("IntersectionObserver" in window)
    new IntersectionObserver(
      function (en) {
        vis = en[0].isIntersecting;
        if (vis && st === "run") go();
      },
      { threshold: 0.5 },
    ).observe(c);
  draw();
  // confession
  Store.onC(function (a) {
    var l = $("clist");
    l.textContent = "";
    if (!a.length) {
      var e = document.createElement("div");
      e.className = "cf e";
      e.textContent = "Belum ada confession. Jadi yang pertama!";
      l.appendChild(e);
      return;
    }
    a.forEach(function (v) {
      var d = document.createElement("div"),
        b = document.createElement("b"),
        s = document.createElement("small"),
        p = document.createElement("p");
      d.className = "cf";
      b.textContent = String(v.name || "Anonymous").slice(0, 20);
      s.textContent = new Date(v.t).toLocaleDateString("ms-MY", {
        day: "numeric",
        month: "short",
      });
      p.textContent = String(v.msg || "").slice(0, 280);
      d.appendChild(b);
      d.appendChild(s);
      d.appendChild(p);
      l.appendChild(d);
    });
  });
  $("cform").addEventListener("submit", function (e) {
    e.preventDefault();
    var n = $("cname").value.trim().slice(0, 20),
      m = $("cmsg").value.trim().slice(0, 280);
    if (!n || !m) return;
    Store.conf({ name: n, msg: m, t: Date.now() })
      .then(function () {
        $("cmsg").value = "";
        $("clist").scrollTop = 0;
      })
      .catch(function () {});
  });
})();
