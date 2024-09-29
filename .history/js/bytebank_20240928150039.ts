const elementos = {
  valor: '[data-js="valor-saldo"]',
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioTransacao = document.querySelector(
  elementos.formularioTransacao
) as HTMLFormElement;
const elementoValorSaldo = document.querySelector(
  elementos.valor
) as HTMLElement;
let saldo = 3000;

elementoValorSaldo.textContent = saldo.toString();

formularioTransacao.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formularioTransacao.checkValidity()) {
    alert("Preencha todos os campos");
    return;
  }

  const inputTipoTransacao = formularioTransacao.tipoTransacao;
  const inputValor = formularioTransacao.valor;
  const inputData = formularioTransacao.data;

  let tipoTranscao = inputTipoTransacao.value;
  let valor = inputValor.value;
  let data = inputData.value;

  const transacao = {
    Depósito: () => (saldo += parseFloat(valor)),
    Transferência: () => (saldo -= parseFloat(valor)),
    "Pagamento de Boleto": () => (saldo -= parseFloat(valor)),
  };

  if (transacao[tipoTranscao]) {
    transacao[tipoTranscao]();
  } else {
    alert("Transação inválida");
    return;
  }

  elementoValorSaldo.textContent = saldo;

  const novaTransacao = {
    tipoTranscao: tipoTranscao,
    valor: saldo,
    data: data,
  };

  console.log(novaTransacao);
  formularioTransacao.reset();
});
