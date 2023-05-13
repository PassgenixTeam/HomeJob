import H1 from '@/components/common/Text/H1';
import H4 from '@/components/common/Text/H4';
import Container from '@/components/layouts/Container';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import React from 'react';
import contractApi from '../../../stores/slices/contract/factories';
import { useRouter } from 'next/router';
import Avatar from '@/components/common/Avatar';
import H5 from '@/components/common/Text/H5';
import TextMuted from '@/components/common/Text/TextMuted';
import TextArea from '@/components/common/TextArea/TextArea';
import Button from '@/components/common/Button';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { IContractResponse } from '@/stores/slices/contract/interface';

const Contract = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [contract, setContract] = React.useState<IContractResponse>();

  const [commitClient, setCommitClient] = React.useState<string>('');
  const [commitContractor, setCommitContractor] = React.useState<string>('');

  React.useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await contractApi.getContractDetail(router.query.id as string);
        setContract(res.data);
        setCommitClient(res.data.information.commitClient);
        setCommitContractor(res.data.information.commitContractor);
      } catch (error) {
        toast.error('Get contract failure!');
      }
    };

    fetchContract();
  }, []);

  const handleContractUpdateContract = async () => {
    try {
      await contractApi.acceptContract(contract?.id!, {
        information: {
          ...contract?.information,
          commitContractor,
        },
      });
      toast.success('Create contract successfully!');
    } catch (error) {
      toast.error('Create contract failure!');
    }
  };

  return (
    <Container>
      <ContainerBorder>
        <div className="w-full flex justify-center">
          <H1>Tạo hợp đồng</H1>
        </div>
        <div className="mt-24 px-6 flex gap-12 ">
          <div className="flex-grow">
            <H4>Thông tin khách hàng</H4>
            <div className="mt-4 flex gap-4 items-center">
              <Avatar avatar={contract?.owner?.avatarUrl} />
              <div className="flex flex-col">
                <H5>
                  {contract?.owner?.firstName} {contract?.owner?.lastName}
                </H5>
                <TextMuted>{contract?.owner?.title}</TextMuted>
                <TextMuted>{contract?.owner?.email}</TextMuted>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <H4>Thông tin chủ thầu</H4>
            <div className="mt-4 flex gap-4 items-center">
              <Avatar avatar={contract?.contractor?.avatarUrl} />
              <div className="flex flex-col">
                <H5>
                  {contract?.contractor?.firstName} {contract?.contractor?.lastName}
                </H5>
                <TextMuted>{contract?.contractor?.title}</TextMuted>
                <TextMuted>{contract?.contractor?.email}</TextMuted>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <H4>Thông tin hợp đồng</H4>
          <div className="w-full flex gap-12">
            <div className="w-full flex gap-3 mt-6">
              <div className="flex-grow ">
                <H5>Cam kết bên khách hàng</H5>
                <div className="mt-4 pr-4">
                  <TextArea
                    disabled={session?.user.role !== 'client'}
                    className="mt-4"
                    onChange={(e) => setCommitClient(e.target.value)}
                    value={commitClient}
                  />
                </div>
              </div>
              <div className="flex-grow ">
                <H5>Cam kết bên chủ thầu</H5>
                <div className="mt-4 pr-4">
                  <TextArea
                    disabled={session?.user.role !== 'freelancer' || contract?.status !== 'Pending'}
                    className="mt-4"
                    onChange={(e) => setCommitContractor(e.target.value)}
                    value={commitContractor}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {session?.user.role === 'freelancer' && contract?.status === 'Pending' && (
          <div className="mt-12 flex justify-end">
            <Button className="!px-10 rounded-full" title="Chấp thuận hợp đồng" onClick={handleContractUpdateContract} />
          </div>
        )}
      </ContainerBorder>
    </Container>
  );
};

export default Contract;
