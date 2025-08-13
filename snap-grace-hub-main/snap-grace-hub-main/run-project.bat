@echo off
setlocal enabledelayedexpansion

echo ========================================
echo    SNAP GRACE HUB PROJECT LAUNCHER
echo ========================================
echo.

:: Check if we're in the right directory
if not exist "backend\pom.xml" (
    echo ERROR: backend\pom.xml not found!
    echo Please run this script from the project root folder.
    pause
    exit /b 1
)

if not exist "Frontend\package.json" (
    echo ERROR: Frontend\package.json not found!
    echo Please run this script from the project root folder.
    pause
    exit /b 1
)

:: Check Java
echo [1/6] Checking Java installation...
java -version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Java not found! Please install Java 17 or higher.
    pause
    exit /b 1
)
echo ✓ Java found

:: Check Maven
echo [2/6] Checking Maven installation...
if exist "backend\.maven\apache-maven-3.9.9\bin\mvn.cmd" (
    set MAVEN_CMD=backend\.maven\apache-maven-3.9.9\bin\mvn.cmd
    echo ✓ Local Maven found
) else (
    mvn -version >nul 2>&1
    if errorlevel 1 (
        echo ERROR: Maven not found!
        pause
        exit /b 1
    )
    set MAVEN_CMD=mvn
    echo ✓ System Maven found
)

:: Check Node.js
echo [3/6] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)
echo ✓ Node.js found

:: Set Java environment
echo [4/6] Setting up Java environment...
for /f "delims=" %%i in ('dir /b /s "C:\Program Files\Eclipse Adoptium\jdk-17*" 2^>nul') do (
    set JAVA_HOME=%%i
    goto :java_found
)
echo Using system Java...

:java_found
if defined JAVA_HOME (
    set PATH=!JAVA_HOME!\bin;%PATH%
    echo ✓ Java environment set
)

:: Start Backend
echo [5/6] Starting Spring Boot Backend...
echo Starting backend on port 8080...
start "Backend" cmd /k "cd /d %CD%\backend && %MAVEN_CMD% spring-boot:run -Dspring.profiles.active=dev"

:: Wait for backend to start
echo Waiting 8 seconds for backend to start...
timeout /t 8 /nobreak >nul

:: Start Frontend
echo [6/6] Starting React Frontend...
echo Starting frontend on port 8081...
start "Frontend" cmd /k "cd /d %CD%\Frontend && if not exist .env.local echo VITE_API_URL=http://localhost:8080 > .env.local && npm run dev -- --port 8081"

echo.
echo ========================================
echo    PROJECT STARTED SUCCESSFULLY!
echo ========================================
echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:8081
echo.
echo Press any key to exit this launcher...
pause >nul