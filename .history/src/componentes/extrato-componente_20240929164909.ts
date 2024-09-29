import conta from "../tipos/Conta.js";
import { GrupoTransacao } from "./../../.history/src/tipos/GruposTransacoes_20240929151210";

const elementos = {
  extrato: '[data-js="extrato"]',
};

const elementoExtrato: HTMLElement = document.querySelector(elementos.extrato);

function redenrizarExtrato(): void {
  const gruposTransacoes: GrupoTransacao[] = conta.pegaGruposTransacoes();
  let htmlRegistroDeTransacoes: string = "";
  for (let GrupoTransacao of gruposTransacoes) {
    let htmlTransacaoItem: string = "";

    for (let transacao of GrupoTransacao.transacoes) {
    }
  }
}
