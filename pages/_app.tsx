import Auth from "@/components/common/auth";
import { wrapper } from "@/stores/store";
import "@/styles/globals.css";
import moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import type { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore
momentDurationFormatSetup(moment);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
  auth: any;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <SessionProvider session={session}>
        {Component.auth ? (
          <Auth>{getLayout(<Component {...pageProps} />)}</Auth>
        ) : (
          getLayout(<Component {...pageProps} />)
        )}
      </SessionProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover={false}
      />
    </>
  );
}

export default wrapper.withRedux(App);
