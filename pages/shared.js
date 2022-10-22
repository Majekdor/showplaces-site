import { Map, Marker } from 'react-mapkit'
import Layout from "../components/layout";

const callback = '/api/jwt';
const token = "";

export default function Shared() {
    return (
        <Layout title="Shared Locations">
            <header className="page__header">
                <h1 className="page__title">Shared Location</h1>

                <p>This link can be opened in the Showplaces app.</p>
            </header>
            <div className="page__content">
                <div id="map">
                    <Map
                        tokenOrCallback={token}
                        region={{
                            latitude: 37.616934,
                            longitude: -122.383790,
                            latitudeSpan: 0.167647972,
                            longitudeSpan: 0.354985255,
                        }}
                    >
                        <Marker
                            latitude={37.616934}
                            longitude={-122.383790}
                            color={"#f4a56d"}
                            title={"SFO"}
                            glyphText={"✈️"}
                        />
                    </Map>
                </div>
            </div>
        </Layout>
    )
}
