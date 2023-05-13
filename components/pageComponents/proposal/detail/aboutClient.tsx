import moment from 'moment';
import * as React from 'react';
import { AiFillCheckCircle, AiFillQuestionCircle } from 'react-icons/ai';

export interface AboutClientProps {}

export default function AboutClient(props: AboutClientProps) {
  return (
    <div className="w-[35%] text-[color:var(--gray-10)]">
      <div className="pb-6">
        <h6 className="font-semibold text-lg pb-3">THông tin khách hàng</h6>
        <div className="flex items-center space-x-3">
          <p>Payment method verified</p>
        </div>
      </div>
      <div className="pb-6">
        <h6 className="font-semibold text-lg pb-3">Location</h6>
        <div className="">
          <p>Payment method verified</p>
          <span className="text-sm text-[color:var(--gray-8)]">04:24AM</span>
        </div>
      </div>
      <div className="pb-6">
        <h6 className="font-semibold text-lg pb-3">History</h6>
        <div className=" space-y-2">
          <div className="flex items-center space-x-3">
            <p>15 to 20 proposals</p>
            <AiFillQuestionCircle size={18} color="#096dd9" />
          </div>
          <p>1 interview</p>
          <p>open 1 job</p>
        </div>
      </div>
    </div>
  );
}
