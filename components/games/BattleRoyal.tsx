
import React, { useState } from 'react';
import { Swords, ExternalLink, Gift, Sparkles } from 'lucide-react';
import { BATTLE_ROYAL_LINK, TRANSLATIONS } from '../../constants';
import confetti from 'canvas-confetti';

export default function BattleRoyal({ onResult, lang = 'en' }: { onResult: (win: boolean, amount: number) => void, lang?: 'en' | 'bs' }) {
  const [claimed, setClaimed] = useState(false);
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const handlePlay = () => {
    // Grant 1 free token for playing
    onResult(true, 1);
    setClaimed(true);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00e701', '#ffffff']
    });

    // Open link in new tab
    setTimeout(() => {
      window.open(BATTLE_ROYAL_LINK, '_blank');
      setClaimed(false); // Reset so they can play again
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#1a2c38] rounded-2xl overflow-hidden border border-[#213743] shadow-2xl">
        <div className="h-64 bg-indigo-600 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
          <Swords size={120} className="text-white relative z-10 animate-bounce" />
          
          <div className="absolute bottom-4 right-4 bg-[#00e701] text-[#0f212e] px-4 py-2 rounded-xl font-black italic shadow-lg flex items-center gap-2">
            <Gift size={18} />
            +1 TOKEN PER PLAY
          </div>
        </div>

        <div className="p-10 text-center">
          <h1 className="text-4xl font-black italic mb-4 uppercase tracking-tighter">
            {t('battle_royal')}
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto mb-10 leading-relaxed">
            {lang === 'en' 
              ? 'Enter the ultimate arena! Compete with others in this real-time battle simulator. Every time you enter the battle, you earn 1 Rewardly Token as a free reward.'
              : 'Uđite u ultimativnu arenu! Takmičite se s drugima u ovom simulatoru borbe u stvarnom vremenu. Svaki put kada uđete u borbu, zarađujete 1 Rewardly token kao besplatnu nagradu.'}
          </p>

          <button 
            onClick={handlePlay}
            disabled={claimed}
            className={`group w-full max-w-sm py-6 rounded-2xl font-black text-2xl flex items-center justify-center gap-4 transition-all transform active:scale-95 shadow-2xl relative overflow-hidden ${
              claimed 
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
              : 'bg-[#00e701] hover:bg-[#00c901] text-[#0f212e]'
            }`}
          >
            {claimed ? (
              <Sparkles className="animate-spin" />
            ) : (
              <>
                {lang === 'en' ? 'ENTER BATTLE' : 'UĐI U BORBU'}
                <ExternalLink size={24} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="mt-8 text-xs text-gray-500 uppercase font-bold tracking-widest">
            {lang === 'en' ? 'Game hosted on Hugging Face Spaces' : 'Igra se nalazi na Hugging Face Spaces'}
          </p>
        </div>
      </div>
    </div>
  );
}
