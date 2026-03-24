@echo off
cd /d "%~dp0"
echo Starting EduNexes.Ai Dev Server...
echo.

REM Start dev server in background
start cmd /k npm run dev

REM Wait 4 seconds for server to start
timeout /t 4 /nobreak

REM Auto-open browser
start http://localhost:3000

echo.
echo Browser opening at http://localhost:3000
echo Press any key to close this window...
pause
