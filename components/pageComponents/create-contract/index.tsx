import Button from '@/components/common/Button';
import { IUserProfile } from '@/stores/slices/profile/interface';
import { getProfile, selectProfile } from '@/stores/slices/profile/profileSlice';
import { IProposalDetail } from '@/stores/slices/proposal/interface';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import proposalApi from '../../../stores/slices/proposal/factories';
import profileAi from '../../../stores/slices/profile/factories';
import contractApi from '../../../stores/slices/contract/factories';
import { toast } from 'react-toastify';
import Container from '@/components/layouts/Container';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import Avatar from '@/components/common/Avatar';
import H4 from '@/components/common/Text/H4';
import H1 from '@/components/common/Text/H1';
import H5 from '@/components/common/Text/H5';
import TextMuted from '@/components/common/Text/TextMuted';
import TextArea from '@/components/common/TextArea/TextArea';
import H6 from '@/components/common/Text/H6';
import TextNormal from '@/components/common/Text/TextNormal';

const CreateContract = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  const profileClient = selectProfile();
  const [profileContractor, setProfileContractor] = React.useState<IUserProfile>();
  const [proposal, setProposal] = React.useState<IProposalDetail>();

  const [commitClient, setCommitClient] = React.useState<string>('');
  const [commitContractor, setCommitContractor] = React.useState<string>('');

  React.useEffect(() => {
    const getProposal = async () => {
      const res = await proposalApi.getProposal(router.query.id as string);
      setProposal(res.data);
    };

    if (router.query.id) {
      getProposal();
      dispatch(getProfile());
    }
  }, []);

  React.useEffect(() => {
    const getProfileContractor = async () => {
      const res = await profileAi.getUserById(proposal?.user?.id!);
      setProfileContractor(res.data);
      setCommitClient(proposal?.job.description!);
    };

    if (proposal) getProfileContractor();
  }, [proposal]);

  const handleCreateContract = async () => {
    try {
      await contractApi.postContract({
        contractorId: profileContractor!.id,
        information: {
          commitClient,
          commitContractor,
        },
        jobId: proposal!.jobId,
      });
      toast.success('Create contract successfully!');
    } catch (error) {
      toast.error('Create contract failure!');
    }
  };

  return (
    <Container>
      <ContainerBorder>
        <div className="w-full">
          <H1>Tạo hợp đồng</H1>
        </div>
        <div className="mt-24 px-6 flex gap-12 ">
          <div className="flex-grow">
            <H4>Thông tin khách hàng</H4>
            <div className="mt-4 flex gap-4 items-center">
              <Avatar avatar={profileClient?.avatarUrl} />
              <div className="flex flex-col">
                <H5>
                  {profileClient?.firstName} {profileClient?.lastName}
                </H5>
                <TextMuted>{profileClient?.title}</TextMuted>
                <TextMuted>{profileClient?.email}</TextMuted>
              </div>
            </div>
          </div>
          <div className="flex-grow">
            <H4>Thông tin chủ thầu</H4>
            <div className="mt-4 flex gap-4 items-center">
              <Avatar avatar={profileContractor?.avatarUrl} />
              <div className="flex flex-col">
                <H5>
                  {profileContractor?.firstName} {profileContractor?.lastName}
                </H5>
                <TextMuted>{profileContractor?.title}</TextMuted>
                <TextMuted>{profileContractor?.email}</TextMuted>
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
                <div className="h-[100px]">
                  <div className="flex gap-2 my-1 mt-4">
                    <H6>Thời gian hoàn thành dự kiến</H6>
                    <TextNormal>{proposal?.job.estimate} Ngày</TextNormal>
                  </div>
                  <div className="flex gap-2 my-1">
                    <H6>Tổng chi phí dự kiến</H6>
                    <TextNormal>{proposal?.job.budget} Triệu VND</TextNormal>
                  </div>
                </div>

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
                <div className="h-[100px]">
                  <div className="flex gap-2 my-1 mt-4">
                    <H6>Thời gian hoàn thành dự kiến</H6>
                    <TextNormal>{proposal?.estimatedTime} Ngày</TextNormal>
                  </div>
                  <div className="flex gap-2 my-1">
                    <H6>Tổng chi phí dự kiến</H6>
                    <TextNormal>{proposal?.estimateBudget} Triệu VND</TextNormal>
                  </div>
                  <div className="flex gap-2 my-1">
                    <H6>Số lượng nhân công dự kiến</H6>
                    <TextNormal>{proposal?.estimatedLabor} Nhân công</TextNormal>
                  </div>
                </div>
                <div className="mt-4 pr-4">
                  <TextArea
                    disabled={session?.user.role !== 'freelance'}
                    className="mt-4"
                    onChange={(e) => setCommitContractor(e.target.value)}
                    value={proposal?.coverLetter!}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex justify-end">
          <Button className="!px-10 rounded-full" title="Tạo hợp đồng" onClick={handleCreateContract} />
        </div>
      </ContainerBorder>
    </Container>
  );
};

export default CreateContract;
