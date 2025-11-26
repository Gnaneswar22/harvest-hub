# Quick Render Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] MongoDB Atlas IP whitelist set to 0.0.0.0/0
- [ ] Environment variables ready:
  - MONGO_URI
  - JWT_SECRET
  - NODE_ENV=production

## 🚀 Deployment Steps

### Backend (Web Service)
1. New + → Web Service
2. Connect GitHub repo
3. Settings:
   - Root: `server`
   - Build: `npm install`
   - Start: `npm start`
   - Free tier
4. Add environment variables
5. Deploy

### Frontend (Static Site)
1. New + → Static Site
2. Connect same repo
3. Settings:
   - Root: `client`
   - Build: `npm install && npm run build`
   - Publish: `dist`
   - Free tier
4. Add `VITE_API_URL` = (backend URL)
5. Deploy

## 🔗 URLs
- Backend: `https://harvest-hub-backend.onrender.com`
- Frontend: `https://harvest-hub-frontend.onrender.com`

## ⚡ Quick Commands

```bash
# Commit and push
git add .
git commit -m "Deploy to Render"
git push origin main
```

Render auto-deploys on push! 🎉
