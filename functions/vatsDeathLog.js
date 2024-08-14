var vatsDeaths = [];
var isVatsDeathsOn = Boolean;

const checkDeath = (name) => {
    return vatsDeaths.includes(name);
};

const addDeath = (name) => {
    vatsDeaths.push(name);
}

const removeDeath = (name) => {
    vatsDeaths.pop(name);
}

const clearDeaths = () => {
    vatsDeaths = [];
}

const readDeaths = () => {
    return vatsDeaths;
}

const checkVatsJailStatus = () => {
    if (isVatsDeathsOn === Boolean) {
        isVatsDeathsOn = false;
        return isVatsDeathsOn;
    } else {
        return isVatsDeathsOn;
    }
}

const turnVatsJailOn = () => {
    isVatsDeathsOn = true;
    clearDeaths();
}

const turnVatsJailOff = () => {
    isVatsDeathsOn = false;
}

module.exports = {
    checkDeath,
    addDeath,
    removeDeath,
    clearDeaths,
    readDeaths,
    checkVatsJailStatus,
    turnVatsJailOn,
    turnVatsJailOff
};