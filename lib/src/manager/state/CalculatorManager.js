const CalculatorEventsEnum = {};
const OperatorEnums = {
  SUM: "sum",
  SUBTRACTION: "subtraction",
  MULTIPLICATION: "multiplication",
  DIVISION: "division",
};

const DECIMAL_SEPARATOR = ".";

class CalculatorManager {
  constructor() {
    this.currentValue = 0;
    this.currentOperand = "0";
    this.currentOperator = null;

    this.operatorsMap = new Map(
      Object.entries({
        [OperatorEnums.SUM]: (a, b) => a + b,
        [OperatorEnums.SUBTRACTION]: (a, b) => a - b,
        [OperatorEnums.MULTIPLICATION]: (a, b) => a * b,
        [OperatorEnums.DIVISION]: (a, b) => a / b,
      })
    );
  }

  addDecimalSeparator() {
    if (!this.currentOperand.includes(DECIMAL_SEPARATOR)) {
      this.currentOperand += DECIMAL_SEPARATOR;
    }
  }

  appendToOperand(numericInput) {
    if (this.currentOperand === "0") {
      this.currentOperand = String(numericInput);
    } else {
      this.currentOperand += String(numericInput);
    }
  }

  runOperator(operator) {
    this.calculate();
    const operatorFn = this.operatorsMap.get(operator);
    if (!operatorFn) {
      throw new Error(`operator "${operator}" not found`);
    }
    this.currentOperator = operatorFn;
  }

  calculate() {
    if (this.currentOperator) {
      this.currentValue = this.currentOperator(
        this.currentValue,
        parseFloat(this.currentOperand)
      );
      this.currentOperand = "0";
      this.currentOperator = null;
    } else {
      this.currentValue = parseFloat(this.currentOperand);
      this.currentOperand = "0";
    }
  }
}

module.exports = { CalculatorManager, OperatorEnums, CalculatorEventsEnum };
