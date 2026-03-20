# Poster Canvas

A p5.js-based canvas for creating poster-sized artwork at **1080 x 1440 px** (3:4 ratio, ideal for print at 300 DPI = 3.6" x 4.8", or scaled for A-series paper).

## Quick Start

From the project root:

```bash
src/serve.sh canvas
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## Keyboard Shortcuts

| Key | Action                       |
|-----|------------------------------|
| `S` | Save canvas as `poster.png`  |
| `H` | Toggle keyboard shortcuts help panel |
| `I` | Toggle pixel/canvas info panel |
| `C` | Clear canvas (white)         |
| `B` | Clear canvas (black)         |
| `R` | Randomize background color   |

## Info Panel (bottom-right window corner)

The info panel is an HTML overlay fixed to the bottom-right of the browser window (not drawn on the canvas). It displays real-time properties as you move the mouse over the canvas:

| Property   | Description                                      |
|------------|--------------------------------------------------|
| Canvas     | Width and height in pixels                       |
| Mouse      | Current mouse X, Y coordinates                   |
| Pixel      | Clamped pixel coordinates (stays within canvas)  |
| RGB        | Red, green, blue values of the pixel under cursor |
| HEX        | Hexadecimal color code of the pixel              |
| Alpha      | Alpha/transparency value of the pixel            |
| Frame      | Current frame count and frames per second        |
| Density    | Pixel density multiplier (retina displays = 2x)  |

A color swatch bar at the top of the panel shows the sampled pixel color.

Both panels are HTML overlays positioned in the browser window corners — they never draw on the canvas, so saved images are always clean.

## Files

| File         | Purpose                                        |
|--------------|------------------------------------------------|
| `index.html` | HTML shell, loads p5.js + panels + sketch       |
| `sketch.js`  | p5.js sketch — your artwork goes here           |
| `panels.js`  | Help & info overlay panels (pure DOM, no p5)    |
| `style.css`  | Dark background, centered layout, panel styles  |
| `p5.min.js`  | p5.js library (local copy)                      |

## Adding Your Artwork

Edit the `draw()` function in `sketch.js` to create your poster. The help and info panels are separate HTML overlays, so your canvas stays clean and saved PNGs contain only your artwork.

Example — draw a grid of circles:

```js
function draw() {
    background(20);
    noStroke();
    for (let x = 60; x < width; x += 60) {
        for (let y = 60; y < height; y += 60) {
            fill(x / width * 255, y / height * 255, 150);
            circle(x, y, 30);
        }
    }

    _syncPanels();
}
```

## Canvas Properties

- **Dimensions:** 1080 x 1440 pixels (configurable via `POSTER_W` / `POSTER_H` in `sketch.js`)
- **Color mode:** RGB (0-255) by default; switch with `colorMode(HSB)` in `setup()`
- **Renderer:** P2D (default 2D canvas); switch to WEBGL in `createCanvas()` for 3D
- **Pixel density:** Matches device; override with `pixelDensity(1)` for exact pixel control
- **Output format:** PNG (via `save()`)
