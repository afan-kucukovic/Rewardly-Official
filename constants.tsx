
export const COLORS = {
  primary: '#00e701', // Stake/Rewardly Green
  secondary: '#2f4553',
  bgDark: '#0f212e',
  bgLight: '#1a2c38',
  accent: '#fe2247',
};

// Cloud Sync Configuration
// Using a public KV storage to sync data across devices for simulation purposes
export const CLOUD_SYNC_URL = 'https://kvdb.io/A2W5fG4r8zN9m2K1L7P3/rewardly_global_users';

export const DISCORD_LINK = 'https://discord.gg/jPm8wvcCPb';
export const CARD_DEPOSIT_LINK = 'https://paypal.me/AfanKucuk012';
export const BATTLE_ROYAL_LINK = 'https://huggingface.co/spaces/cukundeda/realbattleroyal';
export const WIN_GOAL = 100;
export const STARTING_BALANCE = 20;
export const TOKENS_PER_DOLLAR = 1000;
export const ADMIN_USERNAME = 'afkoni2020';

export const TRANSLATIONS: Record<string, { en: string; bs: string }> = {
  'all_games': { en: 'All Games', bs: 'Sve Igre' },
  'mines': { en: 'Mines', bs: 'Mine' },
  'chicken': { en: 'Chicken', bs: 'Piletina' },
  'limbo': { en: 'Limbo', bs: 'Limbo' },
  'tower': { en: 'Tower', bs: 'Toranj' },
  'battle_royal': { en: 'Real Battle Royal', bs: 'Real Battle Royal' },
  'deposit_withdraw': { en: 'Deposit / Withdraw', bs: 'Uplata / Isplata' },
  'my_profile': { en: 'My Profile', bs: 'Moj Profil' },
  'admin_panel': { en: 'Admin Panel', bs: 'Admin Panel' },
  'welcome_back': { en: 'Welcome back', bs: 'Dobrodošli nazad' },
  'join_discord': { en: 'Join Discord', bs: 'Discord Server' },
  'logout': { en: 'Logout', bs: 'Odjava' },
  'lobby_title': { en: 'GAME LOBBY', bs: 'LOBI IGARA' },
  'lobby_desc': { en: 'Select a simulator to start earning tokens', bs: 'Odaberite simulator da počnete zarađivati tokene' },
  'trans_title': { en: 'DEPOSIT & WITHDRAW', bs: 'UPLATA I ISPLATA' },
  'deposit_paypal': { en: 'Deposit via PayPal', bs: 'Uplata preko PayPala' },
  'deposit_card': { en: 'Deposit by Card', bs: 'Uplata Karticom' },
  'cash_out': { en: 'Cash Out', bs: 'Isplata' },
  'tokens': { en: 'Tokens', bs: 'Tokeni' },
  'play_now': { en: 'PLAY NOW', bs: 'IGRAJ SADA' },
  'glovo_withdraw': { en: 'Glovo Voucher', bs: 'Glovo Vaučer' },
  'korpa_withdraw': { en: 'Korpa Voucher', bs: 'Korpa Vaučer' },
  'delivery_discount': { en: '20% DISCOUNT', bs: '20% POPUST' },
  'free_reward': { en: 'FREE REWARD', bs: 'BESPLATNA NAGRADA' }
};
