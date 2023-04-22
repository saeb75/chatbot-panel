import "@/styles/globals.css";
import Head from "next/head";
("use client");
import { Button, ThemeProvider } from "@material-tailwind/react";
import { ReactFlowProvider } from "reactflow";
export { ThemeProvider, Button };
export default function App({ Component, pageProps }) {
  return (
    <>
      <ReactFlowProvider>
        <ThemeProvider>
          <Head>
            <title>Imtiyaz, Tech with us</title>
            <meta name="description" content=" Imtiyaz, tech with us" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>

          <Component {...pageProps} />
        </ThemeProvider>
      </ReactFlowProvider>
    </>
  );
}
