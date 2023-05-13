import Container from '@/components/layouts/Container';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import ItemUserProposal from '@/components/pageComponents/client/proposals/components/ItemUserProposal';
import { useAppSelector } from '@/stores/hooks';
import { getAllProposalByJob, selectProposals } from '@/stores/slices/proposal/proposalSlide';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Proposal = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const dispatch = useDispatch();

  const proposals = useAppSelector(selectProposals);

  useEffect(() => {
    if (id) {
      dispatch(getAllProposalByJob(id));
    }
  }, []);

  return (
    <Container>
      <ContainerBorder className="!px-0">
        {proposals.map((proposal) => (
          <ItemUserProposal key={proposal.id} proposal={proposal} />
        ))}
      </ContainerBorder>
    </Container>
  );
};

export default Proposal;
