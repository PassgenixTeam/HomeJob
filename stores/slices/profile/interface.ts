import { ISKill } from '@/interfaces';
import { IUser } from '@/stores/slices/login/interface';

export interface IUpdateProfile extends Partial<IUserProfile> {}

export interface IUserProfile extends IUser {
  educations: any;
  experiences: any;
  mappingUserLanguageEntity: any;
  projects: any;
  skills: ISKill[];
}

export interface ProfileState {
  isLoading: boolean;
  error: string;
  profile: IUserProfile | null;
}
