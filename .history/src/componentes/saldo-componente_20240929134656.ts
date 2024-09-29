import { FormatoData } from "../tipos/FormatoData.js";
import { formatarData, formatarMoeda } from "../uteis/formatadores.js";

const elementosDeSaldo = {
  valorSaldo: '[data-js="valor-saldo"]',
  dataSaldo: '[data-js="data-saldo"]',
};

const elementoDataSaldo = document.querySelector(elementosDeSaldo.dataSaldo);
const elementoValorSaldo = document.querySelector(
  elementosDeSaldo.valorSaldo
) as HTMLElement;
let saldo: number = 3000;

if (elementoDataSaldo !== null) {
  const dataAtual: Date = new Date();
  elementoDataSaldo.textContent = formatarData(
    dataAtual,
    FormatoData.DIA_SEMANA_DIA_MES_ANO
  );

  elementoDataSaldo.setAttribute(
    "datetime",
    dataAtual.toISOString().split("T")[0]
  );
}

export function pegaSaldo(): number {
  return saldo;
}

export function atualizaSaldo(novoSaldo: number): void {
  saldo = novoSaldo;
  if (elementoValorSaldo !== null) {
    elementoValorSaldo.textContent = formatarMoeda(saldo);
  }
}
