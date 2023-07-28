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
    let displayElement = document.querySelector("#result-box");
    displayElement.innerText = text;
  }

  buttonHandler(event) {
    let result;
    let buttonPressed = event.currentTarget;
    let buttonContent = buttonPressed.innerText;

    if (this.number2 != '') {
      if (isNaN(buttonContent)) {
        result = this.operate(+this.number1, this.operator, +this.number2);
        this.number1 = result;
        this.operator = '';
        this.number2 = '';  
      }
      if (!isNaN(buttonContent)) {
        this.number2 = this.number2.toString() + buttonContent.toString();
        console.log(this.number2);
      } else if (buttonContent == "=") {
        console.log(buttonContent);
        console.log(result);
      } else if (["+", "-", "*", "/"].includes(buttonContent)) {
        this.operator = buttonContent;
        console.log(result);
        console.log(this.operator);
      }
    } else if (this.operator != '') {
      if (!isNaN(buttonContent)) {
        this.number2 = buttonContent;
        console.log(this.number2);
      } else if (["+", "-", "*", "/"].includes(buttonContent)) {
        this.operator = buttonContent;
        console.log(this.operator);
      }
    } else if (this.number1 != '') {
      if (!isNaN(buttonContent)) {
        this.number1 = this.number1.toString() + buttonContent.toString();
        console.log(this.number1);
      } else if (buttonContent != "=") {
        this.operator = buttonContent;
        console.log(this.operator);
      }
    } else if (this.number1 == '') {
      this.number1 = buttonContent;
      console.log(`${this.number1}`);
    }
  }

  // Function to write to display? setDisplay("abc") clearDisplay appendToDisplay(String)
}

const myCalc = new Calculator;


// Make the Calculator class create it's own HTML calculator.
// Be sure to allow the user to add negative numbers for multiplication
