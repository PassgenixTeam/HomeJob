import Radio from "@/components/common/Radio";
import { IAddPaymentMethod } from "@/interfaces";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { useState } from "react";
import Paypal from "./Paypal";
import Stripe from "./Stripe";

export interface PaymentMethodProps {
}

export default function PaymentMethod({}: PaymentMethodProps) {
  const [tag, setTag] = useState<"paypal" | "stripe">("paypal");
  const [stripePromise, setStripePromise] = useState<any>(
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string, {
      locale: "en",
    })
  );

  const initialValues: IAddPaymentMethod = {
    type: "",
  };

  const handleSubmit = (values: IAddPaymentMethod) => {};
  return (
    <div className="w-full">
      <h6 className="text-xl font-medium p-8">Add a Payment Method</h6>

      <div>
        <PayPalScriptProvider
          options={{
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_KEY as string,
            currency: "USD",
            locale: "en_US",
          }}
        >
          <div>
            <div>
              <div
                className="px-[30px] py-[10px] flex items-center space-x-3 border-b-[1px] border-b-[color:var(--gray-5)]
                      text-[color:var(--gray-9)]"
              >
                <Radio
                  name="type"
                  value={tag}
                  label="Payment card"
                  checked={tag === "stripe"}
                  custom
                  onClick={() => {
                    setTag("stripe");
                  }}
                />
                <p className="text-sm">
                  Visa, Mastercard, American Express, Discover, Diners
                </p>
              </div>
              <div
                className={`${
                  tag === "stripe" ? "h-fit" : "h-0 overflow-hidden"
                }`}
              >
                {stripePromise && (
                  <Elements stripe={stripePromise}>
                    {" "}
                    <Stripe />
                  </Elements>
                )}
              </div>
            </div>
            <div>
              <div
                className="px-[30px] py-[10px] flex items-center space-x-3
                      text-[color:var(--gray-9)]"
              >
                <Radio
                  name="type"
                  value={tag}
                  label=""
                  checked={tag === "paypal"}
                  custom
                  onClick={() => {
                    setTag("paypal");
                  }}
                />
                <Image
                  src="/images/paypal-logo.97ac7c2.svg"
                  alt="Paypal Work From Home"
                  width={90}
                  height={24}
                />
              </div>
              <div
                className={`${
                  tag === "paypal" ? "h-fit" : "h-0 overflow-hidden"
                }`}
              >
                <Paypal />
              </div>
            </div>
          </div>
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
