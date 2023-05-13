import { IUpdateProfile } from '@/stores/slices/profile/interface';
import { axiosRequest } from '@/utils/axiosRequest';

const factories = {
  getProfile: () => {
    return axiosRequest({
      method: 'get',
      url: `user/profile`,
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
