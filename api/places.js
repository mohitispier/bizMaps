// api/places.js — Vercel Serverless Function
// Google Places Nearby Search

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { lat, lng, keyword, radius = 2000 } = req.query;

  if (!lat || !lng || !keyword) {
    return res.status(400).json({ error: 'lat, lng, keyword required hain' });
  }

  const API_KEY = process.env.GOOGLE_PLACES_API_KEY; // ✅ Env variable se aayegi

  if (!API_KEY) {
    return res.status(500).json({ error: 'API key configure nahi hai server pe' });
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&keyword=${encodeURIComponent(keyword)}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      return res.status(400).json({ error: data.error_message || data.status });
    }

    // Sirf zaruri fields return karo (key expose mat karo)
    const results = (data.results || []).slice(0, 15).map(p => ({
      place_id: p.place_id,
      name: p.name,
      vicinity: p.vicinity,
      rating: p.rating,
      user_ratings_total: p.user_ratings_total,
      types: p.types,
      lat: p.geometry?.location?.lat,
      lng: p.geometry?.location?.lng,
      open_now: p.opening_hours?.open_now,
    }));

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ error: 'Server error: ' + err.message });
  }
}
