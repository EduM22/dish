import { yup } from "./deps.ts";

export const SWISH_LIVE_URL = "https://cpc.getswish.net/swish-cpcapi";
export const SWISH_TEST_URL = "https://mss.cpc.getswish.net/swish-cpcapi";
export const SWISH_QR_LIVE_URL = "https://mpc.getswish.net/qrg-swish";
export const SWISH_QR_TEST_URL = "https://mpc.getswish.net/qrg-swish";

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

export const PaymentRequestEcommerceSchema = yup.object({
  payeeAlias: yup.string().min(1).required(),
  payerAlias: yup.string().notRequired(),
  amount: yup.number().positive().min(1).required(),
  currency: yup.string().matches(/SEK/gmi).required(),
  callbackUrl: yup.string().url().required(),
  payeePaymentReference: yup.string().notRequired(),
  message: yup.string().notRequired(),
});

export const PaymentRequestMcommerceSchema = yup.object({
  payeeAlias: yup.string().min(1).required(),
  amount: yup.number().positive().min(1).required(),
  currency: yup.string().matches(/SEK/gmi).required(),
  callbackUrl: yup.string().url().required(),
  payeePaymentReference: yup.string().notRequired(),
  message: yup.string().notRequired(),
});

export const RefundRequestSchema = yup.object({
  originalPaymentReference: yup.string().min(1).required(),
  callbackUrl: yup.string().url().required(),
  payerAlias: yup.string().min(1).required(),
  amount: yup.number().positive().min(1).required(),
  currency: yup.string().matches(/SEK/gmi).required(),
  payerPaymentReference: yup.string().notRequired(),
  message: yup.string().notRequired(),
});

export const Mcom2QcomQRSchema = yup.object({
  token: yup.string().min(1).required(),
  format: yup.string().matches(/jpg|png|svg/gmi).required(),
  size: yup.number().positive().min(300).notRequired(),
  border: yup.number().positive().min(1).notRequired(),
  transparent: yup.bool().notRequired(),
});

export const QRPreFilledSchema = yup.object({
  format: yup.string().matches(/jpg|png|svg/gmi).required(),
  payee: yup.object({
    value: yup.string().notRequired(),
    editable: yup.bool().notRequired(),
  }).notRequired(),
  amount: yup.object({
    value: yup.string().notRequired(),
    editable: yup.bool().notRequired(),
  }).notRequired(),
  message: yup.object({
    value: yup.string().notRequired(),
    editable: yup.bool().notRequired(),
  }).notRequired(),
  size: yup.number().positive().min(300).notRequired(),
  border: yup.number().positive().min(1).notRequired(),
  transparent: yup.bool().notRequired(),
});

export const PayoutRequestSchema = yup.object({
  payload: yup.object({
    payoutInstructionUUID: yup.string().min(1).required(),
    payerPaymentReference: yup.string().min(1).required(),
    payerAlias: yup.string().min(1).required(),
    payeeAlias: yup.string().min(1).required(),
    payeeSSN: yup.string().min(10).max(12).required(),
    amount: yup.string().min(1).required(),
    currency: yup.string().matches(/SEK/gmi).required(),
    payoutType: yup.string().min(1).required(),
    message: yup.string().notRequired(),
    instructionDate: yup.string().min(1).required(),
    signingCertificateSerialNumber: yup.string().min(1).required(),
  }).required(),
  callbackUrl: yup.string().url().required(),
});
