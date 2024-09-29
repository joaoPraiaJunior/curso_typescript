const elementosDeTransacao = {
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioTransacao = document.querySelector(
  elementosDeTransacao.formularioTransacao
) as HTMLFormElement;

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

  let tipoTransacao: string = inputTipoTransacao.value;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  const transacao = {
    Depósito: () => (saldo += valor),
    Transferência: () => (saldo -= valor),
    "Pagamento de Boleto": () => (saldo -= valor),
  };

  if (transacao[tipoTransacao]) {
    transacao[tipoTransacao]();
  } else {
    alert("Transação inválida");
    return;
  }

  elementoValorSaldo.textContent = saldo.toString();

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: saldo,
    data: data,
  };

  console.log(novaTransacao);
  formularioTransacao.reset();
});
