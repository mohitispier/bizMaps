// api/details.js — Vercel Serverless Function
// Google Places Details (phone, website per place_id)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { place_id } = req.query;

  if (!place_id) {
    return res.status(400).json({ error: 'place_id required hai' });
  }

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key configure nahi hai' });
  }

  try {
    const fields = 'name,formatted_address,formatted_phone_number,website,email,rating,url';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      return res.status(400).json({ error: data.error_message || data.status });
    }

    const r = data.result;
    return res.status(200).json({
      name: r.name,
      address: r.formatted_address,
      phone: r.formatted_phone_number || '',
      website: r.website || '',
      email: r.email || '',
      rating: r.rating,
      maps_url: r.url || '',
    });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
