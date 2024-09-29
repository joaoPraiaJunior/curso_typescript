const elementos = {
  valor: '[data-js="valor"]',
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioTransacao = document.querySelector(
  elementos.formularioTransacao
);
const valor = document.querySelector(elementos.valor);
let saldo = 3000;

valor.textContent = saldo;

formularioTransacao.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formularioTransacao.checkValidity()) {
    alert("Preencha todos os campos");
    return;
  }
});
