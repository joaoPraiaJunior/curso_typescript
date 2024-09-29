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
}
