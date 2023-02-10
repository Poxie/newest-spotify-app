import { NextApiRequest, NextApiResponse } from "next";

const CREDENTIALS = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') return res.status(400).json({ error: 400, message: 'Request method not allowed.' });

    // Getting code
    const { code, redirect_uri } = JSON.parse(req.body) as { code?: string, redirect_uri?: string };
    if(!code) return res.status(400).json({ error: 400, message: 'Code not present.' });
    if(!redirect_uri) return res.status(400).json({ error: 400, message: 'redirect_uri is not present.' });

    // Creating request body
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', redirect_uri);
    body.append('code', code);

    // Fetcahing access token
    const response = await fetch(process.env.NEXT_PUBLIC_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${CREDENTIALS}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
    const data = await response.json();

    // Checking if an error occurred
    if(response.status !== 200) {
        return res.status(response.status).json({ error: data.error, message: data.error_description })
    }

    return res.status(200).json(data);
}