export const SWISH_LIVE_URL = "https://cpc.getswish.net/swish-cpcapi";
export const SWISH_TEST_URL = "https://mss.cpc.getswish.net/swish-cpcapi";

export interface PaymentRequestEcommerce {
  payeeAlias: string;
  payerAlias?: string;
  amount: number;
  currency: "SEK";
  callbackUrl: string;
  payeePaymentReference?: string;
  message?: string;
}

export interface PaymentRequestMcommerce {
  payeeAlias: string;
  amount: number;
  currency: "SEK";
  callbackUrl: string;
  payeePaymentReference?: string;
  message?: string;
}
