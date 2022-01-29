import {
  RefundRequest,
  RefundRequestSchema,
  SWISH_LIVE_URL,
  SWISH_TEST_URL,
} from "./utils.ts";

/**
 * Creates a new Swish refund request
 * @param {string} SWISH_CA the ca cert from swish
 * @param {string} SWISH_PUBLIC the public cert from swish
 * @param {string} SWISH_PRIVATE the private cert from swish
 * @param {boolean} live use the live or test env
 * @param {string} instructionUUID the ID of the request
 * @param {RefundRequest} data to send to swish
 * @returns {object} Id & location
 *
 * # Examples
 *
 * ```ts
 * import { CreateRefundRequest } from "./refund.ts";
 *
 * const data = await CreateRefundRequest({
 *    SWISH_CA: "CERT",
 *    SWISH_PRIVATE: "PRIVATE",
 *    SWISH_PUBLIC: "PUBLIC",
 *    live: false,
 *    instructionUUID: instructionId,
 *    data: {
 *      payerAlias: "1231111111",
 *      currency: "SEK",
 *      callbackUrl: "https://your-callback-url.com",
 *      originalPaymentReference: "Test",
 *      amount: 100,
 *    },
 * });
 * ```
 */
export async function CreateRefundRequest(params: {
  SWISH_CA: string;
  SWISH_PUBLIC: string;
  SWISH_PRIVATE: string;
  live: boolean;
  instructionUUID: string;
  data: RefundRequest;
}) {
  const client = Deno.createHttpClient({
    caCerts: [params.SWISH_CA],
    certChain: params.SWISH_PUBLIC,
    privateKey: params.SWISH_PRIVATE,
  });

  try {
    const baseUrl = params.live ? SWISH_LIVE_URL : SWISH_TEST_URL;

    await RefundRequestSchema.validate(params.data);

    const url = baseUrl +
      `/api/v2/refunds/${params.instructionUUID}`;

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

    return { location, id: params.instructionUUID };
  } catch (error) {
    client.close();
    throw new Error(`Error from swish`, {
      cause: error,
    });
  }
}
