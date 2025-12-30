
import React, { useState } from 'react';
import { Layers } from 'lucide-react';
import confetti from 'canvas-confetti';

const ROWS = 8;
const TILES_PER_ROW = 3;
const MULTIPLIERS = [1.5, 2.5, 4.0, 7.5, 15.0, 30.0, 75.0, 200.0];

export default function Tower({ onResult, balance }: { onResult: (win: boolean, amount: number) => void, balance: number }) {
  const [betAmount, setBetAmount] = useState(10);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'dead'>('idle');
  const [currentRow, setCurrentRow] = useState(0);
  const [mineIndex, setMineIndex] = useState(0);

  const startGame = () => {
    if (balance < betAmount) return;
    setGameState('playing');
    setCurrentRow(0);
    setMineIndex(Math.floor(Math.random() * TILES_PER_ROW));
  };

  const pickTile = (index: number) => {
    if (gameState !== 'playing') return;

    if (index === mineIndex) {
      setGameState('dead');
      onResult(false, -betAmount);
    } else {
      if (currentRow + 1 === ROWS) {
        onResult(true, Math.floor(betAmount * MULTIPLIERS[ROWS-1]) - betAmount);
        setGameState('idle');
        confetti({ particleCount: 200 });
      } else {
        setCurrentRow(prev => prev + 1);
        setMineIndex(Math.floor(Math.random() * TILES_PER_ROW));
      }
    }
  };

  const cashOut = () => {
    if (gameState !== 'playing' || currentRow === 0) return;
    onResult(true, Math.floor(betAmount * MULTIPLIERS[currentRow-1]) - betAmount);
    setGameState('idle');
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Layers size={24} className="text-[#00e701]" />
          Tower Climb
        </h2>
        <div className="space-y-4">
          <input type="number" value={betAmount} disabled={gameState === 'playing'} onChange={(e) => setBetAmount(Number(e.target.value))} className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3" />
          {gameState === 'playing' ? (
            <button onClick={cashOut} className="w-full py-4 bg-[#00e701] text-[#0f212e] rounded-lg font-black shadow-[0_4px_0_0_#00a801]">
              CASH OUT ({currentRow > 0 ? (betAmount * MULTIPLIERS[currentRow-1]).toFixed(0) : 0} tokens)
            </button>
          ) : (
            <button onClick={startGame} className="w-full py-4 bg-[#00e701] text-[#0f212e] rounded-lg font-black shadow-[0_4px_0_0_#00a801]">
              PLAY
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 bg-[#1a2c38] p-8 rounded-xl border border-[#213743] flex flex-col-reverse gap-2">
        {MULTIPLIERS.map((m, i) => (
          <div key={i} className={`flex gap-2 p-2 rounded transition-colors ${currentRow === i ? 'bg-[#00e701]/10 border border-[#00e701]' : 'bg-[#0f212e]'}`}>
            <span className="w-12 text-[10px] font-bold text-gray-500 self-center">{m}x</span>
            {Array.from({ length: TILES_PER_ROW }).map((_, j) => (
              <button 
                key={j} 
                disabled={currentRow !== i || gameState !== 'playing'}
                onClick={() => pickTile(j)}
                className={`flex-1 h-8 rounded border transition-all ${currentRow === i && gameState === 'playing' ? 'bg-[#2f4553] hover:bg-[#3d5a6d] border-[#213743]' : 'bg-gray-800/30 border-transparent'}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
