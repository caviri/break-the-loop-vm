# Generative Poster Generator

A web-based poster generator that creates A3-sized generative compositions with animated balls that can be printed to PDF.

## Features

- **A3 Poster Dimensions**: Properly sized for A3 paper (297mm x 420mm)
- **Generative Composition**: Randomly generated balls with different colors, sizes, and positions
- **Print to PDF**: Uses browser's print function to save as PDF
- **Print Media Queries**: Hides interface elements when printing
- **Responsive Design**: Works on different screen sizes

## How to Use

1. Open `index.html` in a web browser
2. Click "Regenerate Composition" to create a new generative design
3. Click "Print to PDF" to open the browser's print dialog
4. Select "Save as PDF" as the destination
5. The interface will be hidden and only the poster will be printed

## Technical Details

- **Canvas Size**: 842px × 1191px (A3 at 72 DPI)
- **Generative Elements**: 10-24 randomly positioned balls with:
  - Random colors from a curated palette
  - Random sizes (10-50px radius)
  - Random opacity (0.3-1.0)
  - Pulsing animation effects
- **Print Optimization**: CSS print media queries ensure clean PDF output

## Files

- `index.html` - Main HTML structure
- `style.css` - Styling and print media queries
- `script.js` - Generative composition logic and print functionality
