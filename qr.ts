import {
  Mcom2QcomQR,
  Mcom2QcomQRSchema,
  QRPreFilled,
  QRPreFilledSchema,
  SWISH_QR_LIVE_URL,
  SWISH_QR_TEST_URL,
} from "./utils.ts";

/**
 * Creates a new Swish refund request
 * @param {string} SWISH_CA the ca cert from swish
 * @param {string} SWISH_PUBLIC the public cert from swish
 * @param {string} SWISH_PRIVATE the private cert from swish
 * @param {boolean} live use the live or test env
 * @param {string} type the type of request
 * @param {Mcom2QcomQR | QRPreFilled} data to send to swish
 * @returns {arrayBuffer} qr
 *
 * # Examples
 *
 * ```ts
 * import { CreateQRRequest } from "./qr.ts";
 *
 * const data = await CreateRefundRequest({
 *    SWISH_CA: "CERT",
 *    SWISH_PRIVATE: "PRIVATE",
 *    SWISH_PUBLIC: "PUBLIC",
 *    live: false,
 *    type: "McomToQcom",
 *    data: {
 *      token: "TEST";
 *      format: "png";
 *      size: 20;
 *      border: 2;
 *      transparent: false;
 *    },
 * });
 * ```
 */
export async function CreateQRRequest(params: {
  SWISH_CA: string;
  SWISH_PUBLIC: string;
  SWISH_PRIVATE: string;
  live: boolean;
  type: "McomToQcom" | "PreFilled";
  data: Mcom2QcomQR | QRPreFilled;
}) {
  const client = Deno.createHttpClient({
    caCerts: [params.SWISH_CA],
    certChain: params.SWISH_PUBLIC,
    privateKey: params.SWISH_PRIVATE,
  });

  try {
    const baseUrl = params.live ? SWISH_QR_LIVE_URL : SWISH_QR_TEST_URL;

    if (params.type == "McomToQcom") {
      await Mcom2QcomQRSchema.validate(params.data);

      const url = baseUrl +
        `/api/v1/commerce`;

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

      const qrData = await res.arrayBuffer();

      return { qr: qrData };
    } else if (params.type == "PreFilled") {
      await QRPreFilledSchema.validate(params.data);

      const url = baseUrl +
        `/api/v1/prefilled`;

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

      const qrData = await res.arrayBuffer();

      return { qr: qrData };
    } else {
      throw new Error(`Not implemented`);
    }
  } catch (error) {
    client.close();
    throw new Error(`Error from swish`, {
      cause: error,
    });
  }
}
