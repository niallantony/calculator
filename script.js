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
        initialiseInputs(calculation);
        console.log(buttonPressed)
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
            calculation.operator = buttonPressed;
            calculation.inputValue = displayValue;
            initialiseInputs(calculation);
            console.log(buttonPressed)
        }
    }

}

function displayNumber (buttonPressed) {
    displayValue = chainCalc ? 0 : displayValue;
    if (displayValue === 0) {
        displayValue = buttonPressed;
        display.textContent = displayValue;
        console.log(buttonPressed);
    } else {
        displayValue = `${displayValue}${buttonPressed}`;
        display.textContent = displayValue;
        console.log(buttonPressed)
    }
    chainCalc = false;
}

function initialiseInputs (calculation) {
    calculation.result = calculate(calculation);
    display.textContent = calculation.result;
    displayValue = calculation.result;
    newCalc();
}

function newCalc() {
    i++;
    calculation[i] = {
        currentValue:displayValue,
        inputValue:'0',
        operator:'',
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
        result:'',
        printString:'',
        }
    ]
}

let calculation =[
    {
    currentValue:'null',
    inputValue:'0',
    operator:'',
    result:'',
    printString:'',
    }
];
let displayValue = 0;
let i = 0;
let buttonPressed;
let chainCalc = false;
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', function (e) {
    const buttonPressed = e.target.id;
    update(buttonPressed,calculation[i]);
}))
