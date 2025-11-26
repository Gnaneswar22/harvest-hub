# 🚀 Render Deployment - Step by Step Fix

## Issue: Render Running Dev Server Instead of Build

The problem is that Render is running `npm run dev` instead of building static files.

---

## ✅ **Correct Deployment Steps**

### **Step 1: Deploy Backend First**

1. Go to https://dashboard.render.com/
2. Click **"New +" → "Web Service"**
3. Connect your GitHub repository: `Gnaneswar22/harvest-hub`
4. Configure:

```
Name: harvest-hub-backend
Region: Singapore
Branch: main
Root Directory: server
Runtime: Node
Build Command: npm install
Start Command: npm start
Instance Type: Free
```

5. **Add Environment Variables**:
```
MONGO_URI=mongodb+srv://harvest:harvest%40xyz@cluster4.zikpvd9.mongodb.net/harvesthub?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_12345
NODE_ENV=production
PORT=10000
```

6. Click **"Create Web Service"**
7. Wait for deployment (~2-3 minutes)
8. **Copy Backend URL**: e.g., `https://harvest-hub-backend.onrender.com`

---

### **Step 2: Deploy Frontend as Static Site**

1. Click **"New +" → "Static Site"**
2. Connect same repository: `Gnaneswar22/harvest-hub`
3. Configure:

```
Name: harvest-hub-frontend
Region: Singapore
Branch: main
Root Directory: client
Build Command: npm install && npm run build
Publish Directory: dist
```

4. **Add Environment Variable**:
```
VITE_API_URL=https://harvest-hub-backend.onrender.com
```
(Use the backend URL from Step 1)

5. Click **"Create Static Site"**
6. Wait for build (~3-4 minutes)

---

## 🔧 **If Build Fails**

### Common Issue: "npm run dev" running instead of build

**Solution**: Make sure you selected **"Static Site"** not "Web Service" for frontend.

### If you accidentally created as Web Service:

1. Delete the service
2. Create new **"Static Site"**
3. Use the configuration above

---

## ✅ **Verification Steps**

After deployment:

1. **Backend Health Check**:
   - Visit: `https://harvest-hub-backend.onrender.com/api/products`
   - Should return: `[]` or list of products

2. **Frontend Check**:
   - Visit: `https://harvest-hub-frontend.onrender.com`
   - Should show: HarvestHub homepage

3. **Full Flow Test**:
   - Try to register a new user
   - Try to login
   - Check if API calls work

---

## 📝 **Current Deployment Status**

Based on your logs, Render is:
- ✅ Installing dependencies correctly
- ❌ Running `npm run dev` (wrong for production)
- ❌ Should run `npm run build` instead

**Fix**: Redeploy as **Static Site** (not Web Service)

---

## 🆘 **Quick Fix Commands**

If you want to test the build locally first:

```bash
# Test frontend build
cd client
npm run build

# This should create a 'dist' folder
# Check if dist folder exists
dir dist  # Windows
ls dist   # Mac/Linux

# Serve the built files locally to test
npx serve dist
```

---

## 📞 **Need Help?**

If still having issues:
1. Delete the frontend service on Render
2. Create a new **Static Site** (not Web Service)
3. Follow Step 2 above exactly
4. Make sure "Publish Directory" is set to `dist`

---

**The key difference**:
- ❌ Web Service: Runs `npm run dev` (for servers)
- ✅ Static Site: Runs `npm run build` (for React apps)

Choose **Static Site** for the frontend!
