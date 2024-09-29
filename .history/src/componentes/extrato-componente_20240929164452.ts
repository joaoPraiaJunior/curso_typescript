import conta from "../tipos/Conta.js";
import { GrupoTransacao } from "../tipos/GruposTransacoes.js";

const elementos = {
  extrato: '[data-js="extrato"]',
};

const elementoExtrato: HTMLElement = document.querySelector(elementos.extrato);

function redenrizarExtrato(): void {
  const gruposTransacoes: GrupoTransacao[] = conta.pegaGruposTransacoes();
}
