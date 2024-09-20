// pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Global Meta Tags */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Minimalist Tech E-Commerce." />
        <meta name="author" content="Florian Mealing" />
        <meta property="og:title" content="Swift Cart" />
        <meta property="og:description" content="Minimalist Tech E-commerce." />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
