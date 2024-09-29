import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo = JSON.parse(localStorage.getItem("saldo")) || 0;
const transacoes: Transacao[] =
  JSON.parse(localStorage.getItem("transacoes"), (chave, valor) => {
    if (chave === "data") {
      return new Date(valor);
    }
    return valor;
  }) || [];

function debitarSaldo(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero!");
  }

  if (valor > saldo) {
    throw new Error("Saldo insuficiente!");
  }

  saldo -= valor;
  localStorage.setItem("saldo", saldo.toString());
}

function depositarSaldo(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que zero!");
  }
  saldo += valor;
  localStorage.setItem("saldo", saldo.toString());
}

const conta = {
  pegaSaldo() {
    return saldo;
  },

  pegaDataAcesso(): Date {
    return new Date();
  },

  registrarTransacao(novaTransacao: Transacao): void {
    const transacao = {
      [TipoTransacao.DEPOSITO]: () => depositarSaldo(novaTransacao.valor),
      [TipoTransacao.TRANSFERENCIA]: () => debitarSaldo(novaTransacao.valor),
      [TipoTransacao.PAGAMENTO_BOLETO]: () => debitarSaldo(novaTransacao.valor),
    };

    if (transacao[novaTransacao.tipoTransacao]) {
      transacao[novaTransacao.tipoTransacao]();
    } else {
      throw new Error("Tipo de transação inválida");
    }

    transacoes.push(novaTransacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },
};

export default conta;
