function add (a,b) {
    return +a + +b;
}

function subtract (a,b) {
    return +a - +b;
}

function multiply (a,b) {
    return +a * +b;
}

function divide (a,b) {
    return +a / +b;
}

function calculate (calculation) {
    switch (calculation.operator) {
        case 'add' : return add(calculation.currentValue,calculation.inputValue); break;
        case 'sub' : return subtract(calculation.currentValue,calculation.inputValue); break;
        case 'mul' : return multiply(calculation.currentValue,calculation.inputValue); break;
        case 'div' : return divide(calculation.currentValue,calculation.inputValue); break;
    }
}
function update(buttonPressed,calculation) {
    const isNumber = +buttonPressed >= 0;
    if (isNumber) {
        displayNumber(buttonPressed);
    } else if (buttonPressed === 'equ') {
        calculation.inputValue = displayValue;
        chainOperator='';
        initialiseInputs(calculation);
    } else if (buttonPressed === 'allClear') {
        allClear();
        return;
    } else if (buttonPressed === 'clear') {
        displayValue = 0;
        calculation.operator = '';
        return;
    } else {
        if (calculation.operator === '') {
            calculation.operator = buttonPressed;
            calculation.currentValue = displayValue;
            displayValue = 0;
            return;
        } else {
            chainOperator = buttonPressed;
            calculation.inputValue = displayValue;
            initialiseInputs(calculation);
        }
    }

}

function displayNumber (buttonPressed) {
    displayValue = chainCalc ? 0 : displayValue;
    if (displayValue == 0) {
        displayValue = buttonPressed;
        display.textContent = displayValue;
        currentDigits = displayValue.length;
    } else if(currentDigits < 10) {
        displayValue = `${displayValue}${buttonPressed}`;
        display.textContent = displayValue;
        currentDigits = displayValue.length;
    } 
    chainCalc = false;
}

function initialiseInputs (calculation) {
    if (calculation.inputValue == 0 && calculation.operator === 'div') {
        calculation.result = divideByZero(calculation);
    } else {
        calculation.result = calculate(calculation);
    }
    console.log(calculation.result);
    displayResult(calculation);
    newCalc();
}

function displayResult(calculation) {
    const resultValue = truncate(calculation.result);
    display.textContent = resultValue;
    displayValue = calculation.result;
    createPrintString(calculation);
}

function truncate (input) {
    const inputString = input.toString();
    const truncatedValue = inputString.length > 10 ? inputString.slice(0,9) : inputString;
    return truncatedValue
}

function newCalc() {
    i++;
    calculation[i] = {
        currentValue:displayValue,
        inputValue:'0',
        operator:chainOperator,
        result:'',
        printString:'',
    }
    chainCalc = true;
}

function allClear () {
    calculation.splice(0,calculation.length);
    i = 0;
    displayValue = 0;
    chainCalc = false;
    display.textContent = '0';
    calculation =[
        {
        currentValue:'null',
        inputValue:'0',
        operator:'',
        result:'0',
        printString:'',
        }
    ]
    printFeed('********');
}

function findOperator(calculation) {
    switch (calculation.operator) {
        case 'add' : return '+';
        case 'sub' : return '-';
        case 'mul' : return '\xD7';
        case 'div' : return '\xF7';
    }
}

function createPrintString(calculation) {
    const operatorSym = findOperator (calculation);
    const truncatedCurVal = truncate(calculation.currentValue);
    const truncatedResult = truncate(calculation.result);
    calculation.printString = `${truncatedCurVal} ${operatorSym} ${calculation.inputValue} = ${truncatedResult}`
    printFeed(calculation.printString);
}

function divideByZero(a) {
    allClear();
    return String.fromCodePoint(0x1F92E);
}

function createLine(toPrint){
    const output = document.createElement('div');
    const decorBefore = document.createElement('div');
    const decorAfter = document.createElement('div');
    const line = document.createElement('div');
    decorBefore.setAttribute('class','print-out');
    decorAfter.setAttribute('class','print-out');
    output.setAttribute('class','print-out');
    line.setAttribute('class','line');
    output.textContent = toPrint;
    decorBefore.textContent = '<';
    decorAfter.textContent = '>';
    line.appendChild(decorBefore);
    line.appendChild(output);
    line.appendChild(decorAfter);
    return line;
}

function printFeed(toPrint){
    const feed = createLine(toPrint);
    if (previousFeed != undefined) {
        roll.insertBefore(feed,previousFeed);
    } else {
        roll.appendChild(feed);
    }
    previousFeed = feed;
}

let calculation =[
    {
    currentValue:'null',
    inputValue:'0',
    operator:'',
    result:'0',
    printString:'',
    }
];

let displayValue = '0';
let i = 0;
let buttonPressed;
let chainCalc = false;
let chainOperator ='';
let currentDigits = displayValue.length;
let previousFeed;
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
const roll = document.querySelector('.roll');
buttons.forEach(button => button.addEventListener('click', function (e) {
    const buttonPressed = e.target.id;
    update(buttonPressed,calculation[i]);
}))
