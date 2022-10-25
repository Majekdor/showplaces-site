import {Map, MapkitProvider, Marker} from "react-mapkit";
import Layout from "../components/layout";
import {useEffect, useState} from "react";
import {useSearchParams} from "next/dist/client/components/hooks-client";
import {useRouter} from "next/router";
import React from "react";

function MapMarker(latitude, longitude, color, title, glyphText) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.color = color;
    this.title = title;
    this.glyphText = glyphText;
}

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

export default function Shared() {
    let sharedLocations = [];

    const { query } = useRouter();
    let origin = query.origin;

    if (origin === "site") {
        sharedLocations.push(
            new SharedLocation(
                query.name,
                query.label,
                query.streetAddress,
                query.city,
                query.state,
                query.postalCode,
                query.country,
                query.latitude,
                query.longitude
            )
        );
    } else if (origin === "app") {
        let contentId = query.contentId;
        let [ json, setJson ] = useState(null);
        let key = process.env.BYTEBIN_AUTH_KEY;
        console.log(key);
        fetch("https://bytebin.ocelotwrangler.com/" + contentId, { headers: {
            Authorization: {key}
        }})
            //.then(response => console.log("response: " + response === undefined ? "null": response))
            .then(response => response.json())
            .then(result => {
                //console.log(result);
                setJson(result);
            })

        if (json === null) {
            return "Loading...";
        }

        json["locations"].forEach(sharedLocation => {
            console.log(sharedLocation)
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
            );
        });
    }

    return (
        <Layout title="Shared Locations">
            <header className="page__header">
                <h1 className="page__title">Shared Location</h1>

                <p>This link can be opened in the Showplaces app.</p>
            </header>
            <div className="page__content">
                <div id="map">
                    <MapkitProvider tokenOrCallback={'/api/jwt'}>
                        <Map
                            region={{
                                latitude: 37.616934,
                                longitude: -122.383790,
                                latitudeSpan: 0.167647972,
                                longitudeSpan: 0.354985255,
                            }}
                        >
                            {sharedLocations.map(marker => (
                                <Marker
                                    latitude={marker.latitude}
                                    longitude={marker.longitude}
                                    title={marker.name}
                                />
                            ))}
                        </Map>
                    </MapkitProvider>
                </div>
            </div>
        </Layout>
    )
}