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
      [TipoTransacao.DEPOSITO]: () => (saldo += novaTransacao.valor),
      [TipoTransacao.TRANSFERENCIA]: () => (saldo -= novaTransacao.valor),
      [TipoTransacao.PAGAMENTO_BOLETO]: () => (saldo -= novaTransacao.valor),
    };

    if (transacao[novaTransacao.tipoTransacao]) {
      transacao[novaTransacao.tipoTransacao]();
    } else {
      throw new Error("Tipo de transação inválida");
      return;
    }

    console.log(novaTransacao);
  },
};

export default conta;
