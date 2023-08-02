class Calculator {
  static activeCalculator = null;
  constructor() {
    this.operations = {
      "-": (a, b) => a - b,
      "+": (a, b) => a + b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b
    }

    this.number1 = '';
    this.operator = '';
    this.number2 = '';

    this.isKeyPressed = false;
  }

  operate(num1, op, num2) {
    return this.operations[op](num1, num2);
  }

  registerPress(button) {
    if (this.buttonsArray.length <= 3) {
      this.buttonsArray[this.buttonsArray.length] = button;
    } else {
      this.buttonsArray = [];
      this.buttonsArray[this.buttonsArray.length] = button;
    }
  }

  setDisplay(text) {
    this.displaySquare.innerText = text;
  }

  appendToDisplay(text) {
    this.displaySquare.innerText += ` ${text}`;
  }

  calculatorLogic(button) {
    let result;
    if (button == "C" || button == "c") { // 'C' button to clear calculator
      this.resetCalculator();
    } else if (this.number2 != '') { // When the second number has already been populated
      if (this.operator == "/" && this.number2 == 0) { // Preven't dividing by 0
        result = "Can't divide by 0";
        this.number1 = '';
        this.operator = '';
        this.number2 = '';
      } else if (["+", "-", "*", "/", "=", "Enter"].includes(button) && !isNaN(this.number2)) { // If it is not a number and number2 is valid, calculate
        result = parseFloat(this.operate(+this.number1, this.operator, +this.number2).toFixed(4));
        this.number1 = result;
        this.operator = '';
        this.number2 = '';
      }
      if (!isNaN(button) || (button == "." && !this.number2.includes("."))) { // If it is a number, append number to current number2
        this.number2 = this.number2.toString() + button.toString();
        console.log(this.number2);
        this.setDisplay(this.returnNumberCorrectLength(this.number2, 12, 6));
      } else if (button == "=" || button == "Enter") { // If it is equal sign show result
        console.log(button);
        console.log(result);
        this.setDisplay(this.returnNumberCorrectLength(result, 12, 6));
      } else if (["+", "-", "*", "/"].includes(button) && !isNaN(this.number2)) { // If it is an operator button show result and set operator
        this.operator = button;
        console.log(result);
        console.log(this.operator);
        this.setDisplay(this.returnNumberCorrectLength(result, 12, 6));
      } else if (button == "⬅" || button == "Backspace") {
        this.number2 = this.number2.toString().slice(0, -1);
        this.setDisplay(this.returnNumberCorrectLength(this.number2));
      }
    } else if (this.operator != '') { // When operator has already been populated
      if (this.number2 == '' && button == "π") { // If number2 is empty and PI π is pressed
        this.number2 = Math.PI.toFixed(4);
        console.log(this.number2);
        this.setDisplay(this.number2);
      }
      else if (!isNaN(button) || (button == "-" && !this.number2.includes("-")) || (button == "." && !this.number2.includes("."))) { // If it is a number, set as number2
        this.number2 = button;
        console.log(this.number2);
        this.setDisplay(this.number2);
      } else if (["+", "-", "*", "/"].includes(button)) { // If an operator already exists, it gets replaced
        this.operator = button;
        console.log(this.operator);
      }
    } else if (this.number1 != '') { // When number1 has already been populated
      if (!isNaN(button) || (button == "." && !this.number1.includes("."))) { // If number, append to number1
        this.number1 = this.number1.toString() + button.toString();
        console.log(this.number1);
        this.setDisplay(this.returnNumberCorrectLength(this.number1, 12, 6));
      } else if (["+", "-", "*", "/"].includes(button) && !isNaN(this.number1)) { // If operator pressed, the operator gets set
        this.operator = button;
        console.log(this.operator);
      } else if (button == "⬅" || button == "Backspace") {
        this.number1 = this.number1.toString().slice(0, -1);
        this.setDisplay(this.returnNumberCorrectLength(this.number1));
      }
    } else if (this.number1 == '' && button == "π") { // If number1 is empty and PI π is pressed
      this.number1 = Math.PI.toFixed(4);
      console.log(this.number1);
      this.setDisplay(this.number1);
    } else if (this.number1 == '' && (!isNaN(button) || (button == "-" && !this.number1.includes("-"))) || button == ".") { // When number1 has NOT being set, it gets set if it is a valid number
      this.number1 = button;
      console.log(`${this.number1}`);
      this.setDisplay(this.number1);
    }
  }

  buttonHandler(event) {
    let buttonPressed = event.currentTarget;
    let buttonContent = buttonPressed.innerText;

    this.calculatorLogic(buttonContent);
  }

  returnNumberCorrectLength(number, maxCharsLength, decimalPlaces) {
    if (number.toString().length >= maxCharsLength && number.length < 12) {
      number = Number(number).toExponential(decimalPlaces);
    }
    if (number.toString().length >= 12) {
      number = Number(number).toExponential(decimalPlaces - 1);
    }
    return number;
  }

  resetCalculator() {
    this.displaySquare.innerText = "";
    this.number1 = '';
    this.operator = '';
    this.number2 = '';
  }

  createElements() {
    let mainContainer = document.createElement("div");
    mainContainer.className = "main-container";

    let calculatorName = document.createElement("p");
    calculatorName.className = "calculator-name";
    calculatorName.textContent = "Casiox";

    this.resultBox = document.createElement("div");
    this.resultBox.className = "result-box";

    let grid4x4 = document.createElement("div");
    grid4x4.className = "grid-4x4";

    let clear = document.createElement("button");
    clear.className = "clear";
    clear.textContent = "C";

    let back = document.createElement("button");
    back.textContent = "⬅";

    let pi = document.createElement("button");
    pi.textContent = "π";

    let division = document.createElement("button");
    division.textContent = "/";

    let multiplication = document.createElement("button");
    multiplication.textContent = "*";

    let subtraction = document.createElement("button");
    subtraction.textContent = "-";

    let addition = document.createElement("button");
    addition.textContent = "+";

    let point = document.createElement("button");
    point.textContent = ".";

    let equal = document.createElement("button");
    equal.className = "calculate operator-buttons";
    equal.textContent = "=";

    let one = document.createElement("button");
    one.textContent = 1;
    let two = document.createElement("button");
    two.textContent = 2;
    let three = document.createElement("button");
    three.textContent = 3;
    let four = document.createElement("button");
    four.textContent = 4;
    let five = document.createElement("button");
    five.textContent = 5;
    let six = document.createElement("button");
    six.textContent = 6;
    let seven = document.createElement("button");
    seven.textContent = 7;
    let eight = document.createElement("button");
    eight.textContent = 8;
    let nine = document.createElement("button");
    nine.textContent = 9;
    let zero = document.createElement("button");
    zero.className = "button-zero";
    zero.textContent = 0;

    grid4x4.appendChild(clear);
    grid4x4.appendChild(back);
    grid4x4.appendChild(pi);
    grid4x4.appendChild(division);

    grid4x4.appendChild(seven);
    grid4x4.appendChild(eight);
    grid4x4.appendChild(nine);
    grid4x4.appendChild(multiplication);

    grid4x4.appendChild(four);
    grid4x4.appendChild(five);
    grid4x4.appendChild(six);
    grid4x4.appendChild(subtraction);

    grid4x4.appendChild(one);
    grid4x4.appendChild(two);
    grid4x4.appendChild(three);
    grid4x4.appendChild(addition);

    let gridBottom = document.createElement("div");
    gridBottom.className = "grid-bottom";

    gridBottom.appendChild(zero);
    gridBottom.appendChild(point);
    gridBottom.appendChild(equal);

    mainContainer.appendChild(calculatorName);
    mainContainer.appendChild(this.resultBox);
    mainContainer.appendChild(grid4x4);
    mainContainer.appendChild(gridBottom);

    this.mainContainerContainer = document.createElement("div");
    this.mainContainerContainer.className = "main-container-container"
    this.mainContainerContainer.appendChild(mainContainer);

    const calculatorsContainer = document.querySelector("#calculators-container");
    calculatorsContainer.appendChild(this.mainContainerContainer);

    this.calculatorButtons = [clear, back, pi, division, multiplication, subtraction, addition, point, equal, one, two, three, four, five, six, seven, eight, nine, zero];
    this.calculatorButtons.forEach(button => button.addEventListener("click", this.buttonHandler.bind(this)));

    this.displaySquare = this.resultBox;

    // By default, the newest calculator is the active one.
    Calculator.activeCalculator = this;
    const allCalcs = document.querySelectorAll(".main-container");
    allCalcs.forEach(calculator => {
      calculator.classList.remove("active-main-container");
    });
    mainContainer.classList.add("active-main-container");

    mainContainer.addEventListener("click", () => {
      Calculator.activeCalculator = this;
      const allCalcs = document.querySelectorAll(".main-container");
      allCalcs.forEach(calculator => {
        calculator.classList.remove("active-main-container");
      });
      mainContainer.classList.add("active-main-container");
    });

    document.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ".", "c", "C", "Backspace", "p", "P", "/", "*", "-", "+", "=", "Enter"]
      .includes(event.key) && this === Calculator.activeCalculator && !this.isKeyPressed) {
        console.log(event.key);
        this.calculatorLogic(event.key);
        this.isKeyPressed = true;
      }
    });
    document.addEventListener("keyup", (event) => {
      event.preventDefault();
      this.isKeyPressed = false;
    })
  }
}

const addCalcBtn = document.querySelector("#button-addCalc");
addCalcBtn.addEventListener("click", (event) => {
  const newCalc = new Calculator();
  newCalc.createElements();
  const lengthObject = Object.keys(calculators).length;
  const indexI = lengthObject > 0 ? +Object.keys(calculators).reduce((a, b) => calculators[a] > calculators[b] ? a : b) + 1 : 0;
  calculators[indexI] = newCalc;
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-button";
  //removeBtn.calcKey = Object.keys(calculators).length > 0 ? Object.keys(calculators).length - 1 : 0;
  removeBtn.calcKey = indexI;
  removeBtn.addEventListener("click", () => { removeCalculator(removeBtn.calcKey) });
  newCalc.mainContainerContainer.appendChild(removeBtn);
});


const calculators = {};
const newCalc = new Calculator();
newCalc.createElements();
calculators[Object.keys(calculators).length] = newCalc;
const removeBtn = document.createElement("button");
removeBtn.textContent = "Remove";
removeBtn.className = "remove-button";
removeBtn.calcKey = Object.keys(calculators).length > 0 ? Object.keys(calculators).length - 1 : 0;
removeBtn.addEventListener("click", () => { removeCalculator(removeBtn.calcKey) });
newCalc.mainContainerContainer.appendChild(removeBtn);

function removeCalculator(key) {
  console.log(`key: ${key}`);
  console.log(calculators[key]);
  let calculatorsContainer = document.querySelector("#calculators-container");
  calculatorsContainer.removeChild(calculators[key].mainContainerContainer);
  //delete calculators[key];
  delete calculators[key];
}


// Make the Calculator class create it's own HTML calculator.
// Be sure to allow the user to add negative numbers for multiplication
