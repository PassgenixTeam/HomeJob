import H1 from '@/components/common/Text/H1';
import H4 from '@/components/common/Text/H4';
import TextNormal from '@/components/common/Text/TextNormal';
import Container from '@/components/layouts/Container';
import ContainerBorder from '@/components/layouts/ContainerBorder';
import React from 'react';
import contractApi from '../../../../stores/slices/contract/factories';
import { IContractResponse } from '@/stores/slices/contract/interface';
import ItemContract from '@/components/pageComponents/client/contract/components/ItemContract';

const ContractFreelance = () => {
  const [contracts, setContracts] = React.useState<IContractResponse[]>([]);

  React.useEffect(() => {
    const getContract = async () => {
      const res = await contractApi.getContracts();
      setContracts(res.data);
    };

    getContract();
  }, []);

  return (
    <Container>
      <ContainerBorder className="!px-0">
        <div className="w-full flex justify-center">
          <H1>Tất cả hợp đồng</H1>
        </div>
        <div>
          {contracts.map((contract, index) => (
            <ItemContract contract={contract} key={index} />
          ))}
        </div>
      </ContainerBorder>
    </Container>
  );
};

export default ContractFreelance;
