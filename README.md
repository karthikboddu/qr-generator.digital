# Project Setup
    
    To run this project, follow these steps:
    
    1. Extract the zip file.
    2. Run `npm install` to install dependencies.
    3. Run `npm run dev` to start the development server.
    
    This project was generated through Alpha. For more information, visit [dualite.dev](https://dualite.dev).

## Site Visit Tracking

This project includes a Supabase Edge Function named `track-site-visit` that stores one row in `public.site_visits` each time the app is opened.

Deploy steps:

1. Run your Supabase migrations so the `site_visits` table exists.
2. Deploy the function with `supabase functions deploy track-site-visit`.
3. Make sure the frontend is using the correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
