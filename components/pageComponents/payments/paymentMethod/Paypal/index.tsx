import { captureOrder, createPaypalOrder } from "@/utils/services/paymentService";
import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useState } from "react";
import { toast } from "react-toastify";

export interface PaypalProps {}

export default function Paypal(props: PaypalProps) {
  return (
    <div className="px-8 py-4">
      <h2 className="pb-4 text-sm text-[color:var(--gray-9)]">Make a Paypal Payment</h2>
      <PayPalButtons
        createOrder={async (data, actions) => {
          try {
            const order = await createPaypalOrder({ amount: 200 });
            return order.data.data.id;
          } catch (error) {
            console.log(error);
          }
        }}
        onApprove={async (data, actions) => {
          try {
            const capture = await captureOrder({ orderId: data.orderID });
            toast.success("Paid by Paypal");
            // return capture
          } catch (error) {
            console.log(error);
          }
        }}
        style={{
          height: 40,
          layout: 'horizontal',
          color: 'blue',
          label: 'pay',
          tagline: false,
        }}
      />
    </div>
  );
}
