
import React, { useState } from 'react';
import { Target, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Soccer({ onResult, balance }: { onResult: (win: boolean, amount: number) => void, balance: number }) {
  const [betAmount, setBetAmount] = useState(5);
  const [result, setResult] = useState<'idle' | 'goal' | 'saved'>('idle');
  const [loading, setLoading] = useState(false);

  const shoot = (direction: 'left' | 'center' | 'right') => {
    if (balance < betAmount || loading) return;
    
    setLoading(true);
    setResult('idle');
    
    setTimeout(() => {
      const goalieDirection = ['left', 'center', 'right'][Math.floor(Math.random() * 3)];
      const isGoal = direction !== goalieDirection;
      
      if (isGoal) {
        setResult('goal');
        onResult(true, Math.floor(betAmount * 1.5) - betAmount);
        confetti({ particleCount: 100, spread: 60 });
      } else {
        setResult('saved');
        onResult(false, -betAmount);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target size={24} className="text-[#00e701]" />
          Penalty Shootout
        </h2>
        
        <div className="space-y-4">
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Bet Amount</label>
          <input 
            type="number"
            value={betAmount}
            disabled={loading}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 text-white focus:outline-none focus:border-[#00e701]"
          />
          <p className="text-xs text-gray-500 italic">Win 1.5x your tokens if you score!</p>
        </div>
      </div>

      <div className="flex-1 bg-[#1a2c38] p-8 rounded-xl border border-[#213743] min-h-[400px] flex flex-col items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/grass.png')]">
        <div className="w-full max-w-md border-x-8 border-t-8 border-white h-48 relative mb-12 bg-black/20">
          <div className={`absolute bottom-0 w-12 h-20 bg-blue-500 rounded-t-lg transition-all duration-500 transform ${loading ? 'animate-pulse' : ''} left-1/2 -translate-x-1/2`}>
             <div className="text-[10px] text-center mt-2 font-bold text-white uppercase">GK</div>
          </div>
          
          {result === 'goal' && <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-[#00e701] drop-shadow-lg">GOAL!</div>}
          {result === 'saved' && <div className="absolute inset-0 flex items-center justify-center text-4xl font-black text-red-500 drop-shadow-lg">SAVED!</div>}
        </div>

        <div className="flex gap-4">
          <button 
            disabled={loading}
            onClick={() => shoot('left')}
            className="bg-[#2f4553] hover:bg-[#3d5a6d] px-6 py-3 rounded-lg font-bold border-b-4 border-[#0f212e] active:border-b-0 disabled:opacity-50"
          >
            LEFT
          </button>
          <button 
            disabled={loading}
            onClick={() => shoot('center')}
            className="bg-[#2f4553] hover:bg-[#3d5a6d] px-6 py-3 rounded-lg font-bold border-b-4 border-[#0f212e] active:border-b-0 disabled:opacity-50"
          >
            CENTER
          </button>
          <button 
            disabled={loading}
            onClick={() => shoot('right')}
            className="bg-[#2f4553] hover:bg-[#3d5a6d] px-6 py-3 rounded-lg font-bold border-b-4 border-[#0f212e] active:border-b-0 disabled:opacity-50"
          >
            RIGHT
          </button>
        </div>
      </div>
    </div>
  );
}
