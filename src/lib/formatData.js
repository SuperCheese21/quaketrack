import moment from 'moment';

export function formatTime(time) {
    return moment.utc(time).format("YYYY-MM-DD HH:mm:ss") + " UTC";
}

export function formatMagnitude(mag) {
    mag = precisionRound(mag, 1);

    return checkZeros(mag);
}

export function checkZeros(n) {
    if (n - Math.round(n) === 0) {
        return n + '.0';
    }

    return n;
}

function precisionRound(number, precision) {
    const factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}
