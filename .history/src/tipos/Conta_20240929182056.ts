import { GrupoTransacao } from "./GruposTransacoes.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
  nome: string;
  private saldo: number = JSON.parse(localStorage.getItem("saldo") || "0");
  private transacoes: Transacao[] =
    JSON.parse(localStorage.getItem("transacoes"), (chave, valor) => {
      if (chave === "data") {
        return new Date(valor);
      }
      return valor;
    }) || [];

  constructor(nome: string) {
    this.nome = nome;
  }

  public getTitular(): string {
    return this.nome;
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
    return this.saldo;
  }

  pegaDataAcesso(): Date {
    return new Date();
  }

  debitarSaldo(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser debitado deve ser maior que zero!");
    }

    if (valor > this.saldo) {
      throw new Error("Saldo insuficiente!");
    }

    this.saldo -= valor;
    localStorage.setItem("saldo", this.saldo.toString());
  }

  depositarSaldo(valor: number): void {
    if (valor <= 0) {
      throw new Error("O valor a ser depositado deve ser maior que zero!");
    }
    this.saldo += valor;
    localStorage.setItem("saldo", this.saldo.toString());
  }

  registrarTransacao(novaTransacao: Transacao): void {
    const transacao = {
      [TipoTransacao.DEPOSITO]: () => this.depositarSaldo(novaTransacao.valor),
      [TipoTransacao.TRANSFERENCIA]: () => {
        this.debitarSaldo(novaTransacao.valor);
        novaTransacao.valor *= -1;
      },
      [TipoTransacao.PAGAMENTO_BOLETO]: () => {
        this.debitarSaldo(novaTransacao.valor);
        novaTransacao.valor *= -1;
      },
    };

    if (transacao[novaTransacao.tipoTransacao]) {
      transacao[novaTransacao.tipoTransacao]();
    } else {
      throw new Error("Tipo de transação inválida");
    }

    this.transacoes.push(novaTransacao);
    console.log(this.pegaGruposTransacoes());
    localStorage.setItem("transacoes", JSON.stringify(this.transacoes));
  }
}

const conta = new Conta("João Praia Junior");

export default conta;
