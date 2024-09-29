import conta from "../tipos/Conta.js";
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

if (elementoDataSaldo !== null) {
  elementoDataSaldo.textContent = formatarData(
    conta.pegaDataAcesso(),
    FormatoData.DIA_SEMANA_DIA_MES_ANO
  );

  elementoDataSaldo.setAttribute(
    "datetime",
    conta.pegaDataAcesso().toISOString().split("T")[0]
  );
}

renderizarSaldo();

function renderizarSaldo(): void {
  if (elementoValorSaldo !== null) {
    elementoValorSaldo.textContent = formatarMoeda(conta.pegaSaldo());
  }
}

const saldoComponente = {
  atualizar() {
    renderizarSaldo();
  },
};

export default saldoComponente;
