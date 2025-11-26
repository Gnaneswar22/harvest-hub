# 🚀 Deploying HarvestHub to Render

## Complete Step-by-Step Guide

### Prerequisites
✅ GitHub account
✅ Render account (sign up at https://render.com)
✅ MongoDB Atlas connection string (already configured)

---

## 📋 **Deployment Steps**

### **Step 1: Prepare Your Repository**

```bash
# Make sure you're in the project root
cd c:\Antigravity\harvest-hub

# Add all files
git add .

# Commit changes
git commit -m "Ready for Render deployment"

# Push to GitHub (create repo first at github.com/new)
git remote add origin https://github.com/YOUR_USERNAME/harvest-hub.git
git branch -M main
git push -u origin main
```

---

### **Step 2: Deploy Backend on Render**

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Click "New +" → "Web Service"**

3. **Connect Your Repository**:
   - Click "Connect GitHub"
   - Select your `harvest-hub` repository

4. **Configure Backend Service**:
   ```
   Name: harvest-hub-backend
   Region: Singapore (or closest to you)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free
   ```

5. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable"
   
   ```
   MONGO_URI=mongodb+srv://harvest:harvest%40xyz@cluster4.zikpvd9.mongodb.net/harvesthub?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=production
   PORT=10000
   ```

6. **Click "Create Web Service"**

7. **Wait for deployment** (takes 2-3 minutes)

8. **Copy your backend URL** (e.g., `https://harvest-hub-backend.onrender.com`)

---

### **Step 3: Deploy Frontend on Render**

1. **Click "New +" → "Static Site"**

2. **Connect Same Repository**

3. **Configure Frontend Service**:
   ```
   Name: harvest-hub-frontend
   Region: Singapore (or same as backend)
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

4. **Add Environment Variable**:
   ```
   VITE_API_URL=https://harvest-hub-backend.onrender.com
   ```
   (Use the backend URL you copied in Step 2)

5. **Click "Create Static Site"**

6. **Wait for deployment** (takes 2-3 minutes)

---

### **Step 4: Update CORS (Important!)**

After both services are deployed, update your backend CORS settings:

1. Go to your backend code: `server/index.js`

2. Update CORS configuration:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://harvest-hub-frontend.onrender.com', // Your frontend URL
  ],
  credentials: true
}));
```

3. Commit and push:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the changes!

---

## 🎉 **Your App is Live!**

- **Frontend**: `https://harvest-hub-frontend.onrender.com`
- **Backend API**: `https://harvest-hub-backend.onrender.com/api`

---

## ⚙️ **Alternative: One-Click Deploy with render.yaml**

I've created a `render.yaml` file for automated deployment:

1. **Push your code to GitHub**

2. **Go to Render Dashboard**

3. **Click "New +" → "Blueprint"**

4. **Connect your repository**

5. **Render will automatically**:
   - Create both frontend and backend services
   - Configure environment variables
   - Set up auto-deploy on git push

6. **You only need to add**:
   - `MONGO_URI` (in backend environment variables)
   - `JWT_SECRET` (in backend environment variables)

---

## 🔧 **Important Notes**

### Free Tier Limitations
- ⚠️ Services spin down after 15 minutes of inactivity
- ⚠️ First request after spin-down takes 30-60 seconds
- ✅ Unlimited bandwidth
- ✅ Auto-deploys on git push

### Keep Services Active (Optional)
Use a service like **UptimeRobot** or **Cron-job.org** to ping your backend every 10 minutes:
```
https://harvest-hub-backend.onrender.com/api/products
```

### Custom Domain (Optional)
1. Go to your service → Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

---

## 🐛 **Troubleshooting**

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Not Working
- Check CORS settings
- Verify environment variables are set
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors
- Ensure backend is running (check Render dashboard)

---

## 📊 **Monitoring**

### Render Dashboard
- View logs in real-time
- Monitor resource usage
- Check deployment history

### MongoDB Atlas
- Monitor database connections
- Check query performance
- View data in Collections

---

## 🚀 **Next Steps**

1. ✅ Test all features (login, signup, products)
2. ✅ Set up custom domain (optional)
3. ✅ Configure UptimeRobot to keep services active
4. ✅ Set up monitoring and alerts
5. ✅ Share your live app!

---

## 📞 **Need Help?**

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com

---

**Congratulations! Your HarvestHub app is now live on Render! 🎉**

Frontend: `https://harvest-hub-frontend.onrender.com`
Backend: `https://harvest-hub-backend.onrender.com`
