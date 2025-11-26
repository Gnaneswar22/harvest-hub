# API Connection Fix for Production

## Problem
Frontend was making API calls to `/api/products` which only works locally via Vite proxy. In production on Render, the frontend needs to call the full backend URL.

## Solution Implemented

### 1. Created API Configuration (`client/src/utils/api.js`)
- Configured axios with base URL from environment variable
- Automatically includes auth token from localStorage
- Works in both development and production

### 2. Updated All Components
Replaced `axios` with `api` in:
- ✅ `CategoryPage.jsx`
- ✅ `Dashboard.jsx`
- ✅ `PortalSignup.jsx`
- ✅ `Login.jsx`

### 3. Environment Variable Setup
Make sure `VITE_API_URL` is set in Render:
```
VITE_API_URL=https://harvest-hub-backend.onrender.com
```

## How It Works

**Development** (localhost):
```javascript
baseURL: 'http://localhost:5000'  // Falls back to this
```

**Production** (Render):
```javascript
baseURL: 'https://harvest-hub-backend.onrender.com'  // From VITE_API_URL
```

## Next Steps

1. **Commit and Push**:
```bash
git add .
git commit -m "Fix: Configure axios for production API calls"
git push origin main
```

2. **Verify Environment Variable**:
- Go to Render Dashboard
- Select `harvest-hub-frontend`
- Settings → Environment
- Confirm `VITE_API_URL` is set to your backend URL

3. **Redeploy**:
- Render will auto-deploy on push
- Or manually trigger deploy in dashboard

4. **Test**:
- Visit your frontend URL
- Open browser console (F12)
- Check Network tab for API calls
- Should see calls to `https://harvest-hub-backend.onrender.com/api/...`

## Troubleshooting

### If API calls still fail:

1. **Check CORS** on backend:
```javascript
// server/index.js should have:
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://harvest-hub-frontend.onrender.com'
  ],
  credentials: true
}));
```

2. **Check Environment Variable**:
- Render Dashboard → Frontend Service → Environment
- `VITE_API_URL` must be set

3. **Check Backend is Running**:
- Visit: `https://harvest-hub-backend.onrender.com/api/products`
- Should return JSON (not error)

4. **Check Browser Console**:
- F12 → Console tab
- Look for CORS or network errors
- Check exact URL being called

## Files Changed
- ✅ `client/src/utils/api.js` (new)
- ✅ `client/src/pages/buyer/CategoryPage.jsx`
- ✅ `client/src/pages/farmer/Dashboard.jsx`
- ✅ `client/src/pages/auth/PortalSignup.jsx`
- ✅ `client/src/pages/auth/Login.jsx`
