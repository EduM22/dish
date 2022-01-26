//import { PayoutRequest, SWISH_LIVE_URL, SWISH_TEST_URL } from "./utils.ts";

/**
 * Creates a new Swish payout request
 * @param {string} SWISH_CA the ca cert from swish
 * @param {string} SWISH_PUBLIC the public cert from swish
 * @param {string} SWISH_PRIVATE the private cert from swish
 * @param {boolean} live use the live or test env
 * @param {PayoutRequest} data to send to swish
 * @returns {object} Id & location
 *
 * # Examples
 *
 * ```ts
 * import { CreatePayoutRequest } from "./payout.ts";
 *
 * const data = await CreateRefundRequest({
 *    SWISH_CA: "CERT",
 *    SWISH_PRIVATE: "PRIVATE",
 *    SWISH_PUBLIC: "PUBLIC",
 *    live: false,
 *    data: {
 *      payload: {
 *        payoutInstructionUUID: "E4D773858AF5459B96ABCA4B9DBFF94D",
 *        payerPaymentReference: "payerRef",
 *        payerAlias: "1231388446",
 *        payeeAlias: "46711111132",
 *        payeeSSN: "197709306828",
 *        amount: "100.00",
 *        currency: "SEK",
 *        payoutType: "PAYOUT",
 *        message: "Message to the recipient.",
 *        instructionDate:"2019-05-05T12:23:23Z",
 *        signingCertificateSerialNumber:"7BE0DA9DE336EDCE5FE9AAFEF39248AE"
 *      },
 *      callbackUrl: 'https://not.a.real.caller.com/callback'
 *    },
 * });
 * ```
 */
/*
export async function CreatePayoutRequest(params: {
  SWISH_CA: string;
  SWISH_PUBLIC: string;
  SWISH_PRIVATE: string;
  live: boolean;
  data: PayoutRequest;
}) {
  try {
    const client = Deno.createHttpClient({
      caCerts: [params.SWISH_CA],
      certChain: params.SWISH_PUBLIC,
      privateKey: params.SWISH_PRIVATE,
    });

    const baseUrl = params.live ? SWISH_LIVE_URL : SWISH_TEST_URL;

    const url = baseUrl +
      `/api/v1/payouts`;

    const res: Response = await fetch(url, {
      client,
      method: "POST",
      body: JSON.stringify(params.data),
      headers: { "Content-Type": "application/json" },
    });

    client.close();

    if (!res.ok) {
      const msg = await res.json();
      throw Error(`Status not OK: ${res.status}, ${JSON.stringify(msg)}`);
    }

    await res.body?.cancel();

    const location = res.headers.get("Location");

    return { location };
  } catch (error) {
    throw new Error(`Error from swish`, {
      cause: error,
    });
  }
}*/

/**
 * Retrieve a Swish payout request
 * @param {string} SWISH_CA the ca cert from swish
 * @param {string} SWISH_PUBLIC the public cert from swish
 * @param {string} SWISH_PRIVATE the private cert from swish
 * @param {boolean} live use the live or test env
 * @param {string} payoutInstructionUUID to get from swish
 * @returns {object} payout
 *
 * # Examples
 *
 * ```ts
 * import { RetrievePayoutRequest } from "./payout.ts";
 *
 * const data = await CreateRefundRequest({
 *    SWISH_CA: "CERT",
 *    SWISH_PRIVATE: "PRIVATE",
 *    SWISH_PUBLIC: "PUBLIC",
 *    live: false,
 *    payoutInstructionUUID: "E4D773858AF5459B96ABCA4B9DBFF94D",
 * });
 * ```
 */
/*
 export async function RetrievePayoutRequest(params: {
  SWISH_CA: string;
  SWISH_PUBLIC: string;
  SWISH_PRIVATE: string;
  live: boolean;
  payoutInstructionUUID: string;
}) {
  try {
    const client = Deno.createHttpClient({
      caCerts: [params.SWISH_CA],
      certChain: params.SWISH_PUBLIC,
      privateKey: params.SWISH_PRIVATE,
    });

    const baseUrl = params.live ? SWISH_LIVE_URL : SWISH_TEST_URL;

    const url = baseUrl +
      `/api/v1/payouts/${params.payoutInstructionUUID}`;

    const res: Response = await fetch(url, {
      client,
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    client.close();

    if (!res.ok) {
      const msg = await res.json();
      throw Error(`Status not OK: ${res.status}, ${JSON.stringify(msg)}`);
    }

    await res.body?.cancel();

    const location = res.headers.get("Location");

    return { location };
  } catch (error) {
    throw new Error(`Error from swish`, {
      cause: error,
    });
  }
}*/
