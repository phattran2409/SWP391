## FENG SHUI KOI — Koi Advisory & Membership Platform (Full‑Stack)

A full‑stack monorepo with a Node.js/Express/MongoDB API and a React (Vite + Tailwind + Ant Design) frontend. The platform provides koi fish advisory, pond setup guidance, curated content, comments, membership packages, ordering and payments, plus an admin dashboard for content and package management.

### Repository structure

```text
SWP391/
├─ Back-end/              # Express API server, MongoDB (Mongoose)
│  ├─ config/             # Database, Cloudinary, CORS configs
│  ├─ controller/         # Business logic (auth, user, fish, pond, post, order, package...)
│  ├─ middleware/         # Multer upload, auth/membership guards
│  ├─ models/             # Mongoose models
│  ├─ routes/             # REST endpoints /v1/*
│  ├─ utils/              # Utilities (e.g., CORS whitelist)
│  ├─ index.js            # App entry (default PORT=8888)
│  ├─ package.json
│  └─ vercel.json         # Optional deploy configuration
│
├─ Front-end/
│  └─ koi-fish/           # React + Vite application
│     ├─ src/             # Components, pages, axios config, firebase, ...
│     ├─ public/
│     ├─ package.json
│     ├─ tailwind.config.js
│     └─ vercel.json      # Optional deploy configuration
│
└─ Doc/                   # Use case diagrams, ERD, design assets
```

### What this project does

- End‑user features:
  - Browse koi breeds, feng‑shui aligned suggestions, pond setup tips
  - Read posts/news, comment and engage
  - Register/login (including Google OAuth), manage profile and wishlist
  - Purchase membership packages; access member‑only features
  - Place orders and payments (payment route in backend)

- Admin features:
  - Admin dashboard to manage posts, packages, users, comments, orders
  - Rich‑text editor for content (react‑quill)
  - Membership validation middleware and expiry handling

### Tech stack

- Back‑end: Express, Mongoose, JWT, Multer, Cloudinary, CORS, dotenv, Nodemailer
- Database: MongoDB (via `DB_URI`)
- Front‑end: React 18, Vite 5, TailwindCSS, Ant Design, MUI, React Router, axios

### Key API areas (quick map)

- Auth and users: `/v1/auth/*`, `/v1/user/*`, Google OAuth at `/v1/Oauth/*`
- Domain data: `/v1/fish/*`, `/v1/pond/*`, `/v1/post/*`, `/v1/comment/*`
- Commerce: `/v1/package/*`, `/v1/order/*`, `/v1/pay/*`

JWT is expected in `Authorization: Bearer <token>`. Some routes require admin or active membership; see backend middleware for checks and membership expiry handling.

### Prerequisites

- Node.js 18.x (frontend enforces `"engines": { "node": "18.x" }`)
- A reachable MongoDB instance/cluster with a valid connection string

### Backend environment variables (`Back-end/.env`)

Create `Back-end/.env` with:

```bash
PORT=8888
DB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# JWT
JWT_ACCESS_KEY=your_jwt_access_secret

# Cloudinary (media uploads)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_cloud_api_key
CLOUD_API_SECRET=your_cloud_api_secret

# Optional: SMTP if using Nodemailer
# SMTP_HOST=smtp.example.com
# SMTP_PORT=587
# SMTP_USER=your_user
# SMTP_PASS=your_password
```

CORS note: `Back-end/utils/constants.js` currently whitelists `fengshuikoi.vercel.app` and `localhost:5173/`. Keep this in sync with your deployment domains.

### Getting started (Windows PowerShell)

1) Install dependencies

```bash
# Back-end
cd Back-end
npm install

# Front-end
cd ../Front-end/koi-fish
npm install
```

2) Run in development

Open two terminal windows:

```bash
# Terminal 1 — Back-end
cd Back-end
npm run dev     # nodemon on PORT=8888

# Terminal 2 — Front-end
cd Front-end/koi-fish
npm run dev     # Vite at http://localhost:5173
```

The backend logs will show MongoDB connection status and the server port. The frontend calls the API at your configured base URL (see axios config).

3) Build frontend for production

```bash
cd Front-end/koi-fish
npm run build   # outputs to dist/, base=./ for subpath deploys
```

4) Run backend in production

```bash
cd Back-end
npm start       # node index.js
```

### Axios configuration (frontend)

Check `Front-end/koi-fish/src/config/axios.js` and `axiosInterceptor.js` for `baseURL`. Prefer Vite env variables (`import.meta.env`) to switch between local and deployed API URLs.

### Media uploads

- File uploads use `multer` and Cloudinary (`Back-end/config/cloudinary.js`). Ensure Cloudinary variables are set in `.env`.

### Security & access control

- JWT Bearer tokens via `Authorization` header
- Admin/member‑only endpoints enforced by middleware
- Membership expiry triggers cleanup and user notification

### Deployment tips

- Back‑end: Vercel/Render/Railway/Heroku. Provide env vars and `PORT`.
- Front‑end: Vercel/Netlify. Build with `npm run build`, publish `dist`.
- Update CORS whitelist for your production domain(s).

### Useful scripts

- Back‑end: `npm run dev`, `npm start`
- Front‑end: `npm run dev`, `npm run build`, `npm run preview`

### Screenshots / Diagrams (optional)

- Add UI screenshots and architecture diagrams from `Doc/` when ready.

### License

ISC (as per `Back-end/package.json`). Update if your project requires a different license.

### Contributing

- Open issues/PRs for enhancements and bug fixes.
- Follow code conventions and prefer small, focused pull requests.


