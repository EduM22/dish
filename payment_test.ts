import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { assert } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import { CreatePaymentRequest } from "./payment.ts";

let SWISH_CA: string | undefined;
let SWISH_PUBLIC: string | undefined;
let SWISH_PRIVATE: string | undefined;

SWISH_CA = Deno.env.get("SWISH_CA_CERT");
if (!SWISH_CA) {
  throw new Error("environment variable SWISH_CA_CERT not set");
}

SWISH_PUBLIC = Deno.env.get("SWISH_PUBLIC_CERT");
if (!SWISH_PUBLIC) {
  throw new Error("environment variable SWISH_PUBLIC_CERT not set");
}

SWISH_PRIVATE = Deno.env.get("SWISH_PRIVATE_CERT");
if (!SWISH_PRIVATE) {
  throw new Error("environment variable SWISH_PRIVATE_CERT not set");
}

SWISH_CA = atob(SWISH_CA);
SWISH_PUBLIC = atob(SWISH_PUBLIC);
SWISH_PRIVATE = atob(SWISH_PRIVATE);

Deno.test("Create M-Commerce request", async () => {
  try {
    const id = crypto.randomUUID();
    const instructionId = id.replaceAll("-", "").toUpperCase();

    await CreatePaymentRequest({
      SWISH_CA: SWISH_CA!,
      SWISH_PRIVATE: SWISH_PRIVATE!,
      SWISH_PUBLIC: SWISH_PUBLIC!,
      live: false,
      type: "MCommerce",
      instructionUUID: instructionId,
      data: {
        payeePaymentReference: "0123456789",
        callbackUrl: "https://example.com/api/swishcb/paymentrequests",
        payeeAlias: "1231181189",
        amount: 100,
        currency: "SEK",
        message: "Kingston USB Flash Drive 8 GB",
      },
    });

    assert(true);
  } catch (error) {
    console.error(error);
    assert(false);
  }
});

Deno.test("Create E-Commerce request", async () => {
  try {
    const id = crypto.randomUUID();
    const instructionId = id.replaceAll("-", "").toUpperCase();

    await CreatePaymentRequest({
      SWISH_CA: SWISH_CA!,
      SWISH_PRIVATE: SWISH_PRIVATE!,
      SWISH_PUBLIC: SWISH_PUBLIC!,
      live: false,
      type: "ECommerce",
      instructionUUID: instructionId,
      data: {
        payeePaymentReference: "0123456789",
        callbackUrl: "https://example.com/api/swishcb/paymentrequests",
        payerAlias: "4671234768",
        payeeAlias: "1231181189",
        amount: 100,
        currency: "SEK",
        message: "Kingston USB Flash Drive 8 GB",
      },
    });

    assert(true);
  } catch (error) {
    console.error(error);
    assert(false);
  }
});
