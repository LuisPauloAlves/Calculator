const { expect } = require("@jest/globals");
const { KeypadManager } = require("./KeypadManager");

describe("Keypad Manager", () => {
  test("instantiates KeypadManager", () => {
    const keypadManager = new KeypadManager();
    expect(keypadManager).toBeInstanceOf(KeypadManager);
  });

  test("registers a key with an action", () => {
    const keypadManager = new KeypadManager();
    const actionFn = jest.fn();
    keypadManager.registerKey(70, actionFn);
    expect(keypadManager.keyMap.get(70)).toBe(actionFn);
  });

  test("throws an error for invalid key type", () => {
    const keypadManager = new KeypadManager();
    const actionFn = jest.fn();
    const keyArray = ["", "ab", -300, null, undefined, NaN, Infinity, () => {}];
    keyArray.forEach((key) => {
      const run = () => keypadManager.registerKey(key, actionFn);
      expect(run).toThrowError(new Error("invalid key"));
    });
  });

  test("throws an error for invalid action type", () => {
    const keypadManager = new KeypadManager();
    const actionArray = ["", "ab", -300, null, undefined];
    actionArray.forEach((action) => {
      const run = () => keypadManager.registerKey(70, action);
      expect(run).toThrowError(new Error("action must be a function"));
    });
  });

  test("throws an error for duplicated key assignment", () => {
    const keypadManager = new KeypadManager();
    const actionFn = jest.fn();
    const run = () => keypadManager.registerKey(70, actionFn);
    expect(run).not.toThrowError();
    expect(run).toThrowError(new Error("tried to assign the same key again"));
  });

  test("presses a registered key", () => {
    const keypadManager = new KeypadManager();
    const actionFn = jest.fn();
    keypadManager.registerKey(70, actionFn);
    keypadManager.pressKey(70);
    expect(actionFn).toBeCalledTimes(1);
  });
});
