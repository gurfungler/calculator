const buttons = document.querySelectorAll('.button');
buttons.forEach(key => key.addEventListener('mouseover', hover));
buttons.forEach(key => key.addEventListener('mouseout', removeHover));
buttons.forEach(key => key.addEventListener('mousedown', click));
buttons.forEach(key => key.addEventListener('mouseup', stopClick));

function hover() {
    this.classList.add("hovered");
}

function removeHover() {
    this.classList.remove("hovered");
}

function click() {
    const display = document.querySelector("#stuff");
    const displayAnswer = document.querySelector("#answer");
    let flag = "";
    if(this.id == "number"){
        clickNumber(display, this.textContent, displayAnswer.textContent);
    }
    else if( this.id == "operator") {
        clickOperator(display, this.textContent, displayAnswer);
    }
    else
    {
        clickEvaluate(displayAnswer, display);
    }
    this.classList.add("click");
}

function stopClick() {
    this.classList.remove("click");
}

function clickEvaluate(leftOperand, rightOperand) {
    let left = leftOperand.textContent;
    let right = parseFloat(rightOperand.textContent);
    let operator = left.charAt(left.length - 1);
    switch(operator) {
        case "+":
            leftOperand.textContent = left + " " + right;
            rightOperand.textContent = parseFloat(left.substring(0, left.length - 2)) + right;
            break;
        case "-":
            leftOperand.textContent = left + " " + right;
            rightOperand.textContent = parseFloat(left.substring(0, left.length - 2)) - right;       
            break;
        case "*":
            leftOperand.textContent = left + " " + right;
            rightOperand.textContent = parseFloat(left.substring(0, left.length - 2)) * right;
            break;
        case "/":
            leftOperand.textContent = left + " " + right;
            rightOperand.textContent = parseFloat(left.substring(0, left.length - 2)) / right;
            break;
        default:
            break;
    }
    
}

function clickOperator(answer, operator, display) {
    switch(operator) {
        case "1/x":
            display.textContent = `1/${answer.textContent}`;
            answer.textContent = 1 / parseFloat(answer.textContent);
            break;
        case "%":
            percent(answer, display);
            break;
        case "CE":
            answer.textContent = 0;
            break;
        case "x^2":
            display.textContent = `${answer.textContent}^2`;
            answer.textContent = parseFloat(answer.textContent) * parseFloat(answer.textContent);
            break;
        case "sqrt":
            display.textContent = `sqrt(${answer.textContent})`;
            answer.textContent = Math.sqrt(parseFloat(answer.textContent));
            break;
        case "C":
            answer.textContent = "0";
            display.textContent = "0";
            break;
        case "back":
            back(answer, display.textContent);
            break;
        default :
        basicOperator(answer, operator, display);
    }
    
}

function back(answer, operation) {
    if(operation.includes(" + ") || operation.includes(" - ") || operation.includes(" * ") || operation.includes(" / ")) {
        return;
    }
    answer.textContent = answer.textContent.substring(0, answer.textContent.length - 1);
    if(answer.textContent == "" ||answer.textContent == "-") {
        answer.textContent = "0";
    }
}

function basicOperator(right, operator, left) {
    let flag = left.textContent.charAt(left.length - 1);
    if(flag == "+" || flag == "-" || flag == "/" || flag == "*") {
        left.textContent = left.textContent.substring(0, left.textContent.length - 2) + " " + operator;
        return;
    }
    left.textContent = right.textContent + " " + operator;
    right.textContent = "0";
}

function clickNumber(display, number, operation) {
    if(operation.includes(" + ") || operation.includes(" - ") || operation.includes(" * ") || operation.includes(" / ")) {
        answer.textContent = "0";
        display.textContent = "0";
    }

    if(number == "+/-" || number == ".")
    {
        clickSpecial(display, number);
    }
    else if(display.textContent == "0") {
        display.textContent = number;
    }
    else {
        display.textContent += number;
    }
}

function clickSpecial(display, number) {
    let displayNumber = display.textContent;

    if(number == "+/-"){
        if(displayNumber.charAt(0) == "-") {
            display.textContent = displayNumber.substring(1);
        }
        else {
            display.textContent = "-" + displayNumber;
        }
    }
    else {
        if(!(displayNumber.includes("."))) {
            display.textContent += ".";
        }
    }
}

function percent(answer, operation) {
    let operator = operation.textContent;
    let seperated = operator.split(" ");
    seperated.length = 3;
    console.log(seperated[1]);
    console.log(seperated[2]);
    if(seperated[1] == "+"|| seperated[1] == "-" || seperated[1] == "-" || seperated[1] == "-") {
       if(seperated[2] == undefined) {
            seperated[2] = parseFloat(answer.textContent)/100 * parseFloat(seperated[0]);

       }
       else {
            seperated[2] = seperated[2]/100 * parseFloat(seperated[0]);
       }
       operation.textContent = seperated[0] + " " + seperated[1];
       answer.textContent = seperated[2];
       clickEvaluate(answer, operation);
    }
    else {
        answer.textContent = "0";
        operation.textContent = "0";
    }
}
