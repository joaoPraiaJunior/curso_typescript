function formatarMoeda(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    currency: "BRL",
    style: "currency",
  });
}

function formatarData(data: Date, formato): string {
  return data.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
