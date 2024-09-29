import conta from "../tipos/Conta.js";
import { TipoTransacao } from "../tipos/TipoTransacao.js";
import { Transacao } from "../tipos/Transacao.js";
import extratoComponente from "./extrato-componente.js";
import saldoComponente from "./saldo-componente.js";

const elementos = {
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioTransacao = document.querySelector(
  elementos.formularioTransacao
) as HTMLFormElement;

formularioTransacao.addEventListener("submit", (event) => {
  try {
    event.preventDefault();
    if (!formularioTransacao.checkValidity()) {
      alert("Preencha todos os campos");
      return;
    }

    const inputTipoTransacao =
      formularioTransacao.tipoTransacao as HTMLSelectElement;
    const inputValor = formularioTransacao.valor as HTMLInputElement;
    const inputData = formularioTransacao.data as HTMLInputElement;

    let tipoTransacao: TipoTransacao =
      inputTipoTransacao.value as TipoTransacao;
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value + " 00:00:00");

    const novaTransacao: Transacao = {
      tipoTransacao: tipoTransacao,
      valor: valor,
      data: data,
    };

    conta.registrarTransacao(novaTransacao);
    saldoComponente.atualizar();
    extratoComponente.atualizar();

    formularioTransacao.reset();
  } catch (error) {
    alert(error.message);
  }
});
