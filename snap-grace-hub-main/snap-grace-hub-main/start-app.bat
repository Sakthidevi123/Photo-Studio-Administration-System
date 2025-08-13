@echo off
echo ========================================
echo     SNAP GRACE HUB - STARTUP SCRIPT
echo ========================================
echo.

REM Check if backend is running
echo [1/4] Checking backend status...
netstat -an | findstr ":8080" >nul
if %errorlevel%==0 (
    echo ✅ Backend is already running on port 8080
) else (
    echo ⚠️  Backend not detected on port 8080
    echo Please ensure the backend is running before continuing
    echo.
    pause
)

REM Navigate to frontend directory
echo.
echo [2/4] Navigating to Frontend directory...
cd /d "E:\snap-grace-hub-main\Frontend"

REM Install dependencies if needed
echo.
echo [3/4] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
) else (
    echo ✅ Dependencies already installed
)

REM Start the development server
echo.
echo [4/4] Starting Frontend Development Server...
echo.
echo 🚀 Application will be available at:
echo    Frontend: http://localhost:8081
echo    Backend:  http://localhost:8080
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
