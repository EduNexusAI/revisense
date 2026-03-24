# 🚀 ReViSense.Ai - Complete Deployment Guide

Deploy ReViSense.Ai on **Vercel**, **Hostinger VPS**, or **GitHub Pages** with zero configuration!

---

## 📋 Quick Deployment Comparison

| Platform | Setup Time | Cost | Performance | Best For |
|----------|-----------|------|-------------|----------|
| **Vercel** | 2 mins | Free tier + paid | Excellent (CDN) | Rapid prototyping, small-medium apps |
| **Hostinger VPS** | 15 mins | $2.99-6/month | Very Good | Production apps, full control |
| **GitHub Pages** | 5 mins | Free | Good | Static sites, documentation |

---

## 🔵 OPTION 1: Vercel Deployment (Recommended for Beginners)

### ✅ Step 1: Connect GitHub to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "Import Project"
3. Select your GitHub repository: `https://github.com/EduNexusAI/revisense`
4. Click "Import"

### ✅ Step 2: Configure Build Settings (Auto-Detected)
Vercel automatically detects Vite settings from `vercel.json`:
- **Framework:** Vite (auto-detected)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Environment Variables:** Already set in vercel.json

### ✅ Step 3: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Get your live URL: `your-project.vercel.app`

### 🔄 Automatic Deployments
- Every push to `main` branch → auto-deploy
- Pull requests get preview URLs
- Easy rollback with Vercel dashboard

### ✅ Custom Domain on Vercel
1. In Vercel dashboard → Settings → Domains
2. Add your domain (e.g., `revisense.ai`)
3. Update DNS records:
   - CNAME: `your-project.vercel.app`
   - Or use Vercel's nameservers

---

## 🟢 OPTION 2: Hostinger VPS Deployment (Recommended for Production)

### ✅ Pre-requisites
- Hostinger VPS account with Ubuntu 20.04+
- SSH access to your VPS
- Domain name (optional, use VPS IP)
- ~30GB storage space recommended

### ✅ Step 1: SSH into Your VPS

```bash
ssh root@your_vps_ip_address
# Enter password when prompted
```

### ✅ Step 2: Install Required Software

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18+ (LTS)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs

# Install Nginx (web server)
apt install -y nginx

# Verify installations
node --version
npm --version
nginx -v
```

### ✅ Step 3: Clone and Setup Project

```bash
# Create app directory
mkdir -p /var/www/revisense
cd /var/www/revisense

# Clone repository
git clone https://github.com/EduNexusAI/revisense.git .
cd fontend

# Install dependencies
npm install

# Build for production
npm run build

# Verify dist folder created
ls -la dist/
```

### ✅ Step 4: Setup Nginx as Reverse Proxy

Create Nginx config:

```bash
nano /etc/nginx/sites-available/revisense
```

Add this content:

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;
    
    # Redirect HTTP to HTTPS (if using SSL)
    # return 301 https://$server_name$request_uri;

    # Root directory
    root /var/www/revisense/fontend/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/css text/javascript application/javascript image/svg+xml;
    gzip_vary on;
    gzip_comp_level 6;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA routing - send all requests to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable the site and test:

```bash
# Enable site
ln -s /etc/nginx/sites-available/revisense /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
systemctl enable nginx
```

### ✅ Step 5: Setup SSL Certificate (Let's Encrypt - FREE)

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Generate certificate (auto-updates Nginx config)
certbot --nginx -d your_domain_name

# Auto-renew
systemctl enable certbot.timer
systemctl start certbot.timer
```

### ✅ Step 6: Update DNS (if using domain)

1. Go to your domain registrar (Namecheap, GoDaddy, etc.)
2. Update DNS A-record to point to your VPS IP
3. Wait 5-15 minutes for DNS to propagate

### 🔄 Deploy Updates

After code changes, redeploy:

```bash
cd /var/www/revisense/fontend
git pull origin main
npm install
npm run build
systemctl reload nginx
```

### 🔧 Automate Updates (Optional)

Create deploy script: `/var/www/revisense/deploy.sh`

```bash
#!/bin/bash
cd /var/www/revisense/fontend
git pull origin main
npm install
npm run build
systemctl reload nginx
echo "✅ Deployment completed at $(date)"
```

Make executable:

```bash
chmod +x /var/www/revisense/deploy.sh
```

Schedule with cron for auto-updates:

```bash
# Edit crontab (runs deploy daily at 2 AM)
crontab -e

# Add line:
0 2 * * * /var/www/revisense/deploy.sh >> /var/log/revisense-deploy.log 2>&1
```

### 📊 Monitor VPS Performance

```bash
# Check disk usage
df -h

# Check memory/CPU
top

# View app logs (if running as service)
journalctl -u revisense -f

# Check Nginx status
systemctl status nginx
```

---

## 🟣 OPTION 3: GitHub Pages (Free, Easy)

Already configured! Just run:

```bash
npm run deploy
```

**Deployed at:** `https://edunexusai.github.io/revisense/`

---

## 📝 Environment Variables for Each Platform

### **Development (.env)**
```
VITE_BASE_PATH=/
```

### **Vercel (.env.vercel)**
```
VITE_BASE_PATH=/
```

### **Hostinger VPS (.env.hostinger)**
```
VITE_BASE_PATH=/
```

### **GitHub Pages (.env.github)**
```
VITE_BASE_PATH=/revisense/
```

---

## 🚀 Deployment Commands

### Deploy to Vercel
```bash
# First time: Connect repo via Vercel dashboard
# Then automatic deployments on every push to main
```

### Deploy to Hostinger VPS
```bash
# SSH into VPS and run:
cd /var/www/revisense/fontend
git pull origin main
npm run build
systemctl reload nginx
```

### Deploy to GitHub Pages
```bash
# Run from fontend folder:
npm run deploy
```

---

## 🔐 Security Checklist

### For VPS (Hostinger)
- [ ] Update system regularly: `apt update && apt upgrade -y`
- [ ] Setup firewall: `ufw allow 22,80,443/tcp`
- [ ] Use strong SSH passwords or key-based auth
- [ ] Enable SSL/TLS with Let's Encrypt
- [ ] Configure fail2ban for brute force protection:
  ```bash
  apt install -y fail2ban
  systemctl start fail2ban
  ```
- [ ] Disable root SSH login (production)
- [ ] Regular backups of `/var/www/revisense`

### For Vercel
- [ ] Enable branch protection on main
- [ ] Review environment variables in dashboard
- [ ] Use Vercel's automatic security scanning

### For All Platforms
- [ ] Setup error monitoring (Sentry, LogRocket)
- [ ] Enable CORS properly in backend API
- [ ] Use HTTPS everywhere
- [ ] Regular dependency updates: `npm audit fix`

---

## 🆘 Troubleshooting

### Vercel Issues
**Q: Build fails**
- A: Check build logs in Vercel dashboard
- A: Verify `vercel.json` exists
- A: Run `npm run build` locally first

**Q: 404 on routes**
- A: Vercel needs rewrites configured (done in vercel.json)
- A: Clear cache: Settings → Git → Redeploy

### VPS Issues
**Q: Nginx shows blank page**
- A: Check if build completed: `ls -la /var/www/revisense/fontend/dist/`
- A: Restart Nginx: `systemctl restart nginx`
- A: Check logs: `tail -f /var/log/nginx/error.log`

**Q: Domain not working**
- A: Wait for DNS to propagate (5-15 mins)
- A: Verify A-record points to VPS IP: `nslookup yourdomain.com`
- A: Check Nginx config: `nginx -t`

**Q: SSL certificate issue**
- A: Check cert status: `certbot certificates`
- A: Renew manually: `certbot renew`
- A: Check logs: `tail -f /var/log/letsencrypt/letsencrypt.log`

### GitHub Pages
**Q: Assets not loading**
- A: Verify `.env.github` has `VITE_BASE_PATH=/revisense/`
- A: Run `npm run deploy` again
- A: Clear browser cache

---

## 📊 Performance Optimization Tips

### All Platforms
1. **Enable Gzip Compression** (done in Nginx config)
2. **Browser Caching** (done in Nginx config)
3. **Image Optimization** - Use WebP format
4. **Code Splitting** - Vite already optimizes
5. **Minification** - Automatic in production build

### Current Build Stats
- Total JS: 1,746.05 KB (472.56 KB gzipped)
- Total CSS: 110.89 KB (14.81 KB gzipped)
- Build modules: 2,992
- Build time: ~40 seconds

### To Reduce Bundle Size
1. Tree-shake unused dependencies
2. Lazy load heavy components
3. Use dynamic imports for routes
4. Audit dependencies: `npx webpack-bundle-analyzer`

---

## 📈 Recommended Setup by Use Case

### 🎓 Learning / Small Project
**Use:** GitHub Pages or Vercel
- Free tier sufficient
- Easy setup
- Good for portfolio

### 🏢 Business / Production
**Use:** Hostinger VPS + Custom Domain
- Full control
- Affordable ($2.99-6/month)
- Better for backend integration
- Email integration easier
- Database access (add PostgreSQL/MySQL)

### 🚀 Enterprise / Scale
**Use:** Vercel + Custom Domain
- Auto-scaling CDN
- Advanced monitoring
- Team collaboration
- Later migrate to Docker/Kubernetes if needed

---

## 🔗 Useful Resources

- **Vercel Docs:** https://vercel.com/docs
- **Nginx Docs:** https://nginx.org/en/docs/
- **Let's Encrypt:** https://letsencrypt.org/getting-started/
- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/

---

## ✅ Deployment Complete!

Your ReViSense.Ai is now configured to deploy anywhere:

| Platform | URL | Command |
|----------|-----|---------|
| ✅ Vercel | `your-project.vercel.app` | Auto-deploy from GitHub |
| ✅ Hostinger VPS | `your-domain.com` or `vps-ip` | `npm run build` + Nginx |
| ✅ GitHub Pages | `edunexusai.github.io/revisense` | `npm run deploy` |

**Choose your platform and deploy now!** 🎉
