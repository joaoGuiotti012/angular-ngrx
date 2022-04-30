import { User } from './../../models/user.model';
export interface AuthState {
  user: User | null;
  logedWithGoogle: boolean; 
}

export const initialState: AuthState = {
  user: null,
  logedWithGoogle: false
};
