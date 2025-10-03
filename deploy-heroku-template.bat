@echo off
echo 🚀 Starting Heroku deployment for TechTalk Alumni Network...

where heroku >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Heroku CLI is not installed. Please install it first.
    echo Visit: https://devcenter.heroku.com/articles/heroku-cli
    pause
    exit /b 1
)

set /p APP_NAME=Enter your Heroku app name: 

if "%APP_NAME%"=="" (
    echo ❌ App name cannot be empty
    pause
    exit /b 1
)

echo 📋 Logging into Heroku...
heroku login

echo 🏗️  Creating Heroku app: %APP_NAME%
heroku create %APP_NAME%

echo 🔧 Setting environment variables...
echo ⚠️  Please set these manually in Heroku Dashboard or use heroku config:set:
echo.
echo REQUIRED ENVIRONMENT VARIABLES:
echo - NODE_ENV=production
echo - MONGODB_URI=your_mongodb_connection_string
echo - GOOGLE_CLIENT_ID=your_google_client_id
echo - GOOGLE_CLIENT_SECRET=your_google_client_secret
echo - JWT_SECRET=generate_random_64_char_string
echo - SESSION_SECRET=generate_random_32_char_string
echo - CLIENT_URL=https://your-frontend-domain.com
echo.

pause

echo 📦 Deploying to Heroku...
git add .
git commit -m "Deploy to Heroku"
git push heroku main

if %ERRORLEVEL% EQU 0 (
    echo ✅ Deployment completed successfully!
    echo 🌐 Your app is available at: https://%APP_NAME%.herokuapp.com
    echo.
    echo 📋 Next steps:
    echo 1. Update Google OAuth redirect URI to: https://%APP_NAME%.herokuapp.com/api/auth/google/callback
    echo 2. Test your deployment: https://%APP_NAME%.herokuapp.com/api/health
    echo 3. Check logs: heroku logs --tail -a %APP_NAME%
) else (
    echo ❌ Deployment failed. Check the logs: heroku logs --tail -a %APP_NAME%
)

pause