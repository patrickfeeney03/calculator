class Calculator {
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

    let numberButtons = document.querySelectorAll(".number-buttons");
    let operatorButtons = document.querySelectorAll(".operator-buttons");
    this.displaySquare = document.querySelector("#result-box");

    let calculatorButtons = document.querySelectorAll("button");

    calculatorButtons.forEach(button => button.addEventListener("click", this.buttonHandler.bind(this)));
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

  buttonHandler(event) {
    let result;
    let buttonPressed = event.currentTarget;
    let buttonContent = buttonPressed.innerText;

    if (buttonContent == "C") { // 'C' button to clear calculator
      this.resetCalculator();
    } else if (this.number2 != '') { // When the second number has already been populated
      if (isNaN(buttonContent)) { // If it is not a number, calculate
        result = parseFloat(this.operate(+this.number1, this.operator, +this.number2).toFixed(4)) ;
        this.number1 = result;
        this.operator = '';
        this.number2 = '';
      }
      if (!isNaN(buttonContent)) { // If it is a number, append number to current number2
        this.number2 = this.number2.toString() + buttonContent.toString();
        console.log(this.number2);
        this.setDisplay(this.number2);
      } else if (buttonContent == "=") { // If it is equal sign show result
        console.log(buttonContent);
        console.log(result);
        this.setDisplay(result);
      } else if (["+", "-", "*", "/"].includes(buttonContent)) { // If it is an operator button show result and set operator
        this.operator = buttonContent;
        console.log(result);
        console.log(this.operator);
        this.setDisplay(result);
      }
    } else if (this.operator != '') { // When operator has already been populated
      if (!isNaN(buttonContent) || buttonContent == "-") { // If it is a number, set as number2
        this.number2 = buttonContent;
        console.log(this.number2);
        this.setDisplay(this.number2);
      } else if (["+", "-", "*", "/"].includes(buttonContent)) { // If an operator already exists, it gets replaced
        this.operator = buttonContent;
        console.log(this.operator);
      }
    } else if (this.number1 != '') { // When number1 has already been populated
      if (!isNaN(buttonContent)) { // If number, append to number1
        this.number1 = this.number1.toString() + buttonContent.toString();
        console.log(this.number1);
        this.setDisplay(this.number1);
      } else if (["+", "-", "*", "/"].includes(buttonContent)) { // If operator pressed, the operator gets set
        this.operator = buttonContent;
        console.log(this.operator);
      }
    } else if (this.number1 == '' && (!isNaN(buttonContent) || buttonContent == "-")) { // When number1 has NOT being set, it gets set if it is a valid number
      this.number1 = buttonContent;
      console.log(`${this.number1}`);
      this.setDisplay(this.number1);
    }
  }

  resetCalculator() {
    this.displaySquare.innerText = "";
    this.number1 = '';
    this.operator = '';
    this.number2 = '';
  }

  // Function to write to display? setDisplay("abc") clearDisplay appendToDisplay(String)
}

const myCalc = new Calculator;


// Make the Calculator class create it's own HTML calculator.
// Be sure to allow the user to add negative numbers for multiplication
