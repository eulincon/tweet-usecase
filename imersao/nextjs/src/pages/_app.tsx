import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<main className='container mx-auto px-8 sm:px-24'>
			<Component {...pageProps} />
		</main>
	)
}
export default MyApp
