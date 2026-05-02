# BizFinder AI — HTML Export

Yeh folder mein saare pages ke static HTML files hain jo aap directly GitHub par upload kar sakte hain.

## Files

| File | Page | Description |
|------|------|-------------|
| `landing.html` | Landing Page | Home page with hero, pricing, how it works |
| `dashboard.html` | User Dashboard | Overview, plan, invoices, team, settings |
| `bizfinder.html` | BizFinder App | Interactive map + business search (Leaflet + Overpass API) |
| `super-admin.html` | Super Admin | Admin panel with password gate (admin1234) |

## GitHub Par Upload Kaise Karein

1. Is `html-export` folder ko apne GitHub repo mein upload karein
2. GitHub Settings → Pages → Source: `main` branch, `/root` folder select karein
3. Aapki site live ho jayegi: `https://yourusername.github.io/repo-name/landing.html`

## Features

- ✅ No build step required — pure HTML + Tailwind CDN
- ✅ Interactive map in bizfinder.html (OpenStreetMap + Leaflet)
- ✅ Real business search via Overpass API
- ✅ CSV export functionality
- ✅ Email generation (template-based demo)
- ✅ Admin panel with password protection (admin1234)
- ✅ Payment gateway settings form
- ✅ Invoice download (.txt format)
- ✅ Fully responsive design

## Notes

- Yeh **static demo** hai — real app ke saath Base44 backend connect hota hai
- BizFinder page mein OpenStreetMap data use hota hai (free, no API key needed)
- Super Admin password: `admin1234`
