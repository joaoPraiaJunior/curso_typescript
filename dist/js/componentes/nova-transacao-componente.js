import conta from "../tipos/Conta.js";
import extratoComponente from "./extrato-componente.js";
import saldoComponente from "./saldo-componente.js";
const elementos = {
    formularioTransacao: '[data-js="formulario-transacao"]',
};
const formularioTransacao = document.querySelector(elementos.formularioTransacao);
formularioTransacao.addEventListener("submit", (event) => {
    try {
        event.preventDefault();
        if (!formularioTransacao.checkValidity()) {
            alert("Preencha todos os campos");
            return;
        }
        const inputTipoTransacao = formularioTransacao.tipoTransacao;
        const inputValor = formularioTransacao.valor;
        const inputData = formularioTransacao.data;
        let tipoTransacao = inputTipoTransacao.value;
        let valor = inputValor.valueAsNumber;
        let data = new Date(inputData.value + " 00:00:00");
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            valor: valor,
            data: data,
        };
        conta.registrarTransacao(novaTransacao);
        saldoComponente.atualizar();
        extratoComponente.atualizar();
        formularioTransacao.reset();
    }
    catch (error) {
        alert(error.message);
    }
});
