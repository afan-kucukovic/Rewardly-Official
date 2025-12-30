
import React, { useState, useEffect } from 'react';
import { LogIn, UserPlus, ShieldAlert, RefreshCw, Cloud, Wifi, WifiOff } from 'lucide-react';
import { ADMIN_USERNAME, STARTING_BALANCE } from '../constants';

export default function Auth({ onAuthSuccess, onSyncRequested, isSyncing, online }: { onAuthSuccess: (user: any) => void, onSyncRequested: () => Promise<any>, isSyncing: boolean, online: boolean }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bootstrapping, setBootstrapping] = useState(true);

  // Sync data from cloud immediately when the Auth screen appears
  useEffect(() => {
    onSyncRequested().finally(() => setBootstrapping(false));
  }, []);

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Always fetch latest data before an auth attempt to see users from other devices
    const users = await onSyncRequested();

    if (isLogin) {
      // Admin Special Case
      if (username === ADMIN_USERNAME) {
        const adminUser = users[ADMIN_USERNAME] || {
          username: ADMIN_USERNAME,
          balance: 999999,
          totalWins: 0,
          gamesPlayed: 0,
          isAdmin: true
        };
        onAuthSuccess(adminUser);
        return;
      }

      const existingUser = users[username];
      if (existingUser && existingUser.password === password) {
        onAuthSuccess(existingUser);
      } else {
        setError('Invalid username or password');
      }
    } else {
      if (users[username]) {
        setError('Username already taken');
        return;
      }
      if (username.length < 3) {
        setError('Username too short');
        return;
      }
      
      const newUser = {
        username,
        password,
        balance: STARTING_BALANCE,
        totalWins: 0,
        gamesPlayed: 0,
        isAdmin: false
      };
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f212e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a2c38] rounded-2xl border border-[#213743] overflow-hidden shadow-2xl relative">
        {bootstrapping && (
          <div className="absolute inset-0 bg-[#0f212e]/90 z-50 flex flex-col items-center justify-center gap-4 backdrop-blur-sm">
            <RefreshCw className="text-[#00e701] animate-spin" size={48} />
            <p className="text-sm font-bold uppercase tracking-widest text-[#00e701]">Establishing Secure Sync...</p>
          </div>
        )}
        
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00e701]/10 rounded-2xl border border-[#00e701] mb-4">
              <span className="text-3xl font-black text-[#00e701]">R</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white italic">REWARDLY</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
               <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${online ? 'bg-[#00e701]/10 text-[#00e701]' : 'bg-red-500/10 text-red-500 animate-pulse'}`}>
                  {online ? <Wifi size={12} /> : <WifiOff size={12} />}
                  {online ? 'Global Server Linked' : 'Server Connection Lost'}
               </div>
            </div>
          </div>

          <form onSubmit={handleAction} className="space-y-4">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm flex items-center gap-2">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}
            
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Username</label>
              <input 
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 text-white focus:outline-none focus:border-[#00e701]"
                placeholder="Enter username"
              />
            </div>
            {username !== ADMIN_USERNAME && (
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Password</label>
                <input 
                  type="password"
                  required={username !== ADMIN_USERNAME}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0f212e] border border-[#213743] rounded-lg p-3 text-white focus:outline-none focus:border-[#00e701]"
                  placeholder="Enter password"
                />
              </div>
            )}
            
            <button 
              type="submit"
              disabled={isSyncing || (!online && isLogin)}
              className={`w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-lg font-black text-lg transition-all transform active:scale-95 shadow-[0_4px_0_0_#00a801] mt-4 flex items-center justify-center gap-3 ${isSyncing ? 'opacity-50 cursor-wait' : ''}`}
            >
              {isSyncing && <RefreshCw size={20} className="animate-spin" />}
              {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
            </button>
          </form>
          
          <div className="mt-8 text-center flex flex-col gap-4">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-white text-sm font-semibold underline underline-offset-4"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            </button>
            <button 
              onClick={() => onSyncRequested()}
              className="text-[10px] text-gray-600 font-bold uppercase hover:text-[#00e701] transition-colors"
            >
              Force Sync Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
