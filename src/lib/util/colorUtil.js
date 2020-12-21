const calcRed = (val, low, high) => {
  const zeroLow = low + (1 * (high - low)) / 6;
  const zeroHigh = low + (high - low) / 2;
  const maxLow = low;
  const maxHigh = low + (2 * (high - low)) / 3;

  if (val >= zeroLow && val <= zeroHigh) {
    return 0;
  }
  if (val <= maxLow || val >= maxHigh) {
    return 255;
  }
  if (val > maxLow && val < zeroLow) {
    return ((zeroLow - val) / (zeroLow - maxLow)) * 255;
  }

  return Math.round(((val - zeroHigh) / (maxHigh - zeroHigh)) * 255);
};

const calcGreen = (val, low, high) => {
  const zeroLow = low + (1 * (high - low)) / 6;
  const zeroHigh = low + (5 * (high - low)) / 6;
  const maxLow = low + (1 * (high - low)) / 3;
  const maxHigh = low + (2 * (high - low)) / 3;

  if (val <= zeroLow || val >= zeroHigh) {
    return 0;
  }
  if (val >= maxLow && val <= maxHigh) {
    return 255;
  }
  if (val > maxHigh && val < zeroHigh) {
    return ((zeroHigh - val) / (zeroHigh - maxHigh)) * 255;
  }

  return Math.round(((val - zeroLow) / (maxLow - zeroLow)) * 255);
};

const calcBlue = (val, low, high) => {
  const zeroLow = low + (high - low) / 2;
  const zeroHigh = low + (5 * (high - low)) / 6;
  const maxLow = low + (high - low) / 3;
  const maxHigh = high;

  if (val >= zeroLow && val <= zeroHigh) {
    return 0;
  }
  if (val <= maxLow || val >= maxHigh) {
    return 255;
  }
  if (val > maxLow && val < zeroLow) {
    return ((zeroLow - val) / (zeroLow - maxLow)) * 255;
  }

  return Math.round(((val - zeroHigh) / (maxHigh - zeroHigh)) * 255);
};

export const formatRGB = ([red, green, blue]) => `rgb(${red},${green},${blue})`;

export const formatRGBA = ([red, green, blue], opacity) =>
  `rgba(${red},${green},${blue},${opacity})`;

export const getRGB = (val, low, high) => [
  calcRed(val, low, high),
  calcGreen(val, low, high),
  calcBlue(val, low, high),
];
