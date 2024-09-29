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

  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  if (tipoTransacao == TipoTransacao.DEPOSITO) {
    saldo += valor;
  } else if (
    tipoTransacao == TipoTransacao.TRANSFERENCIA ||
    tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
  ) {
    saldo -= valor;
  } else {
    alert("Tipo de Transação é inválido!");
    return;
  }

  elementoValorSaldo.textContent = saldo.toString();

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  formularioTransacao.reset();
});
