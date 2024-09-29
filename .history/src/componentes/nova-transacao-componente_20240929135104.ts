import { TipoTransacao } from "../tipos/TipoTransacao.js";
import { Transacao } from "../tipos/Transacao.js";
import { atualizaSaldo, pegaSaldo } from "./saldo-componente.js";

const elementosDeTransacao = {
  formularioTransacao: '[data-js="formulario-transacao"]',
};

const formularioTransacao = document.querySelector(
  elementosDeTransacao.formularioTransacao
) as HTMLFormElement;

formularioTransacao.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!formularioTransacao.checkValidity()) {
    alert("Preencha todos os campos");
    return;
  }

  const inputTipoTransacao =
    formularioTransacao.tipoTransacao as HTMLSelectElement;
  const inputValor = formularioTransacao.valor as HTMLInputElement;
  const inputData = formularioTransacao.data as HTMLInputElement;

  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);
  let saldo: number = pegaSaldo();

  const transacao = {
    [TipoTransacao.DEPOSITO]: () => (saldo += valor),
    [TipoTransacao.TRANSFERENCIA]: () => (saldo -= valor),
    [TipoTransacao.PAGAMENTO_BOLETO]: () => (saldo -= valor),
  };

  if (transacao[tipoTransacao]) {
    transacao[tipoTransacao]();
  } else {
    alert("Transação inválida");
    return;
  }

  atualizaSaldo(saldo);

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data,
  };

  console.log(novaTransacao);
  formularioTransacao.reset();
});
