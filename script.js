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

  buttonHandler(event) {
    let buttonPressed = event.currentTarget;
    let buttonContent = buttonPressed.innerText;
    
    if (this.number1 == '' && this.operator == '' && this.number2 == '') {
      this.number1 = buttonContent;
    } else if (this.number1 != '' && this.operator == '' && this.number2 == '') {
      if (isNaN(buttonContent)) {
        this.operator = buttonContent;
      } else {
        this.number1 = this.number1.toString() + buttonContent.toString();
      }
    } else if (this.number1 != '' && this.operator != '' && this.number2 == '') {
      if (isNaN(buttonContent)) {
        this.operator = buttonContent;
      } else {
        this.number2 = buttonContent;
      }
    } else if (this.number1 != '' && this.operator != '' && this.number2 != '') {
      if (isNaN(buttonContent)) {
        let result = this.operate(+this.number1, this.operator, +this.number2);
        this.number1 = result;
        this.operator = '';
        this.number2 = '';
        console.log(result);
        if (buttonContent != '=') {
          this.operator = buttonContent;
        }
      } else {
        this.number2 = this.number2.toString() + buttonContent.toString();
      }
    }
    console.log(buttonContent);
  }

  // Function to write to display? setDisplay("abc") clearDisplay appendToDisplay(String)
  // getDisplayContent
}

const myCalc = new Calculator;

function print1() {
  console.log("Asbda");
}

