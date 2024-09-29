import conta from "../tipos/Conta.js";
import { FormatoData } from "../tipos/FormatoData.js";
import { GrupoTransacao } from "../tipos/GruposTransacoes.js";
import { formatarData, formatarMoeda } from "../uteis/formatadores";

const elementos = {
  extrato: '[data-js="extrato"]',
};

const elementoRegistroDeTransacoesExtrato: HTMLElement = document.querySelector(
  elementos.extrato
);

function redenrizarExtrato(): void {
  const gruposTransacoes: GrupoTransacao[] = conta.pegaGruposTransacoes();
  let htmlRegistroDeTransacoes: string = "";

  for (let grupoTransacao of gruposTransacoes) {
    let htmlTransacaoItem: string = "";

    for (let transacao of grupoTransacao.transacoes) {
      htmlTransacaoItem += `
        <div class="transacao-item">
            <div class="transacao-info">
                <span class="tipo">${transacao.tipoTransacao}</span>
                <strong class="valor">${formatarMoeda(transacao.valor)}</strong>
        </div>
        <time class="data">${formatarData(
          transacao.data,
          FormatoData.DIA_MES
        )}</time>
    </div>
    `;
    }

    htmlRegistroDeTransacoes += `
    <div class="transacoes-group">
        <strong class="mes-group">${grupoTransacao.label}</strong>
        ${htmlTransacaoItem}
    </div>
`;
  }
}
