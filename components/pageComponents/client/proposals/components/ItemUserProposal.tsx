import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import SkillItem from '@/components/common/SkillItem';
import H5 from '@/components/common/Text/H5';
import H6 from '@/components/common/Text/H6';
import TextLink from '@/components/common/Text/TextLink';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import ModalProposalDetail from '@/components/pageComponents/client/proposals/components/ModalProposalDetail';
import { IProposalDetail } from '@/stores/slices/proposal/interface';
import Link from 'next/link';
import React from 'react';

interface ItemUserProposalProps {
  proposal: IProposalDetail;
}

const ItemUserProposal = ({ proposal }: ItemUserProposalProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="flex gap-8 border-b p-6">
        <div className="flex-shrink-0">
          <Avatar />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <div>
              <TextLink>
                {proposal?.user?.firstName} {proposal.user?.lastName}
              </TextLink>
              <H6>{proposal.user?.title}</H6>
              <TextMuted>{proposal.user?.country}</TextMuted>
            </div>
            <div>
              <Link href={`/client/create-contract/proposal/${proposal.id}`}>
                <Button title="Chọn" size="sm" className="px-8" />
              </Link>
            </div>
          </div>
          <div className="flex gap-4 justify-between mt-4">
            <div className="flex-grow">
              <H5>Giá thầu: {proposal.estimateBudget} Triệu VND</H5>
            </div>
            {/* <div className="flex-grow">
              <H6>$0.00 earned</H6>
            </div> */}
            <div className="flex-grow"></div>
            <div className="flex-grow"></div>
          </div>
          <div className="mt-4">
            <TextNormal className="">
              <TextNormal className="!font-bold">Cover letter - </TextNormal>
              {proposal.coverLetter}
            </TextNormal>
          </div>
          {/* <div className="mt-4 flex gap-2">
            {proposal.user?.skills.map((skill, index) => (
              <SkillItem key={index}>
                <TextLink href='"'>{skill.name}</TextLink>
              </SkillItem>
            ))}
          </div> */}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} title="Proposal" size="xl">
        <ModalProposalDetail id={proposal.id} />
      </Modal>
    </>
  );
};

export default ItemUserProposal;
