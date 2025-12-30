
import React, { useState } from 'react';
import { Dice5 } from 'lucide-react';

export default function Dice({ onResult, balance }: { onResult: (win: boolean, amount: number) => void, balance: number }) {
  const [betAmount, setBetAmount] = useState(10);
  const [prediction, setPrediction] = useState(50);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    if (balance < betAmount || rolling) return;
    setRolling(true);
    setLastRoll(null);

    setTimeout(() => {
      const roll = Math.floor(Math.random() * 100);
      setLastRoll(roll);
      const win = roll > prediction;
      
      if (win) {
        // Multiplier based on difficulty
        const multiplier = 100 / (100 - prediction);
        onResult(true, Math.floor(betAmount * multiplier) - betAmount);
      } else {
        onResult(false, -betAmount);
      }
      setRolling(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Dice5 size={24} className="text-[#00e701]" />
          Dice Over
        </h2>
        <div className="space-y-6">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Bet Amount</label>
            <input 
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Roll Over: {prediction}</label>
            <input 
              type="range"
              min="2"
              max="98"
              value={prediction}
              onChange={(e) => setPrediction(Number(e.target.value))}
              className="w-full h-2 bg-[#0f212e] rounded-lg appearance-none cursor-pointer accent-[#00e701]"
            />
            <div className="flex justify-between text-[10px] text-gray-500 mt-1 uppercase font-bold">
              <span>Low Risk</span>
              <span>High Risk</span>
            </div>
          </div>
          <button 
            onClick={rollDice}
            disabled={rolling}
            className="w-full py-4 bg-[#00e701] text-[#0f212e] rounded-lg font-black text-lg shadow-[0_4px_0_0_#00a801]"
          >
            {rolling ? 'ROLLING...' : 'ROLL DICE'}
          </button>
        </div>
      </div>

      <div className="flex-1 bg-[#1a2c38] p-8 rounded-xl border border-[#213743] flex flex-col items-center justify-center">
        <div className="w-full bg-[#0f212e] h-4 rounded-full relative mb-12">
           <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#213743] -translate-y-1/2" />
           {lastRoll !== null && (
             <div 
               className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-lg flex items-center justify-center font-black transition-all ${lastRoll > prediction ? 'bg-[#00e701] text-[#0f212e]' : 'bg-red-500 text-white'}`}
               style={{ left: `${lastRoll}%` }}
             >
               {lastRoll}
             </div>
           )}
           <div className="absolute top-0 bottom-0 border-l-4 border-white" style={{ left: `${prediction}%` }} />
        </div>
        <p className="text-gray-500 font-bold uppercase tracking-widest">Prediction: Over {prediction}</p>
      </div>
    </div>
  );
}
