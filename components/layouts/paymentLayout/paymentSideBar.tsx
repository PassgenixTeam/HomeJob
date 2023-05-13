import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTER } from "@/constants/router";
export interface PaymentNavBarProps {}

export default function PaymentNavBar(props: PaymentNavBarProps) {
  const router = useRouter();
  return (
      <div className="w-full">
        <ul className="flex w-full border-b-[1px] space-x-4 px-2">
          <li
            className={`font-medium pl-2 py-2 
             ${
               router.pathname === ROUTER.PAYMENTS
                 && " border-b-[2px] text-[color:var(--primary-7)] border-b-[color:var(--primary-7)]"
             }`}
          >
            <Link href={ROUTER.PAYMENTS}>Payments Info</Link>
          </li>
          <li
            className={`font-medium  pl-2 py-2 
            ${
              router.pathname === "/payments/bill-earn"
                && "border-b-[2px] text-[color:var(--primary-7)] border-b-[color:var(--primary-7)]"
            }`}
          >
            <Link href={`${ROUTER.PAYMENTS}${ROUTER.BILL}`}>Billing & Earnings</Link>
          </li>
        </ul>
      </div>
  );
}
