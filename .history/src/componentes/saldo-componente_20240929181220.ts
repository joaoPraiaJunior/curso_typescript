import Conta from "../tipos/Conta.js";
import { FormatoData } from "../tipos/FormatoData.js";
import { formatarData, formatarMoeda } from "../uteis/formatadores.js";

const elementos = {
  valorSaldo: '[data-js="valor-saldo"]',
  dataSaldo: '[data-js="data-saldo"]',
};

const elementoDataSaldo = document.querySelector(elementos.dataSaldo);
const elementoValorSaldo = document.querySelector(
  elementos.valorSaldo
) as HTMLElement;

if (elementoDataSaldo !== null) {
  elementoDataSaldo.textContent = formatarData(
    Conta.pegaDataAcesso(),
    FormatoData.DIA_SEMANA_DIA_MES_ANO
  );

  elementoDataSaldo.setAttribute(
    "datetime",
    Conta.pegaDataAcesso().toISOString().split("T")[0]
  );
}

renderizarSaldo();

function renderizarSaldo(): void {
  if (elementoValorSaldo !== null) {
    elementoValorSaldo.textContent = formatarMoeda(Conta.pegaSaldo());
  }
}

const saldoComponente = {
  atualizar() {
    renderizarSaldo();
  },
};

export default saldoComponente;
