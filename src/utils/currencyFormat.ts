

export const currencyFormat = (value: number) => {
  return new Intl.NumberFormat('es-CO', { 
    style: 'currency', 
    currency: 'COP',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  }).format(value);
};