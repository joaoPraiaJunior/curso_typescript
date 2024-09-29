function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
}

function formatarData(
  data: Date,
  formato: FormatoData = FormatoData.PADRAO
): string {
  const formatacaoDaData = {
    [FormatoData.PADRAO]: () => data.toLocaleDateString("pt-BR", {}),
    [FormatoData.DIA_SEMANA_DIA_MES_ANO]: "EEEE, dd/MM/yyyy",
    [FormatoData.DIA_MES]: "dd/MM",
  };
}
