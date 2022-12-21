import {Map, MapkitProvider, Marker} from "react-mapkit";
import Layout from "../components/layout";
import React from "react";

function SharedLocation(name, tags, streetAddress, city, state, postalCode, country, latitude, longitude) {
    this.name = name;
    this.tags = tags;
    this.streetAddress = streetAddress;
    this.city = city;
    this.state = state;
    this.postalCode = postalCode;
    this.country = country;
    this.latitude = latitude;
    this.longitude = longitude;
}

function formatAddress(streetAddress, city, state, postalCode, country) {
    let streetAddressFormatted = streetAddress === "" ? <em>No Street Address Found</em> : <>{streetAddress}</>
    let cityFormatted = city === "" ? <em>No City Found</em> : <>{city}</>
    let stateFormatted = state === "" ? <em>No State Found</em> : <>{state}</>
    let postalCodeFormatted = postalCode === "" ? <em>No Postal Code Found</em> : <>{postalCode}</>
    let countryFormatted = country === "" ? <em>No Country Found</em> : <>{country}</>
    return (<>
        <p>{streetAddressFormatted}</p>
        <p>{cityFormatted}, {stateFormatted} {postalCodeFormatted}</p>
        <p>{countryFormatted}</p>
    </>)
}

function isNanOrZero(number) {
    if (isNaN(number)) {
        return true
    }
    return number === 0;

}

function Shared({ json }) {
    let sharedLocations = JSON.parse(json["sharedLocations"])
    let noSharedLocations = sharedLocations.length === 0
    let latitudeSpan = isNanOrZero(json["latitudeSpan"]) ? 0.167647972 : json["latitudeSpan"]
    let longitudeSpan = isNanOrZero(json["longitudeSpan"]) ? 0.354985255 : json["longitudeSpan"]
    let latitudeCenter = isNanOrZero(json["latitudeCenter"]) ? 35.7796 : json["latitudeCenter"]
    let longitudeCenter = isNanOrZero(json["longitudeCenter"]) ? -78.6382 : json["longitudeCenter"]
    console.log(latitudeSpan)
    console.log(longitudeSpan)
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
                            <h4>{location.name}{location.tags.map(tag => (" • " + tag))}</h4>
                            {formatAddress(location.streetAddress, location.city, location.state, location.postalCode, location.country)}
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
                                latitudeSpan: latitudeSpan,
                                longitudeSpan: longitudeSpan,
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

    let latitudeCenter = 0
    let longitudeCenter = 0
    let latitudeSpan = 0
    let longitudeSpan = 0

    if (origin === "site") {
        latitudeCenter = Number(query.latitude)
        longitudeCenter = Number(query.longitude)
        latitudeSpan = 0.167647972
        longitudeSpan = 0.354985255
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

        let latitudeTotal = 0
        let longitudeTotal = 0
        let smallestLatitude = 1000
        let smallestLongitude = 1000
        let largestLatitude = 1000
        let largestLongitude = 1000

        json["locations"].forEach(sharedLocation => {
            latitudeTotal += sharedLocation["latitude"]
            longitudeTotal += sharedLocation["longitude"]
            if (smallestLatitude === 1000 || sharedLocation["latitude"] < smallestLatitude) {
                smallestLatitude = sharedLocation["latitude"]
            }
            if (smallestLongitude === 1000 || sharedLocation["longitude"] < smallestLongitude) {
                smallestLongitude = sharedLocation["longitude"]
            }
            if (largestLatitude === 1000 || sharedLocation["latitude"] > largestLatitude) {
                largestLatitude = sharedLocation["latitude"]
            }
            if (largestLongitude === 1000 || sharedLocation["longitude"] > largestLongitude) {
                largestLongitude = sharedLocation["longitude"]
            }
            sharedLocations.push(
                new SharedLocation(
                    sharedLocation["name"],
                    sharedLocation["tags"],
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
        latitudeSpan = (largestLatitude - smallestLatitude) + 0.1
        longitudeSpan = (largestLongitude - smallestLongitude) + 0.1
    }

    let data = JSON.stringify(sharedLocations)
    let json = {
        "sharedLocations": data,
        "latitudeCenter": latitudeCenter,
        "longitudeCenter": longitudeCenter,
        "latitudeSpan": latitudeSpan,
        "longitudeSpan": longitudeSpan
    }
    return { props: { json }}
}

export default Shared
