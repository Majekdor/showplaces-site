import * as fs from "fs";
import jwt from "jsonwebtoken";
import path from 'path';

export default function handler(req, res) {
    const header = {
        "alg": "ES256",
        "typ": "JWT",
        "kid": ""
    }

    const payload = {
        "iss": "",
        "iat": Date.now() / 1000,
        "exp": (Date.now() / 1000) + 15778800,
    }

    const assetsDirectory = path.join(process.cwd(), 'public/assets');
    const cert = fs.readFileSync(assetsDirectory + '/mapkit-key.p8'); // the private key downloaded from Apple Developer Website
    jwt.sign(payload, cert, {header: header}, function(err, token) {
        console.log(token);
        res.json({ token: token })
    });
}
