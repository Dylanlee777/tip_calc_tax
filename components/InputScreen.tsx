
import React from 'react';
import { CalculationState, CalculationResult, TaxMode } from '../types';

interface InputScreenProps {
  state: CalculationState;
  onUpdate: (updates: Partial<CalculationState>) => void;
  onCalculate: () => void;
  summaryResults: CalculationResult;
}

const InputScreen: React.FC<InputScreenProps> = ({ state, onUpdate, onCalculate, summaryResults }) => {
  const tipPresets = [15, 18, 20];

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-0 justify-between">
        <div className="text-primary flex size-12 shrink-0 items-center justify-start cursor-pointer">
          <span className="material-symbols-outlined text-[24px]">chevron_left</span>
        </div>
        <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight tracking-tight flex-1 text-center pr-12 font-display uppercase tracking-[0.1em]">Tip Calculator</h2>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        {/* Bill Input Section */}
        <div className="pt-4 pb-6 text-center">
          <p className="text-slate-500 dark:text-[#92adc9] text-[11px] font-bold leading-normal mb-1 font-display uppercase tracking-[0.15em]">
            {state.taxMode === 'Yes, it does' ? 'Total Bill (Post-Tax)' : 'Bill Amount (Pre-Tax)'}
          </p>
          <div className="relative flex items-center justify-center pt-2">
            <span className="text-primary text-[32px] font-bold absolute left-[20%]">$</span>
            <input 
              autoFocus
              type="number" 
              inputMode="decimal"
              className="bg-transparent border-none text-slate-900 dark:text-white tracking-tight text-[64px] font-extrabold leading-tight text-center focus:ring-0 w-full placeholder:text-slate-300 dark:placeholder-slate-800"
              placeholder="0"
              value={state.billAmount || ''}
              onChange={(e) => onUpdate({ billAmount: parseFloat(e.target.value) || 0 })}
            />
          </div>
          
          {/* Pre-tax display for 'Yes, it does' (post-tax) mode */}
          {state.taxMode === 'Yes, it does' && state.billAmount > 0 && (
            <div className="mt-2 flex justify-center animate-in fade-in zoom-in duration-300">
              <div className="bg-slate-100 dark:bg-[#111a22] px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Pre-tax Subtotal:</span>
                <span className="text-[12px] font-bold text-slate-700 dark:text-slate-300">${summaryResults.subtotal.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Tax Settings Section */}
        <div className="mb-6 bg-white dark:bg-[#1a2632]/40 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="text-slate-900 dark:text-white text-[12px] font-bold leading-tight pb-3 font-display uppercase tracking-wider text-center">does this bill amount include tax or not?</h3>
          
          <div className="flex py-1">
            <div className="flex h-11 flex-1 items-center justify-center rounded-xl bg-slate-100 dark:bg-[#111a22] p-1">
              {(['No, it does not', 'Yes, it does'] as TaxMode[]).map((mode) => (
                <label 
                  key={mode}
                  className={`flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-lg px-2 text-[13px] font-bold transition-all
                    ${state.taxMode === mode 
                      ? 'bg-white dark:bg-[#1a2632] shadow-md text-slate-900 dark:text-white' 
                      : 'text-slate-500 dark:text-[#92adc9]'}`}
                >
                  <span className="truncate">{mode}</span>
                  <input 
                    className="hidden" 
                    type="radio" 
                    name="tax-mode" 
                    value={mode}
                    checked={state.taxMode === mode}
                    onChange={() => onUpdate({ taxMode: mode })}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-[13px] font-bold text-slate-500 dark:text-slate-400">Tax Amount</span>
            <div className="flex items-center bg-slate-100 dark:bg-[#111a22] rounded-xl px-4 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
              <span className="text-[12px] font-bold text-slate-400 mr-1">$</span>
              <input 
                className="w-16 bg-transparent border-none p-0 text-[14px] font-extrabold text-right focus:ring-0 text-slate-900 dark:text-white" 
                type="number"
                step="0.01"
                placeholder="0.00"
                value={state.taxAmount || ''}
                onChange={(e) => onUpdate({ taxAmount: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>

        {/* Tip Selection Section */}
        <div className="mb-6">
          <div className="flex justify-between items-end mb-4 px-1">
            <h3 className="text-slate-900 dark:text-white text-sm font-bold leading-tight font-display uppercase tracking-wider">Select Tip %</h3>
            <span className="text-primary text-[18px] font-extrabold">{Math.round(state.tipPercentage)}%</span>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-6">
            {tipPresets.map(preset => (
              <button 
                key={preset}
                onClick={() => onUpdate({ tipPercentage: preset })}
                className={`flex items-center justify-center py-4 rounded-xl text-[14px] font-extrabold transition-all border
                  ${state.tipPercentage === preset 
                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white dark:bg-[#1a2632]/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white'}`}
              >
                {preset}%
              </button>
            ))}
            <button 
              className={`flex flex-col items-center justify-center py-2 rounded-xl text-[14px] font-extrabold transition-all border
                ${!tipPresets.includes(state.tipPercentage)
                  ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                  : 'bg-white dark:bg-[#1a2632]/40 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-white'}`}
              onClick={() => {
                const custom = prompt('Enter custom tip percentage:', state.tipPercentage.toString());
                if (custom !== null) onUpdate({ tipPercentage: parseFloat(custom) || 0 });
              }}
            >
              <span className="text-[9px] uppercase font-bold opacity-60 tracking-wider">Custom</span>
              <span className="material-symbols-outlined text-[18px]">edit</span>
            </button>
          </div>

          <div className="px-1">
            <input 
              className="w-full h-1 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-primary" 
              max="50" 
              min="0" 
              type="range"
              value={state.tipPercentage}
              onChange={(e) => onUpdate({ tipPercentage: parseInt(e.target.value) })}
            />
            <div className="flex justify-between mt-3 px-1">
              <span className="text-[10px] font-bold text-slate-400">0%</span>
              <span className="text-[10px] font-bold text-slate-400">25%</span>
              <span className="text-[10px] font-bold text-slate-400">50%</span>
            </div>
          </div>
        </div>

        {/* Summary Preview Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-[#1a2632]/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <p className="text-[9px] uppercase font-extrabold text-primary tracking-[0.15em] mb-2">Tip Amount</p>
            <p className="text-[22px] font-extrabold text-slate-900 dark:text-white">${summaryResults.tipAmount.toFixed(2)}</p>
          </div>
          <div className="bg-white dark:bg-[#1a2632]/40 border border-slate-200 dark:border-slate-800 rounded-2xl p-4">
            <p className="text-[9px] uppercase font-extrabold text-slate-500 tracking-[0.15em] mb-2">Each Pays</p>
            <p className="text-[22px] font-extrabold text-slate-900 dark:text-white">${summaryResults.perPerson.toFixed(2)}</p>
          </div>
        </div>
      </main>

      <div className="p-6">
        <button 
          onClick={onCalculate}
          className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl shadow-xl shadow-primary/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] text-[15px]"
        >
          <span>Calculate Total</span>
          <span className="material-symbols-outlined text-xl">calculate</span>
        </button>
      </div>
    </div>
  );
};

export default InputScreen;
