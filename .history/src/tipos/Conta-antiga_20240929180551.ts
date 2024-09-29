import { ResumoTransacoes } from "./ResumoTransacoes.js";
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



 

  registrarTransacao(novaTransacao: Transacao): void {
    const transacao = {
      [TipoTransacao.DEPOSITO]: () => depositarSaldo(novaTransacao.valor),
      [TipoTransacao.TRANSFERENCIA]: () => {
        debitarSaldo(novaTransacao.valor);
        novaTransacao.valor *= -1;
      },
      [TipoTransacao.PAGAMENTO_BOLETO]: () => {
        debitarSaldo(novaTransacao.valor);
        novaTransacao.valor *= -1;
      },
    };

    if (transacao[novaTransacao.tipoTransacao]) {
      transacao[novaTransacao.tipoTransacao]();
    } else {
      throw new Error("Tipo de transação inválida");
    }

    transacoes.push(novaTransacao);
    console.log(this.pegaGruposTransacoes());
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },

  agruparTransacoes(): ResumoTransacoes {
    const resumo: ResumoTransacoes = {
      totalDepositos: 0,
      totalTransferencias: 0,
      totalPagamentosBoleto: 0,
    };

    this.transacoes.forEach((transacao) => {
      switch (transacao.tipoTransacao) {
        case TipoTransacao.DEPOSITO:
          resumo.totalDepositos += transacao.valor;
          break;

        case TipoTransacao.TRANSFERENCIA:
          resumo.totalTransferencias += transacao.valor;
          break;

        case TipoTransacao.PAGAMENTO_BOLETO:
          resumo.totalPagamentosBoleto += transacao.valor;
          break;
      }
    });

    return resumo;
  },
};

export default conta;
