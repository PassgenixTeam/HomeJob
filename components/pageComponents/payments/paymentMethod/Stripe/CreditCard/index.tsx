import StripeInput from "@/components/common/StripeInput";
import Image from "next/image";


export interface CreditCardProps {}

export default function CreditCard(props: CreditCardProps) {
  return (
    <div>
      <h5 className="text-lg">Credit Card Details</h5>
      <div className="border p-3 mt-2">
        <div className="flex  w-full space-x-4">
          <StripeInput
            title="Card Number"
            type="card-number"
            className="basis-1/2"
          />
          <StripeInput
            title="Expiration"
            type="expiration"
            className="basis-1/4"
          />
          <StripeInput title="CVC" type="cvc" className="basis-1/4" />
        </div>
        <div className="flex justify-end mt-2 mr-2">
          <p className="mr-2 mb-0 text-[color:var(--color-light-secondary)]">
            Credit Card brands we support:
          </p>
          <span className="flex">
            <span className="ml-1">
              <Image
                src="/images/visa.svg"
                alt="Visa Card"
                width={36}
                height={24}
              />
            </span>
            <span className="ml-1">
              <Image
                src="/images/master_card.svg"
                alt="Master Card"
                width={36}
                height={24}
              />
            </span>
            <span className="ml-1">
              <Image
                src="/images/amex.svg"
                alt="American Express Card"
                width={36}
                height={24}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
