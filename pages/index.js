import Layout from "../components/layout";
import {SRLWrapper} from "simple-react-lightbox";

export default function Index() {
    return (
        <Layout>
            <header className="app__header container">
                <div className="app__logo-wrapper">
                    <img className="app__logo" src="assets/icon.png" alt="Showplaces"/>
                </div>
                <div className="app__infos">
                    <h1 className="app__name">Showplaces</h1>
                    <p className="app__description">Manage your locations with ease</p>
                    <div className="app__buttons app__buttons--desktop">
                        {/*

                        Google play button not enabled yet

                        <a href="https://play.google.com/store" class="app__button-play" target="_blank" title="Get on Google Play">
                            <img src="assets/google-play-badge.png" alt="Get on Google Play"/>
                        </a>
                        */}
                        <a href="https://www.apple.com/ios/app-store/" className="app__button-ios" target="_blank"
                           title="Get on Appstore">
                            <img src="assets/ios-badge.svg" alt="Get on Appstore"/>
                        </a>
                    </div>
                </div>
            </header>
            <div className="app__buttons app__buttons--mobile container">
                {/*

                //Google play button not enabled yet

                //<a href="https://play.google.com/store" class="app__button-play" target="_blank" title="Get on Google Play">
                //    <img src="assets/google-play-badge.png" alt="Get on Google Play"/>
                //</a>
                */}
                <a href="https://www.apple.com/ios/app-store/" className="app__button-ios" target="_blank"
                   title="Get on Appstore">
                    <img src="assets/ios-badge.svg" alt="Get on Appstore"/>
                </a>
            </div>
            <section className="app__screenshots app__section">
                <div className="container">
                    <h2 className="app__section-title">Screenshots</h2>
                </div>
                <div className="app__screenshots-wrapper container-desktop">
                    <SRLWrapper>
                        <div className="app__screenshots-list">
                            <a href="assets/map-view.png" className="lightbox">
                                <img src="assets/map-view.png" className="app__screenshot" alt=""/>
                            </a>
                            <a href="assets/list-view.png" className="lightbox">
                                <img src="assets/list-view.png" className="app__screenshot" alt=""/>
                            </a>
                            <a href="assets/filter-view.png" className="lightbox">
                                <img src="assets/filter-view.png" className="app__screenshot" alt=""/>
                            </a>
                            <a href="assets/share-view.png" className="lightbox">
                                <img src="assets/share-view.png" className="app__screenshot" alt=""/>
                            </a>
                            <a href="assets/detail-view.png" className="lightbox">
                                <img src="assets/detail-view.png" className="app__screenshot" alt=""/>
                            </a>
                        </div>
                    </SRLWrapper>
                </div>
            </section>
            <section className="app__fulldescription app__section container">
                <h2 className="app__section-title">Description</h2>
                <div className="app__fulldescription-content">
                    <p>Showplaces allows you to view your contacts and custom locations on a worldwide map.
                        All the contacts with physical addresses in your address book will be plotted on the map, and
                        you’ll be
                        able
                        to add your own “showplaces”, which are custom locations, wherever you like.</p>

                    <h4>Notable features:</h4>
                    <ul>
                        <li>View all locations on a map or in a list.</li>
                        <li>Add locations by address or GPS coordinates.</li>
                        <li>Filter locations based on label.</li>
                        <li>Share your locations with others.</li>
                        <li>Search for locations/contacts by name or label.</li>
                        <li>Touch and hold anywhere on the map to add a location.</li>
                        <li>Total privacy - your data is stored on your device and in your iCloud. Nowhere else.</li>
                    </ul>

                    <h4>Customization:</h4>
                    <p>Your app, your way! Showplaces allows you to change the map type, how you want your list sorted,
                        which coordinate format you prefer, the color of the map pins, and even more! Need a satellite
                        view to make sure it’s the right location? It’s easy to switch.</p>

                    <h4>Your privacy:</h4>
                    <p>In order to reduce load times, your contacts’ locations are cached on your device. This data is
                        not shared with us or any third party. Any custom locations are stored in your iCloud account
                        and
                        are secure and not shared with us or any third party. The only thing we may collect is usage
                        data
                        which is not linked to you in any capacity.</p>
                </div>
            </section>
        </Layout>
    )
}