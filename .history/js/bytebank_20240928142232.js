const elementos = {
  valor: '[data-js="valor"]',
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const valor = document.querySelector(elementos.valor);
let saldo = 3000;

valor.textContent = saldo;
