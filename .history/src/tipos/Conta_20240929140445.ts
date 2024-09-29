import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo = 3000;

const conta = {
  pegaSaldo() {
    return saldo;
  },

  pegaDataAcesso(): Date {
    return new Date();
  },

  registrarTransacao(novaTransacao: Transacao): void {
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
  },
};
