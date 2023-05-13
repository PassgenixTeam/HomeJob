import { IUser } from '@/stores/slices/login/interface';
import { IUserProfile } from '@/stores/slices/profile/interface';

export interface ILogin {
  email: string;
  password: string;
}
export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country: string;
  sendEmail?: boolean;
  agreement?: boolean;
}
export interface ICreateJobForm {
  title: string;
  skills: { value: string; label: string }[];
  scope: IScope;
  budget: IBudget;
  describe: string;
  attachFile?: FileList | null;
}
export interface IApplyJobForm {
  jobId: string;
  paidType: PAID_TYPE;
  amount: number;
  milestones: IMilestone[];
  projectLong: PROJECT_LENGTH;
  coverLetter: string;
  attachments: string[];
  boostCoin: number;
  boostTime: string;
  bid?: number;
  showModal?: boolean;
  acceptance?: boolean;
  bidding?: number;
  user?: IUserProfile;
}
export interface IOfferForm{
  paymentOption:PAID_OPTION,
  amount:number,
  deposit:"all"|"first_milestone",
  dueDate?:Date,
  title:string,
  description:string,
  attachments:string[];
  accept:boolean;
  milestones: IMilestone[]
}

export interface IMilestone {
  description: string;
  dueDate: string;
  amount: number;
}
export interface IBudget {
  type: 'Project budget' | 'Hourly rate';
  maxBudget: number;
  from: number;
  to: number;
}
export interface IScope {
  size?: SCOPE_TYPE;
  time?: PROJECT_LENGTH;
  level?: EXPERIENCE_LEVEL;
}
export interface IModify {
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}
export interface IUserSession extends IUser {
  tokenInfo?: {
    accessToken: string;
    expiredIn: number;
    refreshToken: string;
  };
}

export interface IAddPaymentMethod {
  type: 'Stripe' | 'Paypal' | '';
}
export interface ISocialLogin {
  token: string;
  loginBy: string;
}
export interface IFilter {
  category: string;
  experience?: string[];
  jobType?: IJobTypeFilter;
  proposal?: string[];
  clientHistory?: string[];
  length?: string[];
  hourPerWeek?: string[];
  coinNeeded?: string[];
}
export interface IJobTypeFilter {
  hourly?: { min?: number; max?: number };
  price?: string[];
}
export interface IPagination {
  page?: number;
  limit?: number;
}

export enum SCOPE_TYPE {
  LARGE = 'large',
  MEDIUM = 'medium',
  SMALL = 'small',
}

export enum EXPERIENCE_LEVEL {
  ENTRY_LEVEL = 'entry_level',
  INTERMEDIATE = 'intermediate',
  EXPERT = 'expert',
}

export enum PROJECT_LENGTH {
  LESS_THAN_ONE_MONTH = 'less_than_one_month',
  ONE_TO_THREE_MONTHS = 'one_to_three_months',
  THREE_TO_SIX_MONTHS = 'three_to_six_months',
  MORE_THAN_SIX_MONTHS = 'more_than_six_months',
}

export enum JOB_STATUS {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLIC = 'public',
}
export enum PAID_TYPE {
  PROJECT = 'project',
  MILESTONE = 'milestone',
}
export enum PAID_OPTION {
  HOUR = 'hour',
  FIXED_PRICE = 'fixed price',
}


export interface ISKill {
  id: string;
  name: string;
}
