let number1 = "";
let number2 = "";
let action = "";
let memory = "";
let finalResult = 0;

const wrapper = document.querySelector('.wrapper');
wrapper.addEventListener('click', event => {
  event.preventDefault();
  const clicked = event.target.getAttribute('id');

  if (clicked === 'result') {
    handleClickResultButton();
  } else if (clicked === 'clear') {
    handleClickClearButton();
  } else if (clicked === 'del') {
    handleClickDelButton();
  } else if (clicked.startsWith('action')) {
    handleClickActionButton(clicked);
  } else if (clicked.startsWith('memo')) {
    handleClickMemoButton(clicked);
  } else {
    handleClickNumberButton(clicked);
  }
});

const handleClickNumberButton = clicked => {
  if (!action) {
    number1 += clicked.replace("number", "");
  } else {
    number2 += clicked.replace("number", "");
  }
  clearOutputBox();
  printOutputBox(number1, action, number2)
}

const handleClickActionButton = clicked => {
  action = clicked.replace('action', '');
  clearOutputBox();
  printOutputBox(number1, action, number2);
}

const handleClickClearButton = () => {
  number1 = '';
  number2 = '';
  action = '';
  clearOutputBox();
  printOutputBox('clear');
}

const handleClickDelButton = () => {
  if (!number2) {
    number1 = number1.slice(0, -1);
    clearOutputBox();
    printOutputBox(number1, action, number2);
  } else {
    number2 = number2.slice(0, -1);
    clearOutputBox();
    printOutputBox(number1, action, number2);
  }
}

const handleClickResultButton = () => {
  if (action === '+') {
    finalResult = parseFloat(number1) + parseFloat(number2);
  } else if (action === '-') {
    finalResult = parseFloat(number1) - parseFloat(number2);
  } else if (action === '*') {
    finalResult = parseFloat(number1) * parseFloat(number2);
  } else if (action === '/') {
    finalResult = parseFloat(number1) / parseFloat(number2);
  } else if (action === '%') {
    finalResult = parseFloat(number1) % parseFloat(number2);
  } else {
    finalResult = 0;
  }
  number1 = finalResult;
  number2 = '';
  action = '';
  clearOutputBox();
  printOutputBox(finalResult);
}

const handleClickMemoButton = clicked => {
  if (clicked === 'memo+') {
    if (number1) {
      memory = number1;
      activeMemoryButton();
    }
    if (action) {
      memory += action;
      activeMemoryButton();
    }
    if (number2) {
      memory += number2;
      activeMemoryButton();
   }
  } else if (clicked === 'memo-') {
  if (!number1) {
    number1 = memory;
    if (!memory) {
      clearOutputBox();
      printOutputBox('memo empty');
    }
  } else {
    number2 = memory;
  }
  clearOutputBox();
  printOutputBox(number1, action, number2);
} else if (clicked === 'memo_remove') {
  memory = 'memo empty';
  clearOutputBox();
  printOutputBox('memo clear');
  deactiveMemoryButton();
} }

const activeMemoryButton = () => {
  document.getElementById('memo+').classList.add('active');
}

const deactiveMemoryButton = () => {
  document.getElementById('memo+').classList.remove('active');
}

const printOutputBox = (first, second = '', third = '') => {
  let div = document.createElement('div');
  const msg = `${first} ${second} ${third}`;
  div.innerHTML = msg;
  document.getElementById('output').appendChild(div);
}

const clearOutputBox = () => {
  document.getElementById('output').innerHTML = '';
}
