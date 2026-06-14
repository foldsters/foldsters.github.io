// Brand palette (Foldster's Projects)
// Derived via som-palette/Palettope graph mode from a source image.
// Two color families bridged through a sparse sage:
//   - Cool teals (deep-tidewater → fog-shore)
//   - Warm creams (vellum → corn-silk)

export const brandPalette = {
  // Teal family — primary brand signals
  "color-deep-tidewater": "#2c3d42", // deepest, near-black teal
  "color-storm-tide":     "#406877",
  "color-tidal-mist":     "#487d90",
  "color-shallow-tide":   "#5696b1",
  "color-mist-shore":     "#6c9ba9",
  "color-fog-shore":      "#86b2bc", // lightest teal entry

  // Cream/yellow family — warm side, leads the cards
  "color-vellum":         "#fef9d9",
  "color-parchment":      "#fef5d2",
  "color-linen":          "#fef1cd",
  "color-pale-honey":     "#fdf3d0",
  "color-corn-silk":      "#feeac3",
  "color-near-vellum":    "#dde3cd", // edge of the cream cluster

  // Sage bridge — used sparingly
  "color-sea-foam":       "#c1d5cb",
};

export const colors = { ...brandPalette };
