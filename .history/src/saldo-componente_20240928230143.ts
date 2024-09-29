const elementos = {
  valorSaldo: '[data-js="valor-saldo"]',
};

const elementoValorSaldo = document.querySelector(
  elementos.valorSaldo
) as HTMLElement;
let saldo: number = 3000;

if (elementoValorSaldo !== null) {
  elementoValorSaldo.textContent = saldo.toString();
}
