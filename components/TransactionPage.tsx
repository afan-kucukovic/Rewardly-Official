
import React from 'react';
import { Wallet, MessageSquare, ExternalLink, ArrowDownToLine, ArrowUpFromLine, ShieldCheck, CreditCard, ShoppingBag, Utensils } from 'lucide-react';
import { DISCORD_LINK, TOKENS_PER_DOLLAR, CARD_DEPOSIT_LINK, TRANSLATIONS } from '../constants';
import { UserAccount } from '../types';

export default function TransactionPage({ user, lang = 'en' }: { user: UserAccount, lang?: 'en' | 'bs' }) {
  const dollarValue = (user.balance / TOKENS_PER_DOLLAR).toFixed(2);
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1a2c38] rounded-2xl p-8 border border-[#213743] text-center">
        <h1 className="text-3xl font-black italic mb-4 uppercase">{t('trans_title')}</h1>
        <p className="text-gray-400">{lang === 'en' ? 'Manage your virtual token balance and real-world cash outs.' : 'Upravljajte svojim virtuelnim tokenima i isplatama.'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* PayPal Deposit */}
        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#00e701]/10 rounded-full flex items-center justify-center mb-4 border border-[#00e701]">
            <ArrowDownToLine size={32} className="text-[#00e701]" />
          </div>
          <h2 className="text-xl font-bold mb-2 uppercase">{t('deposit_paypal')}</h2>
          <p className="text-gray-400 text-xs mb-6">
            {lang === 'en' ? 'Deposit via PayPal by opening a ticket in our Discord server.' : 'Uplatite preko PayPala otvaranjem ticketa na našem Discordu.'}
          </p>
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto py-3 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] text-sm"
          >
            DISCORD <ExternalLink size={16} />
          </a>
        </div>

        {/* Card Deposit */}
        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500">
            <CreditCard size={32} className="text-purple-500" />
          </div>
          <h2 className="text-xl font-bold mb-2 uppercase">{t('deposit_card')}</h2>
          <p className="text-gray-400 text-xs mb-6">
            {lang === 'en' ? 'Instantly buy tokens using your Debit or Credit card via secure portal.' : 'Odmah kupite tokene koristeći svoju karticu putem sigurnog portala.'}
          </p>
          <a 
            href={CARD_DEPOSIT_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] text-sm"
          >
            {lang === 'en' ? 'PAY BY CARD' : 'PLATI KARTICOM'} <ExternalLink size={16} />
          </a>
        </div>

        {/* Glovo Withdraw */}
        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-4 right-[-30px] bg-[#ffc212] text-black text-[10px] font-black py-1 px-10 rotate-45 shadow-lg">
            {t('delivery_discount')}
          </div>
          <div className="w-16 h-16 bg-[#ffc212]/10 rounded-full flex items-center justify-center mb-4 border border-[#ffc212]">
            <ShoppingBag size={32} className="text-[#ffc212]" />
          </div>
          <h2 className="text-xl font-bold mb-2 uppercase">{t('glovo_withdraw')}</h2>
          <p className="text-gray-400 text-xs mb-6">
            {lang === 'en' ? 'Cash out tokens for a Glovo delivery voucher with a massive 20% discount!' : 'Isplatite tokene za Glovo vaučer uz ogroman popust od 20%!'}
          </p>
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto py-3 bg-[#ffc212] hover:bg-[#e6ae10] text-black rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] text-sm"
          >
            GLOVO VOUCHER <ExternalLink size={16} />
          </a>
        </div>

        {/* Korpa Withdraw */}
        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-4 right-[-30px] bg-[#fe2247] text-white text-[10px] font-black py-1 px-10 rotate-45 shadow-lg">
            {t('delivery_discount')}
          </div>
          <div className="w-16 h-16 bg-[#fe2247]/10 rounded-full flex items-center justify-center mb-4 border border-[#fe2247]">
            <Utensils size={32} className="text-[#fe2247]" />
          </div>
          <h2 className="text-xl font-bold mb-2 uppercase">{t('korpa_withdraw')}</h2>
          <p className="text-gray-400 text-xs mb-6">
            {lang === 'en' ? 'Redeem tokens for Korpa.ba vouchers and save 20% on your next order.' : 'Zamijenite tokene za Korpa.ba vaučere i uštedite 20% na sljedećoj narudžbi.'}
          </p>
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto py-3 bg-[#fe2247] hover:bg-[#e01f3f] text-white rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] text-sm"
          >
            KORPA VOUCHER <ExternalLink size={16} />
          </a>
        </div>

        {/* Cash Out PayPal */}
        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500">
            <ArrowUpFromLine size={32} className="text-blue-500" />
          </div>
          <h2 className="text-xl font-bold mb-2 uppercase">{t('cash_out')}</h2>
          <p className="text-gray-400 text-xs mb-6">
            {user.balance} {t('tokens')} (${dollarValue}). {lang === 'en' ? 'Cash out to PayPal via Discord.' : 'Isplati na PayPal putem Discorda.'}
          </p>
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-auto py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] text-sm"
          >
            {t('cash_out')} <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743]">
        <div className="flex items-center gap-4 mb-6">
          <ShieldCheck className="text-[#00e701]" size={32} />
          <h3 className="text-xl font-bold uppercase italic">{lang === 'en' ? 'Transaction Security' : 'Sigurnost Transakcija'}</h3>
        </div>
        <div className="space-y-4 text-gray-400 text-sm">
          <p>• {lang === 'en' ? 'All transactions are handled manually by administrators to ensure safety.' : 'Sve transakcije administratori obrađuju ručno kako bi osigurali sigurnost.'}</p>
          <p>• {lang === 'en' ? 'You must be a member of the official Rewardly Discord server to perform transactions.' : 'Morate biti član službenog Rewardly Discord servera za obavljanje transakcija.'}</p>
          <p>• {lang === 'en' ? 'Conversion rate is strictly' : 'Kurs konverzije je striktno'} <span className="text-white font-bold">1000 tokens = $1.00 USD</span>.</p>
          <p>• {lang === 'en' ? 'Please provide your Rewardly username when opening a ticket.' : 'Molimo navedite svoje Rewardly korisničko ime prilikom otvaranja ticketa.'}</p>
        </div>
      </div>
    </div>
  );
}
