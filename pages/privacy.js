import Layout from "../components/layout";

export default function Privacy() {
    return (
        <Layout title="Privacy Policy">
            <article className="page">
                <header className="page__header">
                    <h1 className="page__title">Privacy Policy</h1>
                </header>
                <div className="page__content">
                    <p>This page informs you of our policies regarding the collection, use, and disclosure of personal
                        data when you use our Service and the choices you have associated with that data.</p>

                    <h4>Disclosure of Personal Data</h4>

                    <p>With your consent, we employ third party companies to geocode the addresses in your contacts.
                        These third parties have access to your addresses only to perform this task on our behalf and
                        are obligated not to disclose or use it for any other purpose.</p>
                    <p>We store address coordinates on the user's device only. This data is not shared with any third
                        party.</p>

                    <h4>Cookies</h4>

                    <p>This app does not use cookies.</p>

                    <br/>

                    <p>This privacy policy is subject to change without notice. If you have any questions please
                            contact us at <a href="mailto:support@ocelotwrangler.com">support@ocelotwrangler.com</a>.</p>
                </div>
            </article>
        </Layout>
    )
}