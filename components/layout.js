import Head from "next/head";

export default function Layout({ children, title = '' }) {
    return <>
        <Head>
            <title>{'Showplaces' + (title && ' | ' + title)}</title>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1"/>
        </Head>
        <div id="nav">
            <a className="nav-left" href="index">Home</a>
            <a href="tutorials">Tutorials</a>
            <a href="coordinate-formats">Coordinate Formats</a>
            <a href="privacy">Privacy Policy</a>
        </div>
        <Content children={children} />
    </>
}

const Content = ({ children }) => {
    return (
        <main className="page">
            {children}
        </main>
    )
}
