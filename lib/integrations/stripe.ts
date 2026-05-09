// stub
// Fake Stripe integration — no real SDK call. Returns a deterministic invoice
// shape useful for demo/testing purposes only.

export type FakeInvoice = {
  id: string;
  status: 'paid';
  amount: number;
};

export async function chargeCustomer(
  id: string,
  amountCents: number
): Promise<FakeInvoice> {
  return {
    id: `inv_${id}_${Date.now()}`,
    status: 'paid',
    amount: amountCents,
  };
}
