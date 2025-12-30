
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Bomb, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MinesProps {
  onResult: (win: boolean, amount: number) => void;
  balance: number;
}

const GRID_SIZE = 25;

const Mines: React.FC<MinesProps> = ({ onResult, balance }) => {
  const [betAmount, setBetAmount] = useState(10);
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'revealing'>('idle');
  const [minePositions, setMinePositions] = useState<number[]>([]);
  const [revealedTiles, setRevealedTiles] = useState<number[]>([]);
  const [lastTileClicked, setLastTileClicked] = useState<number | null>(null);

  const startGame = () => {
    if (balance < betAmount) return;
    
    const mines: number[] = [];
    while (mines.length < mineCount) {
      const pos = Math.floor(Math.random() * GRID_SIZE);
      if (!mines.includes(pos)) mines.push(pos);
    }
    
    setMinePositions(mines);
    setRevealedTiles([]);
    setGameState('playing');
    setLastTileClicked(null);
  };

  const handleTileClick = (index: number) => {
    if (gameState !== 'playing' || revealedTiles.includes(index)) return;

    if (minePositions.includes(index)) {
      // Game Over - Hit a mine
      setGameState('revealing');
      setLastTileClicked(index);
      onResult(false, -betAmount);
    } else {
      // Safe tile
      const newRevealed = [...revealedTiles, index];
      setRevealedTiles(newRevealed);
    }
  };

  const cashOut = () => {
    if (gameState !== 'playing' || revealedTiles.length === 0) return;
    
    const multiplier = calculateMultiplier(revealedTiles.length, mineCount);
    const profit = Math.floor(betAmount * multiplier) - betAmount;
    
    setGameState('revealing');
    onResult(true, profit);
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  };

  const calculateMultiplier = (revealed: number, mines: number) => {
    // Basic probability-based multiplier
    let prob = 1;
    for (let i = 0; i < revealed; i++) {
      prob *= (GRID_SIZE - mines - i) / (GRID_SIZE - i);
    }
    return 0.95 / prob; // 5% house edge
  };

  const currentMultiplier = revealedTiles.length > 0 ? calculateMultiplier(revealedTiles.length, mineCount).toFixed(2) : '1.00';

  return (
    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      <div className="w-full lg:w-1/3 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <ShieldCheck size={24} className="text-[#00e701]" />
          Mines Setup
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Tokens to Use</label>
            <input 
              type="number" 
              value={betAmount} 
              disabled={gameState === 'playing'}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-4 font-bold focus:outline-none focus:border-[#00e701]"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Mines ({mineCount})</label>
            <input 
              type="range" 
              min="1" 
              max="24" 
              value={mineCount}
              disabled={gameState === 'playing'}
              onChange={(e) => setMineCount(Number(e.target.value))}
              className="w-full h-2 bg-[#0f212e] rounded-lg appearance-none cursor-pointer accent-[#00e701]"
            />
          </div>

          {gameState === 'playing' ? (
            <button 
              onClick={cashOut}
              className="w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-lg font-extrabold text-lg shadow-[0_4px_0_0_#00a801]"
            >
              CASH OUT ({(betAmount * parseFloat(currentMultiplier)).toFixed(0)})
            </button>
          ) : (
            <button 
              onClick={startGame}
              className="w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-lg font-extrabold text-lg shadow-[0_4px_0_0_#00a801]"
            >
              START GAME
            </button>
          )}

          {revealedTiles.length > 0 && gameState === 'playing' && (
            <div className="text-center">
              <span className="text-gray-400 text-sm">Next multiplier: </span>
              <span className="text-[#00e701] font-bold">{calculateMultiplier(revealedTiles.length + 1, mineCount).toFixed(2)}x</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
        <div className="grid grid-cols-5 gap-3">
          {Array.from({ length: GRID_SIZE }).map((_, i) => {
            const isMine = minePositions.includes(i);
            const isRevealed = revealedTiles.includes(i) || gameState === 'revealing';
            const hitThisMine = lastTileClicked === i;

            return (
              <button
                key={i}
                onClick={() => handleTileClick(i)}
                className={`aspect-square rounded-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center border-b-4 ${
                  !isRevealed 
                  ? 'bg-[#2f4553] border-[#213743] hover:bg-[#3d5a6d]' 
                  : isMine 
                    ? hitThisMine ? 'bg-red-500 border-red-700' : 'bg-[#0f212e] border-[#213743]' 
                    : 'bg-[#00e701]/20 border-[#00e701] shadow-[0_0_15px_rgba(0,231,1,0.2)]'
                }`}
              >
                {isRevealed && isMine && <Bomb size={24} className={hitThisMine ? 'text-white' : 'text-red-500'} />}
                {isRevealed && !isMine && revealedTiles.includes(i) && <Coins size={24} className="text-[#00e701]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mines;
