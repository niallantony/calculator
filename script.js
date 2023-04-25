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
    } else {
        calculation.operator = buttonPressed;
        if (i===0) {
            calculation.currentValue = displayValue;
            displayValue = 0;
            return;
        } else {
            calculation.inputValue = displayValue;
            initialiseInputs(calculation);
            console.log(buttonPressed)
        }
    }

}

function displayNumber (buttonPressed) {
    if (displayValue === 0) {
        displayValue = buttonPressed;
        display.textContent = displayValue;
        console.log(buttonPressed);
    } else {
        displayValue = `${displayValue}${buttonPressed}`;
        display.textContent = displayValue;
        console.log(buttonPressed)
    }
}

function initialiseInputs (calculation) {
    calculation.result = calculate(calculation);
    display.textContent = calculation.result;
    displayValue = calculation.result;
    newCalc = true;
}

let calculation =[
    {
    currentValue:'null',
    inputValue:'0',
    operator:'',
    result:'',
    printString:'',
    }
]
;
let displayValue = 0;
let i = 0;
let buttonPressed;
let newCalc = false;
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
buttons.forEach(button => button.addEventListener('click', function (e) {
    const buttonPressed = e.target.id;
    update(buttonPressed,calculation[i]);
}))
if (newCalc) {
    i++;
    calculation[i].currentValue = displayValue;
    displayValue = 0;
    newCalc = false;
}