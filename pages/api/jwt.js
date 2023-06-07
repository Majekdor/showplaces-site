import jwt from "jsonwebtoken";

export default async function handler(req, res) {
    const header = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": process.env.KID
    }

    const payload = {
        "iss": process.env.ISS,
        "iat": Date.now() / 1000,
        "exp": (Date.now() / 1000) + 3600000, // expire after 1 hour
        "origin": "*.showplaces.app"
    }

    let { mapkit_key } = JSON.parse(process.env.MAPKIT_KEY)
    let token = await jwt.sign(payload, mapkit_key, {header: header})
    res.send(token)
}
