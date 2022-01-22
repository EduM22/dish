import {
  PaymentRequestEcommerce,
  PaymentRequestMcommerce,
  SWISH_LIVE_URL,
  SWISH_TEST_URL,
} from "./utils.ts";

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
