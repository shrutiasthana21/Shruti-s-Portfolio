# Shruti's — Portfolio (Full Stack)

A production-ready full-stack portfolio built with **React + Vite** (frontend) and **Node.js + Express** (backend), converted from the original single-file HTML.

---

## Project Structure

```
portfolio/
├── client/                     # React + Vite frontend
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx            # React entry point
│       ├── App.jsx             # Root component + routing
│       ├── styles/
│       │   └── global.css      # Design tokens & shared styles
│       ├── hooks/
│       │   ├── useNavigation.jsx   # Navigation context & state
│       │   └── useReveal.js        # Scroll-triggered reveal hook
│       ├── components/
│       │   ├── Cursor.jsx / .css   # Custom animated cursor
│       │   ├── Navbar.jsx / .css   # Sticky navbar + mobile menu
│       │   ├── Footer.jsx          # Page footer
│       │   └── PageTransition.jsx  # Slide transition overlay
│       └── pages/
│           ├── Home.jsx / .css
│           ├── About.jsx / .css
│           ├── Projects.jsx / .css
│           ├── Achievements.jsx / .css
│           └── Contact.jsx / .css
│
├── server/                     # Node.js + Express backend
│   ├── server.js               # App entry point
│   ├── .env.example
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── mailer.js           # Nodemailer transporter
│   ├── models/
│   │   └── Contact.js          # Mongoose schema
│   ├── controllers/
│   │   └── contactController.js  # Business logic
│   └── routes/
│       └── contact.js          # POST /api/contact route
│
└── package.json                # Root monorepo scripts
```

---

## Quick Start

### 1. Install dependencies

```bash
# From the project root:
npm run install:all

# Or manually:
npm install
cd client && npm install
cd ../server && npm install
```

### 2. Configure the server

```bash
cd server
cp .env.example .env
# Edit .env with your settings (see Configuration below)
```

### 3. Run in development

```bash
# From the root — starts both client and server:
npm run dev

# Or separately:
npm run dev:client   # → http://localhost:5173
npm run dev:server   # → http://localhost:5000
```

### 4. Build for production

```bash
npm run build          # Builds client to client/dist/
cd server && npm start # Starts the Express server
```

---

## Configuration (`server/.env`)

| Variable             | Required | Description |
|----------------------|----------|-------------|
| `PORT`               | No       | Server port (default: `5000`) |
| `CLIENT_URL`         | No       | CORS origin (default: `http://localhost:5173`) |
| `MONGODB_URI`        | No       | MongoDB connection string. Leave blank to skip DB. |
| `SMTP_HOST`          | No       | SMTP server hostname |
| `SMTP_PORT`          | No       | SMTP port (default: `587`) |
| `SMTP_SECURE`        | No       | `true` for port 465, `false` otherwise |
| `SMTP_USER`          | No       | SMTP username / Gmail address |
| `SMTP_PASS`          | No       | SMTP password / Gmail App Password |
| `CONTACT_RECIPIENT`  | No       | Email address that receives contact submissions |

> **No config needed to run locally.** Without SMTP settings, the server uses [Ethereal](https://ethereal.email/) — a fake SMTP service — and logs a preview URL to the console so you can inspect emails. Without `MONGODB_URI`, messages are delivered via email only.

---

## API

### `POST /api/contact`

Submit a contact form message.

**Request body (JSON):**

```json
{
  "firstName": "Jane",
  "lastName":  "Doe",
  "email":     "jane@company.com",
  "subject":   "Project inquiry",
  "message":   "Hello! I'd love to discuss..."
}
```

**Responses:**

| Status | Meaning |
|--------|---------|
| `201`  | Message received, saved (if DB connected) & email sent |
| `422`  | Validation error — see `errors` array in body |
| `429`  | Rate limited (5 requests per 15 min per IP) |
| `500`  | Internal server error |

---

## Gmail Setup (recommended for production)

1. Enable 2-Factor Authentication on your Google account.
2. Generate an **App Password**: Google Account → Security → App Passwords.
3. Set in `.env`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your@gmail.com
   SMTP_PASS=your_16_char_app_password
   ```

---

## Tech Stack

**Frontend:** React 18, Vite, Axios, CSS Custom Properties, Google Fonts  
**Backend:** Node.js, Express, Mongoose (MongoDB), Nodemailer, express-validator, express-rate-limit
