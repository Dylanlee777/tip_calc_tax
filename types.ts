
export type TaxMode = 'No, it does not' | 'Yes, it does';

export interface CalculationState {
  billAmount: number;
  taxMode: TaxMode;
  taxAmount: number;
  tipPercentage: number;
  numPeople: number;
}

export interface CalculationResult {
  subtotal: number;
  taxAmount: number;
  tipAmount: number;
  totalPayable: number;
  perPerson: number;
}
