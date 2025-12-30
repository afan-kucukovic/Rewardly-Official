
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Bird, Coins, Dice5, Gamepad2, Zap, Layers } from 'lucide-react';

const games = [
  { id: 'mines', name: 'Mines', icon: ShieldCheck, color: 'bg-orange-500', path: '/mines', desc: 'Avoid the hidden bombs' },
  { id: 'chicken', name: 'Chicken', icon: Bird, color: 'bg-yellow-500', path: '/chicken', desc: 'Cross the road for tokens' },
  { id: 'soccer', name: 'Soccer', icon: Target, color: 'bg-green-500', path: '/soccer', desc: 'Shoot penalties for goals' },
  { id: 'dice', name: 'Dice', icon: Dice5, color: 'bg-blue-500', path: '/dice', desc: 'Roll the dice and predict' },
  { id: 'coinflip', name: 'Coinflip', icon: Coins, color: 'bg-yellow-600', path: '/coinflip', desc: 'Double your tokens on a flip' },
  { id: 'limbo', name: 'Limbo', icon: Zap, color: 'bg-red-500', path: '/limbo', desc: 'Target a multiplier and win' },
  { id: 'tower', name: 'Tower', icon: Layers, color: 'bg-emerald-600', path: '/tower', desc: 'Climb for higher rewards' },
];

export default function GamesLobby() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black italic">GAME LOBBY</h1>
          <p className="text-gray-400 mt-1">Select a simulator to start earning tokens</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            key={game.id} 
            to={game.path}
            className="group bg-[#1a2c38] rounded-2xl border border-[#213743] overflow-hidden hover:border-[#00e701] transition-all hover:-translate-y-1 shadow-lg"
          >
            <div className={`h-32 ${game.color} flex items-center justify-center`}>
              <game.icon size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{game.name}</h3>
              <p className="text-gray-400 text-sm">{game.desc}</p>
              <div className="mt-4 flex items-center gap-2 text-[#00e701] font-bold text-sm">
                PLAY NOW <span className="text-xs">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
