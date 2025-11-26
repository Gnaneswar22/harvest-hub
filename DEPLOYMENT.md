# 🚀 Deploying HarvestHub to Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- MongoDB Atlas connection string (already configured)

## Step-by-Step Deployment Guide

### 1️⃣ Prepare Your Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Ready for Vercel deployment"

# Create a new repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/harvest-hub.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (from project root)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? harvest-hub
# - Directory? ./
# - Override settings? No
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: Leave default
   - **Output Directory**: Leave default

### 3️⃣ Configure Environment Variables

In Vercel Dashboard → Your Project → Settings → Environment Variables, add:

```
MONGO_URI=mongodb+srv://harvest:harvest%40xyz@cluster4.zikpvd9.mongodb.net/harvesthub?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_here_change_in_production
NODE_ENV=production
```

### 4️⃣ Deploy

Click "Deploy" and wait for the build to complete!

## 📝 Important Notes

### Frontend Configuration
The client is configured to proxy API requests to `/api/*` which will be handled by the serverless backend.

### Backend Configuration
- The Express server is configured to work as a Vercel serverless function
- MongoDB Atlas is already configured and accessible
- CORS is enabled for cross-origin requests

### Post-Deployment

1. **Test your deployment**:
   - Visit your Vercel URL (e.g., `harvest-hub.vercel.app`)
   - Test login/signup functionality
   - Upload products as a producer
   - Browse products as a consumer

2. **Custom Domain** (Optional):
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Add your custom domain

3. **Monitor**:
   - Check Vercel Dashboard for logs and analytics
   - Monitor MongoDB Atlas for database usage

## 🔧 Troubleshooting

### Build Fails
- Check build logs in Vercel Dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set

### API Not Working
- Check that environment variables are set correctly
- Verify MongoDB Atlas IP whitelist includes Vercel IPs (0.0.0.0/0)
- Check serverless function logs

### Database Connection Issues
- Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Verify connection string is correct
- Check MongoDB Atlas network access settings

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/

## 🎉 Success!

Once deployed, your app will be live at:
- Production: `https://your-project.vercel.app`
- API Endpoint: `https://your-project.vercel.app/api/*`

Happy deploying! 🚀
