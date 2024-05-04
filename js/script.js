/**
 * The current value that displayed on the screen.
 */
let currValue = "0";

/**
 * The flag is used to track whether the current value is a cached value.
 * When a user inputs a number followed by an operator, the entered number is also displayed.
 * When the user inputs another operator or equals sign, the displayed number will be used for computation.
 * If the user inputs another number after an operator, the previous number will be erased.
 */
let isCurrValueCache = false;

/**
 * The cached uncomputed expression.
 */
let unComputedExpression = [];

// Belows are handlers of key pressed.
/**
 * Key AC Pressed.
 */
const acOp = (e) => {
    isCurrValueCache = false;
    currValue = "0";
    unComputedExpression = [];
    updateScreen();
};
/**
 * Key +/- Pressed.
 */
const npOp = (e) => {
    isCurrValueCache = false;
    if (currValue === "0") {
        return;
    }
    if (currValue[0] === "-") {
        currValue = currValue.slice(1);
    } else {
        currValue = "-" + currValue;;
    }
    updateScreen();
};
/**
 * Key % Pressed.
 */
const percentageOp = (e) => {
    isCurrValueCache = false;
    let value = parseCurrValue() / 100;
    currValue = value.toString();
    updateScreen();
};
/**
 * Key . Pressed.
 */
const dotOp = (e) => {
    if (currValue.includes(".") || currValue.length >= 9) { // Ignore when there is a dot or data is too long.
        return;
    }
    currValue = currValue + ".";
};
//Key 0-9 Pressed.
const numberOp = (e) => {
    if (currValue.length >= 9) { // Ignore input to avoid overflow.
        return;
    }
    if (currValue === "0" || isCurrValueCache) {
        currValue = e.target.textContent;
    } else {
        currValue = currValue + e.target.textContent;
    }
    isCurrValueCache = false;
    updateScreen();
};
/**
 * Key / * + - Pressed.
 */
const operatorOp = (e) => {
    if (unComputedExpression.length >= 2) {
        equleOpExcuter();
    }
    let value = parseCurrValue();
    unComputedExpression.push(value);
    unComputedExpression.push(e.target.textContent);
    isCurrValueCache = true;
};
/**
 * Key = Pressed.
 */
const equleOp = (e) => {
    equleOpExcutor();
};

/**
 * Excute the expression.
 */
const equleOpExcutor = () => {
    isCurrValueCache = false;
    let value = parseCurrValue();
    unComputedExpression.push(value);
    executeExpression();
    updateScreen();
}

/**
 * Parse the value from currValue.
 * @returns The int or float value.
 */
const parseCurrValue = () => {
    if (currValue.includes(".") && currValue.charAt(currValue.length - 1) !== ".") {
        return parseFloat(currValue);
    }
    return parseInt(currValue);
}

/**
 * Compute the cached expression.
 */
const executeExpression = () => {
    if (unComputedExpression.length !== 3) {
        console.log("equle error.");
    }
    let res = 0;
    switch(unComputedExpression[1]) {
        case "+":
            res = unComputedExpression[0] + unComputedExpression[2];
            break;
        case "-":
            res = unComputedExpression[0] - unComputedExpression[2];
            break;
        case "*":
            res = unComputedExpression[0] * unComputedExpression[2];
            break;
        case "/":
            if (unComputedExpression[2] === 0) {
                res = "ERROR";
            } else {
                res = unComputedExpression[0] / unComputedExpression[2]; 
            }
            break;
        default:
            console.log("equle error.");
    }
    currValue = res.toString();
    unComputedExpression = [];
}

/**
 * Push the currValue to unComputedExpression.
 */
const pushNumberToExpression = () => {
    let value = parseCurrValue();
    unComputedExpression.push(value);
    isCurrValueCache = true;
}

/**
 * The map of keys.
 * Key : { name : properties }
 * Properties: { displayname, category, handler }
 */
const keyDic = {
    c: {displayName: "AC", category: "special", handler: acOp},
    np: {displayName: "+/-", category: "special", handler: npOp},
    percentage: {displayName: "%", category: "special", handler: percentageOp},
    divide: {displayName: "/", category: "operator", handler: operatorOp},
    multiply: {displayName: "*", category: "operator", handler: operatorOp},
    substract: {displayName: "-", category: "operator", handler: operatorOp},
    add: {displayName: "+", category: "operator", handler: operatorOp},
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
        row("seven", "eight", "nine", "multiply")
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
    if (currValue.length > 9 && currValue.includes(".") && currValue.charAt(currValue.length - 1) !== ".") {
        let length = currValue.split(".")[0].length + 1;
        currValue = parseFloat(currValue).toFixed(9 - length);
    }
    const screen = document.querySelector(".screen");
    screen.textContent = currValue;
}

createCalculator();
