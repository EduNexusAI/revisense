#!/bin/bash

# ReViSense.Ai - Deploy to Hostinger VPS Script
# Usage: ./deploy-hostinger.sh

set -e  # Exit on error

echo "🚀 Starting ReViSense.Ai deployment to Hostinger VPS..."

# Configuration
VPS_USER="root"                              # Change to your VPS user
VPS_IP="your_vps_ip_address"                # Change to your VPS IP
VPS_PATH="/var/www/revisense/fontend"       # App path on VPS
REPO_URL="https://github.com/EduNexusAI/revisense.git"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_info() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warn() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if VPS details are configured
if [[ "$VPS_IP" == "your_vps_ip_address" ]]; then
    print_error "Please update VPS_IP in this script!"
    exit 1
fi

# Step 1: Build locally
print_info "Building project locally..."
npm run build:hostinger

if [ ! -d "dist" ]; then
    print_error "Build failed! dist folder not found."
    exit 1
fi
print_info "Build successful!"

# Step 2: Connect to VPS and deploy
print_info "Uploading to VPS $VPS_IP..."

# Create dist backup on VPS
ssh ${VPS_USER}@${VPS_IP} "cd ${VPS_PATH} && mv dist dist.backup 2>/dev/null || true"

# Upload dist folder
scp -r dist ${VPS_USER}@${VPS_IP}:${VPS_PATH}/dist

# Verify upload
ssh ${VPS_USER}@${VPS_IP} "[ -d ${VPS_PATH}/dist ] && echo 'Upload verified' || echo 'Upload failed'"

print_info "Files uploaded to VPS"

# Step 3: Reload Nginx
print_info "Reloading Nginx..."
ssh ${VPS_USER}@${VPS_IP} "systemctl reload nginx"

print_info "Nginx reloaded"

# Step 4: Verify deployment
print_info "Verifying deployment..."
HTTP_CODE=$(ssh ${VPS_USER}@${VPS_IP} "curl -s -o /dev/null -w '%{http_code}' http://localhost")

if [ "$HTTP_CODE" = "200" ]; then
    print_info "✅ Deployment successful!"
    print_info "Your app is live at http://${VPS_IP}/"
else
    print_warn "Warning: HTTP status code is $HTTP_CODE (expected 200)"
fi

# Step 5: Show deployment summary
echo ""
echo "📊 Deployment Summary:"
echo "  • VPS: $VPS_IP"
echo "  • Path: $VPS_PATH"
echo "  • Build size: $(du -sh dist | cut -f1)"
echo "  • Timestamp: $(date)"
echo ""
print_info "Deployment complete! 🎉"
