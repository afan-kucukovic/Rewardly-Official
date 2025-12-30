
import React from 'react';
import { Trophy, Gift, CreditCard, MessageSquare, ExternalLink, Coins } from 'lucide-react';
import { WIN_GOAL, DISCORD_LINK, TOKENS_PER_DOLLAR, TRANSLATIONS } from '../constants';

interface ProfileProps {
  stats: {
    username: string;
    balance: number;
    totalWins: number;
    gamesPlayed: number;
  };
  lang?: 'en' | 'bs';
}

const Profile: React.FC<ProfileProps> = ({ stats, lang = 'en' }) => {
  const progress = Math.min((stats.totalWins / WIN_GOAL) * 100, 100);
  const dollarValue = (stats.balance / TOKENS_PER_DOLLAR).toFixed(2);
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1a2c38] rounded-2xl p-8 border border-[#213743]">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 bg-[#00e701]/10 rounded-full flex items-center justify-center border-2 border-[#00e701]">
            <Trophy size={64} className="text-[#00e701]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-extrabold">{stats.username}'s {t('my_profile')}</h1>
            <p className="text-gray-400 mt-2">
              {lang === 'en' ? 'Earn tokens and reach 100 wins for mystery rewards.' : 'Zaradite tokene i ostvarite 100 pobjeda za tajne nagrade.'}
            </p>
            
            <div className="mt-6 w-full bg-[#0f212e] h-4 rounded-full overflow-hidden border border-[#213743]">
              <div 
                className="h-full bg-[#00e701] transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,231,1,0.5)]" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between mt-2 text-sm font-bold">
              <span className="text-[#00e701]">{stats.totalWins} / {WIN_GOAL} {lang === 'en' ? 'Wins' : 'Pobjeda'}</span>
              <span className="text-gray-500">{progress.toFixed(1)}% Goal</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a2c38] p-6 rounded-xl border border-[#213743] text-center">
          <Coins className="mx-auto text-[#00e701] mb-3" size={32} />
          <div className="text-2xl font-black">{stats.balance.toLocaleString()}</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{lang === 'en' ? 'Total Tokens' : 'Ukupno Tokena'}</div>
        </div>
        <div className="bg-[#1a2c38] p-6 rounded-xl border border-[#213743] text-center">
          <CreditCard className="mx-auto text-blue-500 mb-3" size={32} />
          <div className="text-2xl font-black">${dollarValue}</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{lang === 'en' ? 'Est. Cash Value' : 'Procijenjena Vrijednost'}</div>
        </div>
        <div className="bg-[#1a2c38] p-6 rounded-xl border border-[#213743] text-center">
          <Gift className="mx-auto text-purple-500 mb-3" size={32} />
          <div className="text-2xl font-black">{stats.totalWins >= WIN_GOAL ? (lang === 'en' ? 'UNLOCKED' : 'OTKLJUČANO') : (lang === 'en' ? 'LOCKED' : 'ZAKLJUČANO')}</div>
          <div className="text-xs text-gray-500 uppercase tracking-widest font-bold mt-1">{lang === 'en' ? 'Mystery Reward' : 'Tajna Nagrada'}</div>
        </div>
      </div>

      <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743]">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <MessageSquare className="text-[#5865F2]" size={28} />
          {t('deposit_withdraw')}
        </h2>
        <div className="space-y-6">
          <div className="bg-[#0f212e] p-4 rounded-lg border-l-4 border-[#00e701]">
            <p className="font-bold text-white">{lang === 'en' ? 'Need more tokens?' : 'Trebate još tokena?'}</p>
            <p className="text-sm text-gray-400 mt-1">
              {lang === 'en' 
                ? 'To deposit or withdraw real cash via PayPal, you must open a ticket in our Discord. Conversion is 1000 tokens = $1.' 
                : 'Za uplatu ili isplatu novca preko PayPala, morate otvoriti ticket na našem Discordu. Konverzija je 1000 tokena = $1.'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <a 
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl font-black transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 uppercase"
            >
              {lang === 'en' ? 'Open Ticket' : 'Otvori Ticket'} <ExternalLink size={20} />
            </a>
            <a 
              href={DISCORD_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-4 bg-[#213743] hover:bg-[#2f4553] text-white rounded-xl font-black transition-transform hover:scale-[1.02] flex items-center justify-center gap-2 border border-[#5865F2]/20 uppercase"
            >
              {t('cash_out')} <ExternalLink size={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
