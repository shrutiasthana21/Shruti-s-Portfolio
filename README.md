# Shruti's — Portfolio (Full Stack)

A production-ready full-stack portfolio built with **React + Vite** (frontend) and **Node.js + Express** (backend), converted from the original single-file HTML.

---



https://github.com/user-attachments/assets/dac9d06d-ec5f-4b71-a624-d52115d1f957


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


