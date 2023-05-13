import { IContractRequest } from '@/stores/slices/contract/interface';
import { axiosRequest } from '@/utils/axiosRequest';

const url = process.env.NEXT_PUBLIC_BACKEND_URL;
const factories = {
  postContract: (data: IContractRequest) => {
    return axiosRequest({
      method: 'post',
      url: `bidding-contract`,
      data: data,
    });
  },
  acceptContract: (id: string, data: Partial<IContractRequest>) => {
    return axiosRequest({
      method: 'patch',
      url: `bidding-contract/accept/${id}`,
      data: data,
    });
  },

  getContracts: () => {
    return axiosRequest({
      method: 'get',
      url: `bidding-contract`,
    });
  },
  getContractDetail: (id: string) => {
    return axiosRequest({
      method: 'get',
      url: `bidding-contract/${id}`,
    });
  },
};
export default factories;
