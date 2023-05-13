import Button from '@/components/common/Button';
import * as React from 'react';
import { AiFillFlag, AiFillStar, AiOutlineHeart } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

export interface RightSideProps {}
const url = process.env.NEXT_PUBLIC_FRONTEND_URL;
export default function RightSide(props: RightSideProps) {
  const router = useRouter();
  const { jid: JobId } = router.query;
  const { data: session, status } = useSession();
  const handleApplyJob = () => {
    router.push(`/proposals/job/${JobId}`);
  };

  return (
    <div className="w-[30%] border-l-[1px] border-l-[color:var(--gray-5)] text-[color:var(--gray-10)]">
      <div className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
        <div className="w-full space-y-4">
          {session?.user?.role === 'freelancer' && (
            <Button title="Đấu thầu ngay" className="w-full font-semibold rounded-full py-[8px]" onClick={() => handleApplyJob()} />
          )}
          <Button
            title="Lưu công việc"
            icon={<AiOutlineHeart size={22} />}
            variant="outline"
            className="w-full font-semibold rounded-full py-[8px]"
          />
        </div>
        <div className="mt-6 space-y-2">
          {/* <div className="flex items-center space-x-2 text-[color:var(--primary-7)]">
            <AiFillFlag />
            <p className="font-semibold">Flag a inappropriate</p>
          </div> */}
          <p>Gửi bản đề xuất: 6 Connects</p>
          {/* <p>Available Connects: 68</p> */}
        </div>
      </div>
      <div className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
        <p className="font-semibold text-lg mb-3">{session?.user.role === 'freelance' ? 'Thông tin khách hàng' : 'Thông tin nhà thầu'}</p>
        <div className="flex items-center space-x-2">
          <p className="font-medium">Thông tin sẽ được cung cấp sau khi 2 bên chấp nhận giá thầu</p>
        </div>
        <div className="flex items-center mt-1 relative"></div>
      </div>
      <div className="px-8 py-8">
        <p className="font-semibold text-lg mb-3">Link chi tiết công việc</p>
        <div
          className="w-full py-2 px-4 bg-[color:var(--primary-2)] 
          rounded-lg text-[color:var(--gray-7)] hover:cursor-default"
        >
          <p className=" overflow-hidden whitespace-nowrap ">{`${url}job/${JobId}`}</p>
        </div>
        <p
          className="font-semibold text-[color:var(--primary-7)] mt-1 hover:cursor-pointer"
          onClick={() => navigator.clipboard.writeText(`${url}job/${JobId}`)}
        >
          Sao chép link
        </p>
      </div>
    </div>
  );
}
