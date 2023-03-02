const KeypadEventsEnum = {
  KEY_TRIGGERED: "key-triggered",
};

class KeypadManager {
  constructor() {
    this.keyMap = new Map();
  }

  _validateKey(key) {
    if (typeof key !== "number" || !isFinite(key)) {
      throw new Error("invalid key");
    }
  }

  _validateAction(action) {
    if (typeof action !== "function") {
      throw new Error("action must be a function");
    }
  }

  _checkDuplicates(key) {
    if (this.keyMap.has(key)) {
      throw new Error("key was already registered");
    }
  }

  _getValidAction(key) {
    const action = this.keyMap.get(key);
    if (!action) {
      throw new Error("key not registered");
    }
    return action;
  }

  registerKey(key, action) {
    this._validateKey(key);
    this._validateAction(action);
    this._checkDuplicates(key);
    this.keyMap.set(key, action);
  }

  triggerKey(key) {
    const action = this._getValidAction(key);
    action();
  }
}

module.exports = { KeypadManager, KeypadEventsEnum };
