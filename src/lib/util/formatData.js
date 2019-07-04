import moment from 'moment';

/**
 * [formatTime description]
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function formatTime(time) {
  return moment.utc(time).format('YYYY-MM-DD HH:mm:ss') + ' UTC';
}

/**
 * [formatMagnitude description]
 * @param  {[type]} mag       [description]
 * @param  {[type]} precision [description]
 * @return {[type]}           [description]
 */
export function formatMagnitude(mag, precision) {
  const formattedMag = _precisionRound(mag, precision);
  return _checkZeros(formattedMag);
}

/**
 * [checkZeros description]
 * @param  {[type]} n [description]
 * @return {[type]}   [description]
 */
function _checkZeros(n) {
  if (n - Math.round(n) === 0) {
    return n + '.0';
  }
  return n;
}

/**
 * [_precisionRound description]
 * @param       {[type]} number    [description]
 * @param       {[type]} precision [description]
 * @return      {[type]}           [description]
 */
function _precisionRound(number, precision) {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
