import { NextApiRequest, NextApiResponse } from "next";

const CREDENTIALS = Buffer.from(`${process.env.NEXT_PUBLIC_CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') return res.status(400).json({ error: 400, message: 'Bad request: Request method not allowed.' });

    // Getting refresh token
    const { refreshToken } = JSON.parse(req.body) as { refreshToken?: string };
    if(!refreshToken) return res.status(400).json({ error: 400, message: 'Bad request: Refresh token is not present.' });

    // Creating request body
    const body = new URLSearchParams();
    body.append('grant_type', 'refresh_token');
    body.append('refresh_token', refreshToken);

    // Fetching refreshed access token
    const response = await fetch(process.env.NEXT_PUBLIC_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${CREDENTIALS}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
    const data = await response.json();

    // Sending feedback
    if(response.status === 200) {
        return res.status(200).send({ access_token: data.access_token});
    }
    return res.status(401).send({ message: 'Failed to refresh token' });
}