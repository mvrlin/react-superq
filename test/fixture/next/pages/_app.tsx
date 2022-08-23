import '../styles/globals.css'

import type { AppProps } from 'next/app'
import type { AppContextType } from 'next/dist/shared/lib/utils'

import { MediaQueryManager, MediaQueryProvider } from '../react-superq'

type InitialProps = {
  contextBreakpoint: string
}

const mediaQueryManager = new MediaQueryManager().usePreset('tailwind')

function MyApp({ Component, contextBreakpoint, pageProps }: AppProps & InitialProps) {
  return (
    <MediaQueryProvider contextBreakpoint={contextBreakpoint}>
      <Component {...pageProps} />
    </MediaQueryProvider>
  )
}

MyApp.getInitialProps = async ({ ctx }: AppContextType) => {
  const contextBreakpoint = await mediaQueryManager.detectBreakpoint(
    ctx.req?.headers.cookie,
    ctx.req?.headers['user-agent'],
  )

  return {
    contextBreakpoint,
  } as InitialProps
}

export default MyApp
