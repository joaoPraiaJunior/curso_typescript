const elementos = {
  valorSaldo: '[data-js="valor-saldo"]',
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioTransacao = document.querySelector(
  elementos.formularioTransacao
) as HTMLFormElement;
const elementoValorSaldo = document.querySelector(
  elementos.valorSaldo
) as HTMLElement;
let saldo: number = 3000;

elementoValorSaldo.textContent = saldo.toString();

formularioTransacao.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formularioTransacao.checkValidity()) {
    alert("Preencha todos os campos");
    return;
  }

  const inputTipoTransacao =
    formularioTransacao.tipoTransacao as HTMLSelectElement;
  const inputValor = formularioTransacao.valor as HTMLInputElement;
  const inputData = formularioTransacao.data as HTMLInputElement;

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
  formularioTransacao.reset();
});
