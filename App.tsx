
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Trophy, 
  MessageSquare, 
  User, 
  Wallet,
  Menu,
  X,
  TrendingUp,
  ShieldCheck,
  LayoutGrid,
  Settings,
  LogOut,
  Target,
  Bird,
  Coins,
  Dice5,
  ArrowDownToLine,
  ArrowUpFromLine,
  Gamepad2,
  Zap,
  Layers,
  CircleDashed
} from 'lucide-react';
import Mines from './components/games/Mines';
import Soccer from './components/games/Soccer';
import Chicken from './components/games/Chicken';
import Dice from './components/games/Dice';
import Coinflip from './components/games/Coinflip';
import Limbo from './components/games/Limbo';
import Tower from './components/games/Tower';
import Profile from './components/Profile';
import Auth from './components/Auth';
import AdminPanel from './components/AdminPanel';
import GamesLobby from './components/GamesLobby';
import TransactionPage from './components/TransactionPage';
import { DISCORD_LINK, STARTING_BALANCE, ADMIN_USERNAME } from './constants';
import { UserAccount } from './types';

const Sidebar = ({ isOpen, toggle, user, onLogout }: { isOpen: boolean, toggle: () => void, user: UserAccount | null, onLogout: () => void }) => {
  const location = useLocation();
  
  const navItems = [
    { name: 'All Games', path: '/', icon: LayoutGrid },
    { name: 'Mines', path: '/mines', icon: ShieldCheck },
    { name: 'Chicken', path: '/chicken', icon: Bird },
    { name: 'Limbo', path: '/limbo', icon: Zap },
    { name: 'Tower', path: '/tower', icon: Layers },
    { name: 'Deposit / Withdraw', path: '/transactions', icon: Wallet },
    { name: 'My Profile', path: '/profile', icon: User },
  ];

  if (user?.isAdmin) {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: Settings });
  }

  return (
    <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0f212e] transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out border-r border-[#213743]`}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-[#00e701] rounded flex items-center justify-center font-bold text-[#0f212e]">R</div>
          <span className="text-xl font-extrabold tracking-tighter uppercase italic">REWARDLY</span>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && toggle()}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === item.path 
                ? 'bg-[#213743] text-[#00e701]' 
                : 'text-gray-400 hover:bg-[#1a2c38] hover:text-white'
              }`}
            >
              <item.icon size={20} />
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <a 
            href={DISCORD_LINK} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-lg font-bold transition-all"
          >
            <MessageSquare size={20} />
            Join Discord
          </a>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-[#fe2247]/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ user, toggleSidebar }: { user: UserAccount | null, toggleSidebar: () => void }) => (
  <header className="sticky top-0 z-40 h-16 bg-[#1a2c38] border-b border-[#213743] px-4 md:px-8 flex items-center justify-between">
    <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-400">
      <Menu size={24} />
    </button>
    
    <div className="hidden md:flex items-center gap-6">
      <span className="text-sm font-semibold text-gray-400 italic">Welcome back, {user?.username}</span>
    </div>

    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 bg-[#0f212e] px-4 py-2 rounded-lg border border-[#213743]">
        <Coins size={18} className="text-[#00e701]" />
        <span className="font-bold text-sm tracking-wide">
          {user?.balance.toLocaleString()}
        </span>
      </div>
      <div className="flex items-center gap-2 bg-[#0f212e] px-4 py-2 rounded-lg border border-[#213743]">
        <Trophy size={18} className="text-yellow-500" />
        <span className="font-bold text-sm">
          {user?.totalWins}/100
        </span>
      </div>
    </div>
  </header>
);

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('rewardly_current_user');
    if (!saved) return null;
    const users = JSON.parse(localStorage.getItem('rewardly_users') || '{}');
    return users[saved] || null;
  });

  const handleAuthSuccess = (userData: UserAccount) => {
    setUser(userData);
    localStorage.setItem('rewardly_current_user', userData.username);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('rewardly_current_user');
  };

  const updateStats = (win: boolean, amount: number) => {
    if (!user) return;
    const users = JSON.parse(localStorage.getItem('rewardly_users') || '{}');
    const updatedUser = {
      ...user,
      balance: user.balance + amount,
      totalWins: win ? user.totalWins + 1 : user.totalWins,
      gamesPlayed: user.gamesPlayed + 1
    };
    users[user.username] = updatedUser;
    localStorage.setItem('rewardly_users', JSON.stringify(users));
    setUser(updatedUser);
  };

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#0f212e]">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} user={user} onLogout={handleLogout} />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Header user={user} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<GamesLobby />} />
            <Route path="/mines" element={<Mines onResult={updateStats} balance={user.balance} />} />
            <Route path="/soccer" element={<Soccer onResult={updateStats} balance={user.balance} />} />
            <Route path="/chicken" element={<Chicken onResult={updateStats} balance={user.balance} />} />
            <Route path="/dice" element={<Dice onResult={updateStats} balance={user.balance} />} />
            <Route path="/coinflip" element={<Coinflip onResult={updateStats} balance={user.balance} />} />
            <Route path="/limbo" element={<Limbo onResult={updateStats} balance={user.balance} />} />
            <Route path="/tower" element={<Tower onResult={updateStats} balance={user.balance} />} />
            <Route path="/transactions" element={<TransactionPage user={user} />} />
            <Route path="/profile" element={<Profile stats={user} />} />
            <Route path="/admin" element={user.isAdmin ? <AdminPanel /> : <Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="p-8 text-center text-xs text-gray-500 border-t border-[#213743]">
          <p className="text-[#00e701] font-bold uppercase tracking-widest opacity-80">Made by afan kucuk 2025</p>
        </footer>
      </div>
    </div>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
