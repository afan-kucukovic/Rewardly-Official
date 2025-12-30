
import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Coinflip({ onResult, balance }: { onResult: (win: boolean, amount: number) => void, balance: number }) {
  const [betAmount, setBetAmount] = useState(10);
  const [side, setSide] = useState<'heads' | 'tails'>('heads');
  const [flipping, setFlipping] = useState(false);
  const [result, setResult] = useState<'heads' | 'tails' | null>(null);

  const flip = () => {
    if (balance < betAmount || flipping) return;
    setFlipping(true);
    setResult(null);

    setTimeout(() => {
      const outcome = Math.random() > 0.5 ? 'heads' : 'tails';
      setResult(outcome);
      const win = outcome === side;
      onResult(win, win ? betAmount : -betAmount);
      if (win) confetti({ particleCount: 80 });
      setFlipping(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Coins size={24} className="text-[#00e701]" />
          Coinflip
        </h2>
        <div className="space-y-6">
          <input 
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3"
          />
          <div className="flex gap-2">
            <button 
              onClick={() => setSide('heads')}
              className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${side === 'heads' ? 'border-[#00e701] bg-[#00e701]/10 text-[#00e701]' : 'border-[#213743] text-gray-400'}`}
            >
              HEADS
            </button>
            <button 
              onClick={() => setSide('tails')}
              className={`flex-1 py-3 rounded-lg font-bold border-2 transition-all ${side === 'tails' ? 'border-[#00e701] bg-[#00e701]/10 text-[#00e701]' : 'border-[#213743] text-gray-400'}`}
            >
              TAILS
            </button>
          </div>
          <button 
            onClick={flip}
            disabled={flipping}
            className="w-full py-4 bg-[#00e701] text-[#0f212e] rounded-lg font-black text-lg shadow-[0_4px_0_0_#00a801]"
          >
            {flipping ? 'FLIPPING...' : 'FLIP COIN'}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#1a2c38] p-8 rounded-xl border border-[#213743] flex items-center justify-center">
        <div className={`w-32 h-32 rounded-full border-8 border-yellow-600 bg-yellow-400 flex items-center justify-center text-yellow-800 font-black text-4xl shadow-xl transition-all duration-1000 transform ${flipping ? 'animate-spin' : ''}`}>
          {result === 'heads' ? 'H' : result === 'tails' ? 'T' : side === 'heads' ? 'H' : 'T'}
        </div>
      </div>
    </div>
  );
}
