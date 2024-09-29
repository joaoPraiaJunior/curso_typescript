const elementosDeValor = {
  valorSaldo: '[data-js="valor-saldo"]',
};

const elementoValorSaldo = document.querySelector(
  elementosDeValor.valorSaldo
) as HTMLElement;
let saldo: number = 3000;

if (elementoValorSaldo !== null) {
  elementoValorSaldo.textContent = saldo.toString();
}
