const { KeypadManager } = require("./manager/keypad/KeypadManager");
const {
  CalculatorManager,
  OperatorEnums,
} = require("./manager/state/CalculatorManager");

const keypadManager = new KeypadManager();
const calculatorManager = new CalculatorManager();

const KeypadKeysEnum = {
  // Numeric keys
  NUM_0: 96,
  NUM_1: 97,
  NUM_2: 98,
  NUM_3: 99,
  NUM_4: 100,
  NUM_5: 101,
  NUM_6: 102,
  NUM_7: 103,
  NUM_8: 104,
  NUM_9: 105,

  // Decimal separator keys
  SEPARATOR_DOT: 190,
  SEPARATOR_NUMPAD: 110,

  // Operator keys
  OPERATOR_SUM: 107,
  OPERATOR_SUBTRACTION: 109,
  OPERATOR_MULTIPLICATION: 106,
  OPERATOR_DIVISION: 111,
};

const numericKeys = [
  KeypadKeysEnum.NUM_0,
  KeypadKeysEnum.NUM_1,
  KeypadKeysEnum.NUM_2,
  KeypadKeysEnum.NUM_3,
  KeypadKeysEnum.NUM_4,
  KeypadKeysEnum.NUM_5,
  KeypadKeysEnum.NUM_6,
  KeypadKeysEnum.NUM_7,
  KeypadKeysEnum.NUM_8,
  KeypadKeysEnum.NUM_9,
];

numericKeys.forEach((key) => {
  keypadManager.registerKey(key, () => {
    calculatorManager.appendToOperand(Math.abs(KeypadKeysEnum.NUM_0 - key));
  });
});

keypadManager.registerKey(KeypadKeysEnum.SEPARATOR_DOT, () =>
  calculatorManager.addDecimalSeparator()
);

keypadManager.registerKey(KeypadKeysEnum.SEPARATOR_NUMPAD, () =>
  calculatorManager.addDecimalSeparator()
);

keypadManager.registerKey(KeypadKeysEnum.OPERATOR_SUM, () =>
  calculatorManager.runOperator(OperatorEnums.SUM)
);

keypadManager.registerKey(KeypadKeysEnum.OPERATOR_SUBTRACTION, () =>
  calculatorManager.runOperator(OperatorEnums.SUBTRACTION)
);

keypadManager.registerKey(KeypadKeysEnum.OPERATOR_MULTIPLICATION, () =>
  calculatorManager.runOperator(OperatorEnums.MULTIPLICATION)
);

keypadManager.registerKey(KeypadKeysEnum.OPERATOR_DIVISION, () =>
  calculatorManager.runOperator(OperatorEnums.DIVISION)
);

module.exports = {
  keypadManager,
  calculatorManager,
  KeypadKeysEnum,
};
