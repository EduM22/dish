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

export interface RefundRequest {
  originalPaymentReference: string;
  callbackUrl: string;
  payerAlias: string;
  amount: number;
  currency: "SEK";
  payerPaymentReference?: string;
  message?: string;
}

export interface Mcom2QcomQR {
  token: string;
  format: "jpg" | "png" | "svg";
  size?: number;
  border?: number;
  transparent?: boolean;
}

export interface QRPreFilled {
  format: "jpg" | "png" | "svg";
  payee?: {
    value: string;
    editable: boolean;
  };
  amount?: {
    value: number;
    editable: boolean;
  };
  message?: {
    value: string;
    editable: boolean;
  };
  size?: number;
  border?: number;
  transparent?: boolean;
}

export interface PayoutRequest {
  payload: {
    payoutInstructionUUID: string;
    payerPaymentReference: string;
    payerAlias: string;
    payeeAlias: string;
    payeeSSN: string;
    amount: string;
    currency: "SEK";
    payoutType: string;
    message?: string;
    instructionDate: string;
    signingCertificateSerialNumber: string;
  };
  callbackUrl: string;
}
