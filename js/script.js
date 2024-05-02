/**
 * If in debug mode.
 */
const isDebug = true;

/**
 * The buffer of uncomputed expression.
 */
let buffer = [0];

/**
 * Dos the number already includes a dot?
 */
let hasDot = false;

// Belows are handlers of key pressed.
/**
 * Clear the buffer and currValue, then update the screen.
 */
const acOp = (e) => {
    dbg(e);
    buffer = [0];
    updateScreen();
};
const npOp = (e) => {
    dbg(e);
};
const percentageOp = (e) => {
    dbg(e);
};
const divideOp = (e) => {
    dbg(e);
};
const mutiplyOp = (e) => {
    dbg(e);
};
const substractOp = (e) => {
    dbg(e);
};
const addOp = (e) => {
    dbg(e);
};
const equleOp = (e) => {
    dbg(e);
};
/**
 * Set hasDot to true.
 */
const dotOp = (e) => {
    dbg(e);
    if (hasDot) {
        return;
    }
    hasDot = true;
};
const numberOp = (e) => {
    dbg(e);
};

/**
 * Do things in debug mode.
 * @param {Event} e DOM event.
 */
const dbg = (e) => {
    if (isDebug) {
        console.log(e.target.textContent);
    }
}

/**
 * The map of keys.
 * Key : { name : properties }
 * Properties: { displayname, category, handler }
 */
const keyDic = {
    c: {displayName: "C", category: "special", handler: acOp},
    np: {displayName: "+/-", category: "special", handler: npOp},
    percentage: {displayName: "%", category: "special", handler: percentageOp},
    divide: {displayName: "/", category: "operator", handler: divideOp},
    mutiply: {displayName: "*", category: "operator", handler: mutiplyOp},
    substract: {displayName: "-", category: "operator", handler: substractOp},
    add: {displayName: "+", category: "operator", handler: addOp},
    equle: {displayName: "=", category: "operator", handler: equleOp},
    dot: {displayName: ".", category: "number", handler: dotOp},
    one: {displayName: "1", category: "number", handler: numberOp},
    two: {displayName: "2", category: "number", handler: numberOp},
    three: {displayName: "3", category: "number", handler: numberOp},
    four: {displayName: "4", category: "number", handler: numberOp},
    five: {displayName: "5", category: "number", handler: numberOp},
    six: {displayName: "6", category: "number", handler: numberOp},
    seven: {displayName: "7", category: "number", handler: numberOp},
    eight: {displayName: "8", category: "number", handler: numberOp},
    nine: {displayName: "9", category: "number", handler: numberOp},
    zero: {displayName: "0", category: "number", handler: numberOp},
}

/**
 * Create the UI of calculator.
 */
const createCalculator = () => {
    const frame = document.querySelector(".frame");
    frame.appendChild(screen()); // create the LCD screen.
    // create the keys by rows.
    frame.appendChild(
        row("c", "np", "percentage", "divide")
    );
    frame.appendChild(
        row("seven", "eight", "nine", "mutiply")
    );
    frame.appendChild(
        row("four", "five", "six", "substract")
    );
    frame.appendChild(
        row("one", "two", "three", "add")
    );
    frame.appendChild(
        row("zero", "dot", "equle")
    );
    updateScreen();
}

/**
 * Create the UI of screen.
 * @returns {HTMLElement} The HTML of screen.
 */
const screen = () => {
    const row = document.createElement("div");
    row.classList.add("row");
    const screen = document.createElement("div");
    screen.classList.add("screen");
    row.appendChild(screen);
    return row;
}

/**
 * Create a row of keys.
 * @param  {...String} children The name of keys.
 * @returns {HTMLElement} The HTML of a row of keys.
 */
const row = (...children) => {
    const dom = document.createElement("div");
    dom.classList.add("row");
    children.forEach(child => dom.appendChild(key(child)));
    return dom;
}

/**
 * Create a key by name and properties in keyDic.
 * @param {String} sKey The name of key.
 * @returns {HTMLElement} The HTML of a key.
 */
const key = (sKey) => {
    const dom = document.createElement("div");
    dom.id = sKey;
    dom.textContent = keyDic[sKey].displayName;
    dom.classList.add("button");
    dom.classList.add(keyDic[sKey].category);
    dom.addEventListener("click", keyDic[sKey].handler);
    return dom;
}

/**
 * Update the screen by the lasest value in buffer.
 */
const updateScreen = () => {
    const screen = document.querySelector(".screen");
    screen.textContent = buffer[buffer.length - 1];
}

createCalculator();
