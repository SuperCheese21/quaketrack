import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { TIMESTAMP_FORMAT } from '../../config/constants';

dayjs.extend(utc);

const checkZeros = n => (n - Math.round(n) === 0 ? `${n}.0` : n);

const precisionRound = (number, precision) => {
  const factor = 10 ** precision;
  return Math.round(number * factor) / factor;
};

export const formatTime = time => dayjs.utc(time).format(TIMESTAMP_FORMAT);

export const formatMagnitude = (mag, precision) => {
  const formattedMag = precisionRound(mag, precision);
  return checkZeros(formattedMag);
};
