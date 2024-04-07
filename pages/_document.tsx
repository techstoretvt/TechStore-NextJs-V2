import { Html, Head, Main, NextScript } from "next/document";
import { nameWeb } from "../utils/constants";

export default function Document() {
  return (
    <Html lang="vi">
      <Head>
        <link href="https://fonts.googleapis.com/css?family=Miriam+Libre:400,700&display=swap" rel="stylesheet" />
        <meta
          name="description"
          content={`Trang thương mại điện tử ${nameWeb}`}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
