export type Invoice = {
  total: number;
};

export type Receipt = {
  total: number;
  deposit: number;
  change: number;
};

export type Payment = {
  type: 'COUPON' | 'CASH';
  percentage?: number;
  amount?: number;
};

export function charge(invoice: Invoice, payments: Payment[]) {
  const total = invoice.total;
  let deposit = 0;
  let remain = total;

  payments.forEach((payment) => {
    if (payment.percentage) {
      remain = Math.floor((remain * payment.percentage) / 100);
    } else if (payment.type === 'COUPON' && payment.amount) {
      remain -= payment.amount;
    } else if (payment.amount) {
      deposit += payment.amount;
    }
  });

  if (remain > deposit) {
    throw new Error('Shortage');
  }
  
  if (remain === 0 && deposit > 0) {
    throw new Error('OverCharge');
  }

  return {
    total: total,
    deposit: deposit + (total - remain),
    change: remain > 0 ? deposit - remain : 0,
  };
}
