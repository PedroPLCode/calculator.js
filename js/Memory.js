import { settings } from "./settings.js";

class Memory {
  constructor() {
  this.initMemory();
  }

  initMemory() {
    this.memo1 = '';
    this.memo2 = '';
  }

  activateMemory() {
    document.getElementById(settings.attributes.memo).classList.add(settings.classes.active);
  }

  deactivateMemory() {
    document.getElementById(settings.attributes.memo).classList.remove(settings.classes.active);
  }
}

export default Memory;
