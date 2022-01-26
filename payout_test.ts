/*
import "https://deno.land/x/dotenv@v3.1.0/load.ts";
import { assert } from "https://deno.land/std@0.122.0/testing/asserts.ts";
import { RetrievePayoutRequest } from "./payout.ts";

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

Deno.test("Retrieve Payout Request", async () => {
  try {
    const data = await RetrievePayoutRequest({
      SWISH_CA: SWISH_CA!,
      SWISH_PRIVATE: SWISH_PRIVATE!,
      SWISH_PUBLIC: SWISH_PUBLIC!,
      live: false,
      payoutInstructionUUID: "E4D773858AF5459B96ABCA4B9DBFF94D",
    });

    console.log(data);
    assert(true);
  } catch (error) {
    console.error(error);
    assert(false);
  }
});
*/
