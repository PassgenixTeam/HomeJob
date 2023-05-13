import Avatar from '@/components/common/Avatar';
import H3 from '@/components/common/Text/H3';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import React, { useEffect } from 'react';
import proposalApi from '../../../../../stores/slices/proposal/factories';
import { IProposalDetail } from '@/stores/slices/proposal/interface';
import { IoLocationSharp } from 'react-icons/io5';
import TextMuted from '@/components/common/Text/TextMuted';
import TextLink from '@/components/common/Text/TextLink';
import ButtonIcon from '@/components/common/ButtonIcon';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AiOutlineHeart } from 'react-icons/ai';
import Button from '@/components/common/Button';
import H4 from '@/components/common/Text/H4';
import H6 from '@/components/common/Text/H6';
import TextSmall from '@/components/common/Text/TextSmall';
import H5 from '@/components/common/Text/H5';
import TextNormal from '@/components/common/Text/TextNormal';
import TextArea from '@/components/common/TextArea/TextArea';

interface ModalProposalDetailProps {
  id: string;
}

const ModalProposalDetail = ({ id }: ModalProposalDetailProps) => {
  const [proposal, setProposal] = React.useState<IProposalDetail | null>(null);
  const [chat, setChat] = React.useState('');
  const [charNum, setCharNum] = React.useState(5000);

  useEffect(() => {
    const fetchData = async () => {
      const res = await proposalApi.getProposal(id);
      setProposal(res.data);
    };

    fetchData();
  }, []);
  return (
    <ContainerBorder className="mt-6 !px-0">
      <div className="flex justify-between items-start h-[140px] px-6 border-b">
        <div className="flex gap-4">
          <Avatar avatar={proposal?.user.avatarUrl} />
          <div>
            <H3>
              {proposal?.user.firstName} {proposal?.user.lastName}
            </H3>
            <div className="flex gap-1 items-center mt-2">
              <IoLocationSharp className="inline-block mr-2" />
              <TextMuted>
                {proposal?.user.city || '_'} , {proposal?.user.country} -
              </TextMuted>
              <TextMuted>4:24 pm local time</TextMuted>
            </div>
            <div className="mt-10">
              <TextLink href="/profile">View Profile</TextLink>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <ButtonIcon icon={<FiMoreHorizontal size={21} />} />
          <Button title="Hire Freelance" className="rounded-full !py-2 !px-10" />
          <ButtonIcon icon={<AiOutlineHeart size={18} />} />
        </div>
      </div>
      <div className="border-b flex flex-col p-6 gap-4">
        <div className="flex justify-between">
          <H4>Proposal</H4>
          <div>
            <H5>${proposal?.bid}</H5>
            <H6>Proposal Bid</H6>
          </div>
        </div>
        <H5>Cover Letter</H5>
        <TextNormal className="whitespace-pre-wrap">{proposal?.coverLetter}</TextNormal>
        <div className="mt-6">
          <H5>
            Chat with {proposal?.user.firstName} {proposal?.user.lastName}
          </H5>
          <div className="mt-4">
            <TextArea
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
                setCharNum(5000 - e.target.value.length);
              }}
            />
          </div>
          <TextMuted className="float-right mt-2">{charNum.toLocaleString()} characters remaining</TextMuted>
          <Button title="Send message" className="mt-12 rounded-full !py-2 !px-10" disabled={charNum === 5000 ? true : false} />
        </div>
      </div>
    </ContainerBorder>
  );
};

export default ModalProposalDetail;
