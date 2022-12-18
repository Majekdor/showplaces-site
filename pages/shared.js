import {Map, MapkitProvider, Marker} from "react-mapkit";
import Layout from "../components/layout";
import React from "react";

function SharedLocation(name, label, streetAddress, city, state, postalCode, country, latitude, longitude) {
    this.name = name;
    this.label = label;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
}

function Shared({ json }) {
    let sharedLocations = JSON.parse(json["sharedLocations"])
    let noSharedLocations = sharedLocations.length === 0
    let latitudeCenter = json["latitudeCenter"]
    let longitudeCenter = json["longitudeCenter"]
    return (
        <Layout title="Shared Locations">
            <header className="page__header">
                <h1 className="page__title">Shared Location</h1>

                <p>This link can be opened in the Showplaces app.</p>
            </header>
            <div className="page__content">
                <h2>Locations</h2>
                <hr/>
                {noSharedLocations ? (
                    <p>No locations found from url.</p>
                ) : (
                    sharedLocations.map(location => (
                        <div className="address">
                            <h4>{location.name} | {location.label}</h4>
                            <p>{location.streetAddress}</p>
                            <p>{location.city}, {location.state} {location.postalCode}</p>
                            <p>{location.country}</p>
                            <br/>
                        </div>
                    ))
                )}
                <br/><br/>
                <div id="map">
                    <MapkitProvider tokenOrCallback='/api/jwt'>
                        <Map
                            region={{
                                latitude: latitudeCenter,
                                longitude: longitudeCenter,
                                latitudeSpan: 0.167647972,
                                longitudeSpan: 0.354985255,
                            }}
                        >
                            {sharedLocations.map(marker => (
                                <Marker
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    title={marker.name}
                                    clusteringIdentifier={"standard"}
                                />
                            ))}
                        </Map>
                    </MapkitProvider>
                </div>
                <br/>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    let sharedLocations = []

    let query = context.query
    let origin = query.origin

    let latitudeTotal = 0
    let longitudeTotal = 0
    let latitudeCenter = 0
    let longitudeCenter = 0

    if (origin === "site") {
        latitudeCenter = Number(query.latitude)
        longitudeCenter = Number(query.longitude)
        sharedLocations.push(
            new SharedLocation(
                query.name,
                query.label,
                query.streetAddress,
                query.city,
                query.state,
                query.postalCode,
                query.country,
                Number(query.latitude),
                Number(query.longitude)
            )
        )
    } else if (origin === "app") {
        let contentId = query.contentId
        const response = await fetch("https://bytebin.ocelotwrangler.com/" + contentId, { headers: {
                Authorization: process.env.BYTEBIN_AUTH_KEY
            }}
        )
        const json = await response.json()

        json["locations"].forEach(sharedLocation => {
            latitudeTotal += sharedLocation["latitude"]
            longitudeTotal += sharedLocation["longitude"]
            sharedLocations.push(
                new SharedLocation(
                    sharedLocation["name"],
                    sharedLocation["label"],
                    sharedLocation["address"]["street"],
                    sharedLocation["address"]["city"],
                    sharedLocation["address"]["state"],
                    sharedLocation["address"]["postalCode"],
                    sharedLocation["address"]["country"],
                    sharedLocation["latitude"],
                    sharedLocation["longitude"]
                )
            )
        })

        latitudeCenter = latitudeTotal / sharedLocations.length
        longitudeCenter = longitudeTotal / sharedLocations.length
    }

    let data = JSON.stringify(sharedLocations)
    let json = {
        "sharedLocations": data,
        "latitudeCenter": latitudeCenter,
        "longitudeCenter": longitudeCenter
    }
    return { props: { json }}
}

export default Shared
