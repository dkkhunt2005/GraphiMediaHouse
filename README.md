# GRAPHI MEDIA HOUSE
### Premium Architecture-Led Creative Studio — Official Production Website

> **Location:** Surat, Gujarat, India  
> **Brand Philosophy:** *“Great architecture deserves great storytelling.”*  
> **Primary Technology Stack:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Supabase, Lucide Icons, Vercel deployment architecture.

---

## 1. Project Overview & Brand Heritage

This project is the complete, production-ready digital platform for **Graphi Media House**, an architecture-led creative studio based in Surat, Gujarat. Designed in faithful compliance with the official brand presentation (`ABOUT GRAPHI MEDIA HOUSE.pdf`), the website avoids generic marketing clichés, adopting a refined, editorial, and architecture-centered visual language:

- **Dominant Canvas:** Pure White (`#FFFFFF`) with generous negative space and disciplined alignment.
- **Typography:** Architectural condensed sans-serif (**Akrobat / Barlow Condensed**) for monumental headings and crisp labels, paired with restrained, highly legible **Inter** for editorial body copy.
- **Brand Accent:** Distinctive architectural golden-yellow (`#E6C500`), used selectively for authentic logo artwork, delicate dividing rules, active states, and editorial numbers.
- **Footer Band:** Solid black (`#000000`) band with the original golden-yellow logo artwork, mirroring Slide 2 through Slide 6 of the brand deck.
- **Authentic Assets:** Original logo artwork, monogram, and authentic portrait of founder Ar. Prasad Mevasa extracted directly from the verified PDF presentation.

---

## 2. Completed Pages & Route Hierarchy

| Route | Page | Purpose & Features |
|---|---|---|
| `/` | **Home** | Editorial hero with monumental architectural photography, Brand Manifesto (*"We believe architecture deserves more than documentation..."*), Typographic Philosophy block (*"We don't chase trends. We create perception."*), 6 Service overviews with bespoke layouts, Selected Portfolio Grid, Industries Served, 4-Stage Creative Process, Leadership Highlight, and Project Inquiry Dossier. |
| `/about` | **About Studio** | Official Vision, Mission, Aim, and Objective extracted verbatim from the reference presentation, complete leadership profiles, and architectural philosophy. |
| `/services` | **Services** | Comprehensive scopes for all 6 disciplines: Architectural Photography, Branding & Identity, Graphic Design, Film & Visual Storytelling, Print & Digital Experiences, Social Media & Digital Strategy. |
| `/portfolio` | **Work Archive** | Filterable case study catalog (`ALL WORK`, `ARCHITECTURE`, `INTERIORS`, `BRANDING`, `GRAPHIC DESIGN`, `FILMS`) with demonstration disclosures. |
| `/portfolio/:slug` | **Case Study Dossiers** | Dedicated project dossiers containing: Project Title, Hero Image, Studio Name, Location, Year, Category, Background, Challenge, Approach, Visual Plates Gallery with architectural captions, and Outcome. |
| `/contact` | **Contact & Inquiries** | Project Inquiry form with strict validation, anti-spam honeypot, INR budget selectors, and official click-to-chat WhatsApp integration (`+91 99788 66210`). |
| `/privacy-policy` | **Privacy Policy** | Comprehensive compliance documentation aligned with the Indian Digital Personal Data Protection Act, 2023 (DPDP Act). |
| `/terms-and-conditions`| **Terms & Conditions**| Agency intellectual property protections, portfolio usage terms, proposal separation notice, and Surat, Gujarat jurisdiction. |
| `/admin` | **Studio Dashboard** | Password-authenticated lead management portal to view, filter, search, and update client inquiry statuses (`new`, `contacted`, `qualified`, `closed`). |
| `*` | **404 Archive** | Minimalist editorial page with quick links back to studio home and portfolio. |

---

## 3. Brand Identity Discrepancy & Verification Notice

> [!IMPORTANT]
> **Leadership Identity Confirmation:**  
> The supplied PDF presentation identifies the founder on Slide 5 as **Prasad Sankadasariya** (`graphimediahouse@gmail.com`). The official project brief separately designates the founder as **Ar. Prasad Mevasa**.  
> In strict accordance with the instructions, the website publishes **Ar. Prasad Mevasa** while linking his authentic portrait extracted from Slide 5, and documents this discrepancy for confirmation prior to final public launch.  
> **Vice President:** **Er. Man Lavani** is published with an editable biography field and executive profile.

---

## 4. Database Schema & Supabase Configuration

The application includes full Supabase PostgreSQL integration with dual-mode operational support:
1. **Live Supabase Mode:** When `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are provided.
2. **Secure Local Fallback Mode:** When environment credentials are not yet entered, the form gracefully records submissions into a local encrypted store so **zero inquiries are ever lost** during staging or demonstrations.

### SQL Migration: `supabase/migrations/20261022_init.sql`

```sql
-- Project Inquiries Table
CREATE TABLE IF NOT EXISTS public.project_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    company_name TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service_type TEXT NOT NULL,
    budget_range TEXT NOT NULL,
    project_location TEXT,
    project_timeline TEXT,
    project_description TEXT NOT NULL,
    consent_to_contact BOOLEAN NOT NULL DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Row Level Security (RLS)
ALTER TABLE public.project_inquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors may ONLY insert (cannot read, cannot modify, cannot delete)
CREATE POLICY "Allow public anonymous submission of project inquiries" 
    ON public.project_inquiries 
    FOR INSERT 
    TO anon, authenticated
    WITH CHECK (
        length(trim(full_name)) > 1 AND
        length(trim(email)) > 5 AND
        length(trim(phone)) >= 8 AND
        length(trim(project_description)) > 5 AND
        consent_to_contact = true
    );

-- Authenticated studio administrators have full access
CREATE POLICY "Allow authenticated administrators full access to project inquiries" 
    ON public.project_inquiries 
    FOR ALL 
    TO authenticated 
    USING (true) 
    WITH CHECK (true);
```

---

## 5. Security & Privacy Implementations

1. **Transport Security (HTTPS/TLS):** Enforced across production via Vercel Edge Network.
2. **Security Headers (`vercel.json`):**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: DENY`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
3. **Least Privilege Principle:** Anonymous frontend clients possess zero read permissions on inquiries. Sensitive server keys (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`) are never exposed in frontend code.
4. **Anti-Spam & Abuse Defense:** Contact forms implement client-side regex validation, payload size limits, and an anti-bot hidden honeypot.
5. **Privacy Compliance:** `/privacy-policy` adheres to the Indian Digital Personal Data Protection Act, 2023 (DPDP Act) with data minimization and designated grievance contact.

---

## 6. Environment Variables (`.env.example`)

```bash
# Public client-safe keys (Vite frontend)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# Client administrative demo access key
VITE_ADMIN_ACCESS_CODE=graphi2026admin

# Server-only secrets (Never place in Vite variables)
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# RESEND_API_KEY=re_your_api_key
# CONTACT_NOTIFICATION_EMAIL=graphimediahouse@gmail.com
```

---

## 7. Deployment & Custom Domain Setup

### Deploying to Vercel
1. Push repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Graphi Media House website"
   git remote add origin https://github.com/your-username/graphi-media-house.git
   git push -u origin main
   ```
2. Import project into Vercel:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Add Environment Variables in Vercel Project Settings:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_ACCESS_CODE`

### Connecting Custom Domain (`graphimediahouse.com`)
1. In Vercel, navigate to **Settings > Domains** and add `graphimediahouse.com` and `www.graphimediahouse.com`.
2. Configure DNS records at your domain registrar:
   - **A Record:** `@` points to `76.76.21.21`
   - **CNAME Record:** `www` points to `cname.vercel-dns.com`
3. Vercel automatically issues and provisions a Let's Encrypt TLS certificate.

---

## 8. Verification & Test Summary

- [x] **Production Build:** `npm run build` passed with zero warnings/errors.
- [x] **Code Splitting:** Configured chunking for `vendor-react`, `vendor-supabase`, and `vendor-icons`.
- [x] **Asset Extraction:** Original logo on black, transparent logo, GMH monogram, and founder portrait verified at 2x/4x resolution.
- [x] **Preview Server:** Validated HTTP 200 responses across all static routes, images, `robots.txt`, and `sitemap.xml`.
- [x] **Inquiry Workflow:** Tested form validation, anti-spam honeypot, and local store fallback.
- [x] **Admin Authentication:** Verified session unlocking and inquiry status updating.
