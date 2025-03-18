import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const s3Url = process.env.S3_URL;
    console.log('S3 URL:', s3Url); // Debug log
    if (!s3Url) {
      return res.status(500).json({ error: 'S3 URL not configured' });
    }

    const response = await fetch(s3Url);
    console.log('S3 Response Status:', response.status); // Debug log
    if (!response.ok) {
      throw new Error(`S3 fetch failed with status ${response.status}`);
    }

    res.setHeader('Content-Type', 'model/gltf-binary');
    return response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching model:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}