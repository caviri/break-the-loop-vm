const Panels = (() => {
  let helpEl, infoEl, swatchEl;
  const fields = {};

  function init() {
    helpEl = _buildHelp();
    infoEl = _buildInfo();
    document.body.appendChild(helpEl);
    document.body.appendChild(infoEl);
  }

  function _buildHelp() {
    const shortcuts = [
      ["S", "Save as PNG"],
      ["H", "Toggle this help"],
      ["I", "Toggle info panel"],
      ["C", "Clear canvas (white)"],
      ["B", "Clear canvas (black)"],
      ["R", "Randomize background"],
    ];

    const el = document.createElement("div");
    el.id = "help-panel";
    el.innerHTML =
      "<strong>Keyboard Shortcuts</strong>" +
      shortcuts
        .map(([k, d]) => `<div class="shortcut"><span class="key">${k}</span>${d}</div>`)
        .join("");
    return el;
  }

  function _buildInfo() {
    const names = ["canvas", "mouse", "pixel", "rgb", "hex", "alpha", "frame", "density"];
    const el = document.createElement("div");
    el.id = "info-panel";

    swatchEl = document.createElement("div");
    swatchEl.id = "color-swatch";
    el.appendChild(swatchEl);

    for (const name of names) {
      const row = document.createElement("div");
      row.className = "info-row";
      row.textContent = name.charAt(0).toUpperCase() + name.slice(1) + ": ";
      const val = document.createElement("span");
      val.id = "info-" + name;
      row.appendChild(val);
      el.appendChild(row);
      fields[name] = val;
    }
    return el;
  }

  function update(data) {
    if (infoEl.style.display === "none") return;
    fields.canvas.textContent = data.canvasW + " \u00d7 " + data.canvasH + " px";
    fields.mouse.textContent = data.mouseX + ", " + data.mouseY;
    fields.pixel.textContent = data.pixelX + ", " + data.pixelY;
    fields.rgb.textContent = data.r + ", " + data.g + ", " + data.b;
    fields.hex.textContent = data.hex;
    fields.alpha.textContent = data.a;
    fields.frame.textContent = data.frame + "  FPS: " + data.fps;
    fields.density.textContent = data.density + "x";
    swatchEl.style.backgroundColor = "rgb(" + data.r + "," + data.g + "," + data.b + ")";
  }

  function toggleHelp() {
    helpEl.style.display = helpEl.style.display === "none" ? "" : "none";
  }

  function toggleInfo() {
    infoEl.style.display = infoEl.style.display === "none" ? "" : "none";
  }

  return { init, update, toggleHelp, toggleInfo };
})();
