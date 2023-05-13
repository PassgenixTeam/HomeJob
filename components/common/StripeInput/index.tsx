import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
  StripeCardNumberElementChangeEvent,
} from "@stripe/stripe-js";
import clsx from "clsx";
import { ReactNode, useState } from "react";

interface IProps {
  title: string | ReactNode;
  type: "card-number" | "expiration" | "cvc";
  className?: string;
}

const StripeInput = ({ title, type, className = "" }: IProps) => {
  const [error, setError] = useState<string>("");

  const Card =
    type === "expiration"
      ? CardExpiryElement
      : type === "cvc"
      ? CardCvcElement
      : CardNumberElement;

  const handleChange = (
    e:
      | StripeCardExpiryElementChangeEvent
      | StripeCardCvcElementChangeEvent
      | StripeCardNumberElementChangeEvent,
  ) => {
    e.error && setError(e.error.message);
  };

  return (
    <div className={clsx(className, { "text-red-500": error })}>
      <div className="mb-1 text-[color:var(--color-interface-primary)]">{title}</div>
      <div
        className={clsx(
          { "border-red-500": error },
          { "border-gray-400": !error },
          "rounded-md border",
        )}
      >
        <Card
          options={{
            style: {
              base: {
                color: "rgb(51, 51, 51)",
                backgroundColor: "white",
                padding: "10px"
              },
              invalid: {
                color: "rgb(51, 51, 51)",
              },
            },
          }}
          onChange={handleChange}
        />
      </div>
      {!!error && <div className="mt-1 text-sm">{error}</div>}
    </div>
  );
};

export default StripeInput;
