import { settings } from "./settings.js";
import { app } from './app.js';

class Calculator {

  calculator(clicked) {
    if (clicked === 'result') {
      this.handleClickResultButton();
    } else if (clicked === 'clear') {
      this.handleClickClearButton();
    } else if (clicked === 'del') {
      this.handleClickDelButton();
    } else if (clicked.startsWith('action')) {
      this.handleClickActionButton(clicked);
    } else if (clicked.startsWith('memo')) {
      this.handleClickMemoButton(clicked);
    } else if (clicked === 'dot') {
      this.handleClickDotButton();
    } else if (clicked.startsWith('number')) {
      this.handleClickNumberButton(clicked);
    }
  }

  handleClickNumberButton(clicked) {
    !app.action ? app.number1 += clicked.replace('number', '') : app.number2 += clicked.replace('number', '');
    this.clearOutputBox();
    this.printOutputBox(app.number1, app.action, app.number2)
  }

  handleClickDotButton() {
    !app.action ? app.number1 += '.' : app.number2 += '.';
    this.clearOutputBox();
    this.printOutputBox(app.number1, app.action, app.number2)
  }

  handleClickActionButton(clicked) {
    switch (clicked.replace('action', '')) {
      case '_plus':
        app.action = '+';
        break;
      case '_minus':
        app.action = '-';
        break;
      case '_multi':
        app.action = '*';
        break;
      case '_divide':
        app.action = '/';
        break;
      case '_modulo':
        app.action = '%';
        break;
    }
    this.clearOutputBox();
    this.printOutputBox(app.number1, app.action, app.number2);
  }

  handleClickClearButton() {
    app.initVariables();
    this.clearOutputBox();
    this.printOutputBox(settings.messages.clear);
    this.deactivateError();
  }

  handleClickDelButton() {
    !app.number2 ? app.number1 = app.number1.slice(0, -1) : app.number2 = app.number2.slice(0, -1);
    this.clearOutputBox();
    this.printOutputBox(app.number1, app.action, app.number2);
  }

  handleClickResultButton() {
    let finalResult = '';
    switch (app.action) {
      case '+':
        finalResult = parseFloat(app.number1) + parseFloat(app.number2);
        break;
      case '-':
        finalResult = parseFloat(app.number1) - parseFloat(app.number2);
        break;
      case '*':
        finalResult = parseFloat(app.number1) * parseFloat(app.number2);
        break;
      case '/':
        (app.number2 !== '0') ? finalResult = (parseFloat(app.number1) / parseFloat(app.number2)) : finalResult = NaN;
        break;
      case '%':
        finalResult = parseFloat(app.number1) % parseFloat(app.number2);
        break;
    }
    if (isNaN(finalResult)) {
      finalResult = settings.messages.error;
      this.activateError();
    }
    app.number1 = finalResult.toString();
    app.number2 = '';
    app.action = '';
    this.clearOutputBox();
    this.printOutputBox(finalResult);
  }

  handleClickMemoButton(clicked) {
    switch (clicked) {
      case 'memo_plus':
        if (app.number1) {
          app.memory.memo1 = app.number1;
          app.memory.activateMemory();
        }
        if (app.number2) {
          app.memory.memo2 = app.number2;
          app.memory.activateMemory();
       }
       break;
      case 'memo_minus':
        if (!app.number1) {
          app.number1 = app.memory.memo1;
          app.number2 = app.memory.memo2;
        } else {
          (app.memory.memo2) ? app.number2 = app.memory.memo2 : app.number2 = app.memory.memo1;
        }
        this.clearOutputBox();
        this.printOutputBox(app.number1, app.action, app.number2);
        break;
      case 'memo_remove':
        app.memory.initMemory();
        app.memory.deactivateMemory();
    }
  }

  activateError() {
    document.getElementById(settings.attributes.output).classList.add(settings.classes.error);
    document.getElementById(settings.attributes.clear).classList.add(settings.classes.error);
  }

  deactivateError() {
    document.getElementById(settings.attributes.output).classList.remove(settings.classes.error);
    document.getElementById(settings.attributes.clear).classList.remove(settings.classes.error);
  }

  printOutputBox(first, second = '', third = '') {
    let div = document.createElement(settings.attributes.div);
    const msg = `${first} ${second} ${third}`;
    div.innerHTML = msg;
    document.getElementById(settings.attributes.output).appendChild(div);
  }

  clearOutputBox() {
    document.getElementById(settings.attributes.output).innerHTML = '';
  }
}

export default Calculator;
