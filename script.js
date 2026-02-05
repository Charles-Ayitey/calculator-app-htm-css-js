// Access the DOM elements of the calculator
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv = document.getElementById('result');

// Define expression and result variable
let expression = '';
let result = '';

// Define event handler for button clicks

const buttonClick = (event) => {
    // Get values from clicked button
    const target = event.target;
    const action = target.dataset.action;
    const value = target.dataset.value;
    // console.log(target, value, action);

    // Switch case to control the calculator
    switch (action) {
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'backspace':
            backspace();
            break;
        // Add the result to expression as a starting point if the expression is empty
        case 'addition':
        case 'subtraction':
        case 'multiplication':
        case 'division':
            if (expression === '' && result !== '') {
                startFromResult(value);
            } else if (expression !== '' && !isLastCharOperator()) {
                addValue(value);
            }
            break
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
    }

    // Update display
    updateDisplay(expression, result);
}

inputBox.addEventListener('click', buttonClick);

const addValue = (value) => {
    expression += value;
}

const updateDisplay = (expression, result) => {
    expressionDiv.textContent = expression;
    resultDiv.textContent = result;
}

const clear = () => {
    expression = '';
    result = '';
}

const backspace = () => {
    expression = expression.slice(0, -1);
}

const isLastCharOperator = () => {
    if (expression === '') {
        return false;
    }
    return isNaN(parseInt(expression.slice(-1)));
}

const startFromResult = (value) => {
    expression += result + value;
}

const submit = () => {
    result = evaluateExpression();
    expression = '';
}

const evaluateExpression = () => {
    const evalResult = eval(expression);
    return isNaN(evalResult) || !isFinite(evalResult)
        ? ''
        : evalResult < 1 
        ? parseFloat(evalResult.toFixed(10))
        : parseFloat(evalResult.toFixed(2));
}

const negate = () => {
    if (expression === '' && result !== '') {
        result = -result;
    } else if (!expression.startsWith('-') && expression !== '') {
        expression = '-' + expression;
    } else if (expression.startsWith('-')) {
        expression = expression.slice(1);
    }
}

const percentage = () => {
    if (expression !== '') {
        result = evaluateExpression();
        expression = '';
        if (!isNaN(result) && isFinite(result)) {
            result = result / 100;
        } else {
            result = '';
        }
    } else if (result !== '') {
        result = parseFloat(result / 100);
    }
}

const getCurrentOperand = () => {
    const lastOperatorIndex = Math.max(
        expression.lastIndexOf('+'),
        expression.lastIndexOf('-'),
        expression.lastIndexOf('*'),
        expression.lastIndexOf('/')
    );
    return expression.slice(lastOperatorIndex + 1);
}

const decimal = (value) => {
    if (expression.endsWith('.')) {
        return;
    }

    const currentOperand = getCurrentOperand();
    if (currentOperand.includes('.')) {
        return;
    }

    if (expression === '' || isLastCharOperator()) {
        expression += '0' + value;
    } else {
        expression += value;
    }
}