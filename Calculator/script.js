const lightBtn = document.querySelector('.fa-sun');
const darkBtn = document.querySelector('.fa-moon');
const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear-btn');
const historyDisplay = document.querySelector('.history');

let firstValue = 0;
let operatorValue = null;
let awaitingNextValue = false;

const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '%': (firstNumber, secondNumber) => firstNumber / 100,
    '=': (firstNumber, secondNumber) => secondNumber,
}

const deleteChar = () => {
    let displayContent = calculatorDisplay.textContent.replaceAll(",", "");
    calculatorDisplay.textContent = Number(displayContent.slice(0, -1)).toLocaleString();
    historyDisplay.textContent = Number(displayContent.slice(0, -1));
}

const hasMoreThanOneOperator = () => {
    const str = historyDisplay.textContent;
    const operators = ['+', '-', '÷', '×'];
    let count = 0;

    for (let i = 0; i <= str.length; i++) {
        if (operators.includes(str[i])) {
            count++;
        }
   }

    return (count > 1);
}

const useOperator = (operator, content) => {
    const currentValue = Number(calculatorDisplay.textContent);
    let result = null;

    if (content === '_'){
        content = '-';
    }

    if (operatorValue && awaitingNextValue) {
        if (operatorValue === '=' || Number(historyDisplay.textContent)){
            historyDisplay.textContent = historyDisplay.textContent + ' ' + content + ' ';
        }
        else{
            historyDisplay.textContent = historyDisplay.textContent.slice(0, -2) + content + ' ';
        }
        operatorValue = operator;
        return;
    }

    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        firstValue = calculation;
        result = calculation;
        
        calculatorDisplay.textContent = Number(calculation).toLocaleString();
    }

    historyDisplay.textContent += ' ' + content + ' ';

    if (operator === '='){
        historyDisplay.textContent = result;
    } else if(hasMoreThanOneOperator()){
        historyDisplay.textContent = result + ' ' + content;
    }

    awaitingNextValue = true;
    operatorValue = operator;

}

const resetAll = () => {
    historyDisplay.textContent = '';
    calculatorDisplay.textContent = '0';
    firstValue = 0;
    operatorValue = null;
    awaitingNextValue = false;
}

const addDecimal = () => {
    if (awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent += '.';
    }
}

const sendNumberValue = (number) => {
    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }

    if (historyDisplay.textContent === '0'){
        historyDisplay.textContent = number;
        return;
    }
    historyDisplay.textContent += number;
}

const setTheme = (theme) => {
    localStorage.setItem('theme', theme);
}

const getTheme = () => {
    return localStorage.getItem('theme') ? localStorage.getItem('theme') : 'dark';
}

const lightMood = () => {
    document.documentElement.setAttribute('data-theme', 'light');
    setTheme('light');
    lightBtn.classList.remove('diactive');
    darkBtn.classList.add('diactive');
}

const darkMood = () => {
    document.documentElement.setAttribute('data-theme', 'dark');
    setTheme('dark');
    lightBtn.classList.add('diactive');
    darkBtn.classList.remove('diactive');
}

lightBtn.addEventListener('click', lightMood);
darkBtn.addEventListener('click', darkMood);
clearBtn.addEventListener('click', resetAll);

inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 1 && inputBtn.className === 'btn' || inputBtn.className === 'btn zero') {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.value === 'backspace') {
        inputBtn.addEventListener('click', deleteChar);
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value, inputBtn.textContent));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }

});

let theme = getTheme();

if (theme == 'dark') {
    darkMood();
} else {
    lightMood();
}