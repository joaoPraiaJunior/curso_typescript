import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo = 3000;

function debitarSaldo(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser debitado deve ser maior que zero!");
  }

  if (valor > saldo) {
    throw new Error("Saldo insuficiente!");
  }

  saldo -= valor;
}

function depositarSaldo(valor: number): void {
  if (valor <= 0) {
    throw new Error("O valor a ser depositado deve ser maior que zero!");
  }
  saldo += valor;
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

    console.log(novaTransacao);
  },
};

export default conta;
