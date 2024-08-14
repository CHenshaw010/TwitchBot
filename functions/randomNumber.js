const random = (highEnd = 100, lowEnd = 1) => {
    return Math.floor(Math.random() * highEnd + lowEnd);
};

// Returns a random number between min (inclusive) and max (exclusive) and round it to two decimals
// Using Math.round() will give you a non-uniform distribution!
const randomInclusive = (max, min) => {
    price = Math.random() * (max - min) + min;
    fixedPrice = Math.round(price * 100) / 100;
    return fixedPrice;
}

module.exports = {
    random,
    randomInclusive
};