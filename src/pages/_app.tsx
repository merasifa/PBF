import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import AppShell from '@/components/layouts/Appshell'
import { SessionProvider } from 'next-auth/react'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      {GA_ID ? (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      ) : null}
      <AppShell>
        <Component {...pageProps} />
      </AppShell>
    </SessionProvider>
  )
}
