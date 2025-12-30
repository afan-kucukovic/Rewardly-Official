
import React from 'react';
import { Wallet, MessageSquare, ExternalLink, ArrowDownToLine, ArrowUpFromLine, ShieldCheck } from 'lucide-react';
import { DISCORD_LINK, TOKENS_PER_DOLLAR } from '../constants';
import { UserAccount } from '../types';

export default function TransactionPage({ user }: { user: UserAccount }) {
  const dollarValue = (user.balance / TOKENS_PER_DOLLAR).toFixed(2);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1a2c38] rounded-2xl p-8 border border-[#213743] text-center">
        <h1 className="text-3xl font-black italic mb-4">DEPOSIT & WITHDRAW</h1>
        <p className="text-gray-400">Manage your virtual token balance and real-world cash outs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-[#00e701]/10 rounded-full flex items-center justify-center mb-4 border border-[#00e701]">
            <ArrowDownToLine size={32} className="text-[#00e701]" />
          </div>
          <h2 className="text-2xl font-bold mb-2 uppercase">Deposit Tokens</h2>
          <p className="text-gray-400 text-sm mb-6">Want to play more? Join our Discord and open a ticket to deposit tokens via PayPal.</p>
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            DEPOSIT VIA DISCORD <ExternalLink size={18} />
          </a>
        </div>

        <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500">
            <ArrowUpFromLine size={32} className="text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2 uppercase">Cash Out</h2>
          <p className="text-gray-400 text-sm mb-6">Current Balance: <span className="text-white font-bold">{user.balance} Tokens (${dollarValue})</span>. Cash out your winnings to PayPal via Discord.</p>
          <a 
            href={DISCORD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black flex items-center justify-center gap-2 transition-transform hover:scale-[1.02]"
          >
            WITHDRAW VIA DISCORD <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743]">
        <div className="flex items-center gap-4 mb-6">
          <ShieldCheck className="text-[#00e701]" size={32} />
          <h3 className="text-xl font-bold uppercase italic">Transaction Security</h3>
        </div>
        <div className="space-y-4 text-gray-400 text-sm">
          <p>• All transactions are handled manually by administrators to ensure safety.</p>
          <p>• You must be a member of the official Rewardly Discord server to perform transactions.</p>
          <p>• Conversion rate is strictly <span className="text-white font-bold">1000 tokens = $1.00 USD</span>.</p>
          <p>• Please provide your Rewardly username when opening a ticket.</p>
        </div>
      </div>
    </div>
  );
}