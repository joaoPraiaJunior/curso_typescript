const elementosDeSaldo = {
    valorSaldo: '[data-js="valor-saldo"]',
    dataSaldo: '[data-js="data-saldo"]',
};
const elementoDataSaldo = document.querySelector(elementosDeSaldo.dataSaldo);
const elementoValorSaldo = document.querySelector(elementosDeSaldo.valorSaldo);
let saldo = 3000;
if (elementoValorSaldo !== null) {
    elementoValorSaldo.textContent = formatarMoeda(saldo);
}
if (elementoDataSaldo !== null) {
    const dataAtual = new Date();
    elementoDataSaldo.textContent = formatarData(dataAtual, FormatoData.DIA_SEMANA_DIA_MES_ANO);
    elementoDataSaldo.setAttribute("datetime", dataAtual.toISOString().split("T")[0]);
}
