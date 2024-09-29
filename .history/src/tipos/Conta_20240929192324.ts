import { GrupoTransacao } from './GruposTransacoes.js';
import { ResumoTransacoes } from './ResumoTransacoes.js';
import { TipoTransacao } from './TipoTransacao.js';
import { Transacao } from './Transacao.js';

let saldo = JSON.parse(localStorage.getItem('saldo')) || 0;
const transacoes: Transacao[] =
	JSON.parse(localStorage.getItem('transacoes'), (chave, valor) => {
		if (chave === 'data') {
			return new Date(valor);
		}
		return valor;
	}) || [];

function debitarSaldo(valor: number): void {
	if (valor <= 0) {
		throw new Error('O valor a ser debitado deve ser maior que zero!');
	}

	if (valor > saldo) {
		throw new Error('Saldo insuficiente!');
	}

	saldo -= valor;
	localStorage.setItem('saldo', saldo.toString());
}

function depositarSaldo(valor: number): void {
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

	pegaDataAcesso(): Date {
		return new Date();
	},

	pegaGruposTransacoes(): GrupoTransacao[] {
		const gruposTransacoes: GrupoTransacao[] = [];
		const listaTransacoes: Transacao[] = structuredClone(transacoes);
		const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
		let labelAtualGrupoTransacao: string = '';

		for (let transacao of transacoesOrdenadas) {
			let labelGrupoTransacao: string = transacao.data.toLocaleDateString('pt-br', { month: 'long', year: 'numeric' });
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
			throw new Error('Tipo de transação inválida');
		}

		transacoes.push(novaTransacao);
		console.log(this.pegaGruposTransacoes());
		localStorage.setItem('transacoes', JSON.stringify(transacoes));
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
