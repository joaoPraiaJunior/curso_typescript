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
    [FormatoData.PADRAO]: () => data.toLocaleDateString("pt-BR"),
    [FormatoData.DIA_SEMANA_DIA_MES_ANO]: () =>
      data.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    [FormatoData.DIA_MES]: () =>
      data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
  };
}
