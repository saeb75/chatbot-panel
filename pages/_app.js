import "@/styles/globals.css";
import Head from "next/head";
("use client");
import { Button, ThemeProvider } from "@material-tailwind/react";
export { ThemeProvider, Button };
export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider>
        <Head>
          <title>Imtiyaz, Tech with us</title>
          <meta name="description" content=" Imtiyaz, tech with us" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
