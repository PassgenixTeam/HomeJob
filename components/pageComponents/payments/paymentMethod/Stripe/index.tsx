import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";

import { BiLoaderAlt } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";


import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import {
  getPaymentInfo,
  payMethod,
} from "@/stores/slices/payment/paymentSlide";
import { countryList } from "@/utils/common";
import { createPaymentByTokenRequest } from "@/utils/services/paymentService";
import paymentCardSchema from "@/validations/paymentCardSchema";
import CreditCard from "./CreditCard";
import Radio from "@/components/common/Radio";
import Input from "@/components/common/Input";
import Select from "@/components/common/Select";

export interface StripeProps {}

function Stripe(props: StripeProps) {
  const { paymentInfo, isLoading } = useAppSelector((state) => state.payment);
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardDefault, setCardDefault] = useState<any>(1);

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    resetForm,
    errors,
    setFieldValue,
    touched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      billingAddress: "",
      billingCity: "",
      billingPostalCode: "",
      billingCountry: "US",
    },
    validationSchema: paymentCardSchema,
    onSubmit: async (values) => {
      if (!stripe || !elements) {
        return;
      }
      if (stripe && elements) {
        setIsProcessing(true);
        const cardElement = elements.getElement("cardNumber");
        // @ts-ignore
        const token = await stripe.createToken(cardElement, {
          address_city: values.billingCity,
          address_country: values.billingCountry,
          address_zip: values.billingPostalCode,
          name: values.name,
        });
        if (token.error?.message) {
          // notifyMessage(token.error.message, "failure");
        } else {
          const result = await createPaymentByTokenRequest({
            customerId: "cus_NZWqwjGC3HzD39",
            token: token.token?.id as string,
          });
          const paymentRequest = {
            customerId: "cus_NZWqwjGC3HzD39",
            paymentMethodId: result.data.data.id,
            currency: "USD",
            amount: 123,
          };
          dispatch({
            type: payMethod(paymentRequest).type,
            payload: paymentRequest,
          });
          resetForm();
          console.log(result);
        }
      }
      setIsProcessing(false);
      return true;
    },
  });

  const handleChangeCard = (index: any) => {
    setCardDefault(index);
  };
  const handlePayment = () => {
    const paymentRequest = {
      customerId: "cus_NZWqwjGC3HzD39",
      paymentMethodId: cardDefault,
      currency: "USD",
      amount: 123,
    };
    dispatch({
      type: payMethod(paymentRequest).type,
      payload: paymentRequest,
    });
  };

  // useEffect(()=>{
  //   setCardDefault(()=>
  //   paymentInfo.findIndex(item=>item.isDefault))
  // },[paymentInfo])

  useEffect(() => {
    dispatch({
      type: getPaymentInfo().type,
    });
  }, []);

  return (
    <div className="relative border-b-[1px] pb-8">
      <div className="">
        <div
          className={`h-full absolute w-full  bg-white transition ${
            isLoading ? "opacity-40 z-40" : "opacity-0 z-[-1]"
          }`}
        >
          <div className="w-full h-full flex justify-center items-center">
            <BiLoaderAlt size={35} className="animate-spin" />
          </div>
        </div>
        <div className="space-y-2">
          {paymentInfo.map((item, index) => (
            <div className="py-2 pr-10 pl-16 flex items-center" key={index}>
              <Radio
                label=""
                checked={cardDefault === item.id}
                onClick={() => handleChangeCard(item.id)}
              />
              <div className="ml-4 w-full flex items-center justify-between">
                <div className="flex items-center">
                  {item.card.brand === "visa" ? (
                    <Image
                      src="/images/visa.svg"
                      alt="Visa Card"
                      width={36}
                      height={24}
                    />
                  ) : item.card.brand === "mastercard" ? (
                    <Image
                      src="/images/master_card.svg"
                      alt="Master Card"
                      width={36}
                      height={24}
                    />
                  ) : (
                    <Image
                      src="/images/amex.svg"
                      alt="American Express Card"
                      width={36}
                      height={24}
                    />
                  )}
                  <div className="ml-4">************{item.card.last4}</div>
                </div>
                <RiDeleteBin6Fill size={22} className="hover:cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
        <div className="py-2 px-16 mt-2 mb-4 flex items-center">
          <Radio
            label=""
            onClick={() => handleChangeCard(-1)}
            checked={cardDefault === -1}
          />
          <div className="ml-4">Add a New Credit Card</div>
        </div>
        {cardDefault === -1 ? (
          <form id="payment-form" className="w-full px-16" onSubmit={handleSubmit}>
            <div className="">
              <div className="mb-4">
                <Input
                  title="Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name ? errors.name : ""}
                  square
                />
              </div>
              <div className="mb-4">
                <Input
                  name="billingAddress"
                  title="Billing Address"
                  value={values.billingAddress}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.billingAddress ? errors.billingAddress : ""}
                  placeholder="Billing Address"
                  square
                />
              </div>
              <div className="flex justify-between mb-4 space-x-4">
                <Input
                  name="billingCity"
                  title="Billing City"
                  value={values.billingCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.billingCity ? errors.billingCity : ""}
                  placeholder="Billing City"
                  className="basis-1/3"
                  square
                />
                <Input
                  name="billingPostalCode"
                  title="Billing Postal Code"
                  value={values.billingPostalCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.billingPostalCode ? errors.billingPostalCode : ""
                  }
                  placeholder="Billing Postal Code"
                  className="basis-1/3"
                  square
                />
                <Select
                  title="Billing Country"
                  name="billingCountry"
                  options={countryList}
                  value={{
                    label: countryList.find(
                      (item) => item.value === values.billingCountry
                    )?.label,
                    value: values.billingCountry,
                  }}
                  // @ts-ignore
                  onChange={({ value }) =>
                    setFieldValue("billingCountry", value)
                  }
                  className="basis-1/3 h-[36px]"
                  inputClassName="h-[36px] px-2 text-medium"
                  square
                  height="36px"
                />
              </div>
              <CreditCard />
            </div>
            <button
              className="py-2 px-4 bg-[#0570de] rounded-sm text-white font-medium mt-4"
              // disabled={isProcessing || !stripe || !elements}
              id="submit"
            >
              Pay with Selected Card
            </button>
          </form>
        ) : (
          <button
            className="py-2 px-4 bg-[#0570de] rounded-sm text-white font-medium mx-16"
            // disabled={isProcessing || !stripe || !elements}
            onClick={() => handlePayment()}
          >
            Pay with Selected Card
          </button>
        )}
        <div></div>
      </div>
    </div>
  );
}

export default Stripe;
