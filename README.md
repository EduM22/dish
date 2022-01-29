# dish

A Deno package for the swedish payment method Swish

## Use

This package needs the `--unstable` flag because it uses the [Deno.CreateHttpClient()](https://doc.deno.land/deno/unstable/~/Deno.HttpClient) feature
```ts
 import { CreatePaymentRequest } from "./payment.ts";
 
 const data = await CreatePaymentRequest({
    SWISH_CA: "CERT",
    SWISH_PRIVATE: "PRIVATE",
    SWISH_PUBLIC: "PUBLIC",
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
```

## Testing

Run
`deno test --unstable --allow-net --allow-env --allow-read=. --coverage=cov_profile`
to run the tests

Make coverage report `deno coverage cov_profile`
