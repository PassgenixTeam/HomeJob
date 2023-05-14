import H1 from "@/components/common/Text/H1";
import H4 from "@/components/common/Text/H4";
import Container from "@/components/layouts/Container";
import ContainerBorder from "@/components/layouts/ContainerBorder";
import React from "react";
import contractApi from "../../../stores/slices/contract/factories";
import { useRouter } from "next/router";
import Avatar from "@/components/common/Avatar";
import H5 from "@/components/common/Text/H5";
import TextMuted from "@/components/common/Text/TextMuted";
import TextArea from "@/components/common/TextArea/TextArea";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { IContractResponse } from "@/stores/slices/contract/interface";
import { useMutation } from "@tanstack/react-query";
import { oraiAcceptJob } from "@/orai/execute";
import H6 from "@/components/common/Text/H6";
import TextNormal from "@/components/common/Text/TextNormal";
import owalletPng from "@/orai/owallet.png";
import Link from "next/link";

const Contract = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [contract, setContract] = React.useState<IContractResponse>();

  const [commitClient, setCommitClient] = React.useState<string>("");
  const [commitContractor, setCommitContractor] = React.useState<string>("");

  React.useEffect(() => {
    const fetchContract = async () => {
      try {
        const res = await contractApi.getContractDetail(router.query.id as string);
        setContract(res.data);
        setCommitClient(res.data.information.commitClient);
        setCommitContractor(res.data.information.commitContractor);
      } catch (error) {
        toast.error("Get contract failure!");
      }
    };

    fetchContract();
  }, []);

  const { mutateAsync: acceptJob } = useMutation(oraiAcceptJob, {
    onSuccess: () => {
      toast.success("Đã chấp nhận hợp đồng và lưu lên blockchain!");
    },
    onError: (error: Error) => {
      toast.error(error?.message);
    },
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const handleContractUpdateContract = async () => {
    setIsLoading(true);
    try {
      if (!contract?.oraiJobId) {
        toast.error("Không tìm thấy hợp đồng này trên blockchain");
        return;
      }

      const txHash = await acceptJob(contract.oraiJobId);

      await contractApi.acceptContract(contract?.id!, {
        approvedTxHash: txHash,
      });
      toast.success("Create contract successfully!");

      router.back();
    } catch (error) {
      toast.error("Create contract failure!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <ContainerBorder>
        <div className="w-full flex justify-center">
          <H1>Hợp đồng chi tiết</H1>
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
                <div className="h-[100px]">
                  <div className="flex gap-2 my-1 mt-4">
                    <H6>Thời gian hoàn thành dự kiến</H6>
                    <TextNormal>{contract?.job.estimate} Ngày</TextNormal>
                  </div>
                  <div className="flex gap-2 my-1">
                    <H6>Tổng chi phí dự kiến</H6>
                    <TextNormal>{contract?.job.budget} Triệu VND</TextNormal>
                  </div>
                </div>
                <div className="mt-4 pr-4">
                  <TextArea disabled={session?.user.role !== "client"} className="mt-4" onChange={(e) => setCommitClient(e.target.value)} value={commitClient} />
                </div>
                {contract?.txHash && (
                  <Link href={`https://testnet.scan.orai.io/txs/${contract.txHash}`} className="flex" target="_blank">
                    <div title={contract.txHash} className="flex gap-4 items-center px-4 py-2 rounded-full border border-dashed border-indigo-700 mt-4">
                      <img src={owalletPng.src} className="w-4 h-4" />
                      <H5 className="text-indigo-700">TxHash: {contract.txHash.slice(0, 12)}...</H5>
                    </div>
                  </Link>
                )}
              </div>
              <div className="flex-grow ">
                <H5>Cam kết bên chủ thầu</H5>
                <div className="h-[100px]">
                  <div className="flex gap-2 my-1 mt-4">
                    <H6>Thời gian hoàn thành dự kiến</H6>
                    <TextNormal>{contract?.proposal?.estimatedTime} Ngày</TextNormal>
                  </div>
                  <div className="flex gap-2 my-1">
                    <H6>Tổng chi phí dự kiến</H6>
                    <TextNormal>{contract?.proposal?.estimateBudget} Triệu VND</TextNormal>
                  </div>
                  <div className="flex gap-2 my-1">
                    <H6>Số lượng nhân công dự kiến</H6>
                    <TextNormal>{contract?.proposal?.estimatedLabor} Nhân công</TextNormal>
                  </div>
                </div>
                <div className="mt-4 pr-4">
                  <TextArea disabled className="mt-4" onChange={(e) => setCommitContractor(e.target.value)} value={commitContractor} />
                </div>
                {contract?.approvedTxHash && (
                  <Link className="flex" href={`https://testnet.scan.orai.io/txs/${contract.approvedTxHash}`} target="_blank">
                    <div title={contract.approvedTxHash} className="flex gap-4 items-center px-4 py-2 rounded-full border border-dashed border-indigo-700 mt-4">
                      <img src={owalletPng.src} className="w-4 h-4" />
                      <H5 className="text-indigo-700">TxHash: {contract.approvedTxHash.slice(0, 12)}...</H5>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        {session?.user.role === "freelancer" && contract?.status === "Pending" && (
          <div className="mt-12 flex justify-end">
            <Button className="!px-10 rounded-full" title="Chấp thuận hợp đồng" loading={isLoading} onClick={handleContractUpdateContract} />
          </div>
        )}
      </ContainerBorder>
    </Container>
  );
};

export default Contract;
