
import React, { useState, useEffect, useCallback } from 'react';
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
  CircleDashed,
  Languages,
  Swords,
  Cloud,
  RefreshCw
} from 'lucide-react';
import Mines from './components/games/Mines.tsx';
import Soccer from './components/games/Soccer.tsx';
import Chicken from './components/games/Chicken.tsx';
import Dice from './components/games/Dice.tsx';
import Coinflip from './components/games/Coinflip.tsx';
import Limbo from './components/games/Limbo.tsx';
import Tower from './components/games/Tower.tsx';
import BattleRoyal from './components/games/BattleRoyal.tsx';
import Profile from './components/Profile.tsx';
import Auth from './components/Auth.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import GamesLobby from './components/GamesLobby.tsx';
import TransactionPage from './components/TransactionPage.tsx';
import { DISCORD_LINK, STARTING_BALANCE, ADMIN_USERNAME, TRANSLATIONS, CLOUD_SYNC_URL } from './constants.tsx';
import { UserAccount } from './types.ts';

const Sidebar = ({ isOpen, toggle, user, onLogout, lang }: { isOpen: boolean, toggle: () => void, user: UserAccount | null, onLogout: () => void, lang: 'en' | 'bs' }) => {
  const location = useLocation();
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;

  const navItems = [
    { name: t('all_games'), path: '/', icon: LayoutGrid },
    { name: t('battle_royal'), path: '/battle-royal', icon: Swords },
    { name: t('mines'), path: '/mines', icon: ShieldCheck },
    { name: t('chicken'), path: '/chicken', icon: Bird },
    { name: t('limbo'), path: '/limbo', icon: Zap },
    { name: t('tower'), path: '/tower', icon: Layers },
    { name: t('deposit_withdraw'), path: '/transactions', icon: Wallet },
    { name: t('my_profile'), path: '/profile', icon: User },
  ];

  if (user?.isAdmin) {
    navItems.push({ name: t('admin_panel'), path: '/admin', icon: Settings });
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
            {t('join_discord')}
          </a>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-[#fe2247]/10 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {t('logout')}
          </button>
        </div>
      </div>
    </aside>
  );
};

const Header = ({ user, toggleSidebar, lang, isSyncing }: { user: UserAccount | null, toggleSidebar: () => void, lang: 'en' | 'bs', isSyncing: boolean }) => {
  const t = (key: string) => TRANSLATIONS[key]?.[lang] || key;
  return (
    <header className="sticky top-0 z-40 h-16 bg-[#1a2c38] border-b border-[#213743] px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-400">
          <Menu size={24} />
        </button>
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-400 italic">{t('welcome_back')}, {user?.username}</span>
          {isSyncing ? (
            <RefreshCw size={14} className="text-[#00e701] animate-spin" />
          ) : (
            <Cloud size={14} className="text-[#00e701]" />
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-[#0f212e] px-4 py-2 rounded-lg border border-[#213743]">
          <Coins size={18} className="text-[#00e701]" />
          <span className="font-bold text-sm tracking-wide">
            {user?.balance.toLocaleString() ?? 0}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[#0f212e] px-4 py-2 rounded-lg border border-[#213743]">
          <Trophy size={18} className="text-yellow-500" />
          <span className="font-bold text-sm">
            {user?.totalWins ?? 0}/100
          </span>
        </div>
      </div>
    </header>
  );
};

const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [users, setUsers] = useState<Record<string, UserAccount>>({});
  const [lang, setLang] = useState<'en' | 'bs'>(() => {
    return (localStorage.getItem('rewardly_lang') as 'en' | 'bs') || 'en';
  });
  
  const [currentUserKey, setCurrentUserKey] = useState<string | null>(() => {
    return localStorage.getItem('rewardly_current_user');
  });

  const pullFromCloud = useCallback(async () => {
    try {
      setIsSyncing(true);
      const res = await fetch(CLOUD_SYNC_URL);
      if (res.ok) {
        const cloudData = await res.json();
        // Force state update and local cache update
        setUsers(cloudData);
        localStorage.setItem('rewardly_users', JSON.stringify(cloudData));
        return cloudData;
      }
    } catch (e) {
      console.warn('Cloud pull failed, falling back to local storage', e);
      const local = JSON.parse(localStorage.getItem('rewardly_users') || '{}');
      setUsers(local);
      return local;
    } finally {
      setIsSyncing(false);
    }
    return {};
  }, []);

  const pushToCloud = async (latestUsers: Record<string, UserAccount>) => {
    try {
      setIsSyncing(true);
      await fetch(CLOUD_SYNC_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(latestUsers)
      });
      localStorage.setItem('rewardly_users', JSON.stringify(latestUsers));
    } catch (e) {
      console.error('Failed to sync to cloud', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync on mount
  useEffect(() => {
    pullFromCloud();
  }, [pullFromCloud]);

  const toggleLang = () => {
    const next = lang === 'en' ? 'bs' : 'en';
    setLang(next);
    localStorage.setItem('rewardly_lang', next);
  };

  const handleAuthSuccess = async (userData: UserAccount) => {
    // 1. Pull latest to ensure we don't overwrite others
    const latest = await pullFromCloud();
    
    // 2. Add/Update user
    const updated = { ...latest, [userData.username]: userData };
    
    // 3. Update local states
    setUsers(updated);
    setCurrentUserKey(userData.username);
    localStorage.setItem('rewardly_current_user', userData.username);
    
    // 4. Push to cloud
    await pushToCloud(updated);
  };

  const handleLogout = () => {
    setCurrentUserKey(null);
    localStorage.removeItem('rewardly_current_user');
  };

  const updateStats = async (win: boolean, amount: number) => {
    if (!currentUserKey || !users[currentUserKey]) return;
    
    // Pull latest to ensure consistency
    const latest = await pullFromCloud();
    const currentUser = latest[currentUserKey] || users[currentUserKey];

    const updatedUser = {
      ...currentUser,
      balance: currentUser.balance + amount,
      totalWins: win ? currentUser.totalWins + 1 : currentUser.totalWins,
      gamesPlayed: currentUser.gamesPlayed + 1
    };

    const updatedDatabase = { ...latest, [currentUserKey]: updatedUser };
    setUsers(updatedDatabase);
    
    await pushToCloud(updatedDatabase);
  };

  const currentUser = currentUserKey ? users[currentUserKey] : null;

  if (!currentUserKey) {
    return <Auth onAuthSuccess={handleAuthSuccess} onSyncRequested={pullFromCloud} isSyncing={isSyncing} />;
  }

  return (
    <div className="min-h-screen bg-[#0f212e] relative">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} user={currentUser} onLogout={handleLogout} lang={lang} />
      
      <div className="md:ml-64 flex flex-col min-h-screen">
        <Header user={currentUser} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} lang={lang} isSyncing={isSyncing} />
        
        <main className="flex-1 p-4 md:p-8">
          <Routes>
            <Route path="/" element={<GamesLobby lang={lang} />} />
            <Route path="/mines" element={<Mines onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/soccer" element={<Soccer onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/chicken" element={<Chicken onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/dice" element={<Dice onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/coinflip" element={<Coinflip onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/limbo" element={<Limbo onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/tower" element={<Tower onResult={updateStats} balance={currentUser?.balance ?? 0} />} />
            <Route path="/battle-royal" element={<BattleRoyal onResult={updateStats} lang={lang} />} />
            <Route path="/transactions" element={<TransactionPage user={currentUser!} lang={lang} />} />
            <Route path="/profile" element={<Profile stats={currentUser!} lang={lang} />} />
            <Route path="/admin" element={currentUser?.isAdmin ? <AdminPanel users={users} setUsers={setUsers} onPush={pushToCloud} onPull={pullFromCloud} isSyncing={isSyncing} /> : <Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="p-8 text-center text-xs text-gray-500 border-t border-[#213743]">
          <p className="text-[#00e701] font-bold uppercase tracking-widest opacity-80">Made by afan kucuk 2025</p>
        </footer>
      </div>

      <button 
        onClick={toggleLang}
        className="fixed bottom-6 left-6 md:left-[270px] z-50 p-3 bg-[#1a2c38] hover:bg-[#213743] text-white rounded-full shadow-2xl border border-[#213743] flex items-center gap-2 transition-all transform hover:scale-110 active:scale-95 group"
        title={lang === 'en' ? 'Prebaci na Bosanski' : 'Switch to English'}
      >
        <Languages size={20} className="text-[#00e701]" />
        <span className="text-xs font-bold uppercase tracking-widest">{lang === 'en' ? 'EN' : 'BS'}</span>
      </button>
    </div>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
