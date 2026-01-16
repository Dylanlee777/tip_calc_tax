
import React, { useState, useMemo } from 'react';
import InputScreen from './components/InputScreen';
import ResultsScreen from './components/ResultsScreen';
import { CalculationState, CalculationResult } from './types';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'input' | 'results'>('input');
  const [state, setState] = useState<CalculationState>({
    billAmount: 100,
    taxMode: 'Yes, it does',
    taxAmount: 10,
    tipPercentage: 15,
    numPeople: 1,
  });

  const results = useMemo((): CalculationResult => {
    let subtotal: number;
    let taxAmount: number = state.taxAmount;
    let baseForTip: number;

    if (state.taxMode === 'Yes, it does') {
      // The input amount is the bill including tax.
      // We subtract the tax amount to get the pre-tax subtotal.
      const totalPostTax = state.billAmount;
      subtotal = Math.max(0, totalPostTax - taxAmount);
      baseForTip = subtotal;
    } else {
      // The input amount is the pre-tax subtotal.
      subtotal = state.billAmount;
      baseForTip = subtotal;
    }

    const tipAmount = baseForTip * (state.tipPercentage / 100);
    const totalPayable = subtotal + taxAmount + tipAmount;
    const perPerson = totalPayable / Math.max(1, state.numPeople);

    return {
      subtotal,
      taxAmount,
      tipAmount,
      totalPayable,
      perPerson,
    };
  }, [state]);

  const handleUpdateState = (updates: Partial<CalculationState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleCalculate = () => {
    setCurrentScreen('results');
  };

  const handleReset = () => {
    setCurrentScreen('input');
    // Keep settings but reset amount for new use
    setState(prev => ({ ...prev, billAmount: 0, numPeople: 1 }));
  };

  return (
    <div className="relative h-screen w-full max-w-[430px] mx-auto flex flex-col overflow-hidden border-x border-gray-100 dark:border-gray-800 bg-background-light dark:bg-background-dark">
      {currentScreen === 'input' ? (
        <InputScreen 
          state={state} 
          onUpdate={handleUpdateState} 
          onCalculate={handleCalculate}
          summaryResults={results}
        />
      ) : (
        <ResultsScreen 
          state={state} 
          results={results} 
          onUpdate={handleUpdateState}
          onBack={handleReset} 
        />
      )}
    </div>
  );
};

export default App;
