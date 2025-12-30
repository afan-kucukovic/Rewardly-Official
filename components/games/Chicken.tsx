
import React, { useState } from 'react';
import { Bird, Play, ArrowUp } from 'lucide-react';
import confetti from 'canvas-confetti';

const LANES = 10;
const MULTIPLIERS = [1.2, 1.5, 2.0, 3.0, 5.0, 8.0, 15.0, 30.0, 60.0, 100.0];

export default function Chicken({ onResult, balance }: { onResult: (win: boolean, amount: number) => void, balance: number }) {
  const [betAmount, setBetAmount] = useState(1);
  const [currentLane, setCurrentLane] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'dead'>('idle');

  const startGame = () => {
    if (balance < betAmount) return;
    setGameState('playing');
    setCurrentLane(0);
  };

  const moveUp = () => {
    if (gameState !== 'playing') return;
    
    // 85% success rate for initial lanes, gets harder
    const successRate = 0.90 - (currentLane * 0.04);
    if (Math.random() < successRate) {
      if (currentLane + 1 === LANES) {
        // Grand prize
        const win = Math.floor(betAmount * MULTIPLIERS[LANES-1]);
        onResult(true, win - betAmount);
        setGameState('idle');
        confetti({ particleCount: 200, spread: 120 });
      } else {
        setCurrentLane(prev => prev + 1);
      }
    } else {
      // Died
      setGameState('dead');
      onResult(false, -betAmount);
    }
  };

  const cashOut = () => {
    if (gameState !== 'playing' || currentLane === 0) return;
    const win = Math.floor(betAmount * MULTIPLIERS[currentLane - 1]);
    onResult(true, win - betAmount);
    setGameState('idle');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Bird size={24} className="text-[#00e701]" />
          Chicken Cross
        </h2>
        
        <div className="space-y-4">
          <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Bet Tokens</label>
          <input 
            type="number"
            disabled={gameState === 'playing'}
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 text-white focus:outline-none focus:border-[#00e701]"
          />

          {gameState === 'playing' ? (
            <>
              <button 
                onClick={moveUp}
                className="w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-lg font-black text-lg shadow-[0_4px_0_0_#00a801] flex items-center justify-center gap-2"
              >
                <ArrowUp /> JUMP NEXT LANE
              </button>
              <button 
                onClick={cashOut}
                disabled={currentLane === 0}
                className="w-full py-3 bg-[#2f4553] hover:bg-[#3d5a6d] text-white rounded-lg font-bold disabled:opacity-50"
              >
                CASH OUT ({currentLane > 0 ? (betAmount * MULTIPLIERS[currentLane-1]).toFixed(0) : 0} Tokens)
              </button>
            </>
          ) : (
            <button 
              onClick={startGame}
              className="w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-lg font-black text-lg shadow-[0_4px_0_0_#00a801]"
            >
              START RUN
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 bg-[#1a2c38] p-8 rounded-xl border border-[#213743] min-h-[500px] flex flex-col relative overflow-hidden">
        {/* Road lanes */}
        <div className="flex-1 flex flex-col-reverse gap-2">
          {Array.from({ length: LANES }).map((_, i) => (
            <div 
              key={i} 
              className={`h-10 border-y border-[#213743] flex items-center justify-between px-4 transition-colors ${
                currentLane === i && gameState !== 'dead' ? 'bg-[#00e701]/10' : 'bg-[#0f212e]/50'
              }`}
            >
              <span className="text-[10px] font-bold text-gray-600">LANE {i+1}</span>
              <span className="text-sm font-black text-[#00e701]">{MULTIPLIERS[i]}x</span>
              {currentLane === i && gameState !== 'dead' && (
                <div className="absolute left-1/2 -translate-x-1/2 transition-all duration-300">
                  <Bird className="text-yellow-400 animate-bounce" size={24} />
                </div>
              )}
              {currentLane === i && gameState === 'dead' && (
                <div className="absolute left-1/2 -translate-x-1/2 text-red-500 font-black">X_X</div>
              )}
            </div>
          ))}
          <div className="h-12 bg-gray-800 border-t-2 border-gray-600 flex items-center justify-center font-black text-xs">STARTING ZONE</div>
        </div>

        {gameState === 'dead' && (
          <div className="absolute inset-0 bg-red-500/80 flex flex-center flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
            <h3 className="text-4xl font-black mb-2">HIT!</h3>
            <p className="font-bold mb-4">The chicken didn't make it.</p>
            <button onClick={() => setGameState('idle')} className="bg-white text-red-600 px-8 py-2 rounded-full font-black">TRY AGAIN</button>
          </div>
        )}
      </div>
    </div>
  );
}
