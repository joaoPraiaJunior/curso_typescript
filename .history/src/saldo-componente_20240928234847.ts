const elementosDeSaldo = {
  valorSaldo: '[data-js="valor-saldo"]',
  dataSaldo: '[data-js="data-saldo"]',
};

const elementoDataSaldo = document.querySelector(elementosDeSaldo.dataSaldo);
const elementoValorSaldo = document.querySelector(
  elementosDeSaldo.valorSaldo
) as HTMLElement;
let saldo: number = 3000;

if (elementoValorSaldo !== null) {
  elementoValorSaldo.textContent = saldo.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
}

if (elementoDataSaldo !== null) {
  const dataAtual: Date = new Date();
  elementoDataSaldo.textContent = dataAtual
    .toLocaleDateString("pt-BR", {
      weekday: "long",
    })
    .charAt(0)
    .toUpperCase();
}
