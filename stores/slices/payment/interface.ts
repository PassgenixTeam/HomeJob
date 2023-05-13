import { ROLE } from "@/constants";
import { EXPERIENCE_LEVEL, IModify, JOB_STATUS, PROJECT_LENGTH, SCOPE_TYPE } from "@/interfaces";

export interface PaymentState {
  isLoading: boolean;
  error: string;
  paymentInfo:IUserPaymentInfo[]
}
export interface IUserPaymentInfo {
  card: ICardInfo;
  id: string;
  billing_details: any;
  created: number;
  customer: string;
  livemode: boolean;
  metadata: any;
  object: string;
  type: string;
}
export interface ICardInfo {
  brand?: string;
  country?: string;
  exp_month?: number;
  exp_year?: number;
  ingerprint?: string;
  funding?: string;
  generated_from?: string;
  last4?: string;
  wallet?: any;
  check?: {
    address_line1_check?: string;
    address_postal_code_check?: string;
    cvc_check?: string;
  };
  networks?: any;
  three_d_secure_usage?: any;
}
export interface ICreateInternPayment {
  customerId: string;
  paymentMethodId: string;
  currency: string;
  amount: number;
}
export interface IConfirmPayment {
  paymentIntentId: string;
  data?: string;
}