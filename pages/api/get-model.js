// pages/api/get-model.js
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req, res) {
  // Ensure this is a GET request
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Fetch the model from S3 using the environment variable
    const s3Url = process.env.S3_URL; // Non-public variable
    if (!s3Url) {
      return res.status(500).json({ error: 'S3 URL not configured' });
    }

    const response = await fetch(s3Url);
    if (!response.ok) {
      throw new Error('Failed to fetch model from S3');
    }

    // Set the correct content type for GLB files
    res.setHeader('Content-Type', 'model/gltf-binary');
    // Stream the response back to the client
    return response.body.pipe(res);
  } catch (error) {
    console.error('Error fetching model:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}