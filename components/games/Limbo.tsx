
import React, { useState } from 'react';
import { Zap } from 'lucide-react';

export default function Limbo({ onResult, balance }: { onResult: (win: boolean, amount: number) => void, balance: number }) {
  const [betAmount, setBetAmount] = useState(10);
  const [target, setTarget] = useState(2.0);
  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [running, setRunning] = useState(false);

  const play = () => {
    if (balance < betAmount || running) return;
    setRunning(true);
    setMultiplier(null);

    setTimeout(() => {
      // Stake style Limbo logic
      const result = 0.99 / Math.random();
      setMultiplier(result);
      
      const win = result >= target;
      if (win) {
        onResult(true, Math.floor(betAmount * target) - betAmount);
      } else {
        onResult(false, -betAmount);
      }
      setRunning(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap size={24} className="text-[#00e701]" />
          Limbo
        </h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Tokens to Use</label>
            <input type="number" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Target Multiplier</label>
            <input type="number" step="0.1" min="1.1" value={target} onChange={(e) => setTarget(Number(e.target.value))} className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3" />
          </div>
          <button onClick={play} disabled={running} className="w-full py-4 bg-[#00e701] text-[#0f212e] rounded-lg font-black text-lg shadow-[0_4px_0_0_#00a801]">
            {running ? 'FLYING...' : 'START'}
          </button>
        </div>
      </div>
      <div className="flex-1 bg-[#1a2c38] p-8 rounded-xl border border-[#213743] flex items-center justify-center">
        <div className={`text-6xl font-black italic tracking-tighter ${multiplier ? (multiplier >= target ? 'text-[#00e701]' : 'text-red-500') : 'text-gray-600'}`}>
          {multiplier ? `${multiplier.toFixed(2)}x` : '0.00x'}
        </div>
      </div>
    </div>
  );
}
