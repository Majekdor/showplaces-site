import '../styles/globals.css';
import SimpleReactLightbox from 'simple-react-lightbox'

export default function App({ Component, pageProps }) {
    return (
        <SimpleReactLightbox>
            <Component {...pageProps} />
        </SimpleReactLightbox>
    )
}