import Button from "@/components/common/Button";
import * as React from "react";
import { AiFillFlag, AiFillStar, AiOutlineHeart } from "react-icons/ai";
import { HiCheckBadge } from "react-icons/hi2";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

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
          {session?.user?.role === "freelancer" && (
            <Button
              title="Apply Now"
              className="w-full font-semibold rounded-full py-[8px]"
              onClick={() => handleApplyJob()}
            />
          )}
          <Button
            title="Save Job"
            icon={<AiOutlineHeart size={22} />}
            variant="outline"
            className="w-full font-semibold rounded-full py-[8px]"
          />
        </div>
        <div className="mt-6 space-y-2">
          <div className="flex items-center space-x-2 text-[color:var(--primary-7)]">
            <AiFillFlag />
            <p className="font-semibold">Flag a inappropriate</p>
          </div>
          <p>Send a proposal for: 6 Connects</p>
          <p>Available Connects: 68</p>
        </div>
      </div>
      <div className="px-8 py-8 border-b-[1px] border-b-[color:var(--gray-5)]">
        <p className="font-semibold text-lg mb-3">About the client</p>
        <div className="flex items-center space-x-2">
          <HiCheckBadge color="#096dd9" />
          <p className="font-medium">Payment method verified</p>
        </div>
        <div className="flex items-center mt-1 relative">
          <div className="text-[color:var(--gray-5)] w-[110px] absolute left-0 top-0 z-0">
            <div className="flex items-center ">
              <AiFillStar size={22} />
              <AiFillStar size={22} />
              <AiFillStar size={22} />
              <AiFillStar size={22} />
              <AiFillStar size={22} />
            </div>
          </div>
          <div className="text-[color:var(--primary-7)] w-[110px] overflow-hidden absolute left-0 top-0 z-10">
            <div className="w-[59%] overflow-hidden">
              <div className="w-[110px] flex items-center ">
                <AiFillStar size={22} />
                <AiFillStar size={22} />
                <AiFillStar size={22} />
                <AiFillStar size={22} />
                <AiFillStar size={22} />
              </div>
            </div>
          </div>
          <p className="text-sm text-[color:var(--gray-7)] text-end w-full">
            4.77 of 285 reviews
          </p>
        </div>
        <div className="py-[2px] mt-2">
          <p className="font-medium text-[color:var(--gray-9)]">Canada</p>
          <p className="text-[color:var(--gray-7)] text-sm">
            Niagara Falls 4:07 am
          </p>
        </div>
        <div className="py-[2px]">
          <p className="font-medium text-[color:var(--gray-9)]">
            941 jobs posted
          </p>
          <p className="text-[color:var(--gray-7)] text-sm">
            32% hire rate, 19 open jobs
          </p>
        </div>
        <div className="py-[2px]">
          <p className="font-medium text-[color:var(--gray-9)]">
            $26K total spent
          </p>
          <p className="text-[color:var(--gray-7)] text-sm">
            384 hires, 24 active
          </p>
        </div>
        <div className="py-[2px]">
          <p className="font-medium text-[color:var(--gray-9)]">
            $10.94 /hr avg hourly rate paid
          </p>
          <p className="text-[color:var(--gray-7)] text-sm">1,562 hours</p>
        </div>
        <p className="text-[color:var(--gray-6)] text-sm my-1">
          Member since Jan 29, 2014
        </p>
      </div>
      <div className="px-8 py-8">
        <p className="font-semibold text-lg mb-3">Job link</p>
        <div
          className="w-full py-2 px-4 bg-[color:var(--primary-2)] 
          rounded-lg text-[color:var(--gray-7)] hover:cursor-default"
        >
          <p className=" overflow-hidden whitespace-nowrap ">
            {`${url}job/${JobId}`}
          </p>
        </div>
        <p
          className="font-semibold text-[color:var(--primary-7)] mt-1 hover:cursor-pointer"
          onClick={() => navigator.clipboard.writeText(`${url}job/${JobId}`)}
        >
          Copy link
        </p>
      </div>
    </div>
  );
}
