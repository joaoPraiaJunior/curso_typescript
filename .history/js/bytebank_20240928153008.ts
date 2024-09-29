const elementos = {
  valorSaldo: '[data-js="valor-saldo"]',
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioDeTransacao = document.querySelector(
  elementos.formularioTransacao
) as HTMLFormElement;
const elementoValorSaldo = document.querySelector(
  elementos.valorSaldo
) as HTMLElement;
let saldo = 3000;

elementoValorSaldo.textContent = saldo.toString();

formularioDeTransacao.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formularioDeTransacao.checkValidity()) {
    alert("Preencha todos os campos");
    return;
  }

  const inputTipoTransacao =
    formularioDeTransacao.tipoTransacao as HTMLSelectElement;
  const inputValor = formularioDeTransacao.valor as HTMLInputElement;
  const inputData = formularioDeTransacao.data as HTMLInputElement;

  let tipoTranscao: string = inputTipoTransacao.value;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  const transacao = {
    Depósito: () => (saldo += valor),
    Transferência: () => (saldo -= valor),
    "Pagamento de Boleto": () => (saldo -= valor),
  };

  if (transacao[tipoTranscao]) {
    transacao[tipoTranscao]();
  } else {
    alert("Transação inválida");
    return;
  }

  elementoValorSaldo.textContent = saldo.toString();

  const novaTransacao = {
    tipoTranscao: tipoTranscao,
    valor: saldo,
    data: data,
  };

  console.log(novaTransacao);
  formularioDeTransacao.reset();
});
