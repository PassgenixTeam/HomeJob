import { IUpdateProfile } from '@/stores/slices/profile/interface';
import { axiosRequest } from '@/utils/axiosRequest';

const factories = {
  getProfile: () => {
    return axiosRequest({
      method: 'get',
      url: `user/profile`,
    });
  },
  getUserById: (id: string) => {
    return axiosRequest({
      method: 'get',
      url: `user/${id}`,
    });
  },
  updateProfile: (data: IUpdateProfile) => {
    return axiosRequest({
      method: 'patch',
      url: `user/profile`,
      data,
    });
  },
};

export default factories;
