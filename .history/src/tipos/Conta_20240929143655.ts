import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo = 3000;

function debitarSaldo(valor: number): void {
  if (saldo < valor) {
    throw new Error("O valor a ser debitado deve ser maior que zero!");
  }

  saldo -= valor;
}

function depositarSaldo(valor: number): void {
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
      [TipoTransacao.DEPOSITO]: () => (saldo += novaTransacao.valor),
      [TipoTransacao.TRANSFERENCIA]: debitarSaldo(novaTransacao.valor),
      [TipoTransacao.PAGAMENTO_BOLETO]: debitarSaldo(novaTransacao.valor),
    };

    if (transacao[novaTransacao.tipoTransacao]) {
      transacao[novaTransacao.tipoTransacao];
    } else {
      throw new Error("Tipo de transação inválida");
    }

    console.log(novaTransacao);
  },
};

export default conta;
