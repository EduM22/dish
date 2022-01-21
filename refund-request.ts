import { RefundRequest, SWISH_LIVE_URL, SWISH_TEST_URL } from "./utils.ts";

export async function CreateRefundRequest(params: {
  SWISH_CA: string;
  SWISH_PUBLIC: string;
  SWISH_PRIVATE: string;
  live: boolean;
  instructionUUID: string;
  data: RefundRequest;
}) {
  try {
    const client = Deno.createHttpClient({
      caCerts: [params.SWISH_CA],
      certChain: params.SWISH_PUBLIC,
      privateKey: params.SWISH_PRIVATE,
    });

    const baseUrl = params.live ? SWISH_LIVE_URL : SWISH_TEST_URL;

    const url = baseUrl +
      `/api/v2/refunds/${params.instructionUUID}`;

    const res: Response = await fetch(url, {
      client,
      method: "PUT",
      body: JSON.stringify(params.data),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw Error(`Status not OK: ${res.status}`);

    const location = res.headers.get("Location");

    return { location, id: params.instructionUUID };
  } catch (error) {
    throw new Error(`Error from swish`, {
      cause: error,
    });
  }
}
