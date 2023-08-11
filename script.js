class Calculator {
  static activeCalculator = null;
  static activeKeys = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
    "0": false,
    ".": false,
    "c": false,
    "C": false,
    "Backspace": false,
    "p": false,
    "P": false,
    "Enter": false,
    "=": false,
    "/": false,
    "*": false,
    "-": false,
    "+": false,
  }
  static mappedElements = {
    "1": "one",
    "2": "two",
    "3": "three",
    "4": "four",
    "5": "five",
    "6": "six",
    "7": "seven",
    "8": "eight",
    "9": "nine",
    "0": "zero",
    ".": "point",
    "c": "clear",
    "C": "clear",
    "Backspace": "back",
    "p": "pi",
    "P": "pi",
    "Enter": "equal",
    "=": "equal",
    "/": "division",
    "*": "multiplication",
    "-": "subtraction",
    "+": "addition",
  }

  static classesForButtons = {
    "class1Normal": "",
    "class1Active": "button-active",
    "class2Normal": "clear",
    "class2Active": "clear-active",
    "class3Normal": "calculate",
    "class3Active": "calculate-active",
  }

  static operators = ["+", "-", "*", "/"];

  constructor() {
    this.operations = {
      "-": (a, b) => a - b,
      "+": (a, b) => a + b,
      "*": (a, b) => a * b,
      "/": (a, b) => a / b
    }

    this.number1 = '';
    this.lastNumber1 = '';
    this.operator = '';
    this.lastOperator = '';
    this.number2 = '';
    this.lastNumber2 = '';
  }

  resetCalculator() {
    if (this.operator != '') {this[Calculator.mappedElements[this.operator]].classList.remove(Calculator.classesForButtons["class1Active"])}
    this.displaySquare.innerText = "";
    this.number1 = '';
    this.operator = '';
    this.number2 = '';
    this.lastButton = '';
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
    //console.log(`lastButton:"${this.lastButton}" lastNumber1:"${this.lastNumber1}" lastOperator:"${this.lastOperator}" lastNumber2:"${this.lastNumber2}"`);     
    if (button == "C" || button == "c") { // 'C' button to clear calculator
      this.resetCalculator();
    } else if ((button == "=" || button == "Enter") && (this.lastButton == "=" || this.lastButton == "Enter") && (this.lastNumber1 != '' && this.lastOperator != '' && this.lastNumber2 != '')) {
      this.number1 = parseFloat(this.operate(+this.lastNumber1, this.lastOperator, +this.lastNumber2).toFixed(4));
      this.setDisplay(this.returnNumberCorrectLength(this.number1, 12, 6));
      this.lastNumber1 = this.number1;
      console.log("here");
    } else if (this.number2 != '') { // When the second number has already been populated
      if (this.operator == "/" && this.number2 == 0) { // Preven't dividing by 0
        result = "Illegal";
        this.setDisplay(result);
        this.number1 = '';
        this.operator = '';
        this.number2 = '';
        return
      } else if (["+", "-", "*", "/", "=", "Enter"].includes(button) && !isNaN(this.number2)) { // If it is not a number and number2 is valid, calculate
        result = parseFloat(this.operate(+this.number1, this.operator, +this.number2).toFixed(4));
        this.number1 = result;
        this.lastNumber1 = this.number1;
        this.lastOperator = this.operator;
        this.lastNumber2 = this.number2;
        this.operator = '';
        this.number2 = '';
      }
      if (!isNaN(button) || (button == "." && !this.number2.includes("."))) { // If it is a number, append number to current number2
        this.number2 = this.number2.toString() + button.toString();
        console.log(this.number2);
        this.setDisplay(this.returnNumberCorrectLength(this.number2, 12, 6));
      } else if ((button == "=" || button == "Enter") && !isNaN(this.number2)) { // If it is equal sign show result
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
      console.log(`This is button: "${button}"`);
      if (this.number2 == '' && (button == "π" || button == "p")) { // If number2 is empty and PI π is pressed
        this.number2 = Math.PI.toFixed(4);
        console.log(this.number2);
        this.setDisplay(this.number2);
        this[Calculator.mappedElements[this.operator]].classList.remove(Calculator.classesForButtons["class1Active"]);
        Calculator.activeKeys[Calculator.mappedElements[this.operator]] = false;
      }
      else if (!isNaN(button) || (button == "-" && !this.number2.includes("-")) || (button == "." && !this.number2.includes("."))) { // If it is a number, set as number2
        this.number2 = button;
        console.log(this.number2);
        this.setDisplay(this.number2);
        this[Calculator.mappedElements[this.operator]].classList.remove(Calculator.classesForButtons["class1Active"]);
        Calculator.activeKeys[Calculator.mappedElements[this.operator]] = false;
      } else if (["+", "-", "*", "/"].includes(button)) { // If an operator already exists, it gets replaced
        this[Calculator.mappedElements[this.operator]].classList.remove(Calculator.classesForButtons["class1Active"]);
        Calculator.activeKeys[Calculator.mappedElements[this.operator]] = false;
        this.operator = button;
        this[Calculator.mappedElements[this.operator]].classList.add(Calculator.classesForButtons["class1Active"]);
        Calculator.activeKeys[Calculator.mappedElements[this.operator]] = true;
        console.log(this.operator);
      }
    } else if (this.number1 != '') { // When number1 has already been populated
      if ((!isNaN(button) || (button == "." && !this.number1.toString().includes("."))) && !(button == "0" && this.number1 == "0")) { // If number, append to number1
        console.log(`num1: ${this.number1}`);
        console.log(this.number1);
        this.number1 = this.number1.toString() + button.toString();
        this.setDisplay(this.returnNumberCorrectLength(this.number1, 12, 6));
      } else if (["+", "-", "*", "/"].includes(button) && !isNaN(this.number1)) { // If operator pressed, the operator gets set
        this.operator = button;
        console.log(this.operator);
        this[Calculator.mappedElements[this.operator]].classList.add(Calculator.classesForButtons["class1Active"]);
      } else if (button == "⬅" || button == "Backspace") {
        this.number1 = this.number1.toString().slice(0, -1);
        this.setDisplay(this.returnNumberCorrectLength(this.number1));
      }
    } else if (this.number1 == '' && (button == "π" || button == "p")) { // If number1 is empty and PI π is pressed
      this.number1 = Math.PI.toFixed(4);
      console.log(this.number1);
      this.setDisplay(this.number1);
    } else if (this.number1 == '' && (!isNaN(button) || (button == "-" && !this.number1.includes("-"))) || button == ".") { // When number1 has NOT being set, it gets set if it is a valid number
      this.number1 = button;
      console.log(`${this.number1}`);
      this.setDisplay(this.number1);
    }
    this.lastButton = button;
  }

  returnNumberCorrectLength(number, maxCharsLength, decimalPlaces) {
    if (number.toString().length >= maxCharsLength && number.length < 12) {
      number = Number(number).toExponential(decimalPlaces);
    }
    if (number.toString().length >= 12) {
      number = Number(number).toExponential(decimalPlaces - 1);
    }
    if (number < 0 && number.toString().length >= 12) {
      number = Number(number).toExponential(decimalPlaces - 2);
    }
    return number;
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

    this.clear = document.createElement("button");
    this.clear.className = Calculator.classesForButtons["class2Normal"];
    this.clear.textContent = "C";
    this.clear.activeClassName = Calculator.classesForButtons["class2Active"];

    this.back = document.createElement("button");
    this.back.textContent = "⬅";
    this.back.activeClassName = Calculator.classesForButtons["class1Active"];

    this.pi = document.createElement("button");
    this.pi.textContent = "π";
    this.pi.activeClassName = Calculator.classesForButtons["class1Active"];

    this.division = document.createElement("button");
    this.division.textContent = "/";
    this.division.activeClassName = Calculator.classesForButtons["class1Active"];

    this.multiplication = document.createElement("button");
    this.multiplication.textContent = "*";
    this.multiplication.activeClassName = Calculator.classesForButtons["class1Active"];

    this.subtraction = document.createElement("button");
    this.subtraction.textContent = "-";
    this.subtraction.activeClassName = Calculator.classesForButtons["class1Active"];

    this.addition = document.createElement("button");
    this.addition.textContent = "+";
    this.addition.activeClassName = Calculator.classesForButtons["class1Active"];

    this.point = document.createElement("button");
    this.point.textContent = ".";
    this.point.activeClassName = Calculator.classesForButtons["class1Active"];

    this.equal = document.createElement("button");
    this.equal.className = `${Calculator.classesForButtons["class3Normal"]} operator-buttons`;
    this.equal.textContent = "=";
    this.equal.activeClassName = Calculator.classesForButtons["class3Active"];

    this.one = document.createElement("button");
    this.one.textContent = 1;
    this.one.activeClassName = Calculator.classesForButtons["class1Active"];
    this.two = document.createElement("button");
    this.two.textContent = 2;
    this.two.activeClassName = Calculator.classesForButtons["class1Active"];
    this.three = document.createElement("button");
    this.three.textContent = 3;
    this.three.activeClassName = Calculator.classesForButtons["class1Active"];
    this.four = document.createElement("button");
    this.four.textContent = 4;
    this.four.activeClassName = Calculator.classesForButtons["class1Active"];
    this.five = document.createElement("button");
    this.five.textContent = 5;
    this.five.activeClassName = Calculator.classesForButtons["class1Active"];
    this.six = document.createElement("button");
    this.six.textContent = 6;
    this.six.activeClassName = Calculator.classesForButtons["class1Active"];
    this.seven = document.createElement("button");
    this.seven.textContent = 7;
    this.seven.activeClassName = Calculator.classesForButtons["class1Active"];
    this.eight = document.createElement("button");
    this.eight.textContent = 8;
    this.eight.activeClassName = Calculator.classesForButtons["class1Active"];
    this.nine = document.createElement("button");
    this.nine.textContent = 9;
    this.nine.activeClassName = Calculator.classesForButtons["class1Active"];
    this.zero = document.createElement("button");
    this.zero.className = "button-zero";
    this.zero.textContent = 0;
    this.zero.activeClassName = Calculator.classesForButtons["class1Active"];

    grid4x4.appendChild(this.clear);
    grid4x4.appendChild(this.back);
    grid4x4.appendChild(this.pi);
    grid4x4.appendChild(this.division);

    grid4x4.appendChild(this.seven);
    grid4x4.appendChild(this.eight);
    grid4x4.appendChild(this.nine);
    grid4x4.appendChild(this.multiplication);

    grid4x4.appendChild(this.four);
    grid4x4.appendChild(this.five);
    grid4x4.appendChild(this.six);
    grid4x4.appendChild(this.subtraction);

    grid4x4.appendChild(this.one);
    grid4x4.appendChild(this.two);
    grid4x4.appendChild(this.three);
    grid4x4.appendChild(this.addition);

    let gridBottom = document.createElement("div");
    gridBottom.className = "grid-bottom";

    gridBottom.appendChild(this.zero);
    gridBottom.appendChild(this.point);
    gridBottom.appendChild(this.equal);

    mainContainer.appendChild(calculatorName);
    mainContainer.appendChild(this.resultBox);
    mainContainer.appendChild(grid4x4);
    mainContainer.appendChild(gridBottom);

    this.mainContainerContainer = document.createElement("div");
    this.mainContainerContainer.className = "main-container-container"
    this.mainContainerContainer.appendChild(mainContainer);

    const calculatorsContainer = document.querySelector("#calculators-container");
    calculatorsContainer.appendChild(this.mainContainerContainer);

    this.calculatorButtons = [this.clear, this.back, this.pi, this.division, this.multiplication, this.subtraction, this.addition, this.point, this.equal, this.one, this.two, this.three, this.four, this.five, this.six, this.seven, this.eight, this.nine, this.zero];
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
      event.preventDefault(); // Prevent the Enter key from pressing buttons
      if (!(event.key in Calculator.mappedElements)) { return } // Return if not a valid key
      if (Calculator.operators.includes(event.key) && !Calculator.activeKeys[event.key]) { // Only run logic if operator, logic itself will set style
        this.calculatorLogic(event.key);
        Calculator.activeKeys[event.key] = true;
      }
      else if (this === Calculator.activeCalculator && !Calculator.activeKeys[event.key]) { // Set style if key is not an operator
        this.calculatorLogic(event.key);
        Calculator.activeKeys[event.key] = true;
        const buttonElement = this[Calculator.mappedElements[event.key]];
        buttonElement.classList.add(buttonElement.activeClassName);
      }
    });
    document.addEventListener("keyup", (event) => {
      //event.preventDefault(); Haven't tested if removing this has a negative effect
      if (!(event.key in Calculator.mappedElements)) { return } // Return if not a valid key
      if (Calculator.operators.includes(event.key)) {
        Calculator.activeKeys[event.key] = false;
      }
      else {
        const buttonElement = this[Calculator.mappedElements[event.key]];
        buttonElement.classList.remove(buttonElement.activeClassName);
        Calculator.activeKeys[event.key] = false;
      }
      if (event.key === "Shift") {
        this.multiplication.classList.remove(this.multiplication.activeClassName);
        this.addition.classList.remove(this.addition.activeClassName);
      }
    });
  }

  buttonHandler(event) {
    let buttonPressed = event.currentTarget;
    let buttonContent = buttonPressed.innerText;

    this.calculatorLogic(buttonContent);
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
  delete calculators[key];
}


// Make the Calculator class create it's own HTML calculator.
// Be sure to allow the user to add negative numbers for multiplication
