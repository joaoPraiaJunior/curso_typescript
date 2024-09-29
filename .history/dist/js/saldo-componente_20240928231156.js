const elementosDeValor = {
    valorSaldo: '[data-js="valor-saldo"]',
};
const elementoValorSaldo = document.querySelector(elementosDeValor.valorSaldo);
let saldo = 3000;
if (elementoValorSaldo !== null) {
    elementoValorSaldo.textContent = saldo.toString();
}
