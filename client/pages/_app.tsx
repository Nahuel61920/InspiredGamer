import type { AppProps } from 'next/app'
import "../scss/global.scss"
import 'semantic-ui-css/semantic.min.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
