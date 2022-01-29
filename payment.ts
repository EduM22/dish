import {
  PaymentRequestEcommerce,
  PaymentRequestEcommerceSchema,
  PaymentRequestMcommerce,
  PaymentRequestMcommerceSchema,
  SWISH_LIVE_URL,
  SWISH_TEST_URL,
} from "./utils.ts";

/**
 * Creates a new Swish payment request
 * @param {string} SWISH_CA the ca cert from swish
 * @param {string} SWISH_PUBLIC the public cert from swish
 * @param {string} SWISH_PRIVATE the private cert from swish
 * @param {boolean} live use the live or test env
 * @param {"MCommerce" | "ECommerce"} type what type of request
 * @param {string} instructionUUID the ID of the request
 * @param {PaymentRequestEcommerce | PaymentRequestMcommerce} data to send to swish
 * @returns {object} Id, Token & location
 *
 * # Examples
 *
 * ```ts
 * import { CreatePaymentRequest } from "./payment.ts";
 *
 * const data = await CreatePaymentRequest({
 *    SWISH_CA: "CERT",
 *    SWISH_PRIVATE: "PRIVATE",
 *    SWISH_PUBLIC: "PUBLIC",
 *    live: false,
 *    type: "MCommerce",
 *    instructionUUID: instructionId,
 *    data: {
 *      payeePaymentReference: "0123456789",
 *      callbackUrl: "https://example.com/api/swishcb/paymentrequests",
 *      payeeAlias: "1231181189",
 *      amount: 100,
 *      currency: "SEK",
 *      message: "Kingston USB Flash Drive 8 GB",
 *    },
 * });
 * ```
 */
export async function CreatePaymentRequest(params: {
  SWISH_CA: string;
  SWISH_PUBLIC: string;
  SWISH_PRIVATE: string;
  live: boolean;
  type: "MCommerce" | "ECommerce";
  instructionUUID: string;
  data: PaymentRequestEcommerce | PaymentRequestMcommerce;
}) {
  try {
    const client = Deno.createHttpClient({
      caCerts: [params.SWISH_CA],
      certChain: params.SWISH_PUBLIC,
      privateKey: params.SWISH_PRIVATE,
    });

    const baseUrl = params.live ? SWISH_LIVE_URL : SWISH_TEST_URL;

    if (params.type == "MCommerce") {
      await PaymentRequestMcommerceSchema.validate(params.data);

      const url = baseUrl +
        `/api/v2/paymentrequests/${params.instructionUUID}`;

      const res: Response = await fetch(url, {
        client,
        method: "PUT",
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
      const PaymentRequestToken = res.headers.get("PaymentRequestToken");

      return { location, PaymentRequestToken, id: params.instructionUUID };
    } else if (params.type == "ECommerce") {
      await PaymentRequestEcommerceSchema.validate(params.data);

      const url = baseUrl +
        `/api/v2/paymentrequests/${params.instructionUUID}`;

      const res: Response = await fetch(url, {
        client,
        method: "PUT",
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
      const PaymentRequestToken = res.headers.get("PaymentRequestToken");

      return { location, PaymentRequestToken, id: params.instructionUUID };
    } else {
      throw new Error(`Not implemented`);
    }
  } catch (error) {
    throw new Error(`Error from swish`, {
      cause: error,
    });
  }
}
