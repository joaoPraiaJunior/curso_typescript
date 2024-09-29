import { TipoTransacao } from './TipoTransacao.js';
let saldo = JSON.parse(localStorage.getItem('saldo')) || 0;
const transacoes = JSON.parse(localStorage.getItem('transacoes'), (chave, valor) => {
    if (chave === 'data') {
        return new Date(valor);
    }
    return valor;
}) || [];
function debitarSaldo(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser debitado deve ser maior que zero!');
    }
    if (valor > saldo) {
        throw new Error('Saldo insuficiente!');
    }
    saldo -= valor;
    localStorage.setItem('saldo', saldo.toString());
}
function depositarSaldo(valor) {
    if (valor <= 0) {
        throw new Error('O valor a ser depositado deve ser maior que zero!');
    }
    saldo += valor;
    localStorage.setItem('saldo', saldo.toString());
}
const conta = {
    pegaSaldo() {
        return saldo;
    },
    pegaDataAcesso() {
        return new Date();
    },
    pegaGruposTransacoes() {
        const gruposTransacoes = [];
        const listaTransacoes = structuredClone(transacoes);
        const transacoesOrdenadas = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao = '';
        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
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
    },
    registrarTransacao(novaTransacao) {
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
        }
        else {
            throw new Error('Tipo de transação inválida');
        }
        transacoes.push(novaTransacao);
        console.log(this.pegaGruposTransacoes());
        localStorage.setItem('transacoes', JSON.stringify(transacoes));
    },
    agruparTransacoes() {
        const resumo = {
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
