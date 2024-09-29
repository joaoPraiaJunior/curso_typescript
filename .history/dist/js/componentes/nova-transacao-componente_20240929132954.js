const elementosDeTransacao = {
    formularioTransacao: '[data-js="formulario-transacao"]',
};
const formularioTransacao = document.querySelector(elementosDeTransacao.formularioTransacao);
formularioTransacao.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!formularioTransacao.checkValidity()) {
        alert("Preencha todos os campos");
        return;
    }
    const inputTipoTransacao = formularioTransacao.tipoTransacao;
    const inputValor = formularioTransacao.valor;
    const inputData = formularioTransacao.data;
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    const transacao = {
        [TipoTransacao.DEPOSITO]: () => (saldo += valor),
        [TipoTransacao.TRANSFERENCIA]: () => (saldo -= valor),
        [TipoTransacao.PAGAMENTO_BOLETO]: () => (saldo -= valor),
    };
    if (transacao[tipoTransacao]) {
        transacao[tipoTransacao]();
    }
    else {
        alert("Transação inválida");
        return;
    }
    elementoValorSaldo.textContent = formatarMoeda(saldo);
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data,
    };
    console.log(novaTransacao);
    formularioTransacao.reset();
});
