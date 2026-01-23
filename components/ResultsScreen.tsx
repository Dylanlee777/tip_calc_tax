
import React from 'react';
import { CalculationState, CalculationResult } from '../types';

interface ResultsScreenProps {
  state: CalculationState;
  results: CalculationResult;
  onUpdate: (updates: Partial<CalculationState>) => void;
  onBack: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ state, results, onUpdate, onBack }) => {
  const shareData = async () => {
    const text = `Bill Breakdown:\nSubtotal (Pre-tax): $${results.subtotal.toFixed(2)}\nTax: $${results.taxAmount.toFixed(2)}\nTip (${state.tipPercentage}% of subtotal): $${results.tipAmount.toFixed(2)}\nTotal: $${results.totalPayable.toFixed(2)}\nSplit between ${state.numPeople} people: $${results.perPerson.toFixed(2)} each.`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tip Breakdown',
          text: text,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      alert(text);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 ios-blur">
        <div className="flex items-center p-4 pb-2 justify-between">
          <div 
            className="text-primary flex size-12 shrink-0 items-center cursor-pointer" 
            onClick={onBack}
          >
            <span className="material-symbols-outlined text-[24px]">chevron_left</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-base font-bold leading-tight uppercase tracking-[0.15em] flex-1 text-center pr-12">Breakdown</h2>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-6 pb-12">
        {/* Total Header */}
        <div className="relative py-12 text-center">
          <div className="absolute inset-0 gradient-glow pointer-events-none opacity-50"></div>
          <p className="text-slate-500 dark:text-[#92adc9] text-[11px] font-bold uppercase tracking-[0.2em] mb-2">Final Amount</p>
          <h1 className="text-slate-900 dark:text-white tracking-tighter text-[56px] font-extrabold leading-none animate-in fade-in slide-in-from-bottom-2 duration-500">${results.totalPayable.toFixed(2)}</h1>
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1a2632]/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5">
            <div className="space-y-5">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-extrabold tracking-widest">Base Bill</span>
                  <span className="text-slate-900 dark:text-white text-base font-bold">Subtotal</span>
                </div>
                <span className="text-slate-900 dark:text-white text-[18px] font-extrabold">${results.subtotal.toFixed(2)}</span>
              </div>
              
              <div className="h-px bg-slate-100 dark:bg-slate-800/50"></div>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-extrabold tracking-widest">Tax Paid</span>
                  <span className="text-slate-900 dark:text-white text-base font-bold">Tax Amount</span>
                </div>
                <span className="text-slate-900 dark:text-white text-[18px] font-extrabold">${results.taxAmount.toFixed(2)}</span>
              </div>
              
              <div className="h-px bg-slate-100 dark:bg-slate-800/50"></div>
              
              <div className="flex justify-between items-center bg-primary/5 -mx-4 px-4 py-3 rounded-xl border border-primary/10">
                <div className="flex flex-col">
                  <span className="text-primary text-[11px] uppercase font-extrabold tracking-widest">Gratuity ({state.tipPercentage}%)</span>
                  <span className="text-primary text-base font-bold">Tip Calculated</span>
                </div>
                <span className="text-primary text-[22px] font-extrabold">${results.tipAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Splitting Section */}
          <div className="bg-white dark:bg-[#1a2632]/60 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl shadow-black/5">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col">
                <span className="text-slate-500 dark:text-slate-400 text-[11px] uppercase font-extrabold tracking-widest">Split Details</span>
                <span className="text-slate-900 dark:text-white text-base font-bold">Party Size</span>
              </div>
              <div className="flex items-center gap-5 bg-slate-100 dark:bg-[#111a22] rounded-2xl p-1.5">
                <button 
                  className="size-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary transition-transform active:scale-90"
                  onClick={() => onUpdate({ numPeople: Math.max(1, state.numPeople - 1) })}
                >
                  <span className="material-symbols-outlined text-[20px]">remove</span>
                </button>
                <span className="text-slate-900 dark:text-white font-black text-[20px] min-w-[28px] text-center">{state.numPeople}</span>
                <button 
                  className="size-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary transition-transform active:scale-90"
                  onClick={() => onUpdate({ numPeople: state.numPeople + 1 })}
                >
                  <span className="material-symbols-outlined text-[20px]">add</span>
                </button>
              </div>
            </div>
            
            <div className="bg-primary rounded-2xl p-5 flex items-center justify-between text-white shadow-lg shadow-primary/30">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">group</span>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.1em] opacity-80">Each Pays</p>
                  <p className="text-lg font-bold">Per Person</p>
                </div>
              </div>
              <span className="text-[32px] font-black leading-none">${results.perPerson.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex flex-col gap-4">
          <button 
            onClick={shareData}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-3 text-[15px]"
          >
            <span className="material-symbols-outlined text-xl">share</span>
            <span>Share This Receipt</span>
          </button>
          <button 
            onClick={onBack}
            className="w-full bg-transparent border-2 border-slate-200 dark:border-slate-800 text-slate-500 font-bold py-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all text-[14px]"
          >
            Start Over
          </button>
        </div>
      </main>
    </div>
  );
};

export default ResultsScreen;
