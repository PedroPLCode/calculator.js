import { settings } from "./settings.js";
import Memory from "./Memory.js";
import Calculator from "./Calculator.js";

export const app = {
  init: function() {
    this.initVariables();
    this.initCalculator();
    this.initMemory();
    this.getElements();
    this.initActions();
  },

  initVariables() {
    this.number1 = '';
    this.number2 = '';
    this.action = '';
  },

  initCalculator() {
    this.app = new Calculator();
  },

  initMemory() {
    this.memory = new Memory();
  },

  getElements() {
    this.dom = {
      wrapper: document.querySelector(settings.dom.wrapper),
    }
  },

  initActions() {
    this.dom.wrapper.addEventListener('click', event => {
    event.preventDefault();
    const clicked = event.target.getAttribute(settings.attributes.id);
    this.app.calculator(clicked);
    });
  }
}

app.init();
