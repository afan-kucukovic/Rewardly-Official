
import React, { useState } from 'react';
import { LogIn, UserPlus, ShieldAlert } from 'lucide-react';
import { ADMIN_USERNAME, STARTING_BALANCE } from '../constants';

export default function Auth({ onAuthSuccess }: { onAuthSuccess: (user: any) => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const users = JSON.parse(localStorage.getItem('rewardly_users') || '{}');

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
        users[ADMIN_USERNAME] = adminUser;
        localStorage.setItem('rewardly_users', JSON.stringify(users));
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
      users[username] = newUser;
      localStorage.setItem('rewardly_users', JSON.stringify(users));
      onAuthSuccess(newUser);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f212e] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#1a2c38] rounded-2xl border border-[#213743] overflow-hidden shadow-2xl">
        <div className="p-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00e701]/10 rounded-2xl border border-[#00e701] mb-4">
              <span className="text-3xl font-black text-[#00e701]">R</span>
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white italic">REWARDLY</h1>
            <p className="text-gray-400 text-sm mt-1">{isLogin ? 'Welcome back, player!' : 'Create your player account'}</p>
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
              className="w-full py-4 bg-[#00e701] hover:bg-[#00c901] text-[#0f212e] rounded-lg font-black text-lg transition-all transform active:scale-95 shadow-[0_4px_0_0_#00a801] mt-4"
            >
              {isLogin ? 'LOG IN' : 'CREATE ACCOUNT'}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-gray-400 hover:text-white text-sm font-semibold underline underline-offset-4"
            >
              {isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
