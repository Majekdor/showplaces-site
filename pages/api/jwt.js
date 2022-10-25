import jwt from "jsonwebtoken";

export default function handler(req, res) {
    const header = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": process.env.KID
    }

    const payload = {
        "iss": process.env.ISS,
        "iat": Date.now() / 1000,
        "exp": (Date.now() / 1000) + 31556952000,
    }

    let { mapkit_key } = JSON.parse(process.env.MAPKIT_KEY)
    //console.log(mapkit_key)
    let token = jwt.sign(payload, mapkit_key, {header: header});
    res.send(process.env.TOKEN)
    //res.json({ token: process.env.TOKEN})
    console.log(process.env.TOKEN)
}
