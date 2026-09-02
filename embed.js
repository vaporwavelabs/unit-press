(function () {
  if (window.__unitPress >= 11) return;
  window.__unitPress = 11;
  var src = (document.currentScript && document.currentScript.src) || "";
  var B = src.replace(/embed\.js(\?.*)?$/, "");
  if (!B) B = "https://cdn.jsdelivr.net/gh/vaporwavelabs/unit-press@main/";
  var STUDIO = B;
  function ready(fn) {
    if (document.body) fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }
  ready(function () {
    var s = document.createElement("style");
    s.textContent =
      "#up-fab{position:fixed;left:16px;bottom:max(16px,env(safe-area-inset-bottom));z-index:2147483646;background:#2EC4B6;color:#06211e;border:0;border-radius:999px;padding:16px 20px;font:800 14px/1 Outfit,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;box-shadow:0 12px 32px rgba(0,0,0,.45);touch-action:manipulation}#up-ov{padding:0;border:0;width:100vw;height:100dvh;max-width:none;max-height:none;background:#08080a}#up-ov::backdrop{background:#000}#up-bar{height:48px;display:flex;align-items:center;justify-content:space-between;padding:0 12px;padding-top:env(safe-area-inset-top);background:#121215;color:#f3f1ec;font:600 13px Outfit,Arial,sans-serif;letter-spacing:.16em}#up-x{background:transparent;border:0;color:#f3f1ec;font-size:28px;width:44px;height:44px;cursor:pointer;line-height:1;touch-action:manipulation}#up-fr{width:100%;height:calc(100% - 48px - env(safe-area-inset-top));border:0;background:#08080a}@media(max-width:700px){#up-fab{left:auto;right:12px;bottom:max(18px,env(safe-area-inset-bottom));padding:14px 16px;font-size:12px}}";
    document.head.appendChild(s);

    var ov = document.getElementById("up-ov");
    if (!ov) {
      ov = document.createElement("dialog");
      ov.id = "up-ov";
      ov.innerHTML =
        '<div id="up-bar"><span>UNIT PRESS</span><button id="up-x" type="button" aria-label="Close">\u00d7</button></div>';
      var fr0 = document.createElement("iframe");
      fr0.id = "up-fr";
      fr0.title = "UNIT PRESS merch studio";
      fr0.allow = "clipboard-write";
      ov.appendChild(fr0);
      document.body.appendChild(ov);
    }
    var fr = document.getElementById("up-fr");
    var loaded = 0;
    function hideC(on) {
      document.querySelectorAll("iframe").forEach(function (f) {
        if (f.id === "up-fr") return;
        if (/consent|cookie|privacy/i.test((f.src || "") + (f.id || "")))
          f.style.setProperty("visibility", on ? "hidden" : "visible", "important");
      });
    }
    function openStudio(ev) {
      if (ev) ev.preventDefault();
      try { ov.showModal(); } catch (e) {
        ov.setAttribute("open", "");
        ov.style.display = "block";
      }
      hideC(true);
      if (loaded) return;
      loaded = 1;
      fetch(STUDIO + "studio.html")
        .then(function (r) { return r.text(); })
        .then(function (t) {
          if (!t || t.indexOf("<PLACEHOLDER>") !== -1 || t.length < 500) {
            t = "";
          }
          t = t
            .replace('const CDN="";', 'const CDN="' + STUDIO + '";')
            .replace('src="icu-sunset.png"', 'src="' + STUDIO + 'icu-sunset.png"')
            .replace('alt="print graphic"', 'alt=""')
            .replace('value="ICU"', 'value=""')
            .replace('value="INTENSIVE CARE UNIT"', 'value=""')
            .replace('value="STAY CALM. INTERVENE."', 'value=""')
            .replace('value="SAVE LIVES."', 'value=""');
          t = t.replace(
            "</style>",
            ".gimg img:not([src]),.gimg img[src=''],.gimg img.broken{display:none!important;width:0!important;height:0!important}#handle{opacity:0!important}.gimg:hover #handle,.gimg.dragging #handle{opacity:1!important}.star,#star{display:none!important}</style>"
          );
          if (!t || t.length < 500) {
            fr.src = STUDIO + "index.html";
            return;
          }
          fr.src = URL.createObjectURL(new Blob([t], { type: "text/html" }));
        })
        .catch(function () {
          fr.src = STUDIO + "index.html";
        });
    }
    function closeStudio() {
      try { ov.close(); } catch (e) {}
      ov.style.display = "none";
      hideC(false);
    }
    var x = document.getElementById("up-x");
    if (x) x.onclick = closeStudio;

    function isDesignBtn(el) {
      if (!el || el.id === "up-fab" || el.id === "up-x") return false;
      var t = (el.textContent || "").replace(/\s+/g, " ").trim();
      return /design your shirt/i.test(t);
    }
    document.querySelectorAll("a,button,[role=button]").forEach(function (el) {
      if (isDesignBtn(el)) el.addEventListener("click", openStudio);
    });
    if (!document.getElementById("up-fab")) {
      var b = document.createElement("button");
      b.id = "up-fab";
      b.type = "button";
      b.textContent = "Design your shirt";
      b.addEventListener("click", openStudio);
      document.body.appendChild(b);
    }
  });
})();
