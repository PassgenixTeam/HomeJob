import { ROLE } from '@/constants';
import { IModify } from '@/interfaces';
import { HOURS_PER_WEEK, PROFILE_VISIBILITY } from '@/stores/slices/login/enum';

export interface UserResponse {
  user?: IUser;
  token?: IToken;
}
export interface IUser extends IModify {
  id: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  isActive: boolean;
  role: 'freelancer' | 'client' | 'admin' | null;
  stripeCustomerId?: string;
  address: string | null;
  city: string | null;
  country: string | null;
  line1: string | null;
  line2: string | null;
  phone: string | null;
  state: string | null;
  title: string | null;
  hourlyRate: number;
  overview: string | null;
  videoOverview: {
    url: string | null;
    typeVideo: string | null;
  } | null;
  hoursPerWeek: HOURS_PER_WEEK | null;
  contractToHire: boolean;
  balance: number;
  profileCompletion: number;
  isPaymentVerified: boolean;
  profileVisibility: PROFILE_VISIBILITY;
  coin: number;
}
export interface IToken {
  accessToken: string;
  refreshToken: string;
  expiredIn: number;
}
export interface LoginState {
  info: IUser;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
}
export interface IUpdateRole {
  role: string;
  onUpdate: any;
}
