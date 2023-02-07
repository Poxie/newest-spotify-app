import { NextApiRequest, NextApiResponse } from "next";

const CREDENTIALS = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') return res.status(400).json({ error: 400, message: 'Bad request: Request method not allowed.' });

    // Getting code
    const { code } = JSON.parse(req.body) as { code?: string };
    if(!code) return res.status(400).json({ error: 400, message: 'Bad request: Code not present.' });

    // Creating request body
    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('redirect_uri', process.env.NEXT_PUBLIC_REDIRECT_URI);
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
    if(data.error) {
        return res.status(401).json({ error: data.error, message: data.error_description })
    }

    return res.status(200).json(data);
}