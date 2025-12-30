
import React, { useState } from 'react';
import { Search, Plus, User, Wallet, CheckCircle2, ShieldAlert, RefreshCw, Cloud, CloudOff } from 'lucide-react';
import { CLOUD_SYNC_URL } from '../constants';

export default function AdminPanel({ onForceSync, isSyncing }: { onForceSync?: () => void, isSyncing?: boolean }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [addAmount, setAddAmount] = useState(100);
  const [message, setMessage] = useState('');

  const users = JSON.parse(localStorage.getItem('rewardly_users') || '{}');
  const userList = Object.values(users).filter((u: any) => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) && !u.isAdmin
  );

  const addTokens = async (username: string) => {
    const allUsers = JSON.parse(localStorage.getItem('rewardly_users') || '{}');
    if (allUsers[username]) {
      allUsers[username].balance += addAmount;
      localStorage.setItem('rewardly_users', JSON.stringify(allUsers));
      
      // Push the update to cloud so it reflects on user's phone
      try {
        await fetch(CLOUD_SYNC_URL, {
          method: 'POST',
          body: JSON.stringify(allUsers)
        });
        setMessage(`Successfully added ${addAmount} tokens to ${username} (Synced to Cloud)`);
      } catch (e) {
        setMessage(`Added ${addAmount} to ${username} (Local only - Cloud error)`);
      }
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-[#1a2c38] p-8 rounded-2xl border border-[#213743] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3 italic">
            <ShieldAlert className="text-[#00e701]" />
            ADMIN CONTROL
          </h1>
          <p className="text-gray-400">Manage user balances and synchronize global data.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${isSyncing ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/50' : 'bg-[#00e701]/10 text-[#00e701] border border-[#00e701]/50'}`}>
            {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <Cloud size={14} />}
            {isSyncing ? 'Syncing...' : 'Cloud Connected'}
          </div>
          <button 
            onClick={onForceSync}
            disabled={isSyncing}
            className="p-2 bg-[#0f212e] hover:bg-[#213743] text-gray-400 hover:text-white rounded-lg border border-[#213743] transition-colors"
            title="Force Global Refresh"
          >
            <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-[#1a2c38] p-6 rounded-xl border border-[#213743]">
          <label className="text-xs font-bold text-gray-500 uppercase block mb-2">Token Bounty</label>
          <input 
            type="number"
            value={addAmount}
            onChange={(e) => setAddAmount(Number(e.target.value))}
            className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 text-white focus:outline-none focus:border-[#00e701]"
          />
          <p className="text-[10px] text-gray-500 mt-2 italic">Amount added when clicking 'Grant'</p>
        </div>

        <div className="md:col-span-2 bg-[#1a2c38] p-6 rounded-xl border border-[#213743] flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Search usernames..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-[#00e701]"
            />
          </div>

          {message && (
            <div className="mb-4 bg-[#00e701]/10 border border-[#00e701] text-[#00e701] p-3 rounded-lg text-sm flex items-center gap-2">
              <CheckCircle2 size={16} />
              {message}
            </div>
          )}

          <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2">
            {userList.length > 0 ? (userList.map((u: any) => (
              <div key={u.username} className="flex items-center justify-between p-4 bg-[#0f212e] rounded-lg border border-[#213743]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2f4553] flex items-center justify-center font-bold">
                    {u.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold">{u.username}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Wallet size={12} /> {u.balance} tokens
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => addTokens(u.username)}
                  className="bg-[#00e701] text-[#0f212e] px-4 py-2 rounded font-bold text-sm flex items-center gap-2 hover:bg-[#00c901]"
                >
                  <Plus size={16} /> Grant
                </button>
              </div>
            ))) : (
              <div className="text-center py-10 text-gray-500 italic">No users found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
