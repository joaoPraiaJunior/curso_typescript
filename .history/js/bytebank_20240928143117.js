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

  const inputTipoTransacao = formularioTransacao.tipoTranscao;
  const inputValor = formularioTransacao.valor;
  const inputData = formularioTransacao.data;

  let tipoTranscao = inputTipoTransacao.value;
  let valor = inputValor.value;
  let data = inputData.value;

  const novaTransacao = {
    tipoTranscao: tipoTranscao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
});
