let screen = document.querySelector("#actual");
let historyScreen = document.querySelector("#history");
let subtract = document.querySelector("#subtract");
let addition = document.querySelector("#addition");
let multiply = document.querySelector("#multiply");
let division = document.querySelector("#division");
let equal = document.querySelector("#equal");
let numbers = "";
let history = "";
let result = "";
let calcStored = "";
let a;
let b;


//"Função" que é ativada quando algum botão do teclado é pressionado no Body ou seja, na página do site em si, após receber a tecla pressionada ele verifica se foi alguma das teclas na quais possuem funções que foi criada para elas.
document
  .querySelector("body")
  .addEventListener("keydown", function verifyKeyPressed({ key }) {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    const operations = ["-", "+", "*", "/"];

    if (numbers.includes(key)) numberPressed(key);
    else if (operations.includes(key) && subtract.disabled == false)
      calcPressed(key);
    else if (key == "Enter" && equal.disabled == false) {
      resultPressed();
    } else if (key == "Backspace") {
      backspacePressed();
    }
  });


//Função chamada quando algum número é pressionado.
function numberPressed(nmbr) {
  let verify = verifyPoint(nmbr);
  if (verify === true && numbers.length != 14) {
    if (numbers === "0") {
      numbers = "";
      history = "";
    }
    numbers += nmbr;
    history += nmbr;
    screenNumberUpdate(numbers);
  } else {
    return;
  }
}

//Função que verifica se o número pressionado é um ponto e faz algumas outras verificações por ex: se não ter nenhum número na tela quando o ponto é pressionado ele adiciona um 0 na frente igual as calculadoras comuns, também verifica se já há um ponto no número da Atual, caso haja ele só retorna a função e o botão de . não isere valor nenhum no numero Atual.
function verifyPoint(nmbr) {
  if (numbers.length != 14 && nmbr == "." && (numbers.length == 0 || numbers == '0' )) {
    numbers = "0" + nmbr;
    history = "0" + nmbr;
    screenNumberUpdate(numbers);
    return false;
  } else if (nmbr == "." && numbers.includes(".")) {
    return false;
  } else {
    return true;
  }
}

//Função chamada quando algum botão de calculo por ex: '/', é pressionado.
function calcPressed(calc) {
  a = parseFloat(numbers);
  history = history + `${calc}`;
  historyScreen.innerText = history;

  switch (calc) { 
    case "+": calcStored = "+"; break;
    case "-": calcStored = "-"; break;
    case "/": calcStored = "/"; break;
    case "*": calcStored = "*"; break;
  }

  equalDisabled("no");
  calcButtonsDisabled("y");
  clearScreen();
}


//Função chamada quando o botão de backspace é pressionado.
function backspacePressed() {
  if (!(numbers.length == 0)) {
    numbers = numbers.substring(0, numbers.length - 1);
    history = history.substring(0, history.length - 1);
    screenNumberUpdate(numbers);
    return;
  } else {
    return;
  }
}


//Função chamada quando o botão '=' é pressionado.
function resultPressed() {
  if (numbers != "") {
    b = parseFloat(numbers);
    calculate();
    equalDisabled("y");
  }
}


//Função na qual faz o calculo da calculadora.
function calculate() {
  historyScreen.innerText = history + "=";
  numbers = "";

  if (isNaN(a)) {
    a = result;
  }

  switch (calcStored) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "/":
      if (b == 0) {
        screen.innerText = "INDEFINIDA.";
        setTimeout(() => {
          clearPressed();
        }, 2200);
        return;
      }
      result = a / b; 
      break;

    case "*":
      result = a * b;
      break;
  }

  if (result.toString().length > 14) {
    result = result.toExponential(3);
  }

  numbers = result.toString();
  history = result.toString();
  calcButtonsDisabled("no");
  screenNumberUpdate(numbers);
}

//Função que atualiza o número na tela.
function screenNumberUpdate(nmbr) {
  screen.innerText = nmbr;
}


//Função chamada quando o botão de limpar tudo(AC "All Clear") é pressionado, também pode ser chamado quando precisar limpar todo o contéudo e variáveis do código.
function clearPressed() {
  a = 0;
  b = 0;
  history = "";
  clearScreen();
  calcButtonsDisabled("no");
  historyScreen.innerText = "";
}

//Função que limpa somente os números na tela e a variável que guardava o número da tela.
function clearScreen() {
  screen.innerText = "";
  numbers = "";
}

//Função que Desabilita ou Habilita o botão de Igual '='.
function equalDisabled(disableOrNo) {
  if (disableOrNo == "y") {
    equal.disabled = true;
  } else {
    equal.disabled = false;
  }
}

//Função que Desabilita ou Habilita os botões de cálculo.
function calcButtonsDisabled(disableOrNo) {
  if (disableOrNo == "y") {
    subtract.disabled = true;
    addition.disabled = true;
    multiply.disabled = true;
    division.disabled = true;
  } else {
    subtract.disabled = false;
    addition.disabled = false;
    multiply.disabled = false;
    division.disabled = false;
  }
}
