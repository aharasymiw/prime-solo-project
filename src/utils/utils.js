function round1(num) {
    return Math.round((num + Number.EPSILON) * 10) / 10;
}

function round2(num) {
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

function round3(num) {
    return Math.round((num + Number.EPSILON) * 1000) / 1000;
}

export { round1, round2, round3 };
