
export type GameType = 'mines' | 'dice' | 'soccer' | 'chicken' | 'coinflip' | 'limbo' | 'tower';

export interface UserAccount {
  username: string;
  balance: number;
  totalWins: number;
  gamesPlayed: number;
  isAdmin?: boolean;
}

export interface AuthState {
  user: UserAccount | null;
  isAdmin: boolean;
}
