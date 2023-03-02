const { keypadManager, calculatorManager, KeypadKeysEnum } = require(".");

describe("index", () => {
  test("Test 123", () => {
    keypadManager.triggerKey(KeypadKeysEnum.NUM_1);
    keypadManager.triggerKey(KeypadKeysEnum.NUM_5);
    keypadManager.triggerKey(KeypadKeysEnum.SEPARATOR_DOT);
    keypadManager.triggerKey(KeypadKeysEnum.NUM_2);
    keypadManager.triggerKey(KeypadKeysEnum.SEPARATOR_DOT);
    keypadManager.triggerKey(KeypadKeysEnum.NUM_5);
    keypadManager.triggerKey(KeypadKeysEnum.OPERATOR_SUM);
    keypadManager.triggerKey(KeypadKeysEnum.NUM_1);
    keypadManager.triggerKey(KeypadKeysEnum.NUM_0);
    keypadManager.triggerKey(KeypadKeysEnum.OPERATOR_SUBTRACTION);
    console.log(calculatorManager.currentValue);
    expect(calculatorManager.currentValue).toEqual(25.25);
  });
});
