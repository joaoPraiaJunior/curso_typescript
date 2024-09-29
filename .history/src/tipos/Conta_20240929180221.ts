import { GrupoTransacao } from "./GruposTransacoes.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  nome: string;
  saldo: number = JSON.parse(localStorage.getItem("saldo") || "0");
  transacoes: Transacao[] =
    JSON.parse(localStorage.getItem("transacoes"), (chave, valor) => {
      if (chave === "data") {
        return new Date(valor);
      }
      return valor;
    }) || [];

  constructor(nome: string) {
    this.nome = nome;
  }

  pegaGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
    const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let labelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );
      if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
        labelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1).transacoes.push(transacao);
    }

    return gruposTransacoes;
  }

  pegaSaldo() {
    return saldo;
  }

  pegaDataAcesso(): Date {
    return new Date();
  }
}

const conta = new Conta("João Praia Junior");

export default Conta;
