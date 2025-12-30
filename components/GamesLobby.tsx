
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Target, Bird, Coins, Dice5, Gamepad2, Zap, Layers, Swords } from 'lucide-react';
import { TRANSLATIONS } from '../constants';

const games = [
  { id: 'battle-royal', name: 'Real Battle Royal', icon: Swords, color: 'bg-indigo-600', path: '/battle-royal', desc: { en: 'Earn 1 free token per play!', bs: 'Zaradite 1 besplatan token po igri!' }, free: true },
  { id: 'mines', name: 'Mines', icon: ShieldCheck, color: 'bg-orange-500', path: '/mines', desc: { en: 'Avoid the hidden bombs', bs: 'Izbjegnite skrivene bombe' } },
  { id: 'chicken', name: 'Chicken', icon: Bird, color: 'bg-yellow-500', path: '/chicken', desc: { en: 'Cross the road for tokens', bs: 'Pređite cestu za tokene' } },
  { id: 'soccer', name: 'Soccer', icon: Target, color: 'bg-green-500', path: '/soccer', desc: { en: 'Shoot penalties for goals', bs: 'Pucajte penale za golove' } },
  { id: 'dice', name: 'Dice', icon: Dice5, color: 'bg-blue-500', path: '/dice', desc: { en: 'Roll the dice and predict', bs: 'Bacite kocku i pogodite' } },
  { id: 'coinflip', name: 'Coinflip', icon: Coins, color: 'bg-yellow-600', path: '/coinflip', desc: { en: 'Double your tokens on a flip', bs: 'Uduplajte tokene na novčiću' } },
  { id: 'limbo', name: 'Limbo', icon: Zap, color: 'bg-red-500', path: '/limbo', desc: { en: 'Target a multiplier and win', bs: 'Izaberite multiplikator i osvojite' } },
  { id: 'tower', name: 'Tower', icon: Layers, color: 'bg-emerald-600', path: '/tower', desc: { en: 'Climb for higher rewards', bs: 'Penjite se za veće nagrade' } },
];

export default function GamesLobby({ lang = 'en' }: { lang?: 'en' | 'bs' }) {
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black italic uppercase">{t('lobby_title')}</h1>
          <p className="text-gray-400 mt-1">{t('lobby_desc')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <Link 
            key={game.id} 
            to={game.path}
            className="group bg-[#1a2c38] rounded-2xl border border-[#213743] overflow-hidden hover:border-[#00e701] transition-all hover:-translate-y-1 shadow-lg relative"
          >
            {game.free && (
              <div className="absolute top-4 right-4 bg-[#00e701] text-[#0f212e] text-[10px] font-black px-2 py-1 rounded-full z-10 animate-pulse">
                {t('free_reward')}
              </div>
            )}
            <div className={`h-32 ${game.color} flex items-center justify-center`}>
              <game.icon size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-1">{t(game.id === 'battle-royal' ? 'battle_royal' : game.id)}</h3>
              <p className="text-gray-400 text-sm">{game.desc[lang]}</p>
              <div className="mt-4 flex items-center gap-2 text-[#00e701] font-bold text-sm">
                {t('play_now')} <span className="text-xs">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
