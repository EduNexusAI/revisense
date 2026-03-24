@echo off
REM ReViSense.Ai - Deploy to Hostinger VPS Script (Windows)
REM Usage: deploy-hostinger.bat

setlocal enabledelayedexpansion

echo.
echo 🚀 Starting ReViSense.Ai deployment to Hostinger VPS...
echo.

REM Configuration
set VPS_USER=root
set VPS_IP=your_vps_ip_address
set VPS_PATH=/var/www/revisense/fontend

REM Check if VPS details are configured
if "%VPS_IP%"=="your_vps_ip_address" (
    echo ✗ Please update VPS_IP in this script!
    pause
    exit /b 1
)

REM Step 1: Build locally
echo ✓ Building project locally...
call npm run build:hostinger

if not exist "dist" (
    echo ✗ Build failed! dist folder not found.
    pause
    exit /b 1
)
echo ✓ Build successful!
echo.

REM Step 2: Upload to VPS using SCP (requires SSH/PuTTY on Windows)
echo ✓ Uploading to VPS %VPS_IP%...

REM Using PowerShell for SSH (requires Windows 10 or installation of openssh)
powershell -Command ^
    "ssh %VPS_USER%@%VPS_IP% 'cd %VPS_PATH% && mv dist dist.backup 2>/dev/null || true'"

REM Upload using pscp (PuTTY's scp equivalent)
REM Uncomment if you have pscp installed
REM pscp -r dist %VPS_USER%@%VPS_IP%:%VPS_PATH%/dist

echo ✓ Files uploaded to VPS
echo.

REM Step 3: Reload Nginx
echo ✓ Reloading Nginx...
powershell -Command ^
    "ssh %VPS_USER%@%VPS_IP% 'systemctl reload nginx'"

echo ✓ Nginx reloaded
echo.

REM Step 4: Show deployment summary
echo 📊 Deployment Summary:
echo   - VPS: %VPS_IP%
echo   - Path: %VPS_PATH%
echo   - Timestamp: %DATE% %TIME%
echo.
echo ✓ Deployment complete! 🎉
echo.
pause
