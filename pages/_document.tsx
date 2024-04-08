import { Html, Head, Main, NextScript } from "next/document";
import { nameWeb } from "../utils/constants";
import { SpeedInsights } from '@vercel/speed-insights/next';

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
        {
          process.env.REACT_APP_BACKEND_URL !== 'http://localhost:4000' &&
          <SpeedInsights />
        }
        {/* <SpeedInsights /> */}
      </body>
    </Html>
  );
}
