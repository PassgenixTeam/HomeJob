import Avatar from '@/components/common/Avatar';
import Button from '@/components/common/Button';
import H4 from '@/components/common/Text/H4';
import H5 from '@/components/common/Text/H5';
import H6 from '@/components/common/Text/H6';
import TextMuted from '@/components/common/Text/TextMuted';
import TextNormal from '@/components/common/Text/TextNormal';
import { IContractResponse } from '@/stores/slices/contract/interface';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';
import { ROUTER } from '@/constants/router';

interface IConTractProps {
  contract: IContractResponse;
}

const ItemContract = ({ contract }: IConTractProps) => {
  const { data: session } = useSession();

  return (
    <div className="p-6 border-b flex justify-between">
      <div>
        <H4>{contract.job.title}</H4>
        <div>
          <TextNormal>Trạng thái</TextNormal>
          <H6>{contract.status}</H6>
        </div>
      </div>
      <div>
        <Link href={`${session?.user.role === 'freelancer' ? ROUTER.FREELANCER : ROUTER.CLIENT}/contract/${contract.id}`}>
          <Button className="rounded-full" title="Xem chi tiết" />
        </Link>
      </div>
    </div>
  );
};

export default ItemContract;
