function getColor(val, low, high) {
    return 'rgb('
        + calcRed(val, low, high) + ','
        + calcGreen(val, low, high) + ','
        + calcBlue(val, low, high) + ')';
}

function calcRed(mag, low, high) {
    let zeroLow = low + 2 * (high - low) / 12;
    let zeroHigh = low + 6 * (high - low) / 12;
    let maxLow = low;
    let maxHigh = low + 8 * (high - low) / 12;

    if (mag >= zeroLow && mag <= zeroHigh) {
        return 0;
    }
    if (mag <= maxLow || mag >= maxHigh) {
        return 255;
    }
    if (mag > maxLow && mag < zeroLow) {
        return (zeroLow - mag) / (zeroLow - maxLow) * 255;
    }
    return (mag - zeroHigh) / (maxHigh - zeroHigh) * 255;
}

function calcGreen(mag, low, high) {
    let zeroLow = low + 2 * (high - low) / 12;
    let zeroHigh = low + 10 * (high - low) / 12;
    let maxLow = low + 4 * (high - low) / 12;
    let maxHigh = low + 8 * (high - low) / 12;

    if (mag <= zeroLow || mag >= zeroHigh) {
        return 0;
    }
    if (mag >= maxLow && mag <= maxHigh) {
        return 255;
    }
    if (mag > maxHigh && mag < zeroHigh) {
        return (zeroHigh - mag) / (zeroHigh - maxHigh) * 255;
    }
    return (mag - zeroLow) / (maxLow - zeroLow) * 255;
}

function calcBlue(mag, low, high) {
    let zeroLow = low + 6 * (high - low) / 12;
    let zeroHigh = low + 10 * (high - low) / 12;
    let maxLow = low + 4 * (high - low) / 12;
    let maxHigh = low + 12 * (high - low) / 12;

    if (mag >= zeroLow && mag <= zeroHigh) {
        return 0;
    }
    if (mag <= maxLow || mag >= maxHigh) {
        return 255;
    }
    if (mag > maxLow && mag < zeroLow) {
        return (zeroLow - mag) / (zeroLow - maxLow) * 255;
    }
    return (mag - zeroHigh) / (maxHigh - zeroHigh) * 255;
}

export default getColor;
