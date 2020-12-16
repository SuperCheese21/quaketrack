/**
 * [formatRGB description]
 * @param  {[type]} rgb [description]
 * @return {[type]}     [description]
 */
export function formatRGB(rgb) {
  return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

/**
 * [formatRGBA description]
 * @param  {[type]} rgb     [description]
 * @param  {[type]} opacity [description]
 * @return {[type]}         [description]
 */
export function formatRGBA(rgb, opacity) {
  return 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + opacity + ')';
}

/**
 * [getRGB description]
 * @param  {[type]} val  [description]
 * @param  {[type]} low  [description]
 * @param  {[type]} high [description]
 * @return {[type]}      [description]
 */
export function getRGB(val, low, high) {
  return [
    _calcRed(val, low, high),
    _calcGreen(val, low, high),
    _calcBlue(val, low, high),
  ];
}

/**
 * [_calcRed description]
 * @param       {[type]} val  [description]
 * @param       {[type]} low  [description]
 * @param       {[type]} high [description]
 * @return      {[type]}      [description]
 */
function _calcRed(val, low, high) {
  const zeroLow = low + (1 * (high - low)) / 6;
  const zeroHigh = low + (high - low) / 2;
  const maxLow = low;
  const maxHigh = low + (2 * (high - low)) / 3;

  if (val >= zeroLow && val <= zeroHigh) {
    return 0;
  } else if (val <= maxLow || val >= maxHigh) {
    return 255;
  } else if (val > maxLow && val < zeroLow) {
    return ((zeroLow - val) / (zeroLow - maxLow)) * 255;
  }

  return Math.round(((val - zeroHigh) / (maxHigh - zeroHigh)) * 255);
}

/**
 * [_calcGreen description]
 * @param       {[type]} val  [description]
 * @param       {[type]} low  [description]
 * @param       {[type]} high [description]
 * @return      {[type]}      [description]
 */
function _calcGreen(val, low, high) {
  const zeroLow = low + (1 * (high - low)) / 6;
  const zeroHigh = low + (5 * (high - low)) / 6;
  const maxLow = low + (1 * (high - low)) / 3;
  const maxHigh = low + (2 * (high - low)) / 3;

  if (val <= zeroLow || val >= zeroHigh) {
    return 0;
  } else if (val >= maxLow && val <= maxHigh) {
    return 255;
  } else if (val > maxHigh && val < zeroHigh) {
    return ((zeroHigh - val) / (zeroHigh - maxHigh)) * 255;
  }

  return Math.round(((val - zeroLow) / (maxLow - zeroLow)) * 255);
}

/**
 * [_calcBlue description]
 * @param       {[type]} val  [description]
 * @param       {[type]} low  [description]
 * @param       {[type]} high [description]
 * @return      {[type]}      [description]
 */
function _calcBlue(val, low, high) {
  const zeroLow = low + (high - low) / 2;
  const zeroHigh = low + (5 * (high - low)) / 6;
  const maxLow = low + (high - low) / 3;
  const maxHigh = high;

  if (val >= zeroLow && val <= zeroHigh) {
    return 0;
  } else if (val <= maxLow || val >= maxHigh) {
    return 255;
  } else if (val > maxLow && val < zeroLow) {
    return ((zeroLow - val) / (zeroLow - maxLow)) * 255;
  }

  return Math.round(((val - zeroHigh) / (maxHigh - zeroHigh)) * 255);
}
