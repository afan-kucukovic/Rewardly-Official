
import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Wallet, CheckCircle2, ShieldAlert, RefreshCw, Cloud, Users } from 'lucide-react';
import { UserAccount } from '../types';

interface AdminPanelProps {
  users: Record<string, UserAccount>;
  setUsers: React.Dispatch<React.SetStateAction<Record<string, UserAccount>>>;
  onPush: (db: Record<string, UserAccount>) => Promise<void>;
  onPull: () => Promise<Record<string, UserAccount>>;
  isSyncing: boolean;
}

export default function AdminPanel({ users, setUsers, onPush, onPull, isSyncing }: AdminPanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [addAmount, setAddAmount] = useState(100);
  const [message, setMessage] = useState('');

  // Auto-poll the cloud every 5 seconds while Admin Panel is open
  useEffect(() => {
    onPull();
    const interval = setInterval(() => {
      if (!isSyncing) onPull();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const userList = Object.values(users).filter((u: UserAccount) => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) && !u.isAdmin
  );

  const addTokens = async (username: string) => {
    // 1. Pull most recent data again to prevent overwriting other admin changes
    const latestDB = await onPull();
    
    if (latestDB[username]) {
      const updatedUser = { 
        ...latestDB[username], 
        balance: latestDB[username].balance + addAmount 
      };
      
      const updatedDB = { ...latestDB, [username]: updatedUser };
      
      // 2. Update local state
      setUsers(updatedDB);
      
      // 3. Push to cloud
      await onPush(updatedDB);
      
      setMessage(`Successfully added ${addAmount} tokens to ${username}`);
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
          <p className="text-gray-400">Manage global player database. Updates every 5s.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-[#0f212e] px-4 py-2 rounded-xl border border-[#213743] flex items-center gap-2">
             <Users size={18} className="text-[#00e701]" />
             <span className="font-black text-sm">{userList.length} Players</span>
          </div>
          <button 
            onClick={() => onPull()}
            disabled={isSyncing}
            className="p-3 bg-[#0f212e] hover:bg-[#213743] text-[#00e701] rounded-xl border border-[#00e701]/30 transition-all hover:scale-105 active:scale-95"
            title="Force Global Refresh"
          >
            <RefreshCw size={20} className={isSyncing ? 'animate-spin' : ''} />
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
          <p className="text-[10px] text-gray-500 mt-3 italic">Grant tokens to specific players on any device.</p>
        </div>

        <div className="md:col-span-2 bg-[#1a2c38] p-6 rounded-xl border border-[#213743] flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Filter players by username..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 pl-10 text-white focus:outline-none focus:border-[#00e701]"
            />
          </div>

          {message && (
            <div className="mb-4 bg-[#00e701]/10 border border-[#00e701] text-[#00e701] p-3 rounded-lg text-sm flex items-center gap-2 animate-bounce">
              <CheckCircle2 size={16} />
              {message}
            </div>
          )}

          <div className="space-y-2 overflow-y-auto max-h-[400px] pr-2 custom-scrollbar">
            {userList.length > 0 ? (userList.map((u: UserAccount) => (
              <div key={u.username} className="flex items-center justify-between p-4 bg-[#0f212e] rounded-lg border border-[#213743] hover:border-[#00e701]/30 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2f4553] border border-[#213743] flex items-center justify-center font-bold text-[#00e701]">
                    {u.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold">{u.username}</div>
                    <div className="text-[10px] text-gray-500 flex items-center gap-1 uppercase tracking-tighter">
                      <Wallet size={10} /> {u.balance.toLocaleString()} tokens
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => addTokens(u.username)}
                  className="bg-[#00e701] text-[#0f212e] px-4 py-2 rounded font-black text-[10px] uppercase flex items-center gap-1.5 hover:bg-[#00c901] transition-all transform active:scale-95 shadow-[0_2px_0_0_#00a801]"
                >
                  <Plus size={12} /> Grant
                </button>
              </div>
            ))) : (
              <div className="text-center py-20 text-gray-500 italic flex flex-col items-center gap-2">
                 <RefreshCw size={32} className="animate-spin opacity-20 mb-2" />
                 Waiting for players to link...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
